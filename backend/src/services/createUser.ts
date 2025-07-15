import bcrypt from "bcrypt";
import { DBService } from "./dbService";

async function createUser() {
  const username = "inbal123";
  const email = "inbal@gmail.com";
  const full_name = "Inbal Gozland";
  const plainPassword = "Hdm0312i99!";
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const sql = `
    INSERT INTO users (username, email, full_name, password_hash, created_at)
    VALUES ($1, $2, $3, $4, NOW())
  `;
  await DBService.pool.query(sql, [username, email, full_name, passwordHash]);
  console.log("User created successfully");
  process.exit();
}

createUser().catch((err) => {
  console.error("Failed to create user:", err);
  process.exit(1);
});

// to run it -- ts-node seedUsers.ts or js = node seedUsers.js
