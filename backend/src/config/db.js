console.log("🔍 Loading db.js...");
import pg from "pg"; //אובייקט שקשור לPOSTGRESQL
import dotenv from "dotenv";

dotenv.config();

// pg.Pool הוא Pool constructor
const { Pool } = pg;

console.log("🔍 .env loaded, DB_DATABASE =", process.env.DB_DATABASE);

// יוצרים Pool של חיבורים עם פרטי ההתחברות
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// מאזין לאירוע חיבור מוצלח
pool.on("connect", () => {
  console.log(`Connected to PostgreSQL: ${process.env.DB_DATABASE}`);
});

// מאזין לשגיאות בלתי צפויות
pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
  process.exit(-1);
});

// מייצא את ה־pool לשימוש בקובצים אחרים
export { pool };
