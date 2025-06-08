import { Site } from "../entities/site";
import { DBService } from "./dbService";

const tableName = `"sites"`;

export async function getAllSites(): Promise<Site[]> {
  const sqlQuery = `SELECT * FROM ${tableName}`;
  try {
    const result = await DBService.pool.query(sqlQuery); //ריצת השאילתה

    return result.rows as Site[]; //מחזיר את השורות כמערך של אתרים
  } catch (error: any) {
    throw new Error("Failed to fetch sites");
  }
}

export async function getSiteById(id: number): Promise<Site> {
  const sqlQuery = `SELECT * FROM ${tableName} WHERE id = ($1)`;
  try {
    const result = await DBService.pool.query(sqlQuery, [id]); //הפרמטר ID נמצא במקום 1

    // מחזיר את השורה הראשונה,  null אם לא נמצא
    return (result.rows[0] as Site) || null;
  } catch (error: any) {
    throw new Error("Failed to fetch site by ID: " + error.message);
  }
}
