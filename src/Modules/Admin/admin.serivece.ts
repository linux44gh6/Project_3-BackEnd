
import { Blog } from '../Blog/blog.model';
import { User } from '../User/user.model';

const blockUser = async (id: string) => {
  // console.log('Checking if user is already blocked...');

  // const user = await User.findById(id);
  // // if (!user) {
  // //   throw new appError(StatusCodes.NOT_FOUND, 'User not found');
  // // }

  // // if (user.isBlocked) {
  // //   console.error('User is already blocked:', user);
  // //   throw new appError(StatusCodes.FORBIDDEN, 'This user is already blocked');
  // // }

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
