import Link from 'next/link';

export default function Hero() {
    return (
        <section className="py-20 bg-white text-center">
            <div className="container mx-auto px-5">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-text-primary mb-5 leading-[1.2] max-w-[600px] mx-auto">
                    Are you looking for a young driver car?
                </h1>
                <p className="text-lg md:text-xl text-text-secondary max-w-[560px] mx-auto mb-10 leading-relaxed">
                    Skip the hassle of endless searching. Answer a few questions and we'll match you with an insurable car
                    from a trusted dealer for £49. Refundable if we don't find your car.
                </p>

                <Link
                    href="/get-matched"
                    className="inline-block bg-primary text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all hover:bg-primary-dark hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_20px_rgba(30,64,175,0.4)]"
                >
                    Get matched
                </Link>

                <ul className="flex flex-wrap justify-center gap-7 mt-10 list-none">
                    <TrustSignal text="Quick matches." />
                    <TrustSignal text="Low insurance groups." />
                    <TrustSignal text="4.6+ star dealers only." />
                </ul>
            </div>
        </section>
    );
}

function TrustSignal({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-2 text-sm md:text-base text-text-secondary">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#10B981" />
            </svg>
            <span>{text}</span>
        </li>
    );
}
