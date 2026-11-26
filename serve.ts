// A tiny static server for looking at app/ while building: `node serve.ts`
// serves it at http://localhost:8080 (`--port` for another port). It serves
// files only from app/ and nothing else — a request that escapes the folder
// gets a 403, a missing file a 404.

import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('./app', import.meta.url)));

const TYPES = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.ico', 'image/x-icon'],
  ['.woff2', 'font/woff2'],
  ['.webmanifest', 'application/manifest+json'],
]);

function pickPort() {
  const i = process.argv.indexOf('--port');
  const wanted = i === -1 ? 8080 : Number(process.argv[i + 1]);
  return Number.isInteger(wanted) && wanted > 0 && wanted < 65536 ? wanted : 8080;
}

function resolveInside(pathname) {
  const decoded = decodeURIComponent(pathname);
  const withIndex = decoded.endsWith('/') ? `${decoded}index.html` : decoded;
  const file = resolve(join(ROOT, normalize(withIndex)));
  if (file !== ROOT && !file.startsWith(ROOT + sep)) return null;
  return file;
}

createServer((request, response) => {
  const url = new URL(request.url ?? '/', 'http://localhost');
  let file;
  try {
    file = resolveInside(url.pathname);
  } catch {
    response.writeHead(400).end('bad request');
    return;
  }
  if (!file) {
    response.writeHead(403).end('forbidden');
    return;
  }
  let size;
  try {
    const stats = statSync(file);
    if (!stats.isFile()) throw new Error('not a file');
    size = stats.size;
  } catch {
    response.writeHead(404).end('not found');
    return;
  }
  response.writeHead(200, {
    'content-type': TYPES.get(extname(file).toLowerCase()) ?? 'application/octet-stream',
    'content-length': size,
    'cache-control': 'no-store',
  });
  createReadStream(file).pipe(response);
}).listen(pickPort(), '127.0.0.1', () => {
  console.log(`app/ is on http://localhost:${pickPort()}`);
});
