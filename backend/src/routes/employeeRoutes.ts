import { Router } from "express";
import {
  getListEmployees,
  getEmployee,
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
} from "../controllers/employeeController";
const router = Router();

router.get("/", getListEmployees);
router.get("/:id", getEmployee);
router.post("/", createEmployeeController);
router.put("/:id", updateEmployeeController);
router.delete("/:id", deleteEmployeeController);

export default router;
