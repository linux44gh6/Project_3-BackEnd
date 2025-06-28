import { Router } from "express";
import { orderController } from "./Order.controller";
import auth from "../../Middlewares/auth";
import { USER_ROLE } from "../User/user.constants";

const router=Router()
router.post('/create-order',auth(USER_ROLE.user,USER_ROLE.admin),orderController.createOrder)
router.get('/:email',auth(USER_ROLE.user),orderController.getAllOrder)
router.patch('/:id',auth(USER_ROLE.admin),orderController.updateOrder)
router.get('/',auth(USER_ROLE.admin),orderController.getAllUserOrder)

export const orderRoute=router