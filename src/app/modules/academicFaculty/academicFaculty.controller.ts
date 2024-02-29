import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result =
    await AcademicFacultyService.createFacultyToDB(academicFacultyData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic faculty created successfully',
    data: result
  });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title']);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AcademicFacultyService.getAllFacultyFromDB(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Faculty retrieve successfully',
    meta: result.meta,
    data: result.data
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getSingleFacultyFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Academic Faculty retrieve successfully',
    data: result
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicFacultyService.updateFacultyFromDB(
    id,
    updatedData
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' Academic Faculty updated successfully',
    data: result
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.deleteFacultyToDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Delete Academic Faculty successfully',
    data: result
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty
};
