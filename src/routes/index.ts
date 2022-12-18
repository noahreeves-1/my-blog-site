import express from "express";
import * as indexController from "../controllers/indexController";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/", indexController.index_get);

router.get("/about", indexController.about_get);

router.get("/contact", indexController.contact_get);

router.get("/users/logout", userController.logout_get);

export default router;
