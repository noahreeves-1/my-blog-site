import express from "express";
import * as postController from "../controllers/postController";
import * as commentController from "../controllers/commentController";

const router = express.Router();

// * POST DETAILS and COMMENTS for posts/:id
router.get("/:id", postController.get_post_get);

// * COMMENTS for posts/:id
router.post("/:id", commentController.comment_post);

export default router;
