import express from "express";
import * as postController from "../controllers/postController";
import * as commentController from "../controllers/commentController";

const router = express.Router();

router.get("/create", postController.create_post_get);
router.post("/create", postController.create_post_post);

router.get("/:id", postController.get_post_get);
// post comment
router.post("/:id", commentController.comment_post);

export default router;
