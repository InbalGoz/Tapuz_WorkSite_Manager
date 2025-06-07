import "dotenv/config"; // כבר טוען את ההגדרות מקובץ .env
import express from "express";
import pg from "pg";

const app = express();

// יצירת Pool של pg עם משתני הסביבה:
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// בדיקה ראשונית של החיבור:
pool
  .connect()
  .then((client) => {
    console.log("good conection");
    client.release();
  })
  .catch((err) => {
    console.error("❌ שגיאת התחברות ל-PostgreSQL:", err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
