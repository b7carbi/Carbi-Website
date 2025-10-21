export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { createClient } = require('@supabase/supabase-js');
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_KEY
        );

        const { event_type, page_path, session_id, metadata } = req.body;

        const { data, error } = await supabase
            .from('analytics_events')
            .insert([{
                event_type,
                page_path,
                session_id,
                user_agent: req.headers['user-agent'],
                referrer: req.headers['referer'] || null,
                metadata
            }]);

        if (error) throw error;

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Analytics tracking error:', error);
        return res.status(500).json({ error: 'Failed to track event' });
    }
}