import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { adminServices } from './admin.serivece';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = adminServices.blockUser(userId);
  sendResponse(res, {
    success: true,
    StatusCode: StatusCodes.OK,
    message: 'User blocked successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = adminServices.deleteBlog(id);
  sendResponse(res, {
    success: true,
    StatusCode: StatusCodes.OK,
    message: 'Blog deleted success',
    data: result,
  });
});

export const adminController = {
  blockUser,
  deleteBlog,
};
