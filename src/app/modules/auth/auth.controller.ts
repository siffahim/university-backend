import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUserFromDB(loginData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User login successfully',
    data: result
  });
});

export const AuthController = {
  loginUser
};
