import { StatusCodes } from 'http-status-codes';
import { SortOrder, startSession } from 'mongoose';
import ApiError from '../../../errors/AprError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../types/common';
import { IPaginationOptions } from '../../../types/pagination';
import { User } from '../user/user.model';
import { adminSearchableField } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdminFromDB = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableField.map((field: string) => ({
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

  const result = await Admin.find(whereCondition)
    .populate(['managementDepartment'])
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const getSingleAdminFromDB = async (id: string): Promise<IAdmin> => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminToDB = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin> => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Admin not found');
  }

  const { name, ...AdminData } = payload;

  const updatedAdminData = { ...AdminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      updatedAdminData[nameKey] = name[key];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true
  });

  return result;
};

const deleteAdminToDB = async (id: string) => {
  let deleteAdmin;
  const session = await startSession();
  try {
    session.startTransaction();

    const findUser = await User.findOne({ admin: id }).lean();

    const deleteUser = await User.findByIdAndDelete(findUser?._id).session(
      session
    );
    deleteAdmin = await Admin.findByIdAndDelete(id).session(session);

    if (!deleteUser || !deleteAdmin) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Admin not found');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return deleteAdmin;
};

export const AdminService = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminToDB,
  deleteAdminToDB
};
