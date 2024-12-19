import { Router } from "express";
import { BlogRouter } from "../Modules/Blog/blog.route";


const router=Router()
const moduleRoutes=[
    {
        path:'/blogs',
        route:BlogRouter
    }
]

moduleRoutes.forEach((route)=>router.use(route.path,route.route))
export default router