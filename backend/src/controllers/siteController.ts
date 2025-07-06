// src/controllers/siteController.ts
import { Request, Response } from "express";
import { ResService } from "../services/resService";
import {
  getAllSites,
  getSiteById,
  createSite,
  updateSite,
  deleteSite,
} from "../services/siteService";

export async function listSites(req: Request, res: Response) {
  try {
    const sites = await getAllSites();
    ResService.handleSuccess(res, sites);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function getSite(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const site = await getSiteById(id);
    ResService.handleSuccess(res, site);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function createSiteController(req: Request, res: Response) {
  try {
    const newSite = await createSite(req.body); //מצפה לקבל מידע מגוף הבקשה
    ResService.handleSuccess(res, newSite);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function updateSiteController(req: Request, res: Response) {
  const id = Number(req.params.id); //
  try {
    const updatedSite = await updateSite(id, req.body);
    ResService.handleSuccess(res, updatedSite);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}

export async function deleteSiteController(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const deletedId = await deleteSite(id);
    ResService.handleSuccess(res, deletedId);
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}
