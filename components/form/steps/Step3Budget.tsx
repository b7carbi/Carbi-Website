import Slider from '@/components/ui/Slider';
import { MatchRequestFormData } from '@/types/form';

interface Step3Props {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step3Budget({ formData, updateFormData }: Step3Props) {
    const handleSliderChange = (value: number[]) => {
        // Validation handled by Slider onValueChange, but explicit here too
        updateFormData({
            budget_min: value[0],
            budget_max: value[1]
        });
    };

    const handleMinChange = (val: number) => {
        let newMin = val;
        // Don't let min exceed max - 100
        if (newMin > formData.budget_max - 100) {
            newMin = formData.budget_max - 100;
        }
        updateFormData({ budget_min: newMin });
    };

    const handleMaxChange = (val: number) => {
        let newMax = val;
        // Don't let max go below min + 100
        if (newMax < formData.budget_min + 100) {
            newMax = formData.budget_min + 100;
        }
        updateFormData({ budget_max: newMax });
    };

    const formatCurrency = (val: number) => `£${val.toLocaleString()}`;

    // Ensure reasonable bounds
    const MIN_LIMIT = 1000;
    const MAX_LIMIT = 20000;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">What's your budget?</h2>
            <p className="text-lg text-slate-500 mb-10">Set a realistic range for your first car.</p>

            <div className="mb-12 text-center">
                <div className="text-4xl font-bold text-slate-800 mb-2">
                    {formatCurrency(formData.budget_min)} - {formatCurrency(formData.budget_max)}
                </div>
            </div>

            <div className="px-4 mb-12">
                <Slider
                    min={MIN_LIMIT}
                    max={MAX_LIMIT}
                    step={100}
                    value={[formData.budget_min, formData.budget_max]}
                    onValueChange={handleSliderChange}
                    formatLabel={formatCurrency}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-500 mb-2">Minimum</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">£</span>
                        <input
                            type="number"
                            value={formData.budget_min}
                            onChange={(e) => handleMinChange(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 focus:border-primary focus:outline-none transition-colors"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-500 mb-2">Maximum</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">£</span>
                        <input
                            type="number"
                            value={formData.budget_max}
                            onChange={(e) => handleMaxChange(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 focus:border-primary focus:outline-none transition-colors"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
