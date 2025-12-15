import { MatchRequestFormData, PlanType } from '@/types/form';
import { useState } from 'react';

interface Step11Props {
    formData: MatchRequestFormData;
    onPaymentSuccess: (paymentIntentId: string, plan: PlanType, amount: number) => void;
}

export default function Step11Payment({ formData, onPaymentSuccess }: Step11Props) {
    const [isSubmitting, setIsSubmitting] = useState<PlanType | null>(null);

    const handlePlanSelect = async (plan: PlanType) => {
        setIsSubmitting(plan);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const amoutMap: Record<PlanType, number> = {
            'basic': 0,
            'weekly': 4900,
            'instant': 9900
        };

        // For now, passing a fake ID for all, maybe differentiate based on plan later if needed
        // If it's free, we might handle it differently in the backend, but adhering to the interface:
        onPaymentSuccess(
            'pi_fake_' + plan + '_' + Math.random().toString(36).substring(7),
            plan,
            amoutMap[plan]
        );
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Choose your plan</h2>
            <p className="text-lg text-slate-500 mb-10">Pick the level that suits you best.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Basic / Free Plan */}
                <div
                    onClick={() => handlePlanSelect('basic')}
                    className={`
                        relative bg-slate-50 rounded-2xl border-2 border-slate-200 overflow-hidden 
                        transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group flex flex-col
                        ${isSubmitting === 'basic' ? 'ring-4 ring-slate-400/20 border-slate-400' : 'hover:border-slate-400'}
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

                            <div className="mt-auto pt-8">
                                <button disabled={!!isSubmitting} className="w-full py-2.5 rounded-xl border-2 border-slate-400 text-slate-600 font-medium group-hover:bg-slate-500 group-hover:text-white transition-colors">
                                    {isSubmitting === 'basic' ? 'Processing...' : 'Start for free'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weekly Matches Plan */}
                <div
                    onClick={() => handlePlanSelect('weekly')}
                    className={`
                        relative bg-white rounded-2xl border-2 border-slate-200 overflow-hidden 
                        transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group flex flex-col
                        ${isSubmitting === 'weekly' ? 'ring-4 ring-primary/20 border-primary' : 'hover:border-primary/50'}
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

                            <div className="mt-auto pt-8">
                                <button disabled={!!isSubmitting} className="w-full py-2.5 rounded-xl border-2 border-primary text-primary font-medium group-hover:bg-primary group-hover:text-white transition-colors">
                                    {isSubmitting === 'weekly' ? 'Processing...' : 'Get weekly matches'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instant Alerts Plan */}
                <div
                    onClick={() => handlePlanSelect('instant')}
                    className={`
                        relative bg-white rounded-2xl border-2 border-slate-200 overflow-hidden 
                        transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group flex flex-col
                        ${isSubmitting === 'instant' ? 'ring-4 ring-primary/20 border-primary' : 'hover:border-primary/50'}
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

                            <div className="mt-auto pt-8">
                                <button disabled={!!isSubmitting} className="w-full py-2.5 rounded-xl border-2 border-primary text-primary font-medium group-hover:bg-primary group-hover:text-white transition-colors">
                                    {isSubmitting === 'instant' ? 'Processing...' : 'Get instant alerts'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-xs text-slate-400 mt-8 text-center">
                By selecting a plan, you agree to our terms & conditions.
            </p>
        </div>
    );
}
