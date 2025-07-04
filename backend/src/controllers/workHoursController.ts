import { Request, Response } from "express";
import { ResService } from "../services/resService";
import { WorkHoursFilter } from "../entities/workHours";
import {
  getAllWorkHours,
  getFilteredWorkHours,
  createWorkHour,
  updateWorkHour,
  deleteWorkHours,
} from "../services/workHourService";

export async function getListWorkHours(req: Request, res: Response) {
  try {
    const listWorkHours = await getAllWorkHours();
    ResService.handleSuccess(res, listWorkHours);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function getListFilteredWorkHour(req: Request, res: Response) {
  const employeeId = req.query.employeeId
    ? Number(req.query.employeeId)
    : undefined;
  const siteId = req.query.siteId ? Number(req.query.siteId) : undefined;
  const month = req.query.month as string | undefined;

  const filteredData: WorkHoursFilter = { employeeId, siteId, month };
  try {
    const listFiltered = await getFilteredWorkHours(filteredData);
    ResService.handleSuccess(res, listFiltered);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function createWorkHourController(req: Request, res: Response) {
  try {
    const newWorkHour = await createWorkHour(req.body);
    ResService.handleSuccess(res, newWorkHour);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function updateWorkHourController(req: Request, res: Response) {
  // const id = Number(req.params.id);
  const workHourId = Number(req.params.workHourId);
  try {
    const updatedWorkHour = await updateWorkHour(workHourId, req.body);
    ResService.handleSuccess(res, updatedWorkHour);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function deleteWorkHourController(req: Request, res: Response) {
  //const id = Number(req.params.id);
  const workHourId = Number(req.params.workHourId);
  try {
    const deletedWorkHour = await deleteWorkHours(workHourId);
    ResService.handleSuccess(res, deletedWorkHour);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

/*
export const getWorkHoursController = async (req: Request, res: Response) => {
  const employeeId = req.query.employeeId ? Number(req.query.employeeId) : undefined;
  const siteId = req.query.siteId ? Number(req.query.siteId) : undefined;
  const month = req.query.month as string | undefined;

  try {
    const data = await getFilteredWorkHours({ employeeId, siteId, month });
    res.json(data);
  } catch (err) {
    console.error("Error fetching work hours:", err);
    res.status(500).json({ message: "Server error" });
  }
};

*/
