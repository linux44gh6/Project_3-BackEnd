import { Router } from 'express';
import { BlogRouter } from '../Modules/Products/product.route';
import { authRouter } from '../Modules/Auth/auth.route';
import { adminRoute } from '../Modules/Admin/admin.route';
import { orderRoute } from '../Modules/Order/Order.route';
import { userRoute } from '../Modules/User/user.route';
import { stripePaymentRouter } from '../Modules/Payment/PaymentRoute';

const router = Router();
const moduleRoutes = [
  {
    path: '/products',
    route: BlogRouter,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/payment',
    route: stripePaymentRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
