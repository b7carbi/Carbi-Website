import { MatchRequestFormData } from '@/types/form';

interface Step9Props {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step9Notes({ formData, updateFormData }: Step9Props) {
    const maxLength = 200;
    const currentLength = (formData.additional_notes || '').length;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Anything else we should know?</h2>
            <p className="text-lg text-slate-500 mb-8">Optional, help us understand your needs better.</p>

            <div className="relative">
                <textarea
                    value={formData.additional_notes || ''}
                    onChange={(e) => updateFormData({ additional_notes: e.target.value })}
                    maxLength={maxLength}
                    placeholder="E.g., must have enough space for sports equipment, needs to be easy to park, prefer automatic..."
                    className="w-full p-4 border-2 border-slate-200 rounded-xl font-medium text-slate-700 focus:border-primary focus:outline-none transition-colors min-h-[150px] resize-y"
                />
                <div className={`text-right mt-2 text-sm font-medium ${currentLength >= maxLength ? 'text-red-500' : 'text-slate-400'}`}>
                    {currentLength}/{maxLength} characters
                </div>
            </div>
        </div>
    );
}
