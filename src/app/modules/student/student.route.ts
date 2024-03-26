import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';
const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);
router.delete('/:id', StudentController.deleteStudent);
router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
