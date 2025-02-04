import Stripe from "stripe";
import config from "../../App/config";
import { appError } from "../../App/Errors/AppError";
import { StatusCodes } from "http-status-codes";

interface Item {
    name: string;
    price: number;
    quantity: number;
}

export const createCheckoutSession = async (items: Item[]) => {
    try {
        if (!config.secret_key) {
            throw new appError(StatusCodes.INTERNAL_SERVER_ERROR, "Stripe secret key is not defined");
        }
        const stripe = new Stripe(config.secret_key);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: { name: item.name },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        return session;
    } catch(er) {
        console.log(er);
    }
};
