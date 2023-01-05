import express from "express";
import * as postController from "../controllers/postController";
import * as commentController from "../controllers/commentController";
import { verifyRoles } from "../auth/verifyRoles";

const router = express.Router();

// * POST DETAILS and COMMENTS for posts/:id
router.get("/:id", postController.get_post_get);

// * COMMENTS for posts/:id
router.post(
  "/:id",
  verifyRoles("5454", "2001"),
  commentController.comment_post
);

export default router;
