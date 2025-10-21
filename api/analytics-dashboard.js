// This endpoint fetches aggregated analytics data

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // Simple authentication check
    const authToken = req.headers.authorization?.replace('Bearer ', '');

    if (authToken !== process.env.ADMIN_DASHBOARD_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_KEY
        );

        // Get date range from query params (default to last 7 days)
        const days = parseInt(req.query.days) || 7;

        // Query 1: Summary metrics
        const { data: summaryData, error: summaryError } = await supabase.rpc(
            'get_analytics_summary',
            { days_back: days }
        );

        if (summaryError && summaryError.code !== 'PGRST116') {
            // If function doesn't exist, fall back to direct queries
            const { data: events } = await supabase
                .from('analytics_events')
                .select('event_type, metadata, created_at')
                .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

            const summary = {
                form_started: events?.filter(e => e.event_type === 'form_started').length || 0,
                form_completed: events?.filter(e => e.event_type === 'form_completed').length || 0,
                form_abandoned: events?.filter(e => e.event_type === 'form_abandoned').length || 0,
                cookie_accepted: events?.filter(e => e.event_type === 'cookie_consent' && e.metadata?.consented === true).length || 0,
                cookie_rejected: events?.filter(e => e.event_type === 'cookie_consent' && e.metadata?.consented === false).length || 0,
            };

            summary.conversion_rate = summary.form_started > 0
                ? ((summary.form_completed / summary.form_started) * 100).toFixed(2)
                : 0;

            summary.cookie_acceptance_rate = (summary.cookie_accepted + summary.cookie_rejected) > 0
                ? ((summary.cookie_accepted / (summary.cookie_accepted + summary.cookie_rejected)) * 100).toFixed(2)
                : 0;

            // Query 2: Daily breakdown
            const dailyBreakdown = {};
            events?.forEach(event => {
                const date = event.created_at.split('T')[0];
                if (!dailyBreakdown[date]) {
                    dailyBreakdown[date] = { date, started: 0, completed: 0, abandoned: 0 };
                }
                if (event.event_type === 'form_started') dailyBreakdown[date].started++;
                if (event.event_type === 'form_completed') dailyBreakdown[date].completed++;
                if (event.event_type === 'form_abandoned') dailyBreakdown[date].abandoned++;
            });

            const daily = Object.values(dailyBreakdown).sort((a, b) => b.date.localeCompare(a.date));

            // Query 3: Abandonment by step
            const abandonmentByStep = {};
            events?.filter(e => e.event_type === 'form_abandoned').forEach(event => {
                const step = event.metadata?.last_step || 'unknown';
                abandonmentByStep[step] = (abandonmentByStep[step] || 0) + 1;
            });

            const abandonment = Object.entries(abandonmentByStep)
                .map(([step, count]) => ({ step, count }))
                .sort((a, b) => parseInt(a.step) - parseInt(b.step));

            // Query 4: Traffic sources
            const sources = {};
            events?.filter(e => e.event_type === 'form_started').forEach(event => {
                const referrer = event.metadata?.referrer || 'Direct';
                let source = 'Direct';
                if (referrer.includes('facebook')) source = 'Facebook';
                else if (referrer.includes('google')) source = 'Google';
                else if (referrer.includes('instagram')) source = 'Instagram';
                else if (referrer !== 'Direct') source = 'Other';

                sources[source] = (sources[source] || 0) + 1;
            });

            const traffic = Object.entries(sources)
                .map(([source, count]) => ({ source, count }))
                .sort((a, b) => b.count - a.count);

            return res.status(200).json({
                summary,
                daily,
                abandonment,
                traffic,
                period_days: days
            });
        }

        // If RPC function exists, use that
        return res.status(200).json(summaryData);

    } catch (error) {
        console.error('Dashboard API error:', error);
        return res.status(500).json({
            error: 'Failed to fetch analytics',
            message: error.message
        });
    }
}