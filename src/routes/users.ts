import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/login", userController.login_get);

router.post("/login", userController.login_post);

router.get("/signup", userController.user_signup_get);

router.post("/signup", userController.user_signup_post);

router.get("/admin_code", userController.admin_code_get);

router.post("/admin_code", userController.admin_code_post);

export default router;
