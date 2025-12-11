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

// Helper to render the "Next" button for a specific step section
// Always renders to prevent layout shift when step changes
const RenderNextButton = ({ onClick, disabled = false, isLast = false }: { onClick: () => void, disabled?: boolean, isLast?: boolean }) => (
    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center w-full">
        {!isLast && (
            <button
                onClick={onClick}
                disabled={disabled}
                className="w-full py-3 md:py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark hover:shadow-[0_4px_15px_rgba(14,165,233,0.3)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
                Next
            </button>
        )}
    </div>
);

// Wrapper for steps to reduce repetition and manage ID/styling
const StepWrapper = ({ children, stepNum, 'data-testid': testId }: { children: React.ReactNode, stepNum: number, 'data-testid'?: string }) => (
    <div id={`step-${stepNum}`} data-testid={testId} className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 animate-in fade-in duration-500 mb-6 scroll-mt-20">
        {children}
    </div>
);

export default function GetMatchedForm() {
    // 'activeStep' tracks the current step the user is interacting with (editing input or viewing)
    const [activeStep, setActiveStep] = useState(1);
    // 'maxStep' tracks the furthest step validly reached (controls visibility of future sections)
    const [maxStep, setMaxStep] = useState(1);

    const [formData, setFormData] = useState<MatchRequestFormData>(INITIAL_FORM_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scrollPositionRef = useRef<number>(0);

    // Helper to create a specific updater for each step
    // This ensures that when a user interacts with a step, it becomes the "Active" step
    const createStepUpdater = (stepNum: number) => (updates: Partial<MatchRequestFormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));
        // If we are editing a previous step, make it active (enabling its Next button)
        if (activeStep !== stepNum) {
            setActiveStep(stepNum);
        }
    };

    const nextStep = (fromStep: number) => {
        // Validation for Step 1
        if (fromStep === 1) {
            if (formData.important_features.length === 0) {
                setError("Please select at least one feature.");
                return;
            }
        }

        setError(null);

        let next = fromStep + 1;

        // Skip logic helper
        const shouldSkip = (s: number) => {
            if (s === 2) return formData.important_features.length <= 1; // Dealbreakers
            if (s === 7) return formData.selected_brands.length <= 1;    // Favourite (Skip if 0 or 1 brand selected)
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

        // Save current scroll position before changing step
        scrollPositionRef.current = window.pageYOffset;

        // Advance active step
        setActiveStep(next);
        // Update high-water mark if we progressed further
        if (next > maxStep) {
            setMaxStep(next);
        }
    };

    // Effect to scroll to the active step
    useEffect(() => {
        if (activeStep > 1) {
            // Immediately restore the saved scroll position to prevent browser auto-scroll
            window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' });

            // Longer delay so user can see the section appear below before scroll starts
            setTimeout(() => {
                const el = document.getElementById(`step-${activeStep}`);
                if (el) {
                    const headerHeight = 70; // Sticky header height
                    const elementPosition = el.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 150);
        }
    }, [activeStep]);

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
        } catch (e: any) {
            setError(e.message);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-20">
            {/* Step 1 */}
            <StepWrapper stepNum={1}>
                <Step1Features formData={formData} updateFormData={createStepUpdater(1)} />
                <RenderNextButton
                    onClick={() => nextStep(1)}
                    disabled={activeStep !== 1 || formData.important_features.length === 0}
                />
            </StepWrapper>

            {/* Step 2: Dealbreakers */}
            {maxStep >= 2 && formData.important_features.length > 1 && (
                <StepWrapper stepNum={2}>
                    <Step2Dealbreakers formData={formData} updateFormData={createStepUpdater(2)} />
                    <RenderNextButton onClick={() => nextStep(2)} disabled={activeStep !== 2} />
                </StepWrapper>
            )}

            {/* Step 3 (2a) */}
            {maxStep >= 3 && (
                <StepWrapper stepNum={3}>
                    <Step2aTransmission formData={formData} updateFormData={createStepUpdater(3)} />
                    <RenderNextButton
                        onClick={() => nextStep(3)}
                        disabled={activeStep !== 3 || !formData.transmission_type}
                    />
                </StepWrapper>
            )}

            {/* Step 4 (2b) */}
            {maxStep >= 4 && (
                <StepWrapper stepNum={4}>
                    <Step2bDriver formData={formData} updateFormData={createStepUpdater(4)} />
                    <RenderNextButton
                        onClick={() => nextStep(4)}
                        disabled={activeStep !== 4 || !formData.main_driver_type}
                    />
                </StepWrapper>
            )}

            {/* Step 5 (3 Budget) */}
            {maxStep >= 5 && (
                <StepWrapper stepNum={5}>
                    <Step3Budget formData={formData} updateFormData={createStepUpdater(5)} />
                    <RenderNextButton onClick={() => nextStep(5)} disabled={activeStep !== 5} />
                </StepWrapper>
            )}

            {/* Step 6 (4 Brands) */}
            {maxStep >= 6 && (
                <StepWrapper stepNum={6}>
                    <Step4Brands formData={formData} updateFormData={createStepUpdater(6)} />
                    <RenderNextButton
                        onClick={() => nextStep(6)}
                        disabled={activeStep !== 6 || (formData.brand_preference === 'specific' && formData.selected_brands.length === 0)}
                    />
                </StepWrapper>
            )}

            {/* Step 7 (5 Favourite - Conditional) */}
            {maxStep >= 7 && formData.selected_brands.length > 1 && (
                <StepWrapper stepNum={7}>
                    <Step5Favourite formData={formData} updateFormData={createStepUpdater(7)} />
                    <RenderNextButton
                        onClick={() => nextStep(7)}
                        disabled={activeStep !== 7 || !formData.favourite_brand}
                    />
                </StepWrapper>
            )}

            {/* Step 8 (6 Colour) */}
            {maxStep >= 8 && formData.important_features.includes('Colour') && (
                <StepWrapper stepNum={8} data-testid="step-colour">
                    <Step6Colour formData={formData} updateFormData={createStepUpdater(8)} />
                    <RenderNextButton
                        onClick={() => nextStep(8)}
                        disabled={
                            activeStep !== 8 ||
                            formData.preferred_colours.length === 0 ||
                            (formData.preferred_colours.includes('Other') && !formData.custom_colour)
                        }
                    />
                </StepWrapper>
            )}

            {/* Step 9 (7 Mileage) */}
            {maxStep >= 9 && formData.important_features.includes('Low mileage') && (
                <StepWrapper stepNum={9} data-testid="step-mileage">
                    <Step7Mileage formData={formData} updateFormData={createStepUpdater(9)} />
                    <RenderNextButton onClick={() => nextStep(9)} disabled={activeStep !== 9} />
                </StepWrapper>
            )}

            {/* Step 10 (7b Engine) */}
            {maxStep >= 10 && formData.important_features.includes('Engine size') && (
                <StepWrapper stepNum={10} data-testid="step-engine">
                    <Step7bEngine formData={formData} updateFormData={createStepUpdater(10)} />
                    <RenderNextButton onClick={() => nextStep(10)} disabled={activeStep !== 10} />
                </StepWrapper>
            )}

            {/* Step 11 (7c Doors) */}
            {maxStep >= 11 && formData.important_features.includes('Number of doors') && (
                <StepWrapper stepNum={11} data-testid="step-doors">
                    <Step7cDoors formData={formData} updateFormData={createStepUpdater(11)} />
                    <RenderNextButton
                        onClick={() => nextStep(11)}
                        disabled={activeStep !== 11 || formData.number_of_doors.length === 0}
                    />
                </StepWrapper>
            )}

            {/* Step 12 (8 Location) */}
            {maxStep >= 12 && (
                <StepWrapper stepNum={12}>
                    <Step8Location formData={formData} updateFormData={createStepUpdater(12)} />
                    <RenderNextButton
                        onClick={() => nextStep(12)}
                        disabled={activeStep !== 12 || !formData.postcode || formData.postcode.length < 3}
                    />
                </StepWrapper>
            )}

            {/* Step 13 (9 Notes) */}
            {maxStep >= 13 && (
                <StepWrapper stepNum={13}>
                    <Step9Notes formData={formData} updateFormData={createStepUpdater(13)} />
                    <RenderNextButton onClick={() => nextStep(13)} disabled={activeStep !== 13} />
                </StepWrapper>
            )}

            {/* Step 14 (10 Contact) */}
            {maxStep >= 14 && (
                <StepWrapper stepNum={14}>
                    <Step10Contact formData={formData} updateFormData={createStepUpdater(14)} />
                    <RenderNextButton
                        onClick={() => nextStep(14)}
                        disabled={
                            activeStep !== 14 ||
                            !formData.first_name ||
                            !formData.last_name ||
                            formData.contact_preferences.length === 0 ||
                            (formData.contact_preferences.includes('Email') && !formData.email) ||
                            ((formData.contact_preferences.includes('Text') || formData.contact_preferences.includes('Phone Call')) && !formData.phone)
                        }
                    />
                </StepWrapper>
            )}

            {/* Step 15 (11 Payment / Confirmation) */}
            {maxStep >= 15 && (
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
                            setActiveStep(1);
                            setMaxStep(1);
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
