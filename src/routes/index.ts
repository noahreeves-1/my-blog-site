import express from "express";
import * as indexController from "../controllers/indexController";
import * as postController from "../controllers/postController";
import * as commentController from "../controllers/commentController";

const router = express.Router();

router.get("/", indexController.index_get);

router.get("/about", indexController.about_get);

router.get("/contact", indexController.contact_get);

router.get("/login", indexController.login_get);
router.post("/login", indexController.login_post);

router.get("/:id", postController.get_post_get);
// post comment
router.post("/:id", commentController.comment_post);

export default router;
