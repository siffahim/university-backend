import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../types/common';
import { IPaginationOptions } from '../../../types/pagination';
import {
  IManagementDepartment,
  IManagementDepartmentFilters
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

const createManagementDepartmentToDB = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getAllManagementDepartmentFromDB = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]> | null> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: ['title'].map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i'
        }
      }))
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value
      }))
    });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await ManagementDepartment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const getSingleManagementDepartmentFromDB = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

const updateManagementDepartmentToDB = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};

const deleteManagementDepartmentToDB = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id);
  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartmentToDB,
  getAllManagementDepartmentFromDB,
  getSingleManagementDepartmentFromDB,
  updateManagementDepartmentToDB,
  deleteManagementDepartmentToDB
};
