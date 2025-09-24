import crypto from "crypto";

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256");

  return {
    salt_b64: salt.toString("base64"),
    password_b64: hash.toString("base64"),
  };
}

export async function verifyPassword(
  password: string,
  salt_b64: string,
  password_b64: string
): Promise<boolean> {
  const salt = Buffer.from(salt_b64, "base64");
  const stored = Buffer.from(password_b64, "base64");

  const hash = crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256");
  return crypto.timingSafeEqual(stored, hash);
}
