import { Router } from "express";
import {
  getListWorkHours,
  getListFilteredWorkHour,
  createWorkHourController,
  updateWorkHourController,
  deleteWorkHourController,
} from "../controllers/workHoursController";

const router = Router();
router.get("/all", getListWorkHours);
router.get("/", getListFilteredWorkHour); //GET /api/work-hours?employeeId=3&siteId=2&month=2025-06

//  יצירת שעת עבודה לעובד מסוים
router.post("/employees/:employeeId/work-hour", createWorkHourController);

//  עדכון שעת עבודה לפי מזהה
router.put(
  "/employees/:employeeId/work-hour/:workHourId",
  updateWorkHourController
);

// מחיקת שורת עבודה לפי מזהה
router.delete(
  "/employees/:employeeId/work-hour/:workHourId",
  deleteWorkHourController
);

export default router;
