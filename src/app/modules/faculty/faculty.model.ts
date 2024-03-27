import { model, Schema } from 'mongoose';
import { bloodGroup, gender } from '../../../constants/common';
import { designation } from './faculty.constant';
import { FacultyModel, IFaculty } from './faculty.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const facultySchema: any = new Schema<IFaculty, FacultyModel>(
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
      enum: designation
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
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

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema);
