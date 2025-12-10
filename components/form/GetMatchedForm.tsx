"use client";
// ... (imports)
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import { MatchRequestFormData, INITIAL_FORM_DATA } from '@/types/form';
import Step1Features from './steps/Step1Features';
import Step2Dealbreakers from './steps/Step2Dealbreakers';
import Step2aTransmission from './steps/Step2aTransmission';
import Step2bDriver from './steps/Step2bDriver';
import Step3Budget from './steps/Step3Budget';
import Step4Brands from './steps/Step4Brands';
import Step5Favourite from './steps/Step5Favourite';
import Step6Colour from './steps/Step6Colour';
import Step7Mileage from './steps/Step7Mileage';
import Step7bEngine from './steps/Step7bEngine';
import Step7cDoors from './steps/Step7cDoors';
import Step8Location from './steps/Step8Location';
import Step9Notes from './steps/Step9Notes';
import Step10Contact from './steps/Step10Contact';
import Step11Payment from './steps/Step11Payment';

export default function GetMatchedForm() {
    // 'step' tracks how many steps constitute the "unlocked" flow
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<MatchRequestFormData>(INITIAL_FORM_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // const bottomRef = useRef<HTMLDivElement>(null); // Removed bottom ref

    const updateFormData = (updates: Partial<MatchRequestFormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));
    };

    const nextStep = () => {
        // Validation for Step 1
        if (step === 1) {
            if (formData.important_features.length === 0) {
                setError("Please select at least one feature.");
                return;
            }
        }

        setError(null);

        let next = step + 1;

        // Skip logic helper
        const shouldSkip = (s: number) => {
            if (s === 2) return formData.important_features.length <= 1; // Dealbreakers
            if (s === 7) return (!formData.brand_preference || formData.brand_preference === 'dont_mind') && formData.selected_brands.length === 0;    // Favourite (Skip if don't mind or no brands)
            if (s === 8) return !formData.important_features.includes('Colour');
            if (s === 9) return !formData.important_features.includes('Low mileage');
            if (s === 10) return !formData.important_features.includes('Engine size');
            if (s === 11) return !formData.important_features.includes('Number of doors');
            return false;
        };

        // Advance while current 'next' should be skipped
        while (shouldSkip(next)) {
            next++;
        }

        setStep(next);
    };

    // Effect to scroll to the NEW step when it appears
    useEffect(() => {
        if (step > 1) {
            // Small timeout to allow render
            setTimeout(() => {
                const el = document.getElementById(`step-${step}`);
                if (el) {
                    const yOffset = -20; // Scroll a bit above to show previous context or just ensure header is visible
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });

                    // Fallback to scrollIntoView if manual calculation is weird, but usually yOffset is better
                    // el.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
                }
            }, 100);
        }
    }, [step]);

    const handlePaymentSuccess = async (paymentId: string) => {
        // Final submission
        setIsSubmitting(true);
        setError(null);
        try {
            const { error } = await supabase
                .from('match_requests')
                .insert([{ ...formData, payment_intent_id: paymentId, status: 'paid' }]);

            if (error) throw error;

            alert("Success! We'll be in touch.");
            // Redirect or show success state
        } catch (e: any) {
            setError(e.message);
            setIsSubmitting(false); // Only stop submitting on error
        }
    };

    // Helper to render the "Next" button for a specific step section
    const RenderNextButton = ({ onClick, disabled = false, isLast = false }: { onClick: () => void, disabled?: boolean, isLast?: boolean }) => (
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center w-full">
            {!isLast ? (
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className="w-full py-3 md:py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark hover:shadow-[0_4px_15px_rgba(14,165,233,0.3)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                    Next
                </button>
            ) : null}
        </div>
    );

    // Wrapper for steps to reduce repetition and manage ID/styling
    const StepWrapper = ({ children, stepNum }: { children: React.ReactNode, stepNum: number }) => (
        <div id={`step-${stepNum}`} className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 animate-in fade-in slide-in-from-bottom-8 duration-700 mb-6">
            {children}
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-20">
            {/* Step 1 */}
            <StepWrapper stepNum={1}>
                <Step1Features formData={formData} updateFormData={updateFormData} />
                {step === 1 && <RenderNextButton onClick={nextStep} disabled={formData.important_features.length === 0} />}
            </StepWrapper>

            {/* Step 2: Dealbreakers - Only show if > 1 feature selected */}
            {step >= 2 && formData.important_features.length > 1 && (
                <StepWrapper stepNum={2}>
                    <Step2Dealbreakers formData={formData} updateFormData={updateFormData} />
                    {step === 2 && <RenderNextButton onClick={nextStep} />}
                </StepWrapper>
            )}

            {/* Step 3 (2a) */}
            {step >= 3 && (
                <StepWrapper stepNum={3}>
                    <Step2aTransmission formData={formData} updateFormData={updateFormData} />
                    {step === 3 && <RenderNextButton onClick={nextStep} disabled={!formData.transmission_type} />}
                </StepWrapper>
            )}

            {/* Step 4 (2b) */}
            {step >= 4 && (
                <StepWrapper stepNum={4}>
                    <Step2bDriver formData={formData} updateFormData={updateFormData} />
                    {step === 4 && <RenderNextButton onClick={nextStep} disabled={!formData.main_driver_type} />}
                </StepWrapper>
            )}

            {/* Step 5 (3 Budget) */}
            {step >= 5 && (
                <StepWrapper stepNum={5}>
                    <Step3Budget formData={formData} updateFormData={updateFormData} />
                    {step === 5 && <RenderNextButton onClick={nextStep} />}
                </StepWrapper>
            )}

            {/* Step 6 (4 Brands) */}
            {step >= 6 && (
                <StepWrapper stepNum={6}>
                    <Step4Brands formData={formData} updateFormData={updateFormData} />
                    {step === 6 && <RenderNextButton
                        onClick={nextStep}
                        disabled={formData.brand_preference === 'specific' && formData.selected_brands.length === 0}
                    />}
                </StepWrapper>
            )}

            {/* Step 7 (5 Favourite - Conditional) */}
            {step >= 7 && formData.selected_brands.length > 1 && (
                <StepWrapper stepNum={7}>
                    <Step5Favourite formData={formData} updateFormData={updateFormData} />
                    {step === 7 && <RenderNextButton
                        onClick={nextStep}
                        disabled={!formData.favourite_brand}
                    />}
                </StepWrapper>
            )}

            {/* Step 8 (6 Colour) */}
            {step >= 8 && formData.important_features.includes('Colour') && (
                <StepWrapper stepNum={8}>
                    <Step6Colour formData={formData} updateFormData={updateFormData} />
                    {step === 8 && <RenderNextButton
                        onClick={nextStep}
                        disabled={
                            formData.preferred_colours.length === 0 ||
                            (formData.preferred_colours.includes('Other') && !formData.custom_colour)
                        }
                    />}
                </StepWrapper>
            )}

            {/* Step 9 (7 Mileage) */}
            {step >= 9 && formData.important_features.includes('Low mileage') && (
                <StepWrapper stepNum={9}>
                    <Step7Mileage formData={formData} updateFormData={updateFormData} />
                    {step === 9 && <RenderNextButton onClick={nextStep} />}
                </StepWrapper>
            )}

            {/* Step 10 (7b Engine) */}
            {step >= 10 && formData.important_features.includes('Engine size') && (
                <StepWrapper stepNum={10}>
                    <Step7bEngine formData={formData} updateFormData={updateFormData} />
                    {step === 10 && <RenderNextButton onClick={nextStep} />}
                </StepWrapper>
            )}

            {/* Step 11 (7c Doors) */}
            {step >= 11 && formData.important_features.includes('Number of doors') && (
                <StepWrapper stepNum={11}>
                    <Step7cDoors formData={formData} updateFormData={updateFormData} />
                    {step === 11 && <RenderNextButton
                        onClick={nextStep}
                        disabled={formData.number_of_doors.length === 0}
                    />}
                </StepWrapper>
            )}

            {/* Step 12 (8 Location) */}
            {step >= 12 && (
                <StepWrapper stepNum={12}>
                    <Step8Location formData={formData} updateFormData={updateFormData} />
                    {step === 12 && <RenderNextButton
                        onClick={nextStep}
                        disabled={!formData.postcode || formData.postcode.length < 3}
                    />}
                </StepWrapper>
            )}

            {/* Step 13 (9 Notes) */}
            {step >= 13 && (
                <StepWrapper stepNum={13}>
                    <Step9Notes formData={formData} updateFormData={updateFormData} />
                    {step === 13 && <RenderNextButton onClick={nextStep} />}
                </StepWrapper>
            )}

            {/* Step 14 (10 Contact) */}
            {step >= 14 && (
                <StepWrapper stepNum={14}>
                    <Step10Contact formData={formData} updateFormData={updateFormData} />
                    {step === 14 && <RenderNextButton
                        onClick={nextStep}
                        disabled={
                            !formData.first_name ||
                            !formData.last_name ||
                            formData.contact_preferences.length === 0 ||
                            (formData.contact_preferences.includes('Email') && !formData.email) ||
                            ((formData.contact_preferences.includes('Text') || formData.contact_preferences.includes('Phone Call')) && !formData.phone)
                        }
                    />}
                </StepWrapper>
            )}

            {/* Step 15 (11 Payment / Confirmation) */}
            {step >= 15 && (
                <StepWrapper stepNum={15}>
                    <Step11Payment formData={formData} onPaymentSuccess={handlePaymentSuccess} />
                    {/* Payment step has its own submit button */}
                </StepWrapper>
            )}

            {error && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-red-500 text-white rounded-full shadow-lg font-medium animate-in slide-in-from-bottom-4 z-50">
                    {error}
                </div>
            )}

            {/* Debug Data & Clear Option */}
            <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
                <button
                    onClick={() => {
                        if (confirm('Are you sure you want to clear all data?')) {
                            setFormData(INITIAL_FORM_DATA);
                            setStep(1);
                            setError(null);
                        }
                    }}
                    className="text-sm text-red-500 hover:text-red-600 hover:underline font-medium"
                >
                    Clear Data & Restart
                </button>
            </div>
            {/* <div ref={bottomRef} /> */}
        </div>
    );
}
