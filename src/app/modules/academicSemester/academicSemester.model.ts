import { StatusCodes } from 'http-status-codes';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/AprError';
import {
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterTitles
} from './academicSemester.constrant';
import {
  AcademicSemesterModel,
  IAcademicSemester
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<
  IAcademicSemester,
  AcademicSemesterModel
>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterTitles
    },
    year: {
      type: Number,
      required: true
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCodes
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonths
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonths
    }
  },
  {
    timestamps: true
  }
);

//check same semester at same year and prevent them to create
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year
  });
  if (isExist) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Academic semester already exist!'
    );
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
