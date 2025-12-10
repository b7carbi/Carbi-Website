import { MatchRequestFormData } from '@/types/form';
import { useState } from 'react';

interface Step11Props {
    formData: MatchRequestFormData;
    onPaymentSuccess: (paymentIntentId: string) => void;
}

export default function Step11Payment({ formData, onPaymentSuccess }: Step11Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFakePayment = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Return a fake ID
        onPaymentSuccess('pi_fake_' + Math.random().toString(36).substring(7));
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Review and checkout</h2>
            <p className="text-lg text-slate-500 mb-8">Ready to find your perfect car?</p>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-200">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Summary</h3>
                        <p className="text-sm text-slate-500">One-time car finding fee</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-primary">£49</div>
                    </div>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                    <p>✓ Personalized car search based on your criteria</p>
                    <p>✓ Negotiation with dealers on your behalf</p>
                    <p>✓ Money-back guarantee if we can't help</p>
                </div>
            </div>

            <button
                onClick={handleFakePayment}
                disabled={isSubmitting}
                className="w-full py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
                {isSubmitting ? (
                    <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Processing...
                    </span>
                ) : (
                    'Complete Request'
                )}
            </button>

            <p className="text-xs text-slate-400 mt-4 text-center">
                Check this box to agree to our terms & conditions. (Placeholder)
            </p>
        </div>
    );
}
