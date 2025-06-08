// src/routes/siteRoutes.ts
import { Router } from "express";
import {
  listSites,
  getSite,
  //createSite,
  // updateSite,
  //deleteSite,
} from "../controllers/siteController";

const router = Router();

// 1. קבלת כל האתרים
// GET /sites
router.get("/", listSites);

// 2. קבלת אתר לפי מזהה
// GET /sites/:id

//router.get("/:id", getSite);

/*
// 3. יצירת אתר חדש
// POST /sites
router.post("/", createSite);

// 4. עדכון אתר קיים
// PUT /sites/:id
router.put("/:id", updateSite);

// 5. מחיקת אתר
// DELETE /sites/:id
router.delete("/:id", deleteSite);
*/
export default router;
