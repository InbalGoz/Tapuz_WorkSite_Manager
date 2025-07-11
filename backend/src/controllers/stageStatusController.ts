import { Request, Response } from "express";
import { ResService } from "../services/resService";
import { getAllStageStatuses } from "../services/stageStatusesService";

export async function getlistOfStageStatuses(req: Request, res: Response) {
  try {
    const stageStatus = await getAllStageStatuses();
    ResService.handleSuccess(res, stageStatus);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}
