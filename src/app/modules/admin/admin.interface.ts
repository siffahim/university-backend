import { InferSchemaType, Model } from 'mongoose';
import { adminSchema } from './admin.model';

export type IAdmin = InferSchemaType<typeof adminSchema>;
export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
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
