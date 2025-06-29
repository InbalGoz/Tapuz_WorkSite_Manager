import { Router } from "express";
import {
  getlistOfSiteStage,
  createSiteStageController,
  updateSiteStageController,
  deleteSiteStageController,
} from "../controllers/siteStageController";

const router = Router({ mergeParams: true }); //allow to get the second parmater also

router.get("/", getlistOfSiteStage);
router.post("/", createSiteStageController);
router.put("/:siteStageId", updateSiteStageController);
router.delete("/:siteStageId", deleteSiteStageController);

export default router;
