import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body;
    const result = await UserService.createUserToDB(user);

    res.status(200).json({
      status: true,
      message: 'user created successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser
};
