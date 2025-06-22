import { Router } from "express";
import sitesRouter from "./siteRoutes";

const router = Router();

router.use("/sites", sitesRouter);

export default router;
