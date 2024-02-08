import { Model } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
};

export type UserModel = Model<IUser, object>;
