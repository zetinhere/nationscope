// Tiny static server for NationScope: serves app/ at its root for local checks
// and screenshots. Usage: node serve.ts [--port 8080]
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const APP_DIR = join(fileURLToPath(new URL(".", import.meta.url)), "app");
const PORT = Number(process.argv.find((arg) => arg.startsWith("--port="))?.split("=")[1]
  || process.argv[process.argv.indexOf("--port") + 1]
  || 8080);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const server = createServer((req, res) => {
  const rawPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const safePath = normalize(rawPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(APP_DIR, safePath === "/" ? "index.html" : safePath);
  if (!filePath.startsWith(APP_DIR) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("not found");
    return;
  }
  res.writeHead(200, { "content-type": TYPES[extname(filePath)] || "application/octet-stream" });
  res.end(readFileSync(filePath));
});

server.listen(PORT, () => {
  console.log(`NationScope serving app/ at http://localhost:${PORT}/`);
});
