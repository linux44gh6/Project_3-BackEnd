import { StatusCodes } from "http-status-codes";
import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import { BlogServices } from "./blog.service";
import { User } from "../User/user.model";
import { appError } from "../../App/Errors/AppError";
import { JwtPayload } from "jsonwebtoken";

const createBlog=catchAsync(async(req,res)=>{
    const {userEmail}=req.user as JwtPayload
    if (!userEmail) {
        throw new appError(StatusCodes.BAD_REQUEST, 'User email is missing');
      }
    const user=await User.findOne({email:userEmail})
   const authorId=user?._id;
   
   if (!authorId) {
    throw new appError(StatusCodes.BAD_REQUEST, 'Author ID is missing');
  }
    const result=await BlogServices.createBlog(authorId,req.body)
    sendResponse(res,({
        success:true,
        StatusCode:StatusCodes.OK,
        message:"Blog created success",
        data:result
    }))
})

const updateBlog=catchAsync(async(req,res)=>{
  const {userEmail}=req.user as JwtPayload
  const {id}=req.params
  const result=await BlogServices.updatedBlog(userEmail,id,req.body)
  sendResponse(res,({
    success:true,
    StatusCode:StatusCodes.OK,
    message:"Blog updated success",
    data:result
}))
})
export const BlogController={
    createBlog,
    updateBlog
}