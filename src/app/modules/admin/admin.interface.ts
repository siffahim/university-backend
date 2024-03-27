import { InferSchemaType, Model } from 'mongoose';
import { adminSchema } from './admin.model';

export type IAdmin = InferSchemaType<typeof adminSchema>;
export type AdminModel = Model<IAdmin, Record<string, unknown>>;
