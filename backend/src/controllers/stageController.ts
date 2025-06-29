import { Request, Response } from "express";
import { ResService } from "../services/resService";
import { getAllStages } from "../services/stageService";

export async function getlistOfStages(req: Request, res: Response) {
  try {
    const sites = await getAllStages();
    ResService.handleSuccess(res, sites);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}
