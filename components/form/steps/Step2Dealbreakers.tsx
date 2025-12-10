import OptionButton from '@/components/ui/OptionButton';
import { MatchRequestFormData } from '@/types/form';

interface Step2Props {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step2Dealbreakers({ formData, updateFormData }: Step2Props) {
    const toggleDealbreaker = (feature: string) => {
        const current = formData.dealbreakers;
        const updated = current.includes(feature)
            ? current.filter(f => f !== feature)
            : [...current, feature];

        updateFormData({ dealbreakers: updated });
    };

    // Only show features selected in Step 1
    const options = formData.important_features;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">What are your dealbreakers?</h2>
            <p className="text-lg text-slate-500 mb-8">Pick what matters most.</p>

            {options.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-slate-500">You didn't select any important features in the previous step.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {options.map(feature => (
                        <OptionButton
                            key={feature}
                            label={feature}
                            selected={formData.dealbreakers.includes(feature)}
                            onClick={() => toggleDealbreaker(feature)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
