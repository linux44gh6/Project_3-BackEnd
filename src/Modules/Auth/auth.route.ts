import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../Middlewares/validatedRequest";
import { userValidation } from "../User/user.validation";

const router=Router()
router.post('/register',validateRequest(userValidation.userValidationSchema),authController.registerUser)
router.post('/login',authController.loginUser)

export const authRouter=router;