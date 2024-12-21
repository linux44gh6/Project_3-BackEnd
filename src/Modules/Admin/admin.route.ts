import { Router } from 'express';
import { adminController } from './admin.controller';
import auth from '../../Middlewares/auth';
import { USER_ROLE } from '../User/user.constants';

const router = Router();
router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  adminController.blockUser
);

router.delete('/blogs/:id', auth(USER_ROLE.admin), adminController.deleteBlog);
export const adminRoute = router;
