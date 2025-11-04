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
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
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

    // Verify authentication
    const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Request ID is required' });
    }

    try {
        // GET - Fetch single request
        if (req.method === 'GET') {
            const { data, error } = await supabase
                .from('match_requests')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Supabase fetch error:', error);
                return res.status(404).json({ error: 'Request not found' });
            }

            return res.status(200).json({
                success: true,
                request: data
            });
        }

        // PUT - Update request (status and admin_notes)
        if (req.method === 'PUT') {
            const { status, admin_notes } = req.body;

            // Validate status
            const validStatuses = ['new', 'in_progress', 'completed', 'test_data'];
            if (status && !validStatuses.includes(status)) {
                return res.status(400).json({
                    error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
                });
            }

            // Build update object
            const updates = {};
            if (status) updates.status = status;
            if (admin_notes !== undefined) updates.admin_notes = admin_notes;

            if (Object.keys(updates).length === 0) {
                return res.status(400).json({ error: 'No updates provided' });
            }

            // Update the request
            const { data, error } = await supabase
                .from('match_requests')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Supabase update error:', error);
                return res.status(500).json({ error: 'Failed to update request' });
            }

            return res.status(200).json({
                success: true,
                request: data
            });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
}