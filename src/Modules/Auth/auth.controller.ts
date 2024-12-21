import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { authServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await authServices.registerUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    StatusCode: StatusCodes.CREATED,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    StatusCode: StatusCodes.OK,
    data: result,
  });
});

export const authController = {
  registerUser,
  loginUser,
};
