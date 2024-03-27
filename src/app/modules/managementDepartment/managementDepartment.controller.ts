import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ManagementDepartmentService } from './managementDepartment.service';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;

    const result =
      await ManagementDepartmentService.createManagementDepartmentToDB(data);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Management Department created successfully',
      data: result
    });
  }
);

const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm', 'title']);
    const paginationOptions = pick(req.query, paginationFields);
    const result =
      await ManagementDepartmentService.getAllManagementDepartmentFromDB(
        filters,
        paginationOptions
      );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Management Department retrieved successfully',
      meta: result?.meta,
      data: result?.data
    });
  }
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result =
      await ManagementDepartmentService.getSingleManagementDepartmentFromDB(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Single Management Department retrieved successfully',
      data: result
    });
  }
);

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const result =
      await ManagementDepartmentService.updateManagementDepartmentToDB(
        id,
        data
      );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Management Department updated successfully',
      data: result
    });
  }
);

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result =
      await ManagementDepartmentService.deleteManagementDepartmentToDB(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Delete Management Department successfully',
      data: result
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  deleteManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment
};
