// import { StatusCodes } from "http-status-codes";
// import { appError } from "../../App/Errors/AppError";
import { Blog } from '../Blog/blog.model';
import { User } from '../User/user.model';

const blockUser = async (id: string) => {
  // console.log(id);
  // const user=await User.findById({_id:id})
  // if(user?.isBlocked===true){
  //     throw new appError(StatusCodes.CONFLICT,'This user already blocked')
  // }
  const result = await User.findOneAndUpdate(
    { _id: id },
    { isBlocked: true },
    { new: true }
  );
  return result;
};
const deleteBlog = async (id: string) => {
  const result = await Blog.findByIdAndDelete({ _id: id });
  return result;
};

export const adminServices = {
  blockUser,
  deleteBlog,
};
