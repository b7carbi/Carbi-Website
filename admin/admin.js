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
        'new': 'status-new',
        'in_progress': 'status-progress',
        'completed': 'status-completed'
    };
    return statusClasses[status] || 'status-new';
}

// Get status display text
function getStatusText(status) {
    const statusText = {
        'new': 'New',
        'in_progress': 'In Progress',
        'completed': 'Completed'
    };
    return statusText[status] || status;
}