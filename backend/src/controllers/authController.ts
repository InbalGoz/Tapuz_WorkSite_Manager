import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ResService } from "../services/resService";
import { loginUser } from "../services/authService";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function login(req: Request, res: Response) {
  try {
    const userRes = await loginUser(req.body);

    const token = jwt.sign({ userId: userRes.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: userRes.id,
        username: userRes.username,
        email: userRes.email,
        full_name: userRes.full_name,
      },
    });
  } catch (err: any) {
    ResService.handleErr(res, err);
  }
}
