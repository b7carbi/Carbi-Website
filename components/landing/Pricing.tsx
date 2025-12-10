export default function Pricing() {
    return (
        <section className="py-16 bg-background-alt border-t border-border">
            <div className="container mx-auto px-5">
                <h2 className="text-3xl font-bold text-center text-text-primary mb-12">
                    Simple, transparent pricing.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
                    {/* Left: Included features */}
                    <div>
                        <h3 className="text-xl font-semibold text-text-primary mb-6">What's included:</h3>
                        <ul className="list-none space-y-3">
                            <Feature text="Comprehensive needs assessment" />
                            <Feature text="Market-wide search for insurance-friendly cars" />
                            <Feature text="Checks on dealer reputation and stock history" />
                            <Feature text="Direct connection to a trusted dealer" />
                            <Feature text="Support until you buy your car" />
                        </ul>
                    </div>

                    {/* Right: Guarantee Box */}
                    <div className="bg-background-alt p-10 rounded-2xl text-center border-2 border-border shadow-sm">
                        <h3 className="text-xl font-semibold text-text-primary mb-4">Our Money-back Guarantee</h3>
                        <p className="text-sm text-text-secondary leading-relaxed mb-6">
                            We're confident we can find you a great car. If we can't find a suitable match within 30 days,
                            or if the dealer we connect you with doesn't work out, we'll refund your fee in full. No questions asked.
                        </p>
                        <div className="text-4xl font-bold text-primary">£49</div>
                        <p className="text-xs text-text-tertiary mt-2">one-time fee</p>
                    </div>
                </div>

                <p className="text-center mt-8 text-sm text-text-tertiary italic">
                    * Refunds processed within 5-10 business days.
                </p>
            </div>
        </section>
    );
}

function Feature({ text }: { text: string }) {
    return (
        <li className="flex items-start gap-2.5 text-sm text-text-secondary">
            <span className="text-green-500 font-bold text-lg leading-none mt-[1px]">✓</span>
            <span>{text}</span>
        </li>
    );
}
