import { DBService } from "./dbService";
import bcrypt from "bcrypt";
import { User, loginData } from "../entities/user";

export async function loginUser(userData: loginData): Promise<User> {
  const sql = `SELECT * FROM users WHERE username = $1`;
  try {
    const { username, password } = userData;
    const result = await DBService.pool.query(sql, [username]);

    const user = (result.rows[0] as User) || null;

    if (!user) {
      throw new Error("שם משתמש או אימייל לא קיימים");
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error("סיסמה שגויה");
    }
    return user;
  } catch (error: any) {
    throw new Error("Failed to fetch USER: " + error.message);
  }
}
