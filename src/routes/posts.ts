import express from "express";
import * as postController from "../controllers/postController";
import * as commentController from "../controllers/commentController";

const router = express.Router();

// * posts/create
router.get("/create", postController.create_post_get);
router.post("/create", postController.create_post_post);

// * posts/:id
router.get("/:id", postController.get_post_get);
router.post("/:id", commentController.comment_post);

export default router;
