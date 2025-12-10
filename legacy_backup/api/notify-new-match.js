// api/notify-new-match.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Verify the request is from Supabase (basic security)
    const authHeader = req.headers['authorization'];
    if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Extract the new record from Supabase webhook payload
        const { record } = req.body;

        if (!record) {
            return res.status(400).json({ error: 'No record provided' });
        }

        // Format the email content
        const emailHtml = formatEmailContent(record);

        // Send email via Resend
        const data = await resend.emails.send({
            from: 'Carbi Notifications <onboarding@resend.dev>', // Use your domain later: notifications@carbi.co
            to: [process.env.NOTIFICATION_EMAIL], // Your email address
            subject: `🚗 New Match Request from ${record.first_name} ${record.last_name}`,
            html: emailHtml,
        });

        console.log('Email sent successfully:', data);

        return res.status(200).json({
            success: true,
            message: 'Notification sent',
            emailId: data.id
        });

    } catch (error) {
        console.error('Error sending notification:', error);
        return res.status(500).json({
            error: 'Failed to send notification',
            details: error.message
        });
    }
}

// Helper function to format the email
function formatEmailContent(record) {
    const {
        first_name,
        last_name,
        email,
        phone,
        budget_min,
        budget_max,
        important_features,
        dealbreakers,
        selected_brands,
        favourite_brand,
        preferred_colours,
        custom_colour,
        max_mileage,
        search_radius,
        postcode,
        additional_notes,
        contact_preferences,
        created_at,
        id
    } = record;

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0F172A; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0EA5E9 0%, #1E40AF 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; }
        .section { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0EA5E9; }
        .section h3 { margin-top: 0; color: #1E40AF; }
        .detail { margin: 10px 0; }
        .label { font-weight: 600; color: #64748B; }
        .value { color: #0F172A; }
        .badge { display: inline-block; background: #0EA5E9; color: white; padding: 4px 12px; border-radius: 12px; font-size: 14px; margin: 2px; }
        .cta { background: #0EA5E9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 20px; }
        .footer { text-align: center; color: #64748B; font-size: 14px; margin-top: 40px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">🚗 New Match Request</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">Someone just submitted their first car requirements!</p>
        </div>

        <div class="section">
          <h3>👤 Contact Details</h3>
          <div class="detail"><span class="label">Name:</span> <span class="value">${first_name} ${last_name}</span></div>
          <div class="detail"><span class="label">Email:</span> <span class="value">${email}</span></div>
          <div class="detail"><span class="label">Phone:</span> <span class="value">${phone}</span></div>
          <div class="detail">
            <span class="label">Contact Preferences:</span> 
            ${contact_preferences.map(pref => `<span class="badge">${pref}</span>`).join(' ')}
          </div>
        </div>

        <div class="section">
          <h3>💰 Budget & Location</h3>
          <div class="detail"><span class="label">Budget:</span> <span class="value">£${budget_min.toLocaleString()} - £${budget_max.toLocaleString()}</span></div>
          <div class="detail"><span class="label">Location:</span> <span class="value">${postcode}</span></div>
          <div class="detail"><span class="label">Search Radius:</span> <span class="value">${search_radius} miles</span></div>
          ${max_mileage ? `<div class="detail"><span class="label">Max Mileage:</span> <span class="value">${max_mileage.toLocaleString()} miles</span></div>` : ''}
        </div>

        <div class="section">
          <h3>✨ Requirements</h3>
          ${important_features && important_features.length > 0 ? `
            <div class="detail">
              <span class="label">Important Features:</span><br>
              ${important_features.map(feat => `<span class="badge">${feat}</span>`).join(' ')}
            </div>
          ` : ''}
          
          ${dealbreakers && dealbreakers.length > 0 ? `
            <div class="detail">
              <span class="label">Dealbreakers:</span><br>
              ${dealbreakers.map(db => `<span class="badge">${db}</span>`).join(' ')}
            </div>
          ` : ''}

          ${selected_brands && selected_brands.length > 0 ? `
            <div class="detail">
              <span class="label">Preferred Brands:</span><br>
              ${selected_brands.map(brand => `<span class="badge">${brand}</span>`).join(' ')}
              ${favourite_brand ? `<br><span class="label">Favourite:</span> <strong>${favourite_brand}</strong>` : ''}
            </div>
          ` : ''}

          ${preferred_colours && preferred_colours.length > 0 ? `
            <div class="detail">
              <span class="label">Preferred Colours:</span><br>
              ${preferred_colours.map(color => `<span class="badge">${color}</span>`).join(' ')}
              ${custom_colour ? `<br><span class="label">Custom Colour:</span> ${custom_colour}` : ''}
            </div>
          ` : ''}
        </div>

        ${additional_notes ? `
          <div class="section">
            <h3>📝 Additional Notes</h3>
            <p style="margin: 0; font-style: italic;">"${additional_notes}"</p>
          </div>
        ` : ''}

        <div class="section">
          <h3>🔗 Quick Actions</h3>
          <a href="https://app.supabase.com/project/YOUR_PROJECT_ID/editor" class="cta">View in Supabase</a>
        </div>

        <div class="footer">
          <p>Submission ID: ${id}</p>
          <p>Submitted: ${new Date(created_at).toLocaleString('en-GB', {
        dateStyle: 'full',
        timeStyle: 'short'
    })}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}