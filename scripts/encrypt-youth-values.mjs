import { createCipheriv, pbkdf2Sync, randomBytes } from "node:crypto";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { writeFile } from "node:fs/promises";

const inputPath = resolve(process.argv[2] || "local/youth-values-source.mjs");
const outputPath = resolve(process.argv[3] || "private-homepage/youth-values/data.js");
const password = process.env.YOUTH_VALUES_PASSWORD;

if (!password) {
  throw new Error("Set YOUTH_VALUES_PASSWORD before generating the encrypted payload.");
}

const moduleUrl = `${pathToFileURL(inputPath).href}?generated=${Date.now()}`;
const { default: payload } = await import(moduleUrl);
const plaintext = Buffer.from(JSON.stringify(payload), "utf8");
const salt = randomBytes(16);
const iv = randomBytes(12);
const iterations = 210000;
const key = pbkdf2Sync(password, salt, iterations, 32, "sha256");
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
const sealed = Buffer.concat([encrypted, authTag]);

const wrapper = {
  version: 1,
  algorithm: "AES-GCM",
  kdf: "PBKDF2-SHA256",
  iterations,
  salt: salt.toString("base64"),
  iv: iv.toString("base64"),
  payload: sealed.toString("base64"),
};

const output = `window.YOUTH_VALUES_LOCKED = ${JSON.stringify(wrapper)};\n`;
await writeFile(outputPath, output, "utf8");
console.log(`Encrypted ${payload.questions.length} questions to ${outputPath}`);
