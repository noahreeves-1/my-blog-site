import express from "express";
import * as indexController from "../controllers/indexController";

const router = express.Router();

router.get("/", indexController.index_get);

router.get("/about", indexController.about_get);

router.get("/contact", indexController.contact_get);

export default router;
