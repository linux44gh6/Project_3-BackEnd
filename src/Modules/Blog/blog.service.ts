import { TBlogPost } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlog=async(payload:TBlogPost)=>{
const result=await Blog.create(payload)
return result
}
export const BlogServices={
    createBlog
}