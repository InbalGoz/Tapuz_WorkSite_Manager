import { Router } from "express";
import { getlistOfStages } from "../controllers/stageController";

const router = Router();

router.get("/", getlistOfStages);

export default router;
