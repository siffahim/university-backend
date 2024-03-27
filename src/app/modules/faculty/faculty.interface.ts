import { InferSchemaType, Model } from 'mongoose';
import { facultySchema } from './faculty.model';

export type IFaculty = InferSchemaType<typeof facultySchema>;
export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
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
