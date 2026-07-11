// Bundles every api/**/*.ts function into a self-contained .mjs file that
// inlines its src/server/* imports, then removes the original .ts source.
//
// Why this exists: Vercel's Node.js function builder compiles each api/*.ts
// file individually but does not bundle sibling imports outside api/ into
// the same output. Combined with this project's "type": "module" (native
// Node ESM, which requires explicit file extensions on relative imports),
// extension-less imports like `from "../src/server/geo"` resolve fine under
// Vite/tsx locally but throw ERR_MODULE_NOT_FOUND at runtime on Vercel.
// Bundling removes the cross-file imports entirely, so there's nothing left
// for Node's strict ESM resolver to fail on.
import { build } from "esbuild";
import { readdirSync, statSync, rmSync } from "fs";
import { join, relative } from "path";

const API_DIR = "api";

function findApiEntrypoints(dir) {
  const entries = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      entries.push(...findApiEntrypoints(full));
    } else if (name.endsWith(".ts")) {
      entries.push(full);
    }
  }
  return entries;
}

const entrypoints = findApiEntrypoints(API_DIR);

for (const entry of entrypoints) {
  const outfile = entry.replace(/\.ts$/, ".mjs");
  await build({
    entryPoints: [entry],
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    packages: "external", // keep node_modules deps external — Vercel installs them
    outfile,
  });
  rmSync(entry);
  console.log(`[bundle-api] ${relative(process.cwd(), entry)} -> ${relative(process.cwd(), outfile)}`);
}

console.log(`[bundle-api] Bundled ${entrypoints.length} function(s).`);
