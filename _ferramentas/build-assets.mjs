import sharp from 'sharp';
import { mkdir, copyFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const PROJ = 'C:/Users/migue/OneDrive/GITHUB/ClinicaDentariaS.Damaso';
const SCRATCH = 'C:/Users/migue/AppData/Local/Temp/claude/C--Users-migue-OneDrive-GITHUB-ClinicaDentariaS-Damaso/b3888c45-da91-46e2-b4be-2f04aaff68b7/scratchpad';
const IMG = path.join(PROJ, 'assets/img');
const TEAM = path.join(IMG, 'equipa');
const FONTS = path.join(PROJ, 'assets/fonts');
const ICONS = path.join(PROJ, 'assets/icons');

for (const d of [IMG, TEAM, FONTS, ICONS]) await mkdir(d, { recursive: true });

const log = [];
async function emit(pipeline, out, { avif = true } = {}) {
  const webp = out + '.webp';
  await pipeline.clone().webp({ quality: 80, effort: 5 }).toFile(webp);
  log.push([path.relative(PROJ, webp), (await stat(webp)).size]);
  if (avif) {
    const a = out + '.avif';
    await pipeline.clone().avif({ quality: 52, effort: 5 }).toFile(a);
    log.push([path.relative(PROJ, a), (await stat(a)).size]);
  }
}

// ---- Fotografias de cenário (16:9 / 4:3) ----
const scenes = [
  { src: 'raw/1606811841689-23dfddce3e95.jpg', name: 'hero', widths: [768, 1280, 1920], ratio: 4 / 3, pos: 'attention' },
  { src: 'raw/1629909613654-28e377c37b09.jpg', name: 'clinica', widths: [640, 1000], ratio: 4 / 3, pos: 'centre' },
  { src: 'raw/1588776814546-1ffcf47267a5.jpg', name: 'diagnostico', widths: [480, 800], ratio: 1, pos: 'centre' },
  { src: 'raw/1600170311833-c2cf5280ce49.jpg', name: 'implantologia', widths: [768, 1280, 1920], ratio: 16 / 9, pos: 'centre' },
  { src: 'raw/1609840114035-3c981b782dfe.jpg', name: 'alinhadores', widths: [480, 800], ratio: 3 / 2, pos: 'centre' },
];

for (const s of scenes) {
  for (const w of s.widths) {
    const h = Math.round(w / s.ratio);
    const p = sharp(path.join(SCRATCH, s.src)).resize(w, h, { fit: 'cover', position: s.pos });
    await emit(p, path.join(IMG, `${s.name}-${w}`));
  }
}

// ---- Equipa (retratos 4:5) ----
const team = [
  ['Cármen.jpg', 'carmen'],
  ['Tó.jpg', 'antonio'],
  ['Fabiana.jpg', 'fabiana'],
  ['Isabel.jpg', 'isabel'],
  ['Elsa.jpg', 'elsa'],
  ['Andreia.jpg', 'andreia'],
  ['Bebiana.jpg', 'bebiana'],
];

for (const [file, slug] of team) {
  for (const w of [400, 600]) {
    const p = sharp(path.join(PROJ, file)).resize(w, Math.round(w * 1.25), {
      fit: 'cover',
      position: 'top',
      withoutEnlargement: false,
    });
    await emit(p, path.join(TEAM, `${slug}-${w}`));
  }
}

// ---- Logótipo (mantém transparência) ----
for (const w of [180, 360]) {
  const p = sharp(path.join(PROJ, 'Logo1.png')).resize(w, w, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
  await emit(p, path.join(IMG, `logo-${w}`));
}
await sharp(path.join(PROJ, 'Logo1.png')).resize(360, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9, palette: true }).toFile(path.join(IMG, 'logo.png'));
log.push(['assets/img/logo.png', (await stat(path.join(IMG, 'logo.png'))).size]);

// ---- Selo Scoring ----
for (const w of [160, 320]) {
  const p = sharp(path.join(PROJ, 'Scoring.png')).resize(w, w, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
  await emit(p, path.join(IMG, `scoring-${w}`));
}

// ---- Favicons (logótipo sobre fundo marfim para legibilidade em tema escuro) ----
const IVORY = { r: 251, g: 249, b: 245, alpha: 1 };
for (const size of [32, 180, 192, 512]) {
  const pad = Math.round(size * 0.12);
  const mark = await sharp(path.join(PROJ, 'Logo1.png'))
    .resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const name = size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`;
  await sharp({ create: { width: size, height: size, channels: 4, background: IVORY } })
    .composite([{ input: mark, top: pad, left: pad }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(ICONS, name));
  log.push([`assets/icons/${name}`, (await stat(path.join(ICONS, name))).size]);
}

// ---- Fontes ----
await copyFile(path.join(SCRATCH, 'fonts/fraunces-var-600-normal.woff2'), path.join(FONTS, 'fraunces-latin.woff2'));
await copyFile(path.join(SCRATCH, 'fonts/manrope-var-400_800-normal.woff2'), path.join(FONTS, 'manrope-latin.woff2'));

const total = log.reduce((a, [, s]) => a + s, 0);
for (const [f, s] of log) console.log(f.padEnd(42), (s / 1024).toFixed(1) + ' KB');
console.log('\nTOTAL imagens:', (total / 1024).toFixed(0), 'KB em', log.length, 'ficheiros');
