import { test, expect } from '@playwright/test';

test.describe('Get Matched Form Conditional Logic', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the form page
        await page.goto('/get-matched');
        // Retrieve the page to ensure it's loaded
        await expect(page).toHaveURL(/.*get-matched/);
        // Wait for Step 1 to be visible
        await expect(page.locator('#step-1')).toBeVisible({ timeout: 10000 });
    });

    test('should verify conditional sections appear and simple validation works', async ({ page }) => {
        // --- Step 1: Features ---
        // Select conditional triggers
        const step1 = page.locator('#step-1');
        await step1.getByTestId('feature-option-colour').click();
        await step1.getByTestId('feature-option-low-mileage').click();
        await step1.getByTestId('feature-option-engine-size').click();
        await step1.getByTestId('feature-option-number-of-doors').click();

        // Click Next on Step 1
        await step1.getByRole('button', { name: 'Next' }).click();

        // --- Step 2: Dealbreakers ---
        const step2 = page.locator('#step-2');
        await expect(step2).toBeVisible();
        await step2.getByRole('button', { name: 'Next' }).click();

        // --- Step 3: Transmission ---
        const step3 = page.locator('#step-3'); // Step 3 logic mapped to stepNum=3 in GetMatchedForm (Step2aTransmission)
        await expect(step3).toBeVisible();
        await step3.getByRole('button', { name: 'Automatic' }).click();
        const next3 = step3.getByRole('button', { name: 'Next' });
        await expect(next3).toBeEnabled();
        await next3.click();

        // --- Step 4: Driver Type ---
        const step4 = page.locator('#step-4'); // Step2bDriver
        await expect(step4).toBeVisible();
        await step4.getByRole('button', { name: 'The young driver' }).click();
        const next4 = step4.getByRole('button', { name: 'Next' });
        await expect(next4).toBeEnabled();
        await next4.click();

        // --- Step 5: Budget ---
        const step5 = page.locator('#step-5'); // Step3Budget
        await expect(step5).toBeVisible();
        await step5.getByRole('button', { name: 'Next' }).click();

        // --- Step 6: Brands ---
        const step6 = page.locator('#step-6'); // Step4Brands
        await expect(step6).toBeVisible();
        await step6.getByRole('button', { name: /don['’]t mind/i }).first().click();
        await step6.getByRole('button', { name: 'Next' }).click();

        // Note: Step 7 is skipped because we selected "Don't mind"

        // --- Conditional Step 8: Colour ---
        const step8 = page.getByTestId('step-colour'); // or locator('#step-8')
        await expect(step8).toBeVisible();
        // Validation: Next should be disabled initially
        const next8 = step8.getByRole('button', { name: 'Next' });
        await expect(next8).toBeDisabled();

        // Select Black
        await step8.getByTestId('colour-option-black').click();
        await expect(next8).not.toBeDisabled();
        await next8.click();

        // --- Conditional Step 9: Mileage ---
        const step9 = page.getByTestId('step-mileage');
        await expect(step9).toBeVisible();

        await expect(page.getByTestId('mileage-slider')).toBeVisible();
        const next9 = step9.getByRole('button', { name: 'Next' });
        await next9.click();

        // --- Conditional Step 10: Engine ---
        const step10 = page.getByTestId('step-engine');
        await expect(step10).toBeVisible();

        await expect(page.getByTestId('engine-slider')).toBeVisible();
        const next10 = step10.getByRole('button', { name: 'Next' });
        await next10.click();

        // --- Conditional Step 11: Doors ---
        const step11 = page.getByTestId('step-doors');
        await expect(step11).toBeVisible();

        const next11 = step11.getByRole('button', { name: 'Next' });
        await expect(next11).toBeDisabled();

        // Select 4 doors
        await step11.getByTestId('doors-option-4').click();
        await expect(next11).not.toBeDisabled();
        await next11.click();

        // --- Step 12: Location ---
        const step12 = page.locator('#step-12');
        await expect(step12).toBeVisible();
        await step12.getByPlaceholder('e.g. SW1A 1AA or London').fill('SW1A 1AA');
        await step12.getByRole('button', { name: 'Next' }).click();

        // --- Step 13: Notes ---
        const step13 = page.locator('#step-13');
        await expect(step13).toBeVisible();
        await step13.getByRole('button', { name: 'Next' }).click();

        // --- Step 14: Contact ---
        const step14 = page.locator('#step-14');
        await expect(step14).toBeVisible();
        await step14.getByPlaceholder(/first name/i).fill('Test');
        await step14.getByPlaceholder(/last name/i).fill('User');
        await step14.getByPlaceholder(/email/i).fill('test@example.com');

        // Select Email preference
        await step14.getByRole('button', { name: 'Email' }).click();

        await expect(step14.getByRole('button', { name: 'Next' })).not.toBeDisabled();
    });

    test('should correctly handle changing mind at Brand step & verify automatic skipping validation', async ({ page }) => {
        // --- Step 1: Features ---
        const step1 = page.locator('#step-1');
        await step1.getByTestId('feature-option-colour').click();
        await step1.getByTestId('feature-option-low-mileage').click(); // Select >1 feature to ensure Step 2 shows
        await step1.getByRole('button', { name: 'Next' }).click();

        // --- Step 2: Dealbreakers ---
        await page.locator('#step-2').getByRole('button', { name: 'Next' }).click();

        // --- Step 3: Transmission ---
        const step3 = page.locator('#step-3');
        await step3.getByRole('button', { name: 'Manual' }).click();
        await step3.getByRole('button', { name: 'Next' }).click();

        // --- Step 4: Driver Type ---
        const step4 = page.locator('#step-4');
        await step4.getByRole('button', { name: 'The young driver' }).click();
        await step4.getByRole('button', { name: 'Next' }).click();

        // --- Step 5: Budget ---
        await page.locator('#step-5').getByRole('button', { name: 'Next' }).click();

        // --- Step 6: Brands ---
        const step6 = page.locator('#step-6');
        const nextBtn = step6.getByRole('button', { name: 'Next' });

        // 1. Click "Don't mind" (Triggers Skip Logic: Brands=0)
        await step6.getByRole('button', { name: /don['’]t mind/i }).first().click();
        await expect(nextBtn).toBeEnabled();

        // 2. Change mind: Select a SINGLE specific brand (e.g. Audi)
        // This sets Brands=1.
        // BUG REGRESSION CHECK: Previously logic skipped if Brands=0 but NOT if Brands=1, while Render hid if Brands<=1.
        // Result was invisible step.
        // Correct logic: Skip if Brands<=1.
        await step6.getByRole('button', { name: 'Audi' }).click();
        await expect(nextBtn).toBeEnabled();
        await nextBtn.click();

        // --- Verify Step 7 (Favourite) is SKIPPED ---
        // Logic: You can't have a "Favourite" if you only picked one brand.
        const step8 = page.getByTestId('step-colour');
        await expect(step8).toBeVisible();

        // --- Go Back and Select MULTIPLE Brands ---
        // Scroll/click back to Step 6 is implied by just clicking the element again in long form
        await step6.getByRole('button', { name: 'BMW' }).click();
        // Wait for state update to reflect selection
        await expect(step6.getByRole('button', { name: 'BMW' })).toHaveClass(/bg-sky-50/);

        // Now Brands=2 (Audi + BMW)
        // Step 7 SHOULD appear now? 
        // Logic: "Next" takes us forwards. We are technically on Step 8.
        // If we click "Next" on Step 6 again, it should re-evaluate and take us to Step 7.
        await nextBtn.click();

        // --- Step 7: Favourite Brand ---
        // Check if we are on Step 7
        const step7 = page.locator('#step-7');
        await expect(step7).toBeVisible();
        await expect(step7.getByText('Do you have a favourite?')).toBeVisible();

        // Ensure Step 8 is VISIBLE (due to maxStep persistence) but DISABLED (we are on Step 7)
        const step8Again = page.getByTestId('step-colour');
        await expect(step8Again).toBeVisible();
        await expect(step8Again.getByRole('button', { name: 'Next' })).toBeDisabled();
    });
});
