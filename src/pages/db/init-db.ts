import client from "./db";
import crypto from "crypto";

export async function initDb() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      scope TEXT,
      salt_b64 TEXT NOT NULL,
      password_b64 TEXT NOT NULL
    )
  `);

  // seed admin
  const { rows } = await client.query(
    `SELECT id FROM users WHERE username = $1`,
    ["admin"]
  );
  if (rows.length === 0) {
    const salt = crypto.randomBytes(16);
    const salt_b64 = salt.toString("base64");
    const password = "123";
    const hash = crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256");
    const password_b64 = hash.toString("base64");

    await client.query(
      `INSERT INTO users (name, email, username, scope, salt_b64, password_b64)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        "Administrator",
        "admin@example.com",
        "admin",
        "superadmin",
        salt_b64,
        password_b64,
      ]
    );

    console.log("✅ User admin seeded (username=admin, password=123)");
  }
}
