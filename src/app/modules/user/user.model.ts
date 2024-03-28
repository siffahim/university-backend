import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty'
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

//hash for all user
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
