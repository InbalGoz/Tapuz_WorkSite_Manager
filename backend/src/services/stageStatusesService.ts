import { DBService } from "./dbService";
import { StageStatus } from "../entities/stageStatus";

export async function getAllStageStatuses(): Promise<StageStatus[]> {
  const sqlQuery = `SELECT id, status_name AS "statusName" FROM stage_status`;
  try {
    const result = await DBService.pool.query(sqlQuery);
    return result.rows as StageStatus[];
  } catch (error: any) {
    console.error("DB Error:", error);
    throw new Error("Failed to fetch statuses");
  }
}
