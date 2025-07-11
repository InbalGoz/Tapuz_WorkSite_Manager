import { Request, Response } from "express";
import { ResService } from "../services/resService";
import { getAllStages } from "../services/stageService";

export async function getlistOfStages(req: Request, res: Response) {
  try {
    const stages = await getAllStages();
    ResService.handleSuccess(res, stages);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}
