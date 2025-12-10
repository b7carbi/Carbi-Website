'use client';

import { useState } from 'react';

const FAQS = [
    {
        question: "How does the matching process work?",
        answer: "You fill out a simple questionnaire about your budget, location, and preferences. We then use our network and tools to find cars that specifically match young driver insurance criteria (Group 1-16) from reputable dealers. We filter out the junk so you don't have to."
    },
    {
        question: "Why do you charge £49?",
        answer: "We are an independent service, not a lead generator for dodgy dealers. The fee covers our time to manually verify checks on the car and dealer before we recommend them to you. It aligns our interests with yours - getting you a great car."
    },
    {
        question: "What if you don't find me a car?",
        answer: "If we can't find a car that meets your criteria within 30 days, we'll refund your £49 fee in full. We also offer a refund if the dealer we connect you with sells the car before you can see it."
    },
    {
        question: "Do you sell cars directly?",
        answer: "No, we are a matching service. We do not own or stock cars. We connect you with verified independent and franchise dealers who have the stock."
    },
    {
        question: "Is this only for young drivers?",
        answer: "Our expertise is specifically in low insurance group cars which are perfect for new drivers, but anyone looking for an affordable, reliable small car can use our service."
    }
];

export default function FAQ() {
    return (
        <section className="py-20 bg-background-alt">
            <div className="container mx-auto px-5 max-w-[800px]">
                <h2 className="text-3xl font-bold text-center text-text-primary mb-12">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-0 border-t border-border">
                    {FAQS.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`border-b border-border py-4 md:py-6 ${isOpen ? 'active' : ''}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left flex justify-between items-center text-lg font-semibold text-text-primary hover:text-primary transition-colors focus:outline-none focus-visible:outline-primary focus-visible:outline-offset-4"
                aria-expanded={isOpen}
            >
                <span>{question}</span>
                <span className={`text-xl text-primary transition-transform duration-300 ml-4 flex-shrink-0 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                </span>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pt-4' : 'max-h-0 opacity-0'}`}
                aria-hidden={!isOpen}
            >
                <p className="text-text-secondary leading-relaxed text-[1.05rem]">
                    {answer}
                </p>
            </div>
        </div>
    );
}
