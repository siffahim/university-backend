import { InferSchemaType, Model } from 'mongoose';
import { studentSchema } from './student.model';

export type IStudent = InferSchemaType<typeof studentSchema>;

export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  bloodGroup?: string;
  emergencyContactNo?: string;
  name?: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
};
