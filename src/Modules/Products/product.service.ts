import { Types } from 'mongoose';
import { Blog } from './product.model';
import { User } from '../User/user.model';
import { appError } from '../../App/Errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { QueryBuilder } from '../../builders/QueryBuilder';
import { searchAbleFields } from './product.constant';
import { TProduct } from './product.interface';

const createBlog = async (authorId: Types.ObjectId, payload: TProduct) => {
  const blogData = {
    ...payload,
  };
  const result = await Blog.create(blogData);
  return result;
};

// const updatedBlog = async (
//   userEmail: string,
//   id: string,
//   payload: Partial<TBlogPost>
// ) => {
//   //find the user using id
//   const blog = await Blog.findById(id);

//   //find the author
//   const author = await User.findById(blog?.author);

//   //check the logged in user and author are same or not
//   if (userEmail !== author?.email) {
//     throw new appError(
//       StatusCodes.FORBIDDEN,
//       'You are not able to update this blog'
//     );
//   }
//   const result = await Blog.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });
//   const populatedResult = await result?.populate('author');
//   return populatedResult;
// };

const deleteBlog = async (userEmail: string, id: string) => {
  //find the user using id
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new appError(StatusCodes.FORBIDDEN, 'Blog Not found !!😂😂😂');
  }
  //find the author


  //check the logged in user and author are same or not
  // if (userEmail !== author?.email) {
  //   throw new appError(
  //     StatusCodes.FORBIDDEN,
  //     'You are not able to update this blog'
  //   );
  // }
  const result = await Blog.findByIdAndDelete(id, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getAllBlog = async (query: Record<string, unknown>) => {
  if (typeof query !== 'object' || Array.isArray(query)) {
    throw new Error('Invalid query parameter');
  }

  const blogQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(searchAbleFields)
    .sort()
    .filter();

  const result = await blogQuery.modelQuery;
  return result;
};
export const BlogServices = {
  createBlog,
  // updatedBlog,
  deleteBlog,
  getAllBlog,
};
