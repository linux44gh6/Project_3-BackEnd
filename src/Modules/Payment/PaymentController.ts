import { StatusCodes } from "http-status-codes";
import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import { createCheckoutSession } from "./PaymentService";

export const stripePayment= catchAsync(async (req, res) => {
    const { items } = req.body;
    const session = await createCheckoutSession(items);
    return sendResponse(res, {
        success: true,
        StatusCode: StatusCodes.OK, 
        message: "Payment Success",
        data: { sessionId: session?.id }, 
    });
});
export const stripePaymentController={
    stripePayment
}