import Registration from '../Models/RegisterationModel.js';
import stripe from 'stripe';

const stripeInstance = stripe("YOUR API KEY");

export const monthlySessionCheckout = async (req, res) => {
    const session = await stripeInstance.checkout.sessions.create({
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/success?sessionId={CHECKOUT_SESSION_ID}`,
        // success_url: `http://localhost:3009/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/login`,
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: "Monthly Plan",
                        description: `What You’ll Get
                        1. Monitoring and Support
                        2. Access to Application
                        3. Data gathering
                        4. Dashboard
                        5. 10 landing pages per account
                        `,
                    },
                    unit_amount: 97 * 100,
                },
                quantity: 1,
            },
        ],
        metadata: {
            plan: "Monthly",
            userId: req.query.userId
        },
    });

    console.log(session);
    return res.json({
        session: session
    })
}

export const yearlySessionCheckout = async (req, res) => {
    const session = await stripeInstance.checkout.sessions.create({
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/success?sessionId={CHECKOUT_SESSION_ID}`,
        // success_url: `http://localhost:3009/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/login`,
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: "Yearly Plan",
                        description: `What You’ll Get
                        1. Monitoring and Support
                        2. Access to Application
                        3. Data gathering
                        4. Dashboard
                        5. 10 landing pages per account for 12 months
                        `,
                    },
                    unit_amount: 950 * 100,
                },
                quantity: 1,
            },
        ],
        metadata: {
            plan: "Yearly",
            userId: req.query.userId
        },
    });

    console.log(session);
    return res.json({
        session: session
    })
}


export const completePayment = async (req, res) => {
    const sessionId = req.query.sessionId;
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);
    const userData = session.metadata;
    const user = await Registration.findById(userData.userId);
    user.paymentDone = true;
    user.paymentType = userData.plan;
    user.paymentDate = Date.now();
    await user.save();
    console.log(session)
    return res.json({
        success: true
    });
}