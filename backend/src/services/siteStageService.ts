import { SiteStage } from "../entities/siteStage";
import { DBService } from "./dbService";

const sqlBaseQuery = `SELECT 
ss.id
,ss.site_id AS "siteId"
,ss.stage_id AS "stageId"
,ss.notes
,ss.image_url AS "imageUrl"
,ss.created_at AS "createdAt"
,st.name  
FROM site_stages ss
JOIN stages st ON ss.stage_id = st.id
`;

export async function getAllsiteStages(id: number): Promise<SiteStage[]> {
  const sqlQuery =
    sqlBaseQuery +
    `WHERE ss.site_id = $1
    ORDER BY ss.created_at`;
  try {
    const result = await DBService.pool.query(sqlQuery, [id]);
    return result.rows as SiteStage[];
  } catch (error: any) {
    console.error("DB Error:", error);
    throw new Error("Failed to fetch siteStages");
  }
}

export async function createSiteStage(data: SiteStage): Promise<SiteStage> {
  const { siteId, stageId, notes, imageUrl } = data;
  const sql = `INSERT INTO site_stages (site_id, stage_id, notes, image_url, created_at)
    VALUES ($1, $2, $3, $4, NOW())
    RETURNING
    id, site_id AS "siteId", stage_id AS "stageId" 
    ,notes,image_url AS "imageUrl"
    ,created_at AS "createdAt"`;
  const values = [siteId, stageId, notes, imageUrl];

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
  const { siteId, stageId, notes, imageUrl } = data;
  const sql = `UPDATE site_stages
    SET notes = $1, image_Url= $2
    WHERE id = $3
    RETURNING
    id, site_id AS "siteId", stage_id AS "stageId" 
    ,notes,image_url AS "imageUrl"
    ,created_at AS "createdAt"`;
  const values = [notes, imageUrl, id];
  try {
    const result = await DBService.pool.query(sql, values);
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
