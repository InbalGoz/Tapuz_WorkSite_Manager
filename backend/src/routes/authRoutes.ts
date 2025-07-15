import express from "express";
import { login } from "../controllers/authController";
//import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", login);

export default router;
