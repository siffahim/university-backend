import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.util';

const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  //incremental student id
  const id = await generateUserId();
  user.id = id;

  //default student pass
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createUser = await User.create(user);

  if (!createUser) {
    throw new Error('Failed to created user');
  }

  return createUser;
};

export default {
  createUserToDB
};
