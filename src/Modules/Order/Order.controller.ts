import { StatusCodes } from "http-status-codes";
import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import { orderService } from "./Order.service";
import { User } from "../User/user.model";
import { appError } from "../../App/Errors/AppError";

const createOrder=catchAsync( async(req,res)=>{
    const {userEmail}=req.user
    const user=await User.findOne({email:userEmail})
    if(!user){
       new appError(StatusCodes.UNAUTHORIZED,'You are unAuthorized')
    }
    const userId=user?._id
    const data=req.body
    const result=await orderService.createOrder(data,userId,userEmail)
    sendResponse(res, {
        success: true,
        StatusCode: StatusCodes.OK,
        message: 'Blog created success',
        data: result,
      });
})

export const orderController={
    createOrder
}