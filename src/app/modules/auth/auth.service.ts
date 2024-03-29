import { StatusCodes } from 'http-status-codes';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/AprError';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { User } from '../user/user.model';
import { IAuth } from './auth.interface';

const loginUserFromDB = async (payload: IAuth) => {
  const { id, password } = payload;

  const user = new User();

  //check user in DB
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist");
  }

  //match password
  // const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);

  if (
    isUserExist.password &&
    !user.isPasswordMatch(password, isUserExist.password)
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password is incorrect!');
  }

  //access token and refresh token
  const { id: userId, role, isChangePassword } = isUserExist;
  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );
  const refreshToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire_in as string
  );

  // const accessToken = jwt.sign(
  //   { id: isUserExist?.id, role: isUserExist?.role },
  //   config.jwt.secret as string,
  //   { expiresIn: config.jwt.expire_in }
  // );

  // const refreshToken = jwt.sign(
  //   { id: isUserExist?.id, role: isUserExist?.role },
  //   config.jwt.refresh_secret as string,
  //   { expiresIn: config.jwt.refresh_expire_in }
  // );

  return {
    accessToken,
    refreshToken,
    isChangePassword
  };
};

export const AuthService = {
  loginUserFromDB
};
