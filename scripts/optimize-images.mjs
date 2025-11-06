#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

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

async function processOne(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext); // without ext
  const baseOut = path.join(dir, baseName);

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

async function main() {
  await ensureDir(SRC_DIR);
  const entries = await fs.readdir(SRC_DIR);
  const targets = entries
    .filter(name => INPUT_EXTS.has(path.extname(name).toLowerCase()))
    .map(name => path.join(SRC_DIR, name));

  if (targets.length === 0) {
    console.warn(`No source images found in ${SRC_DIR}. Place .jpg/.jpeg/.png files there and re-run.`);
    return;
  }

  for (const f of targets) {
    try {
      await processOne(f);
    } catch (e) {
      console.error(`Failed optimizing ${f}:`, e);
    }
  }

  console.log('Done.');
}

main();
