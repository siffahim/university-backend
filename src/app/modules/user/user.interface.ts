import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  // faculty?: Types.ObjectId;
  // admin?: Types.ObjectId;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
