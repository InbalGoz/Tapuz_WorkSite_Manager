// src/controllers/siteController.ts
import { Request, Response } from "express";
import {
  getAllSites,
  getSiteById,
  //createSite,
  //updateSite,
  //deleteSite,
} from "../services/siteService";

export async function listSites(req: Request, res: Response) {
  try {
    const sites = await getAllSites();
    console.log(sites);
    res.json(sites);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
}

export async function getSite(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const site = await getSiteById(id);
    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }
    res.json(site);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
}

/*export async function createSiteController(req: Request, res: Response) {
  try {
    const newSite = await createSite(req.body);
    res.status(201).json(newSite);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to create site" });
  }
}

export async function updateSiteController(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const updated = await updateSite(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Site not found" });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to update site" });
  }
}

export async function deleteSiteController(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await deleteSite(id);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to delete site" });
  }
}*/
