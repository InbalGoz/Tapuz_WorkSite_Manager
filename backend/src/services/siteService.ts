import { Site } from "../entities/site";
import { DBService } from "./dbService";

const tableName = `"sites"`;
const sqlBaseQuery = `SELECT 
    id, 
    name, 
    address, 
    description, 
    image_url AS "imageUrl",
    is_finished AS "isFinished",
    created_at AS "createdAt"
  FROM ${tableName}`;

export async function getAllSites(): Promise<Site[]> {
  //const sqlQuery = `SELECT * FROM ${tableName}`;
  const sqlQuery = sqlBaseQuery;
  try {
    const result = await DBService.pool.query(sqlQuery); //ריצת השאילתה

    return result.rows as Site[]; //מחזיר את השורות כמערך של אתרים
  } catch (error: any) {
    console.error("DB Error:", error); // זה ידפיס את השגיאה האמיתית
    throw new Error("Failed to fetch sites");
  }
}

export async function getSiteById(id: number): Promise<Site> {
  const sqlQuery = sqlBaseQuery + `WHERE id = ($1)`;
  try {
    const result = await DBService.pool.query(sqlQuery, [id]); //הפרמטר ID נמצא במקום 1

    // מחזיר את השורה הראשונה,  null אם לא נמצא
    return (result.rows[0] as Site) || null;
  } catch (error: any) {
    throw new Error("Failed to fetch site by ID: " + error.message);
  }
}

export async function createSite(data: Site): Promise<Site> {
  const { name, address, imageUrl, description, isFinished } = data;
  const sql = `
    INSERT INTO sites (name, address, image_url, description, is_finished)
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING 
      id, name, address, image_url AS "imageUrl", 
      description, is_finished AS "isFinished", 
      created_at AS "createdAt"
  `;

  const values = [name, address, imageUrl, description, isFinished];

  try {
    const result = await DBService.pool.query(sql, values);
    return result.rows[0] as Site;
  } catch (error) {
    console.error("DB Error in createSite:", error);
    throw new Error("Failed to create site");
  }
}

export async function updateSite(id: number, data: Site): Promise<Site> {
  const { name, address, imageUrl, description, isFinished } = data;
  const sql = `
      UPDATE sites
      SET name = $1, address = $2, image_url = $3, description = $4, is_finished = $5
      WHERE id = $6
      RETURNING id, name, address, image_url AS "imageUrl", description, is_finished AS "isFinished", created_at AS "createdAt"
    `;
  const values = [name, address, imageUrl, description, isFinished, id];
  try {
    const result = await DBService.pool.query(sql, values);
    return result.rows[0] as Site;
  } catch (error) {
    console.error("DB Error in updateSite:", error);
    throw new Error("Failed to update site");
  }
}

export async function deleteSite(id: number): Promise<Site> {
  const sql = `DELETE FROM sites WHERE id = $1 RETURNING id`;
  try {
    const result = await DBService.pool.query(sql, [id]);
    return result.rows[0] as Site;
  } catch (error) {
    console.error("DB Error in deleteSite:", error);
    throw new Error("Failed to delete site");
  }
}
