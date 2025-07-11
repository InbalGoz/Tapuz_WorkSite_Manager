import { Request, Response } from "express";
import { ResService } from "../services/resService";
import {
  getAllsiteStages,
  createSiteStage,
  updateSiteStage,
  deleteSiteStage,
} from "../services/siteStageService";

export async function getListOfSiteStage(req: Request, res: Response) {
  const id = Number(req.params.id); //the site id
  try {
    const siteStages = await getAllsiteStages(id);
    console.log(siteStages);
    ResService.handleSuccess(res, siteStages);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function createSiteStageController(req: Request, res: Response) {
  try {
    const newSiteStage = await createSiteStage(req.body);
    ResService.handleSuccess(res, newSiteStage);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function updateSiteStageController(req: Request, res: Response) {
  const { id } = req.body;
  try {
    const updatedSiteStage = await updateSiteStage(id, req.body);
    ResService.handleSuccess(res, updatedSiteStage);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function deleteSiteStageController(req: Request, res: Response) {
  //const siteStageId = Number(req.params.siteStageId);
  const { siteStageId } = req.params;
  const numericSiteStageId = Number(siteStageId);
  console.log("deletedid", numericSiteStageId);
  try {
    const deletedSiteStage = await deleteSiteStage(numericSiteStageId);
    ResService.handleSuccess(res, deletedSiteStage);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}
