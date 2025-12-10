import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="py-12 bg-background-alt border-t border-border mt-auto">
            <div className="container mx-auto px-5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-text-secondary text-sm">
                        &copy; {new Date().getFullYear()} Carbi. All rights reserved.
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-text-secondary">
                        <Link href="/privacy.html" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <span className="hidden md:inline text-gray-300">|</span>
                        <a href="mailto:hello@carbi.co" className="hover:text-primary transition-colors">
                            hello@carbi.co
                        </a>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-text-tertiary">
                    <p>Carbi is an independent service connecting young drivers with trusted dealers.</p>
                </div>
            </div>
        </footer>
    );
}
