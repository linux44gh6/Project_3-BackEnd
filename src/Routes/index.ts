import { Router } from "express";
import { BlogRouter } from "../Modules/Blog/blog.route";
import { authRouter } from "../Modules/Auth/auth.route";


const router=Router()
const moduleRoutes=[
    {
        path:'/blogs',
        route:BlogRouter
    },
    {
        path:'/auth',
        route:authRouter
    },
]

moduleRoutes.forEach((route)=>router.use(route.path,route.route))
export default router