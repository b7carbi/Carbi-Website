// tracking.js - Shared cookie consent and analytics tracking
// Used across all pages for consistent tracking behavior

// Configuration
const TRACKING_CONFIG = {
    cookieConsent: {
        palette: {
            popup: { background: "#0F172A" },
            button: { background: "#0EA5E9", text: "#ffffff" }
        },
        theme: 'classic',
        position: 'bottom',
        content: {
            message: "Cookies help us improve your experience and learn what marketing works. You can accept or reject.",
            dismiss: "Accept",
            deny: "Reject",
            link: "Learn more",
            href: "/privacy.html"
        }
    },
    analytics: {
        googleAnalyticsId: 'G-1S8XELP34H',
        googleAdsId: 'AW-882133742',
        metaPixelId: '1455041752448144'
    }
};

// Initialize cookie consent on page load
window.addEventListener("load", function () {
    window.cookieconsent.initialise({
        type: 'opt-in',
        ...TRACKING_CONFIG.cookieConsent,

        // Callback when user accepts/rejects
        onStatusChange: function (status, chosenBefore) {
            const consent = this.hasConsented();

            if (consent) {
                console.log('User accepted cookies');
                loadTrackingScripts();
            } else {
                console.log('User rejected cookies');
            }

            // Track the cookie consent decision
            trackConsentDecision(consent);
        },

        // Handle initial page load if user previously consented
        onInitialise: function (status) {
            console.log('Status:', status);

            // Check both localStorage AND cookies
            const consent = this.hasConsented() ||
                document.cookie.includes('cookieconsent_status=allow');

            console.log('Cookie consent initialized:', consent);

            if (consent) {
                loadTrackingScripts();
            }
        }
    });
});

// Load Google Analytics and Meta Pixel
function loadTrackingScripts() {
    // Only load if not already loaded
    if (window.gaLoaded) return;
    window.gaLoaded = true;

    // Load Google Analytics
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_CONFIG.analytics.googleAnalyticsId}`;
    document.head.appendChild(gaScript);

    gaScript.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = gtag; // Make gtag globally available
        gtag('js', new Date());
        gtag('config', TRACKING_CONFIG.analytics.googleAnalyticsId, {
            'anonymize_ip': true,
            'allow_google_signals': false,
            'allow_ad_personalization_signals': false
        });
        gtag('config', TRACKING_CONFIG.analytics.googleAdsId);

        // Track page view
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href
        });
    };

    // Load Meta Pixel
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n;
        n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', TRACKING_CONFIG.analytics.metaPixelId);
    fbq('track', 'PageView');
}

// Track cookie consent decision to backend
async function trackConsentDecision(consented) {
    try {
        await fetch('/api/track-event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event_type: 'cookie_consent',
                page_path: window.location.pathname,
                session_id: getSessionId(),
                metadata: {
                    consented: consented,
                    timestamp: new Date().toISOString()
                }
            })
        });
    } catch (error) {
        console.error('Failed to track consent:', error);
    }
}

// Generate or retrieve session ID
function getSessionId() {
    let sessionId = sessionStorage.getItem('carbi_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('carbi_session_id', sessionId);
    }
    return sessionId;
}

// Generic event tracking function
async function trackEvent(eventType, metadata = {}) {
    try {
        await fetch('/api/track-event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event_type: eventType,
                page_path: window.location.pathname,
                session_id: getSessionId(),
                metadata: metadata
            })
        });
    } catch (error) {
        console.error('Failed to track event:', error);
    }
}

// Safe gtag wrapper that checks if gtag is loaded
function safeGtag(command, ...args) {
    if (typeof window.gtag !== 'undefined') {
        window.gtag(command, ...args);
    }
}

// Export functions for use in other scripts
window.carbiTracking = {
    trackEvent,
    safeGtag,
    getSessionId
};