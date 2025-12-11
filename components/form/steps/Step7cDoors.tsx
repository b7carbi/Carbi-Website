import OptionButton from '@/components/ui/OptionButton';
import { MatchRequestFormData } from '@/types/form';

interface Step7cProps {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step7cDoors({ formData, updateFormData }: Step7cProps) {
    const options = ['2 doors', '3 doors', '4 doors', '5 doors'];

    const toggleDoor = (option: string) => {
        // Strip " doors" if needed for storage relative to legacy? 
        // Legacy: .replace(' doors', '') -> stores "2", "3".
        // Types/Form uses string[]. Let's stick to full string "2 doors" for now, or match legacy "2".
        // Let's store "2", "3" etc. to be clean as per legacy logic.
        const val = option.replace(' doors', '');

        const current = formData.number_of_doors;
        const updated = current.includes(val)
            ? current.filter(d => d !== val)
            : [...current, val];

        updateFormData({ number_of_doors: updated });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" data-testid="step-7c-doors">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2" data-testid="step-7c-doors-title">How many doors?</h2>
            <p className="text-lg text-slate-500 mb-8" data-testid="step-7c-doors-description">Select all you'd be happy with.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3" data-testid="step-7c-doors-options-container">
                {options.map(option => {
                    const val = option.replace(' doors', '');
                    return (
                        <OptionButton
                            key={option}
                            label={option}
                            selected={formData.number_of_doors.includes(val)}
                            onClick={() => toggleDoor(option)}
                            data-testid={`doors-option-${val}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
