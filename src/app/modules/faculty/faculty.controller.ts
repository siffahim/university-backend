import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableField } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { FacultyService } from './faculty.service';

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyService.getAllFacultiesFromDB(
    filters,
    paginationOptions
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculties retrieve successfully!',
    meta: result.meta,
    data: result.data
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFacultyFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Faculty retrieve successfully!',
    data: result
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await FacultyService.updateFacultyToDB(id, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFacultyToDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result
  });
});

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty
};
