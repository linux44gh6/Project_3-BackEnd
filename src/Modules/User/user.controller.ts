import { StatusCodes } from "http-status-codes";
import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import { userServices } from "./user.service";

const getAllUser=(catchAsync(async(req,res)=>{
    const result=await userServices.getAllUser()
    sendResponse(res,{
        StatusCode:StatusCodes.OK,
        success:true,
        message:"User Retrive success",
        data:result
    })
}))
export const userController={
    getAllUser
}