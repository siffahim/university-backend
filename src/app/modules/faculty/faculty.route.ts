import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);
router.delete('/:id', FacultyController.deleteFaculty);
router.get('/', FacultyController.getAllFaculties);

export const FacultiesRoutes = router;
