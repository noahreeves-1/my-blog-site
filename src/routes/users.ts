import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/admin_code", userController.admin_code_get);
router.post("/admin_code", userController.admin_code_post);

export default router;
