import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result =
      await AcademicSemesterService.createSemesterToDB(academicSemesterData);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result
    });
    next();
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year']);
    const paginationOptions = pick(req.query, paginationFields);
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder
    // };

    const result = await AcademicSemesterService.getAllSemesterFromDB(
      filters,
      paginationOptions
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester retrieve successfully',
      meta: result.meta,
      data: result.data
    });
    next();
  }
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemester
};
