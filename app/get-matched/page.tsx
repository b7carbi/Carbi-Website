import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GetMatchedForm from "@/components/form/GetMatchedForm";

export default function GetMatchedPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans text-text-primary bg-background-alt">
            <Header />

            <main className="flex-grow py-10 md:py-20">
                <div className="container mx-auto px-5">
                    <GetMatchedForm />
                </div>
            </main>

            <Footer />
        </div>
    );
}
