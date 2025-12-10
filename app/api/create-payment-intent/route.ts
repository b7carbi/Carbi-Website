import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-01-27.acacia', // Use latest or matching version
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, firstName, lastName } = body;

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 4900, // £49.00
            currency: 'gbp',
            automatic_payment_methods: {
                enabled: true,
            },
            receipt_email: email,
            metadata: {
                firstName,
                lastName,
                service: 'Car Match Request'
            }
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error: any) {
        console.error('Error creating payment intent:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
