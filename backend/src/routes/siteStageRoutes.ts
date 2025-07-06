import { Router } from "express";
import {
  getListOfSiteStage,
  createSiteStageController,
  updateSiteStageController,
  deleteSiteStageController,
} from "../controllers/siteStageController";

const router = Router({ mergeParams: true }); //allow to get the second parmater also

router.get("/", getListOfSiteStage);
router.post("/", createSiteStageController);
router.put("/", updateSiteStageController);
router.delete("/", deleteSiteStageController); // get the sitestageid in tge body
//router.put("/:siteStageId", updateSiteStageController);
//router.delete("/:siteStageId", deleteSiteStageController);

export default router;
