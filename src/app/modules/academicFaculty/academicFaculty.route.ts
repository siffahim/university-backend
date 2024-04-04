import express from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  AcademicFacultyController.createFaculty
);

router.get(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.FACULTY),
  AcademicFacultyController.getSingleFaculty
);
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  AcademicFacultyController.updateFaculty
);
router.delete(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleteFaculty
);

router.get(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.FACULTY),
  AcademicFacultyController.getAllFaculty
);

export const AcademicFacultyRoutes = router;
