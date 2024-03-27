import { StatusCodes } from 'http-status-codes';
import { SortOrder, startSession } from 'mongoose';
import ApiError from '../../../errors/AprError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../types/common';
import { IPaginationOptions } from '../../../types/pagination';
import { User } from '../user/user.model';
import { facultySearchableField } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFacultiesFromDB = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableField.map((field: string) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i'
        }
      }))
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value
      }))
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereCondition)
    .populate(['academicDepartment', 'academicFaculty'])
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const getSingleFacultyFromDB = async (id: string): Promise<IFaculty> => {
  const result = await Faculty.findById(id);
  return result;
};

const updateFacultyToDB = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty> => {
  const isExist = await Faculty.findOne({ id });
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Faculty not found');
  }

  const { name, ...facultyData } = payload;

  const updatedFacultyData = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      updatedFacultyData[nameKey] = name[key];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true
  });

  return result;
};

const deleteFacultyToDB = async (id: string) => {
  let deleteFaculty;
  const session = await startSession();
  try {
    session.startTransaction();

    const findUser = await User.findOne({ faculty: id }).lean();

    const deleteUser = await User.findByIdAndDelete(findUser?._id).session(
      session
    );
    deleteFaculty = await Faculty.findByIdAndDelete(id).session(session);

    if (!deleteUser || !deleteFaculty) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Faculty not found');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return deleteFaculty;
};

export const FacultyService = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyToDB,
  deleteFacultyToDB
};
