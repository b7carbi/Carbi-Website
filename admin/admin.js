// Check if user is authenticated
function isAuthenticated() {
    const token = localStorage.getItem('admin_token');
    const expires = localStorage.getItem('admin_token_expires');

    if (!token || !expires) {
        return false;
    }

    // Check if token is expired
    if (Date.now() > parseInt(expires)) {
        logout();
        return false;
    }

    return true;
}

// Get auth token
function getToken() {
    return localStorage.getItem('admin_token');
}

// Logout function
function logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_token_expires');
    window.location.href = '/admin/login.html';
}

// Make authenticated API call
async function apiCall(endpoint, options = {}) {
    const token = getToken();

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {})
        }
    };

    try {
        const response = await fetch(endpoint, mergedOptions);

        // If unauthorized, redirect to login
        if (response.status === 401) {
            logout();
            return null;
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }

        return data;

    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Get status badge class
function getStatusClass(status) {
    const statusClasses = {
        'new': 'status-new',                      // Blue - not started
        'first_email_sent': 'status-searching',   // Yellow - actively searching
        'car_found': 'status-searching',          // Yellow - found but not connected
        'dealer_contacted': 'status-connecting',  // Purple - making connections
        'customer_matched': 'status-completed',   // Green - successfully matched
        'followed_up': 'status-completed',        // Green - completed & followed up
        'test_data': 'status-test'                // Dashed yellow border
    };
    return statusClasses[status] || 'status-new';
}

// Get status display text
function getStatusText(status) {
    const statusText = {
        'new': 'New',
        'first_email_sent': 'First Email Sent',
        'car_found': 'Car Found',
        'dealer_contacted': 'Dealer Contacted',
        'customer_matched': 'Customer Matched',
        'followed_up': 'Followed Up',
        'test_data': 'Test Data'
    };
    return statusText[status] || status;
}

// Generate AutoTrader search URL
function generateAutoTraderURL(request) {
    const baseURL = 'https://www.autotrader.co.uk/car-search';
    const params = new URLSearchParams();

    // Fixed parameters
    params.append('channel', 'cars');
    params.append('flrfc', '1');
    params.append('sort', 'mileage');

    // Insurance group - always set to 10U for young drivers
    params.append('insuranceGroup', '10U');

    // Location (postcode)
    if (request.postcode) {
        params.append('postcode', request.postcode);
    }

    // Search radius
    if (request.search_radius) {
        params.append('radius', request.search_radius);
    }

    // Budget
    if (request.budget_min) {
        params.append('price-from', request.budget_min);
    }
    if (request.budget_max) {
        params.append('price-to', request.budget_max);
    }

    // Brands - if they selected specific brands
    if (request.brand_preference === 'specific' && request.selected_brands && request.selected_brands.length > 0) {
        request.selected_brands.forEach(brand => {
            params.append('make', brand);
        });
    }

    // Transmission
    if (request.transmission_type) {
        // Capitalize first letter for AutoTrader (Manual/Automatic)
        const transmission = request.transmission_type.charAt(0).toUpperCase() + request.transmission_type.slice(1);
        params.append('transmission', transmission);
    }

    // Engine size - use maximum if specified
    if (request.engine_size_max) {
        params.append('maximum-badge-engine-size', request.engine_size_max);
    }

    // Number of doors
    if (request.number_of_doors && request.number_of_doors.length > 0) {
        // AutoTrader takes a single value, use the first one or the most common (5)
        const doors = request.number_of_doors.includes('5') ? '5' : request.number_of_doors[0];
        params.append('quantity-of-doors', doors);
    }

    // Maximum mileage
    if (request.max_mileage) {
        params.append('maximum-mileage', request.max_mileage);
    }

    return `${baseURL}?${params.toString()}`;
}