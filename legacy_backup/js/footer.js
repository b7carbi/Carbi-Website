// footer.js - Shared footer component
// Renders the same footer across all pages

function renderFooter() {
    const footer = document.createElement('footer');
    footer.setAttribute('role', 'contentinfo');
    footer.style.cssText = 'background: #0F172A; padding: 40px 0; margin-top: 80px;';

    footer.innerHTML = `
        <div class="container">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
                <!-- Logo -->
                <div>
                    <svg width="100" height="40" viewBox="0 0 110 40" aria-hidden="true" focusable="false">
                        <circle cx="20" cy="20" r="6" fill="#0EA5E9" />
                        <path d="M 38 14 L 45 20 L 38 26" fill="none" stroke="#0EA5E9" stroke-width="3"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <text x="58" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto"
                            font-size="20" font-weight="600" fill="white">carbi</text>
                    </svg>
                </div>
                <!-- Copyright -->
                <div>
                   <p style="color: rgba(255,255,255,0.7); font-size: 0.95em; margin: 0;">
                        © 2025 carbi. Making first cars happen. <span class="footer-separator">|</span> <a href="/privacy.html"
                            style="color: rgba(255,255,255,0.7); text-decoration: none;">Privacy policy</a>
                    </p>
                </div>
                <!-- Contact -->
                <div>
                    <p style="color: rgba(255,255,255,0.9); font-size: 1em; margin: 0;">
                        <a href="mailto:hello@carbi.co"
                            style="color: #0EA5E9; text-decoration: none;">hello@carbi.co</a>
                    </p>
                </div>
            </div>
        </div>
    `;

    return footer;
}

// Auto-render footer if there's a placeholder
document.addEventListener('DOMContentLoaded', function () {
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.replaceWith(renderFooter());
    } else {
        // If no placeholder, append to body
        document.body.appendChild(renderFooter());
    }
});