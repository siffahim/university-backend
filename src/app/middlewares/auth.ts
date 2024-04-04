import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/AprError';
import { jwtHelper } from '../../helpers/jwtHelper';

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
      }
      //verify token
      const verifyUser = jwtHelper.verifyToken(
        token,
        config.jwt.secret as Secret
      );

      req.user = verifyUser;

      //guard user
      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new ApiError(
          StatusCodes.FORBIDDEN,
          "you don't have permission to access this resource"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
