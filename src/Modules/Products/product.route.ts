import { Router } from 'express';
import { BlogController } from './product.controller';
import auth from '../../Middlewares/auth';
import { USER_ROLE } from '../User/user.constants';
import validateRequest from '../../Middlewares/validatedRequest';
import { blogValidation } from './product.validation';

const router = Router();
router.get('/', BlogController.getAllBlog);
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(blogValidation.BlogPostValidationSchema),
  BlogController.createBlog
);

// router.patch(
//   '/:id',
//   auth(USER_ROLE.user),
//   validateRequest(blogValidation.BlogPostUpdateValidationSchema),
//   BlogController.updateBlog
// );

router.delete('/:id', auth(USER_ROLE.admin), BlogController.deleteBlog);

router.get('/:id',
  //  auth(USER_ROLE.user), 
   BlogController.getSingleProduct);
   
export const BlogRouter = router;
