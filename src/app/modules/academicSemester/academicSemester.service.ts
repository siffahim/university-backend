import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/AprError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../types/common';
import { IPaginationOptions } from '../../../types/pagination';
import { AcademicSemesterCodeTitleMapper } from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemesterToDB = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  if (AcademicSemesterCodeTitleMapper[payload.title] !== payload.code) {
    throw new ApiError(400, 'Invalid semester code!');
  }

  const createSemester = await AcademicSemester.create(payload);
  return createSemester;
};

const getAllSemesterFromDB = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filterData } = filters;
  const academicSemesterSearchableField = ['title', 'code', 'year'];

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableField.map(field => ({
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

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i'
  //         }
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i'
  //         }
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i'
  //         }
  //       }
  //     ]
  //   }
  // ];

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

export const AcademicSemesterService = {
  createSemesterToDB,
  getAllSemesterFromDB
};
