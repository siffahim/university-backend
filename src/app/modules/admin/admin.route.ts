import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { adminValidation } from './admin.validation';

const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);
router.patch(
  '/:id',
  validateRequest(adminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);
router.delete('/:id', AdminController.deleteAdmin);
router.get('/', AdminController.getAllAdmin);
export const AdminRoutes = router;
