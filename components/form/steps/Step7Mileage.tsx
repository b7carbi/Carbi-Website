import Slider from '@/components/ui/Slider';
import { MatchRequestFormData } from '@/types/form';

interface Step7Props {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step7Mileage({ formData, updateFormData }: Step7Props) {
    const handleSliderChange = (value: number[]) => {
        updateFormData({ max_mileage: value[0] });
    };

    const formatMileage = (val: number) => `${val.toLocaleString()} miles`;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Maximum mileage?</h2>
            <p className="text-lg text-slate-500 mb-10">Tell us the highest mileage you'd want on your car.</p>

            <div className="mb-12 text-center">
                <div className="text-4xl font-bold text-slate-800 mb-2">
                    {formatMileage(formData.max_mileage || 50000)}
                </div>
            </div>

            <div className="px-4">
                <Slider
                    min={10000}
                    max={150000}
                    step={5000}
                    value={[formData.max_mileage || 50000]}
                    onValueChange={handleSliderChange}
                    formatLabel={formatMileage}
                    data-testid="mileage-slider"
                />
            </div>
        </div>
    );
}
