import express from "express";
import * as userController from "../controllers/userController";
import * as postController from "../controllers/postController";
import { create_role_post } from "../controllers/rolesController";

const router = express.Router();

router.get("/", userController.admin_code_get);
router.post("/", userController.admin_code_post);

// * posts/create
router.get("/posts/create", postController.create_post_get);
router.post("/posts/create", postController.create_post_post);

// * create new role
router.post("/create_role", create_role_post);

export default router;
