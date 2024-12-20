import { Router } from "express";
import { BlogController } from "./blog.controller";
import auth from "../../Middlewares/auth";
import { USER_ROLE } from "../User/user.constants";

const router=Router()
router.post('/',auth(USER_ROLE.admin),BlogController.createBlog)

export const BlogRouter=router