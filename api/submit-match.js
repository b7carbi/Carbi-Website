import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service key for server-side operations
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    const formData = req.body;

    // Validate required fields
    const requiredFields = [
      'important_features',
      'budget_min',
      'budget_max',
      'search_radius',
      'postcode',
      'first_name',
      'last_name',
      'contact_preferences'
    ];

    const missingFields = requiredFields.filter(field => {
      const value = formData[field];
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return !value && value !== 0;
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate contact method fields based on preferences
    const emailSelected = formData.contact_preferences.includes('Email');
    const textSelected = formData.contact_preferences.includes('Text');
    const phoneSelected = formData.contact_preferences.includes('Phone Call');

    // Email validation - required if Email is selected
    if (emailSelected) {
      if (!formData.email || formData.email.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Email address is required (you selected Email as contact preference)'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid email address format'
        });
      }
    }

    // Phone validation - required if Text or Phone Call is selected
    if (textSelected || phoneSelected) {
      if (!formData.phone || formData.phone.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Phone number is required (you selected Text or Phone Call as contact preference)'
        });
      }

      const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid phone number format (minimum 10 digits)'
        });
      }
    }

    // Ensure at least one contact method is provided
    if (!emailSelected && !textSelected && !phoneSelected) {
      return res.status(400).json({
        success: false,
        error: 'At least one contact preference must be selected'
      });
    }

    // Ensure we have the necessary contact details for selected preferences
    if ((emailSelected && !formData.email) ||
      ((textSelected || phoneSelected) && !formData.phone)) {
      return res.status(400).json({
        success: false,
        error: 'Missing contact details for selected preferences'
      });
    }

    // Validate budget range
    if (formData.budget_min >= formData.budget_max) {
      return res.status(400).json({
        success: false,
        error: 'Budget minimum must be less than maximum'
      });
    }

    // Main driver validation
    if (!formData.main_driver_type || !['young_driver', 'older_driver', 'not_sure'].includes(formData.main_driver_type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing main driver type'
      });
    }

    // Prepare data for database insertion
    const matchRequest = {
      // Personal details
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email || null,
      phone: formData.phone,
      contact_preferences: formData.contact_preferences,

      // Car preferences
      important_features: formData.important_features,
      dealbreakers: formData.dealbreakers || [],
      main_driver_type: formData.main_driver_type,

      // Budget
      budget_min: formData.budget_min,
      budget_max: formData.budget_max,

      // Brand preferences
      brand_preference: formData.brand_preference || null,
      selected_brands: formData.selected_brands || [],
      favourite_brand: formData.favourite_brand || null,

      // Color preferences
      preferred_colours: formData.preferred_colours || [],
      custom_colour: formData.custom_colour || null,

      // Mileage
      max_mileage: formData.max_mileage || null,

      // NEW FIELDS - Technical specifications
      transmission_type: formData.transmission_type || null,
      engine_size_min: formData.engine_size_min || null,
      engine_size_max: formData.engine_size_max || null,
      number_of_doors: formData.number_of_doors || [],

      // Location
      postcode: formData.postcode,
      search_radius: formData.search_radius,
      location_coords: formData.location_coords || null,

      // Additional info
      additional_notes: formData.additional_notes || null,

      // Metadata
      status: 'new'
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('match_requests')
      .insert([matchRequest])
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to save match request. Please try again.'
      });
    }

    // Log success for monitoring
    console.log('Match request created:', {
      id: data.id,
      name: `${formData.first_name} ${formData.last_name}`,
      timestamp: new Date().toISOString()
    });

    // Return success response
    return res.status(200).json({
      success: true,
      id: data.id,
      message: 'Your match request has been submitted successfully!'
    });

  } catch (error) {
    console.error('Unexpected error in submit-match:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    });
  }
}
