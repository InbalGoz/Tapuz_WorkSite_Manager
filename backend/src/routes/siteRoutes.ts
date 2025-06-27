// src/routes/siteRoutes.ts
import { Router } from "express";
import {
  listSites,
  getSite,
  createSiteController,
  updateSiteController,
  deleteSiteController,
} from "../controllers/siteController";

const router = Router();

// 1. קבלת כל האתרים
// GET /sites
router.get("/", listSites);

// 2. קבלת אתר לפי מזהה
// GET /sites/:id

router.get("/:id", getSite);

// 3. יצירת אתר חדש
// POST /sites
router.post("/", createSiteController);

// 4. עדכון אתר קיים
// PUT /sites/:id
router.put("/:id", updateSiteController);

// 5. מחיקת אתר
// DELETE /sites/:id
router.delete("/:id", deleteSiteController);

export default router;
