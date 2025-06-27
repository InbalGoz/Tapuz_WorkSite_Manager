import { Router } from "express";
import sitesRouter from "./siteRoutes";
import employeeRouter from "./employeeRoutes";

const router = Router();

router.use("/sites", sitesRouter);
router.use("/employees", employeeRouter);

export default router;
