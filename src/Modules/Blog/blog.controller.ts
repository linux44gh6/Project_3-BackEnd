import { StatusCodes } from "http-status-codes";
import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import { BlogServices } from "./blog.service";

const createBlog=catchAsync(async(req,res)=>{
    const result=await BlogServices.createBlog(req.body)
    sendResponse(res,({
        success:true,
        StatusCode:StatusCodes.OK,
        message:"Blog created success",
        data:result
    }))
})

export const BlogController={
    createBlog
}