import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/AprError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from './../../../types/pagination';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createDepartmentToDB = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );

  if (!result) {
    throw new ApiError(400, 'Academic Department is not created successfully');
  }

  return result;
};

const getAllDepartmentFromDB = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};

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

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicDepartment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty');
  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const getSingleDepartmentFromDB = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');

  return result;
};

const updateDepartmentToDB = async (
  id: string,
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  ).populate('academicFaculty');

  return result;
};

const deleteDepartmentToDB = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result =
    await AcademicDepartment.findByIdAndDelete(id).populate('academicFaculty');

  return result;
};

export const AcademicDepartmentService = {
  createDepartmentToDB,
  getAllDepartmentFromDB,
  getSingleDepartmentFromDB,
  updateDepartmentToDB,
  deleteDepartmentToDB
};
