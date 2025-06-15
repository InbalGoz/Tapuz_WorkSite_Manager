import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { DBService } from "./services/dbService";
import mainRouter from "./routes/mainRoutes";
import cors from "cors";

dotenv.config(); //ALLOWS READING THE .ENV FILE AND USE ITS VARIBELS IN THE PROCESS
const PORT = process.env.PORT || 5000; //

async function server() {
  try {
    await DBService.init(); //INITIATE THE DB CONNECTION
  } catch (error) {
    console.error(" Failed to initialize DB", error);
    process.exit(1);
  }
  const app = express();
  /*  מידלוואר זה פונקציה שפועלת בזמן שבין קבלת בקשה לשרת ועד החזרת תשובה במהלך הזמן הזה הוא יכול לבצע כמה דברים כגון: לבדוק או לשנות את אובייקט הבקשה או אובייקט התשובה, לטפל בשגיאות ועוד*/
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true, // אם את שולחת עוגיות או auth
    })
  );
  app.use(mainRouter); //defines the routes

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

server();
