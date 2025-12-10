import jwt from 'jsonwebtoken';

// CORS headers
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

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, password } = req.body;

        // Check credentials against environment variables
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const jwtSecret = process.env.JWT_SECRET;

        if (!adminEmail || !adminPassword || !jwtSecret) {
            console.error('Missing admin credentials in environment variables');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Validate credentials
        if (email !== adminEmail || password !== adminPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token (expires in 24 hours)
        const token = jwt.sign(
            { email: adminEmail, role: 'admin' },
            jwtSecret,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            success: true,
            token,
            expiresIn: 86400 // 24 hours in seconds
        });

    } catch (error) {
        console.error('Auth error:', error);
        return res.status(500).json({ error: 'Authentication failed' });
    }
}