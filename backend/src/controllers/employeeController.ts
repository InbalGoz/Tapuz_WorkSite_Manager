import { Request, Response } from "express";
import { ResService } from "../services/resService";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

export async function getListEmployees(req: Request, res: Response) {
  try {
    const sites = await getAllEmployees();
    ResService.handleSuccess(res, sites);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function getEmployee(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const site = await getEmployeeById(id);
    ResService.handleSuccess(res, site);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function createEmployeeController(req: Request, res: Response) {
  try {
    const newSite = await createEmployee(req.body);
    ResService.handleSuccess(res, newSite);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function updateEmployeeController(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const updatedSite = await updateEmployee(id, req.body);
    ResService.handleSuccess(res, updatedSite);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function deleteEmployeeController(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const deletedId = await deleteEmployee(id);
    ResService.handleSuccess(res, deletedId);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}
