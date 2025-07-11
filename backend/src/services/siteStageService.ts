import { SiteStage } from "../entities/siteStage";
import { DBService } from "./dbService";

const sqlBaseQuery = `SELECT 
ss.id
,ss.site_id AS "siteId"
,ss.stage_id AS "stageId"
,ss.status_id AS "statusId"
,ss.notes
,ss.image_url AS "imageUrl"
,ss.created_at AS "createdAt"
,st.name AS "stageName"
,stat.status_name AS "statusName"
FROM site_stages ss
JOIN stages st ON ss.stage_id = st.id
JOIN stage_status stat ON ss.status_id = stat.id
`;

export async function getAllsiteStages(id: number): Promise<SiteStage[]> {
  const sqlQuery =
    sqlBaseQuery +
    `WHERE ss.site_id = $1
    ORDER BY ss.created_at`;
  try {
    const result = await DBService.pool.query(sqlQuery, [id]);
    console.log("site stage by id");
    console.log(result.rows as SiteStage[]);
    return result.rows as SiteStage[];
  } catch (error: any) {
    console.error("DB Error:", error);
    throw new Error("Failed to fetch siteStages");
  }
}

export async function createSiteStage(data: SiteStage): Promise<SiteStage> {
  const { siteId, stageId, statusId, notes, imageUrl } = data;
  const sql = `INSERT INTO site_stages (site_id, stage_id, status_id ,notes, image_url, created_at)
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING
    id, site_id AS "siteId", stage_id AS "stageId", status_id AS "statusId" 
    ,notes,image_url AS "imageUrl"
    ,created_at AS "createdAt"`;
  const values = [siteId, stageId, statusId, notes, imageUrl];

  try {
    const result = await DBService.pool.query(sql, values);
    return result.rows[0] as SiteStage;
  } catch (error) {
    console.error("DB Error in createSite:", error);
    throw new Error("Failed to create sitestage");
  }
}

export async function updateSiteStage(
  id: number,
  data: SiteStage
): Promise<SiteStage> {
  const { statusId, notes, imageUrl } = data;

  console.log("updateddata", data);

  const sql = `UPDATE site_stages
    SET status_id = $1, notes = $2, image_Url= $3
    WHERE id = $4 
    RETURNING
    id, site_id AS "siteId", stage_id AS "stageId" 
    ,status_id AS "statusId"
    ,notes,image_url AS "imageUrl"
    ,created_at AS "createdAt"`;
  const values = [statusId, notes, imageUrl, id];
  try {
    const result = await DBService.pool.query(sql, values);
    console.log("Updated row:", result.rows[0]);
    return result.rows[0] as SiteStage;
  } catch (error) {
    console.error("DB Error in createSite:", error);
    throw new Error("Failed to update sitestage");
  }
}

export async function deleteSiteStage(id: number): Promise<SiteStage> {
  const sql = `DELETE FROM site_stages WHERE id = $1 RETURNING id `;
  try {
    const result = await DBService.pool.query(sql, [id]);
    return result.rows[0] as SiteStage;
  } catch (error) {
    console.error("DB Error in createSite:", error);
    throw new Error("Failed to delete sitestage");
  }
}
