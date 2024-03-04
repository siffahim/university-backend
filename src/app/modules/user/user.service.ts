import config from '../../../config';
import ApiError from '../../../errors/AprError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId } from './user.util';

const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  //incremental student id
  // const academy = {
  //   year: '2025',
  //   code: '03'
  // };
  const id = await generateFacultyId();
  user.id = id;

  //default student pass
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(400, 'Failed to created user');
  }

  return createUser;
};

export const UserService = {
  createUserToDB
};
