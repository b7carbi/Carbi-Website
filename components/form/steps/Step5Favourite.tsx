import OptionButton from '@/components/ui/OptionButton';
import { MatchRequestFormData } from '@/types/form';

interface Step5Props {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step5Favourite({ formData, updateFormData }: Step5Props) {
    const options = formData.selected_brands;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Do you have a favourite?</h2>
            <p className="text-lg text-slate-500 mb-8">Pick your top choice.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {options.map(brand => (
                    <OptionButton
                        key={brand}
                        label={brand}
                        selected={formData.favourite_brand === brand}
                        onClick={() => {
                            // Toggle off if already selected? Or just select.
                            // Usually radio behavior implies just select.
                            // But if they want to unselect, they can?
                            // Legacy was radio group.
                            // Let's allow toggling off or switching.
                            const newValue = formData.favourite_brand === brand ? undefined : brand;
                            updateFormData({ favourite_brand: newValue });
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
