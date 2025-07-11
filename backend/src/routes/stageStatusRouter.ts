import { Router } from "express";
import { getlistOfStageStatuses } from "../controllers/stageStatusController";

const router = Router();

router.get("/", getlistOfStageStatuses);

export default router;
