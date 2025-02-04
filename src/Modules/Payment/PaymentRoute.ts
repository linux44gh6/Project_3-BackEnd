import { Router } from "express";
import { stripePaymentController } from "./PaymentController";

const router=Router()
router.post('/',stripePaymentController.stripePayment)
export const stripePaymentRouter=router