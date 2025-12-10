import OptionButton from '@/components/ui/OptionButton';
import { MatchRequestFormData } from '@/types/form';

interface Step2aProps {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step2aTransmission({ formData, updateFormData }: Step2aProps) {
    const options = [
        { value: 'manual', label: 'Manual' },
        { value: 'automatic', label: 'Automatic' },
        { value: 'dont_mind', label: "Don't mind" }
    ] as const;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Manual or automatic?</h2>
            <p className="text-lg text-slate-500 mb-8">Choose the transmission type you'd prefer.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {options.map(option => (
                    <OptionButton
                        key={option.value}
                        label={option.label}
                        selected={formData.transmission_type === option.value}
                        onClick={() => updateFormData({ transmission_type: option.value })}
                    />
                ))}
            </div>
        </div>
    );
}
