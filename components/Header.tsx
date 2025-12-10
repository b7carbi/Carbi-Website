import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-border py-5">
            <div className="container mx-auto px-5 max-w-[800px] flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/" aria-label="carbi home" className="flex items-center group">
                        <svg width="110" height="40" viewBox="0 0 110 40" aria-hidden="true" focusable="false">
                            <circle cx="20" cy="20" r="6" fill="#0EA5E9" className="origin-center animate-wink" />
                            <path d="M 38 14 L 45 20 L 38 26" fill="none" stroke="#1E40AF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <text x="58" y="27" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto" fontSize="20" fontWeight="600" fill="#0F172A">carbi</text>
                        </svg>
                    </Link>
                </div>


            </div>
        </header>
    );
}
