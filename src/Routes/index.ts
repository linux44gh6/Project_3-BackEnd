import { Router } from 'express';
import { BlogRouter } from '../Modules/Products/product.route';
import { authRouter } from '../Modules/Auth/auth.route';
import { adminRoute } from '../Modules/Admin/admin.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/products',
    route: BlogRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
