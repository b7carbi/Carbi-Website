import Image from 'next/image';

export default function HowItWorks() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-5">
                <h2 className="text-3xl font-bold text-center text-text-primary mb-14">
                    How it works.
                </h2>

                <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto list-none">
                    <Step
                        img="/images/step1-car.png"
                        title="1. Tell us what you need"
                        description="Quick form (takes 2 min)."
                        isFirst
                    />
                    <Step
                        img="/images/step2-search.png"
                        title="2. We do the legwork"
                        description="Checking dealer stock, insurance groups and availability."
                    />
                    <Step
                        img="/images/step3-handshake.png"
                        title="3. Connect with dealer"
                        description="You're matched with a trusted dealer who has your perfect car."
                    />
                </ol>

                <div className="text-center mt-10">
                    <div className="flex justify-center gap-1 mb-2">
                        <Star /><Star /><Star /><Star /><StarHalf />
                    </div>
                    <p className="text-sm text-text-secondary">4.6/5 average dealer rating</p>
                </div>
            </div>
        </section>
    );
}

function Step({ img, title, description, isFirst = false }: { img: string; title: string; description: string; isFirst?: boolean }) {
    return (
        <li className="bg-white p-10 md:px-6 md:py-10 rounded-2xl text-center shadow-[0_2px_10px_rgba(0,0,0,0.05)] h-full">
            <div className="flex items-center justify-center mb-7 w-[120px] h-[120px] mx-auto relative">
                <Image
                    src={img}
                    alt=""
                    width={isFirst ? 130 : 100}
                    height={isFirst ? 130 : 100}
                    className="object-contain"
                />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-4 leading-snug">{title}</h3>
            <p className="text-text-secondary leading-relaxed text-[1.05rem] m-0">{description}</p>
        </li>
    );
}

function Star() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#F59E0B">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
    );
}

function StarHalf() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24">
            <defs>
                <linearGradient id="half">
                    <stop offset="60%" stopColor="#F59E0B" />
                    <stop offset="60%" stopColor="#E2E8F0" />
                </linearGradient>
            </defs>
            <path fill="url(#half)" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
    )
}
