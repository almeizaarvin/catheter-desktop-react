import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5433,
  user: "myuser",
  password: "mypass",
  database: "electron_app",
});

client
  .connect()
  .then(() => console.log("✅ Connected to Postgres"))
  .catch((err) => console.error("❌ DB connection error:", err));

export default client;
