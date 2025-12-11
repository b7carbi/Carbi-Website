import { FEATURES } from '@/constants/form-options';
import OptionButton from '@/components/ui/OptionButton';
import { MatchRequestFormData } from '@/types/form';

interface Step1Props {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step1Features({ formData, updateFormData }: Step1Props) {
    const toggleFeature = (feature: string) => {
        const current = formData.important_features;
        const updated = current.includes(feature)
            ? current.filter(f => f !== feature)
            : [...current, feature];

        updateFormData({ important_features: updated });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">What's important to you?</h2>
            <p className="text-lg text-slate-500 mb-8">Select all that apply.</p>

            <div className="space-y-8">
                {Object.entries(FEATURES).map(([category, options]) => (
                    <div key={category}>
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">{category}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {options.map(feature => (
                                <OptionButton
                                    key={feature}
                                    label={feature}
                                    selected={formData.important_features.includes(feature)}
                                    onClick={() => toggleFeature(feature)}
                                    data-testid={`feature-option-${feature.replace(/\s+/g, '-').toLowerCase()}`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
