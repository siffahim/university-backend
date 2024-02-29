import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/AprError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../types/pagination';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFacultyToDB = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);

  if (!result) {
    throw new ApiError(400, 'Academic Faculty not created successfully!');
  }

  return result;
};

const getAllFacultyFromDB = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

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

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const getSingleFacultyFromDB = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateFacultyFromDB = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true
  });
  return result;
};

const deleteFacultyToDB = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyService = {
  createFacultyToDB,
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyFromDB,
  deleteFacultyToDB
};
