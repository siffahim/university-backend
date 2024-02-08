import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUserToDB = async (payload: IUser): Promise<IUser | null> => {
  //incremental student id

  //default student pass
  if (!payload.password) {
    payload.password = config.default_user_pass as string;
  }

  const createUser = await User.create(payload);

  if (!createUser) {
    throw new Error('Failed to created user');
  }

  return createUser;
};

export default createUserToDB;
