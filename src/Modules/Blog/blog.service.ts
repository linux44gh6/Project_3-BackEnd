
import {  Types } from "mongoose";
import { TBlogPost } from "./blog.interface";
import { Blog } from "./blog.model";
import { User } from "../User/user.model";
import { appError } from "../../App/Errors/AppError";
import { StatusCodes } from "http-status-codes";

const createBlog=async(authorId:Types.ObjectId,payload:TBlogPost)=>{
    const blogData={
        ...payload,
        author:authorId
    }
const result=(await Blog.create(blogData))
const populatedResult = await result.populate('author')
return populatedResult
}

const updatedBlog=async(userEmail:string,id:string,payload:Partial<TBlogPost>)=>{
    //find the user using id
    const blog=await Blog.findById(id)
 
    //find the author
    const author=await User.findById(blog?.author)
    
    //check the logged in user and author are same or not
    if(userEmail!==author?.email){
        throw new appError(StatusCodes.FORBIDDEN,"You are not able to update this blog")
    }
    const result=await Blog.findByIdAndUpdate(
        id,
        payload,
        {new:true,runValidators:true}
    )
    const populatedResult= await result?.populate('author')
    return populatedResult
}
export const BlogServices={
    createBlog,
    updatedBlog
}