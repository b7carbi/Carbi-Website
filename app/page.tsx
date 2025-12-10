import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import WhyParents from "@/components/landing/WhyParents";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-text-primary bg-background">
      <Header />

      <main className="flex-grow">
        <Hero />
        <WhyParents />
        <HowItWorks />
        <Pricing />
        <FAQ />

        {/* Mid-page CTA - Kept inline as it's simple */}
        <section className="py-16 bg-white text-center border-t border-border">
          <div className="container mx-auto px-5">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Ready to find your first car?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Let us do the hard work for you.
            </p>
            <a
              href="/get-matched"
              className="inline-block bg-primary text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all hover:bg-primary-dark hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_20px_rgba(30,64,175,0.4)]"
            >
              Get matched
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
