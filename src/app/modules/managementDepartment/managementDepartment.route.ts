import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);
router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);
router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartment
);

router.get('/', ManagementDepartmentController.getAllManagementDepartment);

export const ManagementDepartmentRoutes = router;
