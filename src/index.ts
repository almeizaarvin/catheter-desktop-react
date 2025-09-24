import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { Pool } from "pg";
import { hashPassword, verifyPassword } from "./auth-util";
import client from "./pages/db/db";

// --- Electron window setup ---
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    height: 1000,
    width: 1500,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle login dari renderer
// IPC: login
ipcMain.handle("auth:login", async (_evt, { username, password }) => {
  const { rows } = await client.query(
    `SELECT id, username, scope, salt_b64, password_b64, name
     FROM users
     WHERE username = $1`,
    [username]
  );
  if (rows.length === 0) return { ok: false, message: "User not found" };

  const u = rows[0];
  const ok = await verifyPassword(password, u.salt_b64, u.password_b64);
  if (!ok) return { ok: false, message: "Wrong password!" };

  return {
    ok: true,
    user: { id: u.id, username: u.username, scope: u.scope, name: u.name },
  };
});

ipcMain.handle("auth:register", async (_evt, { username, email, password }) => {
  try {
    const { rows } = await client.query(
      "SELECT id FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (rows.length > 0) {
      return { ok: false, message: "Username atau email sudah terdaftar!" };
    }

    const { salt_b64, password_b64 } = await hashPassword(password);

    // insert user baru
    await client.query(
      `INSERT INTO users (username, email, scope, salt_b64, password_b64, name)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [username, email, "user", salt_b64, password_b64, username]
    );

    return { ok: true };
  } catch (err) {
    console.error("Register error:", err);
    return { ok: false, message: "Terjadi kesalahan server." };
  }
});
