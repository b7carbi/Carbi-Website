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
        await step3.getByRole('button', { name: 'Next' }).click();

        // --- Step 4: Driver Type ---
        const step4 = page.locator('#step-4'); // Step2bDriver
        await expect(step4).toBeVisible();
        await step4.getByRole('button', { name: 'The young driver' }).click();
        await step4.getByRole('button', { name: 'Next' }).click();

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
});
