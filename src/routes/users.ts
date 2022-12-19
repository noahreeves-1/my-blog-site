import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/signup", userController.user_signup_get);
router.post("/signup", userController.user_signup_post);

router.get("/admin_code", userController.admin_code_get);
router.post("/admin_code", userController.admin_code_post);

router.get("/logout", userController.logout_get);

export default router;
