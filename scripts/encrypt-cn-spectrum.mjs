import { createHash, pbkdf2Sync, randomBytes, createCipheriv } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const password = process.env.CN_SPECTRUM_PASSWORD;
if (!password) {
  throw new Error("Set CN_SPECTRUM_PASSWORD in the current process before running this script.");
}

const root = resolve(import.meta.dirname, "..");
const sourceUrl = `${pathToFileURL(resolve(root, "local", "cn-spectrum-source.mjs")).href}?v=${Date.now()}`;
const { default: payload } = await import(sourceUrl);
const iterations = 210000;
const salt = randomBytes(16);
const iv = randomBytes(12);
const key = pbkdf2Sync(password, salt, iterations, 32, "sha256");
const cipher = createCipheriv("aes-256-gcm", key, iv);
const ciphertext = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
const tag = cipher.getAuthTag();
const locked = {
  version: 1,
  algorithm: "AES-GCM",
  kdf: "PBKDF2-SHA256",
  iterations,
  salt: salt.toString("base64"),
  iv: iv.toString("base64"),
  payload: Buffer.concat([ciphertext, tag]).toString("base64"),
  digest: createHash("sha256").update(JSON.stringify(payload)).digest("hex"),
};

await writeFile(
  resolve(root, "private-homepage", "cn-spectrum", "data.js"),
  `window.CN_SPECTRUM_LOCKED = ${JSON.stringify(locked)};\n`,
  "utf8",
);
console.log(`Encrypted ${payload.questions.length} questions into private-homepage/cn-spectrum/data.js`);
