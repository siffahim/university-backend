/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IFaculty } from '../faculty/faculty.interface';
import { IStudent } from '../student/student.interface';
import { IAdmin } from './../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  isChangePassword: boolean;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser> | null>;
//   isPasswordMatch(givenPass: string, currentPass: string): Promise<boolean>;
// };

export type UserModel = {
  isUserExist(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatch(givenPass: string, currentPass: string): Promise<boolean>;
} & Model<IUser>;

//export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
