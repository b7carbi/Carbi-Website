import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="py-4 bg-[#1a1f2e] border-t border-[#2a3142] mt-auto">
            <div className="container mx-auto px-5 max-w-[800px]">
                <div className="flex items-center justify-between gap-6 text-sm">
                    {/* Logo - matching header */}
                    <Link href="/" aria-label="carbi home" className="flex items-center">
                        <svg width="110" height="40" viewBox="0 0 110 40" aria-hidden="true" focusable="false">
                            <circle cx="20" cy="20" r="6" fill="#0EA5E9" />
                            <path d="M 38 14 L 45 20 L 38 26" fill="none" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <text x="58" y="27" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto" fontSize="20" fontWeight="600" fill="#ffffff">carbi</text>
                        </svg>
                    </Link>

                    {/* Center content */}
                    <div className="flex items-center gap-2 text-gray-400">
                        <span>© {new Date().getFullYear()} carbi. Making first cars happen.</span>
                        <span>|</span>
                        <Link href="/privacy.html" className="hover:text-[#0EA5E9] transition-colors">
                            Privacy policy
                        </Link>
                    </div>

                    {/* Email */}
                    <a
                        href="mailto:hello@carbi.co"
                        className="text-[#0EA5E9] hover:text-[#38bdf8] transition-colors"
                    >
                        hello@carbi.co
                    </a>
                </div>
            </div>
        </footer>
    );
}
