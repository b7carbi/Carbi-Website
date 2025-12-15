export type MatchRequestStatus = 'new' | 'first_email_sent' | 'car_found' | 'dealer_contacted' | 'customer_matched' | 'followed_up' | 'test_data';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';
export type ContactPreference = 'Email' | 'Text' | 'Phone Call';

export type PlanType = 'basic' | 'weekly' | 'instant';

export interface MatchRequestFormData {
    // Step 1: Requirements
    important_features: string[];
    dealbreakers: string[];

    // Step 2: Driver Type
    main_driver_type?: 'young_driver' | 'older_driver' | 'not_sure';

    // Budget
    budget_min: number;
    budget_max: number;

    // Brand
    brand_preference?: 'dont_mind' | 'specific';
    selected_brands: string[];
    favourite_brand?: string;

    // Specs
    transmission_type?: 'manual' | 'automatic' | 'dont_mind';
    engine_size_min?: number;
    engine_size_max?: number;
    number_of_doors: string[];
    max_mileage?: number;

    // Colour
    preferred_colours: string[];
    custom_colour?: string;

    // Location
    postcode: string;
    search_radius: number;
    location_coords?: any;

    // Notes
    additional_notes?: string;

    // Contact
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    contact_preferences: ContactPreference[];

    // Payment
    plan_type?: PlanType;
    payment_amount?: number;
}

export const INITIAL_FORM_DATA: MatchRequestFormData = {
    important_features: [],
    dealbreakers: [],
    // main_driver_type: undefined, // Removed default
    budget_min: 6000,
    budget_max: 8000,
    // brand_preference: 'dont_mind', // Removed default
    selected_brands: [],
    // transmission_type: undefined, // Removed default
    number_of_doors: [],
    preferred_colours: [],
    postcode: '',
    search_radius: 50,
    first_name: '',
    last_name: '',
    email: '',
    contact_preferences: []
};
