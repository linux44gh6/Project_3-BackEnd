import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';

const createUser = catchAsync(async (req, res) => {
  console.log(req.body);
  sendResponse(res, {
    success: true,
    message: 'user created success full',
    StatusCode: StatusCodes.OK,
    data: null,
  });
});

export const UserController = {
  createUser,
};
