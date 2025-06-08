import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { DBService } from "./services/dbService";
import mainRouter from "./routes/mainRoutes";

dotenv.config();

async function server() {
  try {
    await DBService.init();
  } catch (error) {
    console.error(" Failed to initialize DB", error);
    process.exit(1);
  }
  const app = express();
  app.use(mainRouter);
  app.use(express.json());

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
}

server();
