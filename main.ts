// NationScope hand-in: copies app/ and screenshots/ to the output directory and
// writes the dossier buildDossier produces from them, byte for byte.
// Runs on Node 22 with the standard library only, no network, no install.
// The output directory is /output, or MAKEFUN_OUTPUT_DIR when that is set.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const REPO_ROOT = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
  app_path_max_bytes: 1000,
};

function copyTree(source, target) {
  if (!existsSync(source)) {
    throw new Error(`missing input directory: ${source}`);
  }
  mkdirSync(dirname(target), { recursive: true });
  cpSync(source, target, { recursive: true });
}

// Hand the site in: a clean output directory, the site's files, then the dossier.
// The output directory itself is a mount point in the grader, so only its
// contents are cleared — removing the directory itself fails there.
function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const entry of readdirSync(OUTPUT_DIR)) {
    rmSync(join(OUTPUT_DIR, entry), { recursive: true, force: true });
  }
  copyTree(join(REPO_ROOT, "app"), join(OUTPUT_DIR, "app"));
  copyTree(join(REPO_ROOT, "screenshots"), join(OUTPUT_DIR, "screenshots"));
  const dossier = buildDossier(OUTPUT_DIR, DOSSIER_CAPS);
  writeFileSync(join(OUTPUT_DIR, "dossier.json"), dossier);
  console.log(`wrote ${OUTPUT_DIR}/dossier.json (${dossier.length} bytes)`);
}

main();
