import { MatchRequestFormData, PlanType } from '@/types/form';
import { useState } from 'react';

interface Step11Props {
    formData: MatchRequestFormData;
    onPaymentSuccess: (paymentIntentId: string, plan: PlanType, amount: number) => void;
}

export default function Step11Payment({ formData, onPaymentSuccess }: Step11Props) {
    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

    const handlePlanSelect = (plan: PlanType) => {
        setSelectedPlan(plan);
        const amountMap: Record<PlanType, number> = {
            'basic': 0,
            'weekly': 4900,
            'instant': 9900
        };
        // Update parent with selection immediately or defer to submit
        // Since the interface is onPaymentSuccess, we should rename it or change its usage
        // But to keep it simple, we'll just track state here and expose a method or update parent
        // Actually, the parent (GetMatchedForm) expects onPaymentSuccess to be the final trigger.
        // We should change this component to just update the selection, and have a button to confirm.
    };

    const handleConfirm = async () => {
        if (!selectedPlan) return;

        const amountMap: Record<PlanType, number> = {
            'basic': 0,
            'weekly': 4900,
            'instant': 9900
        };

        // Trigger the parent's success handler
        onPaymentSuccess(
            'pi_fake_' + selectedPlan + '_' + Math.random().toString(36).substring(7),
            selectedPlan,
            amountMap[selectedPlan]
        );
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Choose your plan</h2>
            <p className="text-lg text-slate-500 mb-10">Pick the level that suits you best.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Basic / Free Plan */}
                <div
                    onClick={() => handlePlanSelect('basic')}
                    className={`
                        relative bg-slate-50 rounded-2xl border-2 overflow-hidden 
                        transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group flex flex-col
                        ${selectedPlan === 'basic' ? 'ring-4 ring-slate-400/20 border-slate-400 scale-[1.02]' : 'border-slate-200 hover:border-slate-400'}
                    `}
                >
                    <div className="bg-slate-400 py-3 px-4 text-center">
                        <h3 className="text-lg font-medium text-white">Basic</h3>
                    </div>
                    <div className="py-4 flex flex-col flex-1">
                        <div className="pl-4 pr-1">
                            <div className="mb-2">
                                <span className="text-4xl font-bold text-slate-400">Free</span>
                            </div>
                            <p className="text-slate-500 text-sm font-medium h-10">Single search & weekly email.</p>
                        </div>

                        <div className="px-4 flex flex-col flex-1">
                            <div className="w-full h-px bg-slate-200 mt-2 mb-6"></div>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm text-slate-500">
                                    <div className="min-w-[5px] h-1.5 w-1.5 rounded-full bg-slate-400 mt-1.5" />
                                    <span>Single search to find your best match right now</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-500">
                                    <div className="min-w-[5px] h-1.5 w-1.5 rounded-full bg-slate-400 mt-1.5" />
                                    <span>Weekly emails with young driver car buying help</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Weekly Matches Plan */}
                <div
                    onClick={() => handlePlanSelect('weekly')}
                    className={`
                        relative bg-white rounded-2xl border-2 overflow-hidden 
                        transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group flex flex-col
                        ${selectedPlan === 'weekly' ? 'ring-4 ring-primary/20 border-primary scale-[1.02]' : 'border-slate-200 hover:border-primary/50'}
                    `}
                >
                    <div className="bg-slate-700 py-3 px-4 text-center">
                        <h3 className="text-lg font-medium text-white">Weekly matches</h3>
                    </div>
                    <div className="py-4 flex flex-col flex-1">
                        <div className="pl-4 pr-1">
                            <div className="mb-2">
                                <span className="text-4xl font-bold text-primary">£49</span>
                            </div>
                            <p className="text-slate-600 text-sm font-medium h-10">Weekly search & 3 top cars.</p>
                        </div>

                        <div className="px-4 flex flex-col flex-1">
                            <div className="w-full h-px bg-slate-200 mt-2 mb-6"></div>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm text-slate-600">
                                    <div className="min-w-[5px] h-1.5 w-1.5 rounded-full bg-slate-800 mt-1.5" />
                                    <span>Everything in basic, plus:</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-600">
                                    <div className="min-w-[5px] h-1.5 w-1.5 rounded-full bg-slate-800 mt-1.5" />
                                    <span>Top 3 car matches delivered every week</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-600">
                                    <div className="min-w-[5px] h-1.5 w-1.5 rounded-full bg-slate-800 mt-1.5" />
                                    <span>Priority email support</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Instant Alerts Plan */}
                <div
                    onClick={() => handlePlanSelect('instant')}
                    className={`
                        relative bg-white rounded-2xl border-2 overflow-hidden 
                        transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group flex flex-col
                        ${selectedPlan === 'instant' ? 'ring-4 ring-primary/20 border-primary scale-[1.02]' : 'border-slate-200 hover:border-primary/50'}
                    `}
                >
                    <div className="bg-slate-700 py-3 px-4 text-center">
                        <h3 className="text-lg font-medium text-white">Instant alerts</h3>
                    </div>
                    <div className="py-4 flex flex-col flex-1">
                        <div className="pl-4 pr-1">
                            <div className="mb-2">
                                <span className="text-4xl font-bold text-primary">£99</span>
                            </div>
                            <p className="text-slate-600 text-sm font-medium h-10">Find out when cars go online.</p>
                        </div>

                        <div className="px-4 flex flex-col flex-1">
                            <div className="w-full h-px bg-slate-200 mt-2 mb-6"></div>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm text-slate-600">
                                    <div className="min-w-[5px] h-1.5 w-1.5 rounded-full bg-slate-800 mt-1.5" />
                                    <span>Everything in weekly matches, plus:</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-600">
                                    <div className="min-w-[5px] h-1.5 w-1.5 rounded-full bg-slate-800 mt-1.5" />
                                    <span>Instant alerts with priority access to new listings</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-600">
                                    <div className="min-w-[5px] h-1.5 w-1.5 rounded-full bg-slate-800 mt-1.5" />
                                    <span>WhatsApp + Email notifications</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-center w-full">
                <button
                    onClick={handleConfirm}
                    disabled={!selectedPlan}
                    className="w-full py-3 md:py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark hover:shadow-[0_4px_15px_rgba(14,165,233,0.3)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
                >
                    {selectedPlan ? `Complete Request (${selectedPlan === 'basic' ? 'Free' : selectedPlan === 'weekly' ? '£49' : '£99'})` : 'Select a plan'}
                </button>
            </div>

            <p className="text-xs text-slate-400 mt-8 text-center">
                By selecting a plan, you agree to our terms & conditions.
            </p>
        </div>
    );
}
