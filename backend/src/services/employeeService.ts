import { Employee } from "../entities/employee";
import { DBService } from "./dbService";

const sql = `SELECT
  id,
  first_name AS "firstName",
  last_name AS "lastName",
  id_number AS "idNumber",
  visa_number AS "visaNumber",
  has_visa AS "hasVisa",
  has_vehicle AS "hasVehicle",
  phone_number AS "phoneNumber",
  created_at AS "createdAt"
FROM employees`;

export async function getAllEmployees(): Promise<Employee[]> {
  const sqlQuery = sql;
  try {
    const result = await DBService.pool.query(sqlQuery);

    return result.rows as Employee[];
  } catch (error: any) {
    console.error("DB Error:", error); // זה ידפיס את השגיאה האמיתית
    throw new Error("Failed to fetch employees");
  }
}

export async function getEmployeeById(id: number): Promise<Employee> {
  const sqlQuery = sql + `WHERE id = ($1)`;
  try {
    const result = await DBService.pool.query(sqlQuery, [id]);
    return (result.rows[0] as Employee) || null;
  } catch (error: any) {
    throw new Error("Failed to fetch employee by ID: " + error.message);
  }
}

export async function createEmployee(data: Employee): Promise<Employee> {
  const {
    firstName,
    lastName,
    idNumber,
    visaNumber,
    hasVisa,
    hasVehicle,
    phoneNumber,
  } = data;
  const sql = `
    INSERT INTO employees (firstName, lastName, idNumber, visaNumber, hasVisa, hasVehicle, phoneNumber, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
    RETURNING 
      id,
  first_name AS "firstName",
  last_name AS "lastName",
  id_number AS "idNumber",
  visa_number AS "visaNumber",
  has_visa AS "hasVisa",
  has_vehicle AS "hasVehicle",
  phone_number AS "phoneNumber",
  created_at AS "createdAt"
  `;

  const values = [
    firstName,
    lastName,
    idNumber || null,
    visaNumber || null,
    hasVisa,
    hasVehicle,
    phoneNumber || null,
  ];

  try {
    const result = await DBService.pool.query(sql, values);
    return result.rows[0] as Employee;
  } catch (error) {
    console.error("DB Error in createEmployee:", error);
    throw new Error("Failed to create Employee");
  }
}

export async function updateEmployee(
  id: number,
  data: Employee
): Promise<Employee> {
  const {
    firstName,
    lastName,
    idNumber,
    visaNumber,
    hasVisa,
    hasVehicle,
    phoneNumber,
  } = data;
  const sql = `
      UPDATE employees
      SET firstName = $1, lastName = $2, idNumber = $3, visaNumber = $4, hasVisa = $5, hasVehicle = $6, phoneNumber = $7
      WHERE id = $8
      RETURNING 
      id,
  first_name AS "firstName",
  last_name AS "lastName",
  id_number AS "idNumber",
  visa_number AS "visaNumber",
  has_visa AS "hasVisa",
  has_vehicle AS "hasVehicle",
  phone_number AS "phoneNumber",
  created_at AS "createdAt"
    `;
  const values = [
    firstName,
    lastName,
    idNumber || null,
    visaNumber || null,
    hasVisa,
    hasVehicle,
    phoneNumber || null,
    id,
  ];
  try {
    const result = await DBService.pool.query(sql, values);
    return result.rows[0] as Employee;
  } catch (error) {
    console.error("DB Error in updateEmployee:", error);
    throw new Error("Failed to update Employee");
  }
}

export async function deleteEmployee(id: number): Promise<Employee> {
  const sql = `DELETE FROM employees WHERE id = $1 RETURNING id`;
  try {
    const result = await DBService.pool.query(sql, [id]);
    return result.rows[0] as Employee;
  } catch (error) {
    console.error("DB Error in deleteEmployee:", error);
    throw new Error("Failed to delete Employee");
  }
}
