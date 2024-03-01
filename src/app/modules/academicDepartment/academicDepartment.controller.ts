import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  const result = await AcademicDepartmentService.createDepartmentToDB(
    academicDepartmentData
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Department created successfully!',
    data: result
  });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title']);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService.getAllDepartmentFromDB(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Department retrieve successfully!',
    meta: result.meta,
    data: result.data
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicDepartmentService.getSingleDepartmentFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Department retrieve successfully!',
    data: result
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicDepartmentService.updateDepartmentToDB(
    id,
    updatedData
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Department updated successfully!',
    data: result
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicDepartmentService.deleteDepartmentToDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Department Delete successfully!',
    data: result
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment
};
