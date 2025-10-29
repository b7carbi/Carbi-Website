import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
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

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Verify JWT token
function verifyToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.substring(7);
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export default async function handler(req, res) {
    // Set CORS headers
    Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
    });

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Verify authentication
    const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Fetch all match requests, ordered by creation date (newest first)
        const { data, error } = await supabase
            .from('match_requests')
            .select('id, created_at, first_name, last_name, email, phone, postcode, budget_min, budget_max, contact_preferences, status, source')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase fetch error:', error);
            return res.status(500).json({ error: 'Failed to fetch requests' });
        }

        return res.status(200).json({
            success: true,
            requests: data
        });

    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
}