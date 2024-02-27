import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response, next) => {
  const { user } = req.body;
  const result = await UserService.createUserToDB(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User created successfully',
    data: result
  });
  next();
});

export const UserController = {
  createUser
};
