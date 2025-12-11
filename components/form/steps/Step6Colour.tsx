import OptionButton from '@/components/ui/OptionButton';
import { MatchRequestFormData } from '@/types/form';

interface Step6Props {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step6Colour({ formData, updateFormData }: Step6Props) {
    const colours = [
        'Black', 'White', 'Silver', 'Grey', 'Blue', 'Red', 'Green',
        'Gold', 'Orange', 'Brown', 'Purple', 'Yellow', 'Other'
    ];

    const toggleColour = (colour: string) => {
        const current = formData.preferred_colours;
        const updated = current.includes(colour)
            ? current.filter(c => c !== colour)
            : [...current, colour];

        updateFormData({ preferred_colours: updated });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">What colour car?</h2>
            <p className="text-lg text-slate-500 mb-8">Pick your preferred colours.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {colours.map(colour => {
                    const isSelected = formData.preferred_colours.includes(colour);
                    const dotColor = {
                        'Black': '#000000',
                        'White': '#ffffff',
                        'Silver': '#C0C0C0',
                        'Grey': '#808080',
                        'Blue': '#3B82F6',
                        'Red': '#EF4444',
                        'Green': '#22C55E',
                        'Gold': '#D4AF37',
                        'Orange': '#F97316',
                        'Brown': '#A52A2A',
                        'Purple': '#A855F7',
                        'Yellow': '#FDE047',
                        'Other': 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)'
                    }[colour] || '#ccc';

                    return (
                        <button
                            key={colour}
                            type="button"
                            onClick={() => toggleColour(colour)}
                            className={`
                                relative flex items-center px-4 py-4 rounded-xl border-2 text-base transition-all duration-200
                                ${isSelected
                                    ? 'bg-sky-50 border-primary text-slate-800 shadow-sm'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                                }
                            `}
                        >
                            <span
                                className="w-6 h-6 rounded-full border border-slate-200 shadow-sm shrink-0 mr-3"
                                style={{ background: dotColor }}
                            />
                            <span className="flex-1 text-center pr-6">
                                {colour}
                            </span>
                        </button>
                    );
                })}
            </div>

            {formData.preferred_colours.includes('Other') && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-sm font-semibold text-slate-500 mb-2">What colour?</label>
                    <input
                        type="text"
                        value={formData.custom_colour || ''}
                        onChange={(e) => updateFormData({ custom_colour: e.target.value })}
                        placeholder="e.g., Burgundy, Teal, Bronze"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-medium text-slate-700 focus:border-primary focus:outline-none transition-colors"
                    />
                </div>
            )}
        </div>
    );
}
