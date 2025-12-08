#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Usage examples:
//  node scripts/optimize-images.mjs                -> process all source images
//  node scripts/optimize-images.mjs foto1.jpg foto2.png
//  node scripts/optimize-images.mjs --files=foto1.jpg,foto2.png
//  node scripts/optimize-images.mjs --help         -> show help
// The script will SKIP an image if all output variants already exist and are newer than the source.

// Config
const SRC_DIR = path.resolve('public', 'images', 'home');
const TARGET_WIDTHS = [640, 1024, 1600];
const INPUT_EXTS = new Set(['.jpg', '.jpeg', '.png']);

const AVIF_QUALITY = 45; // smaller, good quality
const WEBP_QUALITY = 70;
const JPG_QUALITY = 75;

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true }).catch(() => {});
}

function outName(base, width, ext) {
  // base: full path without extension
  return `${base}-${width}${ext}`;
}

function variantPaths(baseOut) {
  const paths = [];
  for (const width of TARGET_WIDTHS) {
    paths.push(outName(baseOut, width, '.avif'));
    paths.push(outName(baseOut, width, '.webp'));
    paths.push(outName(baseOut, width, '.jpg'));
  }
  return paths;
}

async function fileMtime(p) {
  try {
    const st = await fs.stat(p);
    return st.mtimeMs;
  } catch {
    return 0; // treat missing as very old
  }
}

async function shouldSkip(filePath, baseOut) {
  // Skip if ALL variant files exist and are newer than source
  const srcTime = await fileMtime(filePath);
  const variants = variantPaths(baseOut);
  const optimizedPath = path.join(path.dirname(filePath), `${path.basename(filePath, path.extname(filePath))}.optimized.jpg`);
  variants.push(optimizedPath);
  for (const v of variants) {
    const t = await fileMtime(v);
    if (t === 0 || t < srcTime) {
      return false; // missing or older variant -> must (re)process
    }
  }
  return true; // all exist and are fresh
}

async function processOne(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext); // without ext
  const baseOut = path.join(dir, baseName);

  if (await shouldSkip(filePath, baseOut)) {
    console.log(`Skip (up-to-date): ${path.basename(filePath)}`);
    return;
  }

  const input = sharp(filePath, { limitInputPixels: false });
  const meta = await input.metadata();

  for (const width of TARGET_WIDTHS) {
    const pipeline = sharp(filePath, { limitInputPixels: false }).resize({ width, withoutEnlargement: true });

    // AVIF
    await pipeline
      .clone()
      .avif({ quality: AVIF_QUALITY, effort: 4 })
      .toFile(outName(baseOut, width, '.avif'));

    // WebP
    await pipeline
      .clone()
      .webp({ quality: WEBP_QUALITY })
      .toFile(outName(baseOut, width, '.webp'));

    // Progressive JPEG as fallback
    await pipeline
      .clone()
      .jpeg({ quality: JPG_QUALITY, progressive: true, mozjpeg: true })
      .toFile(outName(baseOut, width, '.jpg'));
  }

  // Also write a single optimized fallback (original size, progressive jpeg)
  const optimizedPath = path.join(dir, `${baseName}.optimized.jpg`);
  await sharp(filePath, { limitInputPixels: false })
    .jpeg({ quality: JPG_QUALITY, progressive: true, mozjpeg: true })
    .toFile(optimizedPath);

  // Optionally replace original JPG/JPEG with optimized one to immediately improve current refs
  if (ext === '.jpg' || ext === '.jpeg') {
    await fs.copyFile(optimizedPath, filePath);
  }

  console.log(`Optimized: ${path.basename(filePath)} -> variants at [${TARGET_WIDTHS.join(', ')}]`);
}

function parseArgs() {
  const argv = process.argv.slice(2);
  const opts = { fileNames: [] };
  for (const a of argv) {
    if (a === '--help' || a === '-h') {
      opts.help = true;
    } else if (a.startsWith('--files=')) {
      const list = a.slice(8).split(',').map(s => s.trim()).filter(Boolean);
      opts.fileNames.push(...list);
    } else if (!a.startsWith('--')) {
      opts.fileNames.push(a.trim());
    }
  }
  return opts;
}

function printHelp() {
  console.log(`Image optimizer

Usage:
  node scripts/optimize-images.mjs                Process all images in ${SRC_DIR}
  node scripts/optimize-images.mjs foto1.jpg foto2.png
  node scripts/optimize-images.mjs --files=foto1.jpg,foto2.png

Options:
  --files=LIST   Comma-separated list of file names in the source folder
  -h, --help     Show this help message

Behavior:
  Skips images if all output variants (.avif,.webp,.jpg at widths ${TARGET_WIDTHS.join(', ')}, plus optimized fallback) exist and are newer than source.
`);
}

async function main() {
  const args = parseArgs();
  if (args.help) {
    printHelp();
    return;
  }
  await ensureDir(SRC_DIR);
  const entries = await fs.readdir(SRC_DIR);
  const allCandidates = entries.filter(name => INPUT_EXTS.has(path.extname(name).toLowerCase()));

  let selected;
  if (args.fileNames.length > 0) {
    const requestedSet = new Set(args.fileNames);
    const found = allCandidates.filter(name => requestedSet.has(name));
    const missing = [...requestedSet].filter(n => !found.includes(n));
    if (missing.length) {
      console.warn('Files not found or unsupported:', missing.join(', '));
    }
    selected = found;
    if (selected.length === 0) {
      console.warn('No valid images matched your selection. Aborting.');
      return;
    }
  } else {
    selected = allCandidates;
  }

  if (selected.length === 0) {
    console.warn(`No source images found in ${SRC_DIR}. Place .jpg/.jpeg/.png files there and re-run.`);
    return;
  }

  for (const name of selected) {
    const f = path.join(SRC_DIR, name);
    try {
      await processOne(f);
    } catch (e) {
      console.error(`Failed optimizing ${f}:`, e);
    }
  }

  console.log('Done.');
}

main();
