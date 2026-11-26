// NationScope entrypoint (Node 22, standard library only). The site is plain
// static files under app/ — one page, a stylesheet, and small JavaScript
// modules that draw the charts and switch pages by address, with the data
// baked into app/data.js. Nothing is fetched at run time.
//
// This program hands the entry in: it copies app/ and screenshots/ from
// beside this file to /output and writes /output/dossier.json with
// buildDossier from the kit's vendored library. Leave
// vendor/makefun-frontend.ts untouched: the scorer requires dossier.json to
// be byte for byte what its own copy writes.
//
// Serve the site locally with `node serve.ts`, then open
// http://localhost:8080. Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function copyTree(name) {
  const from = join(here, name);
  if (!existsSync(from)) return;
  cpSync(from, join(out, name), { recursive: true });
}

mkdirSync(out, { recursive: true });
copyTree('app');
mkdirSync(join(out, 'screenshots'), { recursive: true });
copyTree('screenshots');

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes
// the bytes; the others refuse an entry the scorer would refuse (more than 4
// screenshots or one over 256 KiB; more than 993 files and directories in
// app/ or 16 MiB of app files: app/ counts beside /output's own 1000-entry
// cap, its screenshots/ and dossier.json).
const DOSSIER_OPTIONS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

writeFileSync(join(out, 'dossier.json'), buildDossier(out, DOSSIER_OPTIONS));
