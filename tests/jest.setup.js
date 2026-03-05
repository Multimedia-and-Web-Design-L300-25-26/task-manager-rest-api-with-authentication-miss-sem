import mongoose from "mongoose";
import { spawn } from "child_process";
import { mkdtempSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import net from "net";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.JWT_SECRET = "test_jwt_secret";

const MONGOD_BIN = join(
  __dirname,
  "../node_modules/.cache/mongodb-memory-server/mongod-x64-win32-8.2.1.exe"
);
const PORT = 27199;

let mongodProcess;

function waitForPort(port, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      const sock = new net.Socket();
      sock.setTimeout(500);
      sock
        .on("connect", () => { sock.destroy(); resolve(); })
        .on("error", () => {
          sock.destroy();
          if (Date.now() - start > timeout) return reject(new Error("mongod did not start in time"));
          setTimeout(check, 200);
        })
        .on("timeout", () => {
          sock.destroy();
          if (Date.now() - start > timeout) return reject(new Error("mongod did not start in time"));
          setTimeout(check, 200);
        })
        .connect(port, "127.0.0.1");
    };
    check();
  });
}

beforeAll(async () => {
  const dbPath = mkdtempSync(join(tmpdir(), "mongo-test-"));

  mongodProcess = spawn(MONGOD_BIN, [
    "--port", String(PORT),
    "--dbpath", dbPath,
    "--bind_ip", "127.0.0.1",
    "--noauth",
  ], { stdio: "ignore" });

  await waitForPort(PORT, 30000);
  await mongoose.connect(`mongodb://127.0.0.1:${PORT}/testdb`);
}, 60000);

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  if (mongodProcess) mongodProcess.kill();
}, 30000);
