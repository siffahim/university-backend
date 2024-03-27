import { model, Schema } from 'mongoose';
import { bloodGroup, gender } from '../../../constants/common';
import { AdminModel, IAdmin } from './admin.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adminSchema: any = new Schema<IAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true
        },
        middleName: {
          type: String
        },
        lastName: {
          type: String,
          required: true
        }
      },
      required: true
    },
    dateOfBirth: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: gender
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    contactNo: {
      type: String,
      required: true,
      unique: true
    },
    emergencyContactNo: {
      type: String,
      required: true,
      unique: true
    },
    presentAddress: {
      type: String,
      required: true
    },
    permanentAddress: {
      type: String,
      required: true
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup
    },
    designation: {
      type: String,
      required: true
    },
    profileImage: { type: String },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
