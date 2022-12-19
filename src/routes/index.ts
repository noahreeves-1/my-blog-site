import express from "express";
import * as indexController from "../controllers/indexController";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/", indexController.index_get);

router.get("/about", indexController.about_get);

router.get("/contact", indexController.contact_get);

router.get("/users/logout", userController.logout_get);

router.get("/login", indexController.login_get);
router.post("/login", indexController.login_post);

router.get("/signup", userController.user_signup_get);
router.post("/signup", userController.user_signup_post);

export default router;
