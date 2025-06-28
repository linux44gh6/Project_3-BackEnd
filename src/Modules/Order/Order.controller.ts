import { StatusCodes } from "http-status-codes";
import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import { orderService } from "./Order.service";
import { User } from "../User/user.model";
import { appError } from "../../App/Errors/AppError";

const createOrder=catchAsync( async(req,res)=>{
    let userEmail: string | undefined;
    if (req.user && typeof req.user === 'object' && 'userEmail' in req.user) {
      userEmail = (req.user as { userEmail: string }).userEmail;
    }
    if (!userEmail) {
      throw new appError(StatusCodes.UNAUTHORIZED, 'You are unAuthorized');
    }
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new appError(StatusCodes.UNAUTHORIZED, 'You are unAuthorized');
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

const getAllOrder=catchAsync(async(req,res)=>{
    const { email } = req.params;
    const result=await orderService.getAllOrder({ email });
    sendResponse(res, {
        success: true,
        StatusCode: StatusCodes.OK,
        message: 'Blog created success',
        data: result,
      });
})
const getAllUserOrder=catchAsync(async(req,res)=>{
    const result=await orderService.getAllUsersOrder()
    sendResponse(res, {
        success: true,
        StatusCode: StatusCodes.OK,
        message: 'Product created success',
        data: result,
      });
})
const updateOrder=catchAsync(async(req,res)=>{
    const {id}=req.params
    const data=req.body
    const result=await orderService.updateOrder(id,data)
    sendResponse(res, {
        success: true,
        StatusCode: StatusCodes.OK,
        message: 'Product Updated success',
        data: result,
      });
})
export const orderController={
    createOrder,
    getAllOrder,
    getAllUserOrder,
    updateOrder
}