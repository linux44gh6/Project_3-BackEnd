
import {  Types } from "mongoose";
import { TBlogPost } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlog=async(authorId:Types.ObjectId,payload:TBlogPost)=>{
    const blogData={
        ...payload,
        author:authorId
    }
const result=(await Blog.create(blogData))
const populatedResult = await result.populate('author')
return populatedResult
}
export const BlogServices={
    createBlog
}