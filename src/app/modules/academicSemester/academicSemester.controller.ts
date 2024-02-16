import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result =
      await AcademicSemesterService.createAcademicSemesterToDB(
        academicSemesterData
      );

    res.status(200).json({
      success: true,
      message: 'Academic Semester Created successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createAcademicSemester
};
