import { Router } from "express";
import sitesRouter from "./siteRoutes";
import employeeRouter from "./employeeRoutes";
import siteStageRouter from "./siteStageRoutes";
import stageRouter from "./stageRouter";

const router = Router();

router.use("/sites", sitesRouter);
router.use("/sites/:id/siteStages", siteStageRouter);
router.use("/stages", stageRouter);
router.use("/employees", employeeRouter);

export default router;
