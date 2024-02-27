import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result =
      await AcademicSemesterService.createAcademicSemesterToDB(
        academicSemesterData
      );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result
    });
    next();
  }
);

export const AcademicSemesterController = {
  createAcademicSemester
};
