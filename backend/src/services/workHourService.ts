import { DBService } from "./dbService";
import { WorkHours, WorkHoursFilter } from "../entities/workHours";

const sqlBaseQuery = `SELECT 
    id, 
    employee_id AS "employeeId", 
    work_date AS "workDate", 
    paid_by_meter AS "isPaidByMeter", 
    hours_worked AS "totalHoursWorked",
    meter_worked AS "metersWorked",
    start_time AS "startTime",
    end_time AS "endTime",
    notes,
    site_id AS "siteId"
    created_at AS "createdAt"
    FROM work_hours`;

export async function getAllWorkHours(): Promise<WorkHours[]> {
  const sqlQuery = sqlBaseQuery;
  try {
    const result = await DBService.pool.query(sqlQuery);

    return result.rows as WorkHours[];
  } catch (error: any) {
    console.error("DB Error:", error);
    throw new Error("Failed to fetch WorkHours");
  }
}

export async function getFilteredWorkHours(
  filters: WorkHoursFilter
): Promise<WorkHours[]> {
  const conditions: string[] = [];
  const values: any[] = [];

  if (filters.employeeId) {
    conditions.push(`employee_id = $${values.length + 1}`); //we need only the location and the value itself
    values.push(filters.employeeId);
  }

  if (filters.siteId) {
    conditions.push(`site_id = $${values.length + 1}`);
    values.push(filters.siteId);
  }

  if (filters.month) {
    conditions.push(`TO_CHAR(work_date, 'YYYY-MM') = $${values.length + 1}`);
    values.push(filters.month);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const sqlQuery = sqlBaseQuery + whereClause + `ORDER BY work_date DESC`;
  try {
    const result = await DBService.pool.query(sqlQuery, values);

    return result.rows as WorkHours[];
  } catch (error: any) {
    console.error("DB Error:", error); // זה ידפיס את השגיאה האמיתית
    throw new Error("Failed to fetch filtered workhours");
  }
}

export async function createWorkHour(data: WorkHours): Promise<WorkHours> {
  const {
    employeeId,
    workDate,
    isPaidByMeter,
    totalHoursWorked,
    metersWorked,
    startTime,
    endTime,
    notes,
    siteId,
  } = data;
  const sql = `
    INSERT INTO work_hours (employee_id, work_date, paid_by_meter, hours_worked, meter_worked, start_time,
    end_time, notes, site_id, NOW())
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING 
    id, 
    employee_id AS "employeeId", 
    work_date AS "workDate", 
    paid_by_meter AS "isPaidByMeter", 
    hours_worked AS "totalHoursWorked",
    meter_worked AS "metersWorked",
    start_time AS "startTime",
    end_time AS "endTime",
    notes,
    site_id AS "siteId"
    created_at AS "createdAt"
  `;

  const values = [
    employeeId,
    workDate,
    isPaidByMeter,
    totalHoursWorked,
    metersWorked,
    startTime,
    endTime,
    notes,
    siteId,
  ];

  try {
    const result = await DBService.pool.query(sql, values);
    return result.rows[0] as WorkHours;
  } catch (error) {
    console.error("DB Error in createSite:", error);
    throw new Error("Failed to create site");
  }
}

export async function updateWorkHour(
  id: number,
  data: WorkHours
): Promise<WorkHours> {
  const {
    employeeId,
    workDate,
    isPaidByMeter,
    totalHoursWorked,
    metersWorked,
    startTime,
    endTime,
    notes,
    siteId,
  } = data;

  const sql = `
      UPDATE work_hours
      SET employee_id = $1, work_date = $2, paid_by_meter = $3, hours_worked = $4, meter_worked = $5
      start_time = $6, end_time = $7, notes= $8, site_id = $9
      WHERE id = $7
      RETURNING 
    id, 
    employee_id AS "employeeId", 
    work_date AS "workDate", 
    paid_by_meter AS "isPaidByMeter", 
    hours_worked AS "totalHoursWorked",
    meter_worked AS "metersWorked",
    start_time AS "startTime",
    end_time AS "endTime",
    notes,
    site_id AS "siteId"
    created_at AS "createdAt"
    `;
  const values = [
    employeeId,
    workDate,
    isPaidByMeter,
    totalHoursWorked,
    metersWorked,
    startTime,
    endTime,
    notes,
    siteId,
    id,
  ];
  try {
    const result = await DBService.pool.query(sql, values);
    return result.rows[0] as WorkHours;
  } catch (error) {
    console.error("DB Error in updateSite:", error);
    throw new Error("Failed to update WorkHours");
  }
}

export async function deleteWorkHours(id: number): Promise<WorkHours> {
  const sql = `DELETE FROM work_hours WHERE id = $1 RETURNING id`;
  try {
    const result = await DBService.pool.query(sql, [id]);
    return result.rows[0] as WorkHours;
  } catch (error) {
    console.error("DB Error in deleteSite:", error);
    throw new Error("Failed to delete WorkHours");
  }
}
