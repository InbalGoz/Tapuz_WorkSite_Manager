import { DBService } from "./dbService";
import { Stage } from "../entities/stage";

export async function getAllStages(): Promise<Stage[]> {
  const sqlQuery = `SELECT id, name, created_at AS "createdAt" FROM stages`;
  try {
    const result = await DBService.pool.query(sqlQuery);
    return result.rows as Stage[];
  } catch (error: any) {
    console.error("DB Error:", error);
    throw new Error("Failed to fetch Stages");
  }
}
