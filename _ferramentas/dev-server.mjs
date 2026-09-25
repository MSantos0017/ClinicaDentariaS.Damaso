import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const ROOT = 'C:/Users/migue/OneDrive/GITHUB/ClinicaDentariaS.Damaso';
const PORT = 5173;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

http
  .createServer(async (req, res) => {
    try {
      let rel = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      if (rel.endsWith('/')) rel += 'index.html';
      const file = path.join(ROOT, rel);
      if (!file.startsWith(path.resolve(ROOT))) {
        res.writeHead(403).end('forbidden');
        return;
      }
      await stat(file);
      let body = await readFile(file);
      const ext = path.extname(file).toLowerCase();
      const tipo = TIPOS[ext] || 'application/octet-stream';
      const cabecalhos = {
        'Content-Type': tipo,
        // imita a cache do .htaccess para que a auditoria seja realista
        // CSS, JS e HTML sem cache: em desenvolvimento, uma cache longa faz
        // o navegador servir versões antigas e dá diagnósticos enganadores.
        // As imagens mantêm cache longa, como em produção.
        'Cache-Control': /\.(css|js|html)$/.test(ext)
          ? 'no-store'
          : 'public, max-age=31536000, immutable',
      };

      // comprime texto, tal como o mod_deflate fará em produção
      const comprimivel = /^(text\/|application\/(json|manifest\+json|xml))/.test(tipo);
      if (comprimivel && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
        body = gzipSync(body);
        cabecalhos['Content-Encoding'] = 'gzip';
        cabecalhos.Vary = 'Accept-Encoding';
      }

      res.writeHead(200, cabecalhos);
      res.end(body);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404</h1>');
    }
  })
  .listen(PORT, () => console.log('servidor pronto em http://localhost:' + PORT));
