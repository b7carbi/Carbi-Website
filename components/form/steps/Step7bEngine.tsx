import Slider from '@/components/ui/Slider';
import { MatchRequestFormData } from '@/types/form';

interface Step7bProps {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step7bEngine({ formData, updateFormData }: Step7bProps) {
    const min = formData.engine_size_min || 1.0;
    const max = formData.engine_size_max || 1.6;

    const handleSliderChange = (value: number[]) => {
        updateFormData({
            engine_size_min: value[0],
            engine_size_max: value[1]
        });
    };

    const formatEngine = (val: number) => `${val.toFixed(1)}L`;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">What engine size?</h2>
            <p className="text-lg text-slate-500 mb-10">Set the minimum and maximum.</p>

            <div className="mb-12 text-center">
                <div className="text-4xl font-bold text-slate-800 mb-2">
                    {formatEngine(min)} - {formatEngine(max)}
                </div>
            </div>

            <div className="px-4">
                <Slider
                    min={0.6}
                    max={2.0}
                    step={0.1}
                    value={[min, max]}
                    onValueChange={handleSliderChange}
                    formatLabel={formatEngine}
                    data-testid="engine-slider"
                />
            </div>
        </div>
    );
}
