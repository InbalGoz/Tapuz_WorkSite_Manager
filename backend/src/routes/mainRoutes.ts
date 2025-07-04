import { Router } from "express";
import sitesRouter from "./siteRoutes";
import employeeRouter from "./employeeRoutes";
import siteStageRouter from "./siteStageRoutes";
import stageRouter from "./stageRouter";
import workHoursRouter from "./workHourRouter";

const router = Router();

router.use("/sites", sitesRouter);
router.use("/sites/:id/siteStages", siteStageRouter);
router.use("/stages", stageRouter);
router.use("/employees", employeeRouter);
router.use("/work-hours", workHoursRouter);

export default router;
