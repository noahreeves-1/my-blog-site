import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/", userController.admin_code_get);
router.post("/", userController.admin_code_post);

export default router;
