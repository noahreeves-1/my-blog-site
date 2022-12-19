import express from "express";
import * as postController from "../controllers/postController";

const router = express.Router();

router.get("/create", postController.create_post_get);
router.post("/create", postController.create_post_post);

export default router;
