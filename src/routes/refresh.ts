import express from "express";
const router = express.Router();
import { handleRefreshToken } from "../auth/handleRefreshToken";

router.get("/", handleRefreshToken);

export default router;
