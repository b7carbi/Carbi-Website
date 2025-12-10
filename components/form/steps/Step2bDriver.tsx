import { useState } from 'react';
import OptionButton from '@/components/ui/OptionButton';
import Modal from '@/components/ui/Modal';
import { MatchRequestFormData } from '@/types/form';

interface Step2bProps {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step2bDriver({ formData, updateFormData }: Step2bProps) {
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const options = [
        { value: 'young_driver', label: 'The young driver', description: 'Insurance groups 1-10 only' },
        { value: 'older_driver', label: 'Someone older', description: 'Insurance groups 1-16 available' },
        { value: 'not_sure', label: 'Not sure yet', description: "We'll find a car in both categories" }
    ] as const;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Who will be the main driver on the insurance policy?</h2>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-lg text-slate-500">This changes what car we recommend.</p>
                <button
                    type="button"
                    onClick={() => setIsHelpOpen(true)}
                    className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center gap-1"
                >
                    <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">?</span>
                    Help me choose
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {options.map(option => (
                    <OptionButton
                        key={option.value}
                        label={option.label}
                        selected={formData.main_driver_type === option.value}
                        onClick={() => updateFormData({ main_driver_type: option.value })}
                    />
                ))}
            </div>

            <Modal
                isOpen={isHelpOpen}
                onClose={() => setIsHelpOpen(false)}
                title="Who will be the main driver?"
                subtitle="These are the pros and cons."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Young Driver */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-slate-800 text-lg mb-1">The young driver</h4>
                        <span className="text-primary font-semibold text-sm block mb-4">Insurance groups 1-10</span>

                        <div className="mb-4">
                            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pros</h5>
                            <ul className="space-y-2">
                                <li className="text-sm text-slate-600 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-green-500 before:font-bold">Builds no-claims bonus faster</li>
                                <li className="text-sm text-slate-600 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-green-500 before:font-bold">Full responsibility for their car</li>
                                <li className="text-sm text-slate-600 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-green-500 before:font-bold">Best if they're the only driver</li>
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cons</h5>
                            <ul className="space-y-2">
                                <li className="text-sm text-slate-600 pl-6 relative before:content-['✗'] before:absolute before:left-0 before:text-red-500 before:font-bold">Insurance is still expensive</li>
                                <li className="text-sm text-slate-600 pl-6 relative before:content-['✗'] before:absolute before:left-0 before:text-red-500 before:font-bold">Small cars only</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Typical Cars</h5>
                            <div className="bg-white p-3 rounded-lg border border-slate-200 text-sm text-slate-500 space-y-1">
                                <span className="block">Fiat 500</span>
                                <span className="block">Toyota Aygo</span>
                                <span className="block">Volkswagen UP!</span>
                            </div>
                        </div>
                    </div>

                    {/* Older Driver */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-slate-800 text-lg mb-1">Someone older</h4>
                        <span className="text-primary font-semibold text-sm block mb-4">Insurance groups 1-16</span>

                        <div className="mb-4">
                            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pros</h5>
                            <ul className="space-y-2">
                                <li className="text-sm text-slate-600 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-green-500 before:font-bold">Bigger cars available</li>
                                <li className="text-sm text-slate-600 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-green-500 before:font-bold">Cheaper in the short term</li>
                                <li className="text-sm text-slate-600 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-green-500 before:font-bold">Best when sharing the car</li>
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cons</h5>
                            <ul className="space-y-2">
                                <li className="text-sm text-slate-600 pl-6 relative before:content-['✗'] before:absolute before:left-0 before:text-red-500 before:font-bold">Main driver uses the car more</li>
                                <li className="text-sm text-slate-600 pl-6 relative before:content-['✗'] before:absolute before:left-0 before:text-red-500 before:font-bold">Doesn't build no-claims bonus</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Typical Cars</h5>
                            <div className="bg-white p-3 rounded-lg border border-slate-200 text-sm text-slate-500 space-y-1">
                                <span className="block">VW Golf (1.0)</span>
                                <span className="block">Ford Focus (1.0)</span>
                                <span className="block">Skoda Octavia (1.6)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                    <button
                        onClick={() => setIsHelpOpen(false)}
                        className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark shadow-sm hover:shadow-md transition-all text-lg"
                    >
                        Got it
                    </button>
                </div>
            </Modal>
        </div>
    );
}
