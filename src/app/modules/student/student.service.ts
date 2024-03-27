import { StatusCodes } from 'http-status-codes';
import { SortOrder, startSession } from 'mongoose';
import ApiError from '../../../errors/AprError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../types/common';
import { IPaginationOptions } from '../../../types/pagination';
import { User } from '../user/user.model';
import { studentSearchableField } from './student.constant';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableField.map(field => ({
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

  const result = await Student.find(whereCondition)
    .populate(['academicFaculty', 'academicSemester', 'academicDepartment'])
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const getSingleStudentFromDB = async (id: string): Promise<IStudent> => {
  const result = await Student.findById(id);
  return result;
};

const updateStudentToDB = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent> => {
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Student not found');
  }

  const { name, guardian, localGuardian, ...studentData } = payload;

  const updatedStudentData = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      updatedStudentData[nameKey] = name[key];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`;
      updatedStudentData[guardianKey] = guardian[key];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`;
      updatedStudentData[localGuardianKey] = localGuardian[key];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true
  });

  return result;
};

const deleteStudentToDB = async (id: string) => {
  let deleteStudent;
  const session = await startSession();
  try {
    session.startTransaction();

    const findUser = await User.findOne({ student: id }).lean();

    const deleteUser = await User.findByIdAndDelete(findUser?._id).session(
      session
    );
    deleteStudent = await Student.findByIdAndDelete(id).session(session);

    if (!deleteUser || !deleteStudent) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Student not found');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return deleteStudent;
};

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentToDB,
  deleteStudentToDB
};
