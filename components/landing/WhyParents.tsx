export default function WhyParents() {
    return (
        <section className="py-16 bg-background-alt">
            <div className="container mx-auto px-5">
                <h2 className="text-3xl font-bold text-center text-text-primary mb-12">
                    Why choose carbi?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-14 items-center">
                    {/* Left: Scrolling Phone Animation */}
                    <div className="flex justify-center">
                        <div className="w-[140px] h-[260px] md:w-[180px] md:h-[334px] rounded-[30px] border-[3px] border-slate-700 overflow-hidden bg-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
                            <video
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                aria-label="Animation showing endless scrolling through car listings"
                            >
                                <source src="/videos/car-icon-animation.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

                    {/* Right: Stacked Benefits */}
                    <div className="flex flex-col gap-8 md:gap-10">
                        <Benefit
                            icon="✨"
                            title="Curated search"
                            description="Avoid the overwhelm of the usual car searching platforms. No complicated filters, endless scrolling or irrelevant ads. We cut straight to the good stuff."
                        />
                        <Benefit
                            icon="🛡️"
                            title="Young driver specialists"
                            description="Every car we recommend is from a trusted dealer network who offer safe, affordable and insurance friendly cars."
                        />
                        <Benefit
                            icon="✓"
                            title="Risk free"
                            description="Get your money back if you don't find a car from a dealer we connected you with."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Benefit({ icon, title, description }: { icon: string; title: string; description: string }) {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
            <div className="text-4xl flex-shrink-0 mt-1 md:mt-0" aria-hidden="true">{icon}</div>
            <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2 md:mb-1">{title}</h3>
                <p className="text-sm md:text-base text-text-secondary leading-relaxed m-0">{description}</p>
            </div>
        </div>
    );
}
