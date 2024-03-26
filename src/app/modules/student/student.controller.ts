import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableField } from './student.constant';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getAllStudentsFromDB(
    filters,
    paginationOptions
  );

  sendResponse<IStudent[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Students retrieve successfully!',
    meta: result.meta,
    data: result.data
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Student retrieve successfully!',
    data: result
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await StudentService.updateStudentToDB(id, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student updated successfully',
    data: result
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudentToDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent
};
