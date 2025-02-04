import { Router } from "express";
import { orderController } from "./Order.controller";
import auth from "../../Middlewares/auth";
import { USER_ROLE } from "../User/user.constants";

const router=Router()
router.post('/create-order',auth(USER_ROLE.user),orderController.createOrder)
router.get('/:email',auth(USER_ROLE.user),orderController.getALlOrder)
router.get('/',auth(USER_ROLE.admin),orderController.getAllUserOrder)

export const orderRoute=router