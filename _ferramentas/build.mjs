/* =====================================================================
   Gerador do site da Clínica Dentária S. Dâmaso.
   Produz as páginas em português na raiz e em inglês em /en/.
   Correr:  node _ferramentas/build.mjs
   ===================================================================== */

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { comum, paginas, conteudo } from './conteudo.mjs';
import { legal } from './conteudo-legal.mjs';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* Domínio final do site. Deixe vazio enquanto não houver domínio: nesse caso
   as etiquetas `canonical` e `hreflang` são omitidas, porque exigem URLs
   absolutos e é preferível não as ter do que tê-las erradas.
   Assim que souber o endereço, escreva-o aqui (sem barra final) e volte a
   correr o gerador. Exemplo: 'https://www.exemplo.pt' */
const DOMINIO = '';

const esc = (s) => String(s).replace(/&(?![a-z#0-9]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------------------------------------------------------------- */
/* Caminhos                                                          */
/* ---------------------------------------------------------------- */

// prefixo para chegar à raiz do site a partir da página atual
const prefixo = (lang) => (lang === 'pt' ? '' : '../');

// URL de uma página noutra ou na mesma língua, a partir da língua atual
function url(chave, langDestino, langAtual) {
  const ficheiro = paginas[chave][langDestino];
  if (langDestino === 'pt') return (langAtual === 'pt' ? '' : '../') + ficheiro;
  return (langAtual === 'en' ? '' : 'en/') + ficheiro;
}

// caminho absoluto dentro do site (para canonical/hreflang)
const caminhoSite = (chave, lang) => (lang === 'pt' ? '/' : '/en/') + (paginas[chave][lang] === 'index.html' ? '' : paginas[chave][lang]);

/* ---------------------------------------------------------------- */
/* Blocos reutilizáveis                                              */
/* ---------------------------------------------------------------- */

function cabecalhoHtml({ t, lang, chave, simples = false }) {
  const p = prefixo(lang);
  const ligacoes = t.nav
    .map((item) => {
      const destino = item.ancora
        ? (chave === 'inicio' ? `#${item.ancora}` : `${url('inicio', lang, lang)}#${item.ancora}`)
        : url(item.pagina, lang, lang);
      return `        <li><a href="${destino}">${esc(item.rotulo)}</a></li>`;
    })
    .join('\n');

  const trocaIdioma = `<a class="idioma" href="${url(chave, t.outroIdioma.codigo, lang)}" lang="${t.outroIdioma.codigo}" title="${esc(t.outroIdioma.titulo)}">${t.outroIdioma.rotulo}</a>`;

  const marca = `    <a class="marca" href="${url('inicio', lang, lang)}">
      <picture>
        <source type="image/avif" srcset="${p}assets/img/logo-180.avif 180w, ${p}assets/img/logo-360.avif 360w" sizes="56px">
        <source type="image/webp" srcset="${p}assets/img/logo-180.webp 180w, ${p}assets/img/logo-360.webp 360w" sizes="56px">
        <img src="${p}assets/img/logo.png" width="56" height="56" alt="" decoding="async">
      </picture>
      <span class="marca__texto"><strong>S. Dâmaso</strong><em>${lang === 'pt' ? 'Clínica Dentária' : 'Dental Practice'}</em></span>
    </a>`;

  if (simples) {
    return `<header class="cabecalho cabecalho--simples" id="cabecalho">
  <div class="cabecalho__barra">
${marca}
    <div class="cabecalho__accoes">
      ${trocaIdioma}
      <a class="botao botao--fantasma" href="${url('inicio', lang, lang)}">${esc(t.ui.voltarSite)}</a>
    </div>
  </div>
</header>`;
  }

  return `<header class="cabecalho" id="cabecalho">
  <div class="cabecalho__barra">
${marca}
    <nav class="navegacao" id="navegacao" aria-label="${lang === 'pt' ? 'Navegação principal' : 'Main navigation'}">
      <ul class="navegacao__lista">
${ligacoes}
      </ul>
      <a class="botao botao--primario navegacao__cta" href="${url('inicio', lang, lang)}#contactos">${esc(t.ui.marcar)}</a>
    </nav>
    <div class="cabecalho__accoes">
      ${trocaIdioma}
      <button class="hamburguer" id="hamburguer" type="button" aria-expanded="false" aria-controls="navegacao">
        <span class="hamburguer__linhas" aria-hidden="true"><span></span><span></span></span>
        <span class="sr-only">${esc(t.ui.abrirMenu)}</span>
      </button>
    </div>
  </div>
</header>
<div class="veu" id="veu" hidden></div>`;
}

function rodapeHtml({ t, lang, chave }) {
  const p = prefixo(lang);
  const inicio = url('inicio', lang, lang);
  const secao = (a) => (chave === 'inicio' ? `#${a}` : `${inicio}#${a}`);

  return `<footer class="rodape">
  <div class="envolvente rodape__grelha">
    <div class="rodape__marca">
      <picture>
        <source type="image/avif" srcset="${p}assets/img/logo-180.avif 180w, ${p}assets/img/logo-360.avif 360w" sizes="72px">
        <source type="image/webp" srcset="${p}assets/img/logo-180.webp 180w, ${p}assets/img/logo-360.webp 360w" sizes="72px">
        <img src="${p}assets/img/logo.png" width="72" height="72" loading="lazy" decoding="async" alt="${esc(t.rodape.altLogo)}">
      </picture>
      <p>${esc(t.rodape.descricao)}</p>
    </div>
    <div>
      <h2 class="rodape__titulo">${esc(t.rodape.colunaClinica)}</h2>
      <ul class="rodape__lista">
        <li><a href="${secao('clinica')}">${esc(t.nav[0].rotulo)}</a></li>
        <li><a href="${secao('especialidades')}">${esc(t.nav[1].rotulo)}</a></li>
        <li><a href="${url('implantologia', lang, lang)}">${esc(t.nav[2].rotulo)}</a></li>
        <li><a href="${url('ortodontia', lang, lang)}">${esc(t.especialidades.itens[1].nome)}</a></li>
        <li><a href="${url('odontopediatria', lang, lang)}">${esc(t.especialidades.itens[3].nome)}</a></li>
        <li><a href="${secao('equipa')}">${esc(t.nav[3].rotulo)}</a></li>
      </ul>
    </div>
    <div>
      <h2 class="rodape__titulo">${esc(t.rodape.colunaContactos)}</h2>
      <ul class="rodape__lista">
        <li><a href="tel:${comum.telefoneLink}">${comum.telefone}</a></li>
        <li><a href="tel:${comum.telemovelLink}">${comum.telemovel}</a></li>
        <li><a href="mailto:${comum.email}">${comum.email}</a></li>
        <li>${comum.rua}<br>${comum.codigoPostal}</li>
      </ul>
    </div>
    <div>
      <h2 class="rodape__titulo">${esc(t.rodape.colunaLegal)}</h2>
      <ul class="rodape__lista">
        <li><a href="${url('privacidade', lang, lang)}">${esc(legal[lang].privacidade.titulo)}</a></li>
        <li><a href="${url('cookies', lang, lang)}">${esc(legal[lang].cookies.titulo)}</a></li>
        <li><a href="${url('termos', lang, lang)}">${esc(legal[lang].termos.titulo)}</a></li>
        <li><a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer">${esc(t.rodape.livroReclamacoes)}</a></li>
      </ul>
      <a class="rodape__selo" href="https://scoring.pt" target="_blank" rel="noopener noreferrer">
        <picture>
          <source type="image/avif" srcset="${p}assets/img/scoring-160.avif">
          <source type="image/webp" srcset="${p}assets/img/scoring-160.webp">
          <img src="${p}assets/img/scoring-160.webp" width="72" height="72" loading="lazy" decoding="async" alt="${esc(t.rodape.altSelo)}">
        </picture>
      </a>
    </div>
  </div>
  <div class="envolvente rodape__base">
    <p>© <span id="ano">2026</span> ${comum.nome}. ${esc(t.rodape.direitos)}</p>
  </div>
</footer>`;
}

function accoesFlutuantesHtml(t) {
  const wa = `https://wa.me/${comum.whatsapp}`;
  return `<div class="accoes-fixas">
  <button class="accao-redonda accao-redonda--topo" id="voltar-topo" type="button" hidden>
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-cima"></use></svg>
    <span class="sr-only">${esc(t.ui.topo)}</span>
  </button>
  <a class="accao-redonda accao-redonda--whatsapp" href="${wa}" target="_blank" rel="noopener noreferrer">
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-whatsapp"></use></svg>
    <span class="sr-only">WhatsApp</span>
  </a>
  <div class="accao-telefone">
    <div class="accao-telefone__opcoes" id="opcoes-telefone" hidden>
      <a href="tel:${comum.telefoneLink}"><svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-telefone"></use></svg> ${comum.telefone}</a>
      <a href="tel:${comum.telemovelLink}"><svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-telemovel"></use></svg> ${comum.telemovel}</a>
    </div>
    <button class="accao-redonda accao-redonda--telefone" id="botao-telefone" type="button" aria-expanded="false" aria-controls="opcoes-telefone">
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-telefone"></use></svg>
      <span class="sr-only">${esc(t.ui.contactosTelefonicos)}</span>
    </button>
  </div>
</div>

<div class="barra-accao">
  <a class="barra-accao__item" href="tel:${comum.telefoneLink}">
    <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-telefone"></use></svg>
    ${esc(t.ui.ligar)}
  </a>
  <a class="barra-accao__item barra-accao__item--whatsapp" href="${wa}" target="_blank" rel="noopener noreferrer">
    <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-whatsapp"></use></svg>
    WhatsApp
  </a>
</div>`;
}

function modalHtml(t) {
  return `<dialog class="modal" id="modal-pessoa" aria-labelledby="modal-nome">
  <button class="modal__fechar" type="button" id="modal-fechar">
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-fechar"></use></svg>
    <span class="sr-only">${esc(t.ui.fechar)}</span>
  </button>
  <div class="modal__conteudo">
    <picture class="modal__foto">
      <source type="image/avif" id="modal-avif" srcset="">
      <source type="image/webp" id="modal-webp" srcset="">
      <img id="modal-img" src="" width="400" height="500" alt="" decoding="async">
    </picture>
    <div class="modal__texto">
      <p class="sobretitulo" id="modal-funcao"></p>
      <h2 id="modal-nome"></h2>
      <ul class="modal__creditos" id="modal-creditos"></ul>
    </div>
  </div>
</dialog>`;
}

/* ---------------------------------------------------------------- */
/* Documento                                                         */
/* ---------------------------------------------------------------- */

function documento({ t, lang, chave, titulo, descricao, corpo, noindex = false, jsonLd = [], preloadHero = null }) {
  const p = prefixo(lang);
  const alternates = DOMINIO
    ? ['pt', 'en']
        .map((l) => `<link rel="alternate" hreflang="${l === 'pt' ? 'pt-PT' : 'en-GB'}" href="${DOMINIO}${caminhoSite(chave, l)}">`)
        .concat(`<link rel="alternate" hreflang="x-default" href="${DOMINIO}${caminhoSite(chave, 'pt')}">`)
        .join('\n')
    : '';
  const canonical = DOMINIO ? `<link rel="canonical" href="${DOMINIO}${caminhoSite(chave, lang)}">` : '';

  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="theme-color" content="#0A314D">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
${canonical}${canonical ? '\n' : ''}${alternates}${alternates ? '\n' : ''}
<meta property="og:type" content="website">
<meta property="og:locale" content="${t.ogLocale}">
<meta property="og:site_name" content="${comum.nome}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">

<link rel="icon" href="${p}assets/icons/icon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${p}assets/icons/apple-touch-icon.png">
<link rel="manifest" href="${p}site.webmanifest">

<link rel="preload" href="${p}assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${p}assets/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin>
${preloadHero || ''}
<link rel="stylesheet" href="${p}style.css">
<script src="${p}script.js" defer></script>
</head>

<body>
<a class="skip-link" href="#conteudo">${esc(t.ui.saltar)}</a>

${sprite()}

${corpo}

${jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</body>
</html>
`;
}

/* ---------------------------------------------------------------- */
/* Secções da página inicial                                         */
/* ---------------------------------------------------------------- */

function figura({ nome, larguras, alt, sizes, w, h, lang, eager = false, classe = '' }) {
  const p = prefixo(lang);
  const srcset = (ext) => larguras.map((x) => `${p}assets/img/${nome}-${x}.${ext} ${x}w`).join(', ');
  return `<picture${classe ? ` class="${classe}"` : ''}>
          <source type="image/avif" sizes="${sizes}" srcset="${srcset('avif')}">
          <source type="image/webp" sizes="${sizes}" srcset="${srcset('webp')}">
          <img src="${p}assets/img/${nome}-${larguras[Math.min(1, larguras.length - 1)]}.webp" width="${w}" height="${h}"
               ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" alt="${esc(alt)}">
        </picture>`;
}

function heroHtml(t, lang) {
  const h = t.hero;
  return `  <section class="hero" id="topo">
    <div class="hero__texto">
      <p class="sobretitulo">${esc(h.sobretitulo)}</p>
      <h1>${esc(h.titulo[0])}<em>${esc(h.titulo[1])}</em>${esc(h.titulo[2])}</h1>
      <p class="hero__lead">${esc(h.lead)}</p>
      <div class="hero__accoes">
        <a class="botao botao--primario" href="#contactos">${esc(h.ctaPrimario)}</a>
        <a class="botao botao--fantasma" href="#especialidades">${esc(h.ctaSecundario)}</a>
      </div>
    </div>

    <div class="hero__media">
      ${figura({ nome: 'hero', larguras: [768, 1280, 1920], alt: h.alt, sizes: '(min-width: 62em) 46vw, calc(100vw - 2.5rem)', w: 1280, h: 960, lang, eager: true })}
    </div>

    <ul class="hero__provas">
${h.provas.map((x) => `      <li><strong>${esc(x.valor)}</strong><span>${esc(x.nota)}</span></li>`).join('\n')}
    </ul>
  </section>`;
}

function clinicaHtml(t, lang) {
  const c = t.clinica;
  const p = prefixo(lang);
  return `  <section class="seccao seccao--clara" id="clinica">
    <div class="envolvente grelha-clinica">
      <div class="clinica__imagens" data-revelar>
        ${figura({ nome: 'clinica', larguras: [640, 800, 1000], alt: c.altPrincipal, sizes: '(min-width: 62em) 38vw, calc(100vw - 2.5rem)', w: 640, h: 480, lang, classe: 'clinica__imagem-principal' })}
        ${figura({ nome: 'diagnostico', larguras: [480, 800], alt: c.altSecundaria, sizes: '(min-width: 62em) 15vw, 38vw', w: 480, h: 480, lang, classe: 'clinica__imagem-secundaria' })}
        <a class="selo" href="https://scoring.pt" target="_blank" rel="noopener noreferrer">
          <picture>
            <source type="image/avif" srcset="${p}assets/img/scoring-160.avif 160w, ${p}assets/img/scoring-320.avif 320w" sizes="88px">
            <source type="image/webp" srcset="${p}assets/img/scoring-160.webp 160w, ${p}assets/img/scoring-320.webp 320w" sizes="88px">
            <img src="${p}assets/img/scoring-160.webp" width="88" height="88" loading="lazy" decoding="async" alt="${esc(c.altSelo)}">
          </picture>
        </a>
      </div>

      <div class="clinica__texto" data-revelar>
        <p class="sobretitulo">${esc(c.sobretitulo)}</p>
        <h2>${esc(c.titulo[0])}<em>${esc(c.titulo[1])}</em>${esc(c.titulo[2])}</h2>
        <blockquote class="citacao">${esc(c.citacao)}</blockquote>
        <p>${esc(c.texto)}</p>
        <ul class="vantagens">
${c.vantagens
  .map(
    (v) => `          <li>
            <span class="vantagens__icone" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24"><use href="#${v.icone}"></use></svg></span>
            <span><strong>${esc(v.titulo)}</strong>${esc(v.texto)}</span>
          </li>`,
  )
  .join('\n')}
        </ul>
      </div>
    </div>
  </section>`;
}

function especialidadesHtml(t, lang) {
  const e = t.especialidades;
  const cartao = (item) => {
    const interior = `          <span class="especialidade__icone" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24"><use href="#${item.icone}"></use></svg></span>
          <h3>${esc(item.nome)}</h3><p>${esc(item.nota)}</p>`;
    if (item.pagina) {
      const destino = url(item.pagina, lang, lang) + (item.ancora ? '#' + item.ancora : '');
      return `        <li class="especialidade${item.extra ? ' especialidade--extra' : ''}"${item.extra ? ' hidden' : ''}>
          <a class="especialidade__ligacao" href="${destino}">
${interior}
            <span class="especialidade__mais">${esc(t.ui.saberMais)} <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-seta"></use></svg></span>
          </a>
        </li>`;
    }
    return `        <li class="especialidade${item.extra ? ' especialidade--extra' : ''}"${item.extra ? ' hidden' : ''}>
${interior}
        </li>`;
  };

  return `  <section class="seccao" id="especialidades">
    <div class="envolvente">
      <header class="seccao__cabecalho" data-revelar>
        <p class="sobretitulo">${esc(e.sobretitulo)}</p>
        <h2>${esc(e.titulo)}</h2>
        <p class="seccao__lead">${esc(e.lead)}</p>
      </header>

      <ul class="grelha-especialidades" id="lista-especialidades" data-revelar>
${e.itens.map(cartao).join('\n')}
      </ul>

      <div class="centrar">
        <button class="botao botao--contorno" id="botao-especialidades" type="button" aria-expanded="false" aria-controls="lista-especialidades">
          <span data-rotulo-fechado="${esc(e.verTodas)}" data-rotulo-aberto="${esc(e.verMenos)}">${esc(e.verTodas)}</span>
          <svg class="botao__chevron" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-chevron"></use></svg>
        </button>
      </div>
    </div>
  </section>`;
}

function destaqueImplanteHtml(t, lang) {
  const d = t.destaqueImplante;
  return `  <section class="seccao seccao--escura" id="implantologia">
    <div class="envolvente grelha-implante">
      <div class="implante__texto" data-revelar>
        <p class="sobretitulo sobretitulo--claro">${esc(d.sobretitulo)}</p>
        <h2>${esc(d.titulo[0])}<em>${esc(d.titulo[1])}</em></h2>
        <p>${esc(d.texto)}</p>
        <dl class="contadores">
${d.contadores
  .map(
    (c) => `          <div>
            <dt><span class="contador" data-alvo="${c.alvo}"${c.sufixo ? ` data-sufixo="${esc(c.sufixo)}"` : ''}>0</span></dt>
            <dd>${esc(c.nota)}</dd>
          </div>`,
  )
  .join('\n')}
        </dl>
        <a class="botao botao--acento" href="${url('implantologia', lang, lang)}">
          ${esc(d.cta)}
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-seta"></use></svg>
        </a>
      </div>
      <div class="implante__media" data-revelar>
        ${figura({ nome: 'implantologia', larguras: [768, 1280, 1920], alt: d.alt, sizes: '(min-width: 62em) 42vw, calc(100vw - 2.5rem)', w: 1280, h: 720, lang })}
      </div>
    </div>
  </section>`;
}

function criancasHtml(t, lang) {
  const c = t.criancas;
  return `  <section class="seccao" id="criancas">
    <div class="envolvente criancas" data-revelar>
      <div class="criancas__imagem">
        ${figura({ nome: 'criancas', larguras: [768, 1280, 1920], alt: c.alt, sizes: 'calc(100vw - 2.5rem)', w: 1280, h: 720, lang })}
      </div>
      <div class="criancas__cartao">
        <p class="sobretitulo">${esc(c.sobretitulo)}</p>
        <h2>${esc(c.titulo[0])}<em>${esc(c.titulo[1])}</em></h2>
        <p class="criancas__lead">${esc(c.texto)}</p>
        <a class="botao botao--primario" href="${url('odontopediatria', lang, lang)}">
          ${esc(c.cta)}
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-seta"></use></svg>
        </a>
      </div>
    </div>

    <ul class="envolvente criancas__pontos" data-revelar>
${c.pontos
  .map(
    (x) => `      <li>
        <strong>${esc(x.titulo)}</strong>
        <span>${esc(x.texto)}</span>
      </li>`,
  )
  .join('\n')}
    </ul>
  </section>`;
}

function faqHtml(t, itens, titulo, sobretitulo, lead) {
  return `  <section class="seccao" id="faq">
    <div class="envolvente">
      <header class="seccao__cabecalho" data-revelar>
        ${sobretitulo ? `<p class="sobretitulo">${esc(sobretitulo)}</p>` : ''}
        <h2>${esc(titulo)}</h2>
        ${lead ? `<p class="seccao__lead">${esc(lead)}</p>` : ''}
      </header>

      <div class="faq" data-revelar>
${itens
  .map(
    (x) => `        <div class="faq__item">
          <h3>${esc(x.p)}</h3>
          <p>${esc(x.r)}</p>
        </div>`,
  )
  .join('\n')}
      </div>

      <div class="faq__faixa" data-revelar>
        <div>
          <strong>${esc(t.ui.duvidasTitulo)}</strong>
          <span>${esc(t.ui.duvidasTexto)}</span>
        </div>
        <a class="botao botao--acento" href="tel:${comum.telefoneLink}">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-telefone"></use></svg>
          ${comum.telefone}
        </a>
      </div>
    </div>
  </section>`;
}

function equipaHtml(t, lang) {
  const e = t.equipa;
  const tamanhos = '(min-width: 62em) 21vw, (min-width: 48em) 28vw, 44vw';
  const p = prefixo(lang);

  const cartao = (slug) => {
    const pe = e.pessoas[slug];
    return `        <li>
          <button class="pessoa" type="button" data-nome="${esc(pe.nome)}" data-funcao="${esc(pe.funcao)}" data-foto="${slug}">
            <span class="pessoa__retrato">
              <picture>
                <source type="image/avif" srcset="${p}assets/img/equipa/${slug}-400.avif 400w, ${p}assets/img/equipa/${slug}-600.avif 600w" sizes="${tamanhos}">
                <source type="image/webp" srcset="${p}assets/img/equipa/${slug}-400.webp 400w, ${p}assets/img/equipa/${slug}-600.webp 600w" sizes="${tamanhos}">
                <img src="${p}assets/img/equipa/${slug}-400.webp" width="400" height="500" loading="lazy" decoding="async" alt="${esc(pe.nome)}">
              </picture>
              <span class="pessoa__mais" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24"><use href="#i-mais"></use></svg></span>
            </span>
            <span class="pessoa__info">
              <strong>${esc(pe.nome)}</strong>
              <em>${esc(pe.funcao)}</em>
              <span class="sr-only">— ${esc(t.ui.verPercurso)}</span>
            </span>
            <template>${pe.creditos.map((c) => `<li>${esc(c)}</li>`).join('')}</template>
          </button>
        </li>`;
  };

  const grupo = (titulo, nota, slugs) => `      <div class="equipa__grupo" data-revelar>
        <h3 class="equipa__titulo"><span>${esc(titulo)}</span><small>${esc(nota)}</small></h3>
        <ul class="grelha-equipa">
${slugs.map(cartao).join('\n')}
        </ul>
      </div>`;

  return `  <section class="seccao seccao--clara" id="equipa">
    <div class="envolvente">
      <header class="seccao__cabecalho" data-revelar>
        <p class="sobretitulo">${esc(e.sobretitulo)}</p>
        <h2>${esc(e.titulo[0])}<em>${esc(e.titulo[1])}</em></h2>
        <p class="seccao__lead">${esc(e.lead)}</p>
      </header>

${grupo(e.grupoClinico, e.grupoClinicoNota, comum.clinicos)}

${grupo(e.grupoApoio, e.grupoApoioNota, comum.apoio)}
    </div>
  </section>`;
}

function contactosHtml(t) {
  const c = t.contactos;
  const wa = `https://wa.me/${comum.whatsapp}`;
  return `  <section class="seccao" id="contactos">
    <div class="envolvente">
      <header class="seccao__cabecalho" data-revelar>
        <p class="sobretitulo">${esc(c.sobretitulo)}</p>
        <h2>${esc(c.titulo)}</h2>
      </header>

      <div class="grelha-contactos">
        <div class="contactos__lista" data-revelar>
          <a class="cartao-contacto" href="tel:${comum.telefoneLink}">
            <span class="cartao-contacto__icone" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24"><use href="#i-telefone"></use></svg></span>
            <span><em>${esc(c.rotuloTelefone)}</em><strong>${comum.telefone}</strong></span>
          </a>
          <a class="cartao-contacto" href="tel:${comum.telemovelLink}">
            <span class="cartao-contacto__icone" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24"><use href="#i-telemovel"></use></svg></span>
            <span><em>${esc(c.rotuloTelemovel)}</em><strong>${comum.telemovel}</strong></span>
          </a>
          <a class="cartao-contacto cartao-contacto--whatsapp" href="${wa}" target="_blank" rel="noopener noreferrer">
            <span class="cartao-contacto__icone" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24"><use href="#i-whatsapp"></use></svg></span>
            <span><em>${esc(c.rotuloWhatsapp)}</em><strong>${comum.telemovel}</strong></span>
          </a>
          <a class="cartao-contacto" href="mailto:${comum.email}">
            <span class="cartao-contacto__icone" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24"><use href="#i-email"></use></svg></span>
            <span><em>${esc(c.rotuloEmail)}</em><strong>${comum.email}</strong></span>
          </a>
          <div class="cartao-contacto cartao-contacto--estatico">
            <span class="cartao-contacto__icone" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24"><use href="#i-local"></use></svg></span>
            <span><em>${esc(c.rotuloMorada)}</em><strong>${comum.rua}<br>${comum.codigoPostal}</strong></span>
          </div>
          <p class="nota-chamada">${esc(t.ui.chamadaNota)}</p>

          <div class="estacionamento">
            <span class="estacionamento__icone" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24"><use href="#i-parque"></use></svg></span>
            <div>
              <h3>${esc(c.estacionamentoTitulo)}</h3>
              <p>${esc(c.estacionamentoTexto[0])}<strong>${esc(c.estacionamentoTexto[1])}</strong>${esc(c.estacionamentoTexto[2])}</p>
            </div>
          </div>
        </div>

        <div class="contactos__mapa" data-revelar>
          <div class="mapa" id="mapa" data-src="${comum.mapa}" data-titulo="${esc(c.mapaTituloIframe)}">
            <div class="mapa__convite">
              <span class="mapa__icone" aria-hidden="true"><svg width="30" height="30" viewBox="0 0 24 24"><use href="#i-mapa"></use></svg></span>
              <h3>${esc(c.mapaTitulo)}</h3>
              <p>${esc(c.mapaAviso)}</p>
              <button class="botao botao--primario" type="button" id="carregar-mapa">${esc(c.mapaBotao)}</button>
              <a class="ligacao-discreta" href="${comum.direcoes}" target="_blank" rel="noopener noreferrer">${esc(c.mapaAlternativa)}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------------------------------------------------------------- */
/* Página de tratamento                                              */
/* ---------------------------------------------------------------- */

function paginaTratamento({ t, lang, chave, dados, imagem }) {
  const p = prefixo(lang);
  const preload = `<link rel="preload" as="image" type="image/avif" href="${p}assets/img/${imagem}-768.avif"
      imagesrcset="${p}assets/img/${imagem}-768.avif 768w, ${p}assets/img/${imagem}-1280.avif 1280w, ${p}assets/img/${imagem}-1920.avif 1920w"
      imagesizes="(min-width: 62em) 50vw, calc(100vw - 2.5rem)" fetchpriority="high">`;

  const ancora = (m) => m.id || m.icone.replace('i-', '');

  const corpo = `${cabecalhoHtml({ t, lang, chave })}

<main id="conteudo">
  <section class="hero hero--tratamento">
    <div class="hero__texto">
      <p class="sobretitulo">${esc(dados.sobretitulo)}</p>
      <h1>${esc(dados.titulo[0])}<em>${esc(dados.titulo[1])}</em></h1>
      <p class="hero__lead">${esc(dados.lead)}</p>
      <div class="hero__accoes">
        <a class="botao botao--primario" href="${url('inicio', lang, lang)}#contactos">${esc(t.ui.marcar)}</a>
        <a class="botao botao--fantasma" href="#metodos">${esc(dados.metodosTitulo)}</a>
      </div>
    </div>
    <div class="hero__media">
      ${figura({ nome: imagem, larguras: [768, 1280, 1920], alt: dados.alt, sizes: '(min-width: 62em) 50vw, calc(100vw - 2.5rem)', w: 1280, h: 720, lang, eager: true })}
    </div>
    <ul class="hero__provas">
${dados.factos.map((x) => `      <li><strong>${esc(x.valor)}</strong><span>${esc(x.nota)}</span></li>`).join('\n')}
    </ul>
  </section>

  <section class="seccao seccao--clara">
    <div class="envolvente grelha-intro" data-revelar>
      <h2>${esc(dados.intro.titulo)}</h2>
      <p class="intro__texto">${esc(dados.intro.texto)}</p>
    </div>
  </section>

  <section class="seccao" id="metodos">
    <div class="envolvente">
      <header class="seccao__cabecalho" data-revelar>
        <h2>${esc(dados.metodosTitulo)}</h2>
        <p class="seccao__lead">${esc(dados.metodosLead)}</p>
      </header>
      <ul class="grelha-metodos" data-revelar>
${dados.metodos
  .map(
    (m, i) => `        <li class="metodo" id="${ancora(m)}">
          <div class="metodo__topo">
            <span class="metodo__icone" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24"><use href="#${m.icone}"></use></svg></span>
            <span class="metodo__indice" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
          </div>
          <h3>${esc(m.nome)}</h3>
          <p>${esc(m.texto)}</p>
          ${m.bom ? `<p class="metodo__nota"><strong>${lang === 'pt' ? 'Indicado para' : 'Best for'}</strong>${esc(m.bom)}</p>` : ''}
        </li>`,
  )
  .join('\n')}
      </ul>
    </div>
  </section>

  <section class="seccao seccao--escura">
    <div class="envolvente">
      <header class="seccao__cabecalho" data-revelar>
        <h2>${esc(dados.processoTitulo)}</h2>
      </header>
      <ol class="linha-tempo" data-revelar>
${dados.processo
  .map(
    (x, i) => `        <li>
          <span class="linha-tempo__marca"><span>${String(i + 1).padStart(2, '0')}</span></span>
          <h3>${esc(x.titulo)}</h3>
          <p>${esc(x.texto)}</p>
        </li>`,
  )
  .join('\n')}
      </ol>
    </div>
  </section>

  <section class="seccao seccao--clara">
    <div class="envolvente">
      <header class="seccao__cabecalho seccao__cabecalho--centro" data-revelar>
        <h2>${esc(dados.porqueTitulo)}</h2>
      </header>
      <ul class="grelha-porque" data-revelar>
${t.clinica.vantagens
  .map(
    (v) => `        <li>
          <span class="porque__icone" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24"><use href="#${v.icone}"></use></svg></span>
          <h3>${esc(v.titulo)}</h3>
          <p>${esc(v.texto)}</p>
        </li>`,
  )
  .join('\n')}
      </ul>
    </div>
  </section>

${faqHtml(t, dados.faq, dados.faqTitulo)}

  <section class="seccao seccao--clara">
    <div class="envolvente faixa-cta" data-revelar>
      <div>
        <h2>${esc(dados.ctaTitulo)}</h2>
        <p>${esc(dados.ctaTexto)}</p>
      </div>
      <div class="faixa-cta__accoes">
        <a class="botao botao--primario" href="tel:${comum.telefoneLink}">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-telefone"></use></svg>
          ${comum.telefone}
        </a>
        <a class="botao botao--fantasma" href="${url('inicio', lang, lang)}#contactos">${esc(t.contactos.titulo)}</a>
      </div>
    </div>
  </section>
</main>

${rodapeHtml({ t, lang, chave })}
${accoesFlutuantesHtml(t)}`;

  const perguntas = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dados.faq.map((x) => ({
      '@type': 'Question',
      name: x.p,
      acceptedAnswer: { '@type': 'Answer', text: x.r },
    })),
  };

  return documento({
    t,
    lang,
    chave,
    titulo: t.meta[chave].titulo,
    descricao: t.meta[chave].descricao,
    corpo,
    jsonLd: [perguntas],
    preloadHero: preload,
  });
}

/* ---------------------------------------------------------------- */
/* Página legal e 404                                                */
/* ---------------------------------------------------------------- */

function paginaLegal({ t, lang, chave }) {
  const d = legal[lang][chave];
  const subs = {
    email: `<a href="mailto:${comum.email}">${comum.email}</a>`,
    telefone: `<a href="tel:${comum.telefoneLink}">${comum.telefone}</a>`,
    ligacaoCookies: `<a href="${url('cookies', lang, lang)}">${esc(legal[lang].cookies.titulo)}</a>`,
  };
  const substituir = (s) => s.replace(/\{(\w+)\}/g, (m, k) => subs[k] ?? m);

  const blocos = d.blocos
    .map((b) => {
      if (b.h) return `    <h2>${esc(b.h)}</h2>`;
      if (b.ul) return `    <ul>\n${b.ul.map((x) => `      <li>${x}</li>`).join('\n')}\n    </ul>`;
      if (b.comentario) return `    <!-- ${b.comentario} -->`;
      if (b.nota)
        return `    <div class="legal__destaque"><p>${b.semPrefixo ? '' : `<strong>${esc(t.legal.resumo)}</strong> `}${substituir(b.nota)}</p></div>`;
      return `    <p>${substituir(b.p)}</p>`;
    })
    .join('\n');

  const corpo = `${cabecalhoHtml({ t, lang, chave, simples: true })}

<main id="conteudo">
  <div class="pagina-interior">
    <article class="legal">
      <p class="sobretitulo">${esc(t.legal.sobretitulo)}</p>
      <h1>${esc(d.titulo)}</h1>
      <p class="legal__data">${esc(t.legal.atualizacao)}</p>
${blocos}
      <a class="legal__voltar" href="${url('inicio', lang, lang)}">${esc(t.ui.voltarInicio)}</a>
    </article>
  </div>
</main>

${rodapeHtml({ t, lang, chave })}`;

  return documento({ t, lang, chave, titulo: `${d.titulo} | ${comum.nome}`, descricao: d.descricao, corpo });
}

function paginaErro({ t, lang }) {
  const corpo = `${cabecalhoHtml({ t, lang, chave: 'erro', simples: true })}

<main id="conteudo">
  <div class="erro">
    <p class="erro__codigo">404</p>
    <h1>${esc(t.erro.titulo)}</h1>
    <p>${esc(t.erro.texto)}</p>
    <div class="erro__accoes">
      <a class="botao botao--primario" href="${url('inicio', lang, lang)}">${esc(t.erro.voltar)}</a>
      <a class="botao botao--fantasma" href="tel:${comum.telefoneLink}">${esc(t.ui.ligar)}: ${comum.telefone}</a>
    </div>
  </div>
</main>

${rodapeHtml({ t, lang, chave: 'erro' })}`;

  return documento({
    t,
    lang,
    chave: 'erro',
    titulo: `${t.meta.erro.titulo} | ${comum.nome}`,
    descricao: t.meta.erro.descricao,
    corpo,
    noindex: true,
  });
}

/* ---------------------------------------------------------------- */
/* Página inicial                                                    */
/* ---------------------------------------------------------------- */

function paginaInicio({ t, lang }) {
  const p = prefixo(lang);
  const preload = `<link rel="preload" as="image" type="image/avif" href="${p}assets/img/hero-768.avif"
      imagesrcset="${p}assets/img/hero-768.avif 768w, ${p}assets/img/hero-1280.avif 1280w, ${p}assets/img/hero-1920.avif 1920w"
      imagesizes="(min-width: 62em) 46vw, calc(100vw - 2.5rem)" fetchpriority="high">`;

  const corpo = `${cabecalhoHtml({ t, lang, chave: 'inicio' })}

<main id="conteudo">
${heroHtml(t, lang)}

${clinicaHtml(t, lang)}

${especialidadesHtml(t, lang)}

${destaqueImplanteHtml(t, lang)}

${criancasHtml(t, lang)}

${equipaHtml(t, lang)}

${faqHtml(t, t.faq.itens, t.faq.titulo, t.faq.sobretitulo, t.faq.lead)}

${contactosHtml(t)}
</main>

${rodapeHtml({ t, lang, chave: 'inicio' })}
${modalHtml(t)}
${accoesFlutuantesHtml(t)}`;

  const dentista = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: comum.nome,
    description: t.meta.inicio.descricao,
    telephone: comum.telefoneLink,
    email: comum.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: comum.rua,
      postalCode: '4810-286',
      addressLocality: 'Guimarães',
      addressCountry: 'PT',
    },
    areaServed: { '@type': 'City', name: 'Guimarães' },
    availableLanguage: ['pt-PT', 'en-GB'],
    availableService: t.especialidades.itens
      .slice(0, 8)
      .map((x) => ({ '@type': 'MedicalProcedure', name: x.nome })),
  };

  const perguntas = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.itens.map((x) => ({
      '@type': 'Question',
      name: x.p,
      acceptedAnswer: { '@type': 'Answer', text: x.r },
    })),
  };

  return documento({
    t,
    lang,
    chave: 'inicio',
    titulo: t.meta.inicio.titulo,
    descricao: t.meta.inicio.descricao,
    corpo,
    jsonLd: [dentista, perguntas],
    preloadHero: preload,
  });
}

/* ---------------------------------------------------------------- */
/* Sprite de ícones                                                  */
/* ---------------------------------------------------------------- */

function sprite() {
  const t = (id, d) =>
    `    <g id="${id}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${d}</g>`;
  return `<svg class="sprite" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
  <defs>
${[
  t('i-implante', '<path d="M6.6 2.8h10.8l-1.5 4.1H8.1z"/><path d="M9.1 9.4h5.8M9.3 12h5.4M9.6 14.6h4.8"/><path d="M8.6 6.9h6.8l-.4 2.5H9z"/><path d="M10.1 17.2h3.8l-1.1 3.9a.9.9 0 0 1-1.6 0z"/>'),
  t('i-ortodontia', '<rect x="2.6" y="8.2" width="5" height="7.6" rx="1.6"/><rect x="9.5" y="7.4" width="5" height="9.2" rx="1.6"/><rect x="16.4" y="8.2" width="5" height="7.6" rx="1.6"/><path d="M1 12h1.6M7.6 12h1.9M14.5 12h1.9M21.4 12H23"/>'),
  t('i-alinhador', '<path d="M3.5 8.5c0-2.2 3.8-4 8.5-4s8.5 1.8 8.5 4c0 4.6-3 10.5-8.5 10.5S3.5 13.1 3.5 8.5Z"/><path d="M6.6 7.6v3.1M10 6.9v4.2M14 6.9v4.2M17.4 7.6v3.1"/>'),
  t('i-faceta', '<path d="M7 4.5h10a1.5 1.5 0 0 1 1.5 1.6l-.8 8.4A4.8 4.8 0 0 1 12 19a4.8 4.8 0 0 1-5.7-4.5l-.8-8.4A1.5 1.5 0 0 1 7 4.5Z"/><path d="M9.6 8.2 12 6l2.4 2.2"/>'),
  t('i-coroa', '<path d="M3.5 8.5 7 11l5-5.5L17 11l3.5-2.5-1.7 8.2a1.4 1.4 0 0 1-1.4 1.1H6.6a1.4 1.4 0 0 1-1.4-1.1z"/>'),
  t('i-protese', '<path d="M3.8 9.4C3.8 6.6 7.5 4.8 12 4.8s8.2 1.8 8.2 4.6c0 1.6-.9 2.6-2.2 3"/><path d="M3.8 9.4c0 3.4 2.4 8 8.2 8s8.2-4.6 8.2-8"/><path d="M7.4 8.2v2.6M12 7.6v3.4M16.6 8.2v2.6"/>'),
  t('i-branqueamento', '<path d="M8 6.2c-2.4 0-4 1.7-4 4.2 0 3.4 2.4 9.1 4.4 9.1 1 0 1.1-1.6 3.6-1.6s2.6 1.6 3.6 1.6c2 0 4.4-5.7 4.4-9.1 0-2.5-1.6-4.2-4-4.2-1.7 0-2.6.8-4 .8s-2.3-.8-4-.8Z"/><path d="M17.8 2.4l.7 1.7 1.7.7-1.7.7-.7 1.7-.7-1.7-1.7-.7 1.7-.7z"/>'),
  t('i-crianca', '<path d="M8 5.6c-2.3 0-3.9 1.7-3.9 4.1 0 3.3 2.3 8.8 4.3 8.8 1 0 1.1-1.5 3.6-1.5s2.6 1.5 3.6 1.5c2 0 4.3-5.5 4.3-8.8 0-2.4-1.6-4.1-3.9-4.1-1.7 0-2.6.8-4 .8s-2.3-.8-4-.8Z"/><path d="M9.6 10.4h.01M14.4 10.4h.01"/><path d="M10.2 13.4c.5.5 1.1.8 1.8.8s1.3-.3 1.8-.8"/>'),
  t('i-estetica', '<path d="M8 5.4c-2.3 0-3.9 1.7-3.9 4.2 0 3.3 2.3 8.9 4.3 8.9 1 0 1.1-1.6 3.6-1.6s2.6 1.6 3.6 1.6c2 0 4.3-5.6 4.3-8.9 0-2.5-1.6-4.2-3.9-4.2-1.7 0-2.6.8-4 .8s-2.3-.8-4-.8Z"/><path d="M12 8.6l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z"/>'),
  t('i-endodontia', '<path d="M8 4.5c-2.4 0-4 1.8-4 4.3 0 3.4 2.4 9.1 4.4 9.1.9 0 1.1-1.3 1.8-2"/><path d="M16 4.5c2.4 0 4 1.8 4 4.3 0 3.4-2.4 9.1-4.4 9.1-.9 0-1.1-1.3-1.8-2"/><path d="M8 4.5c1.7 0 2.6.8 4 .8s2.3-.8 4-.8"/><path d="M12 6.4v9.2M12 15.6l-1.6 3.9M12 15.6l1.6 3.9"/>'),
  t('i-periodontologia', '<path d="M12 3.4 5 6v5.4c0 4 3 7.6 7 8.6 4-1 7-4.6 7-8.6V6z"/><path d="M9.2 12.1h5.6M12 9.3v5.6"/>'),
  t('i-cirurgia', '<path d="m4 20 9.6-9.6"/><path d="m13.6 10.4 5-5a1.9 1.9 0 0 0-2.7-2.7l-5 5z"/><path d="M4 20H2.6v-1.4"/><circle cx="7.6" cy="7.6" r="2.6"/>'),
  t('i-higiene', '<path d="M5.4 18.6 15 9"/><path d="m15 9 1.4-3.3a1.6 1.6 0 0 1 2.1-.8l1 .5a1.6 1.6 0 0 1 .7 2.2L18.2 10z"/><path d="M5.4 18.6 3 21M8.6 12.6c1.4-.7 2.9-.4 3.8 1M6.2 15c1.4-.7 2.9-.4 3.8 1"/>'),
  t('i-raiox', '<rect x="2.6" y="4.4" width="18.8" height="15.2" rx="2"/><path d="M6.2 12.4c1.6-3 3.8-4.4 5.8-4.4s4.2 1.4 5.8 4.4"/><path d="M6.2 12.4c1.6 1.8 3.8 2.8 5.8 2.8s4.2-1 5.8-2.8"/><path d="M9.2 9.6v3.4M12 8.6v4.6M14.8 9.6v3.4"/>'),
  t('i-tac', '<circle cx="12" cy="12" r="7.3"/><circle cx="12" cy="12" r="3.1"/><path d="M12 2.2v2.5M12 19.3v2.5M2.2 12h2.5M19.3 12h2.5"/>'),
  t('i-lab', '<path d="M9.6 2.8v6.1L4.5 17.6A2 2 0 0 0 6.2 20.6h11.6a2 2 0 0 0 1.7-3L14.4 8.9V2.8"/><path d="M8.4 2.8h7.2M7.4 14.4h9.2"/>'),
  t('i-tecnologia', '<rect x="2.6" y="4" width="18.8" height="12.4" rx="2"/><path d="M8.4 20h7.2M12 16.4V20"/><path d="M7 11.6l2.4-2.8 2.2 2.4 2-3.4 3.4 5"/>'),
  t('i-coracao', '<path d="M12 19.9 4.9 13a4.4 4.4 0 0 1 0-6.3 4.6 4.6 0 0 1 6.4 0l.7.7.7-.7a4.6 4.6 0 0 1 6.4 0 4.4 4.4 0 0 1 0 6.3z"/>'),
  t('i-telefone', '<path d="M21 16.9v2.6a1.8 1.8 0 0 1-2 1.8 17.6 17.6 0 0 1-7.7-2.7 17.3 17.3 0 0 1-5.3-5.3A17.6 17.6 0 0 1 3.3 5.5a1.8 1.8 0 0 1 1.8-2h2.6a1.8 1.8 0 0 1 1.8 1.5c.1.9.3 1.7.7 2.5a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14 14 0 0 0 5.3 5.3l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.6 2.5.7A1.8 1.8 0 0 1 21 16.9Z"/>'),
  t('i-telemovel', '<rect x="6.4" y="2.4" width="11.2" height="19.2" rx="2.4"/><path d="M11 18.6h2"/>'),
  t('i-email', '<rect x="2.6" y="4.8" width="18.8" height="14.4" rx="2.2"/><path d="m3.4 7 7.5 5.3a2 2 0 0 0 2.2 0L20.6 7"/>'),
  t('i-local', '<path d="M20 10.4c0 5.5-8 11.2-8 11.2s-8-5.7-8-11.2a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10.2" r="2.9"/>'),
  t('i-parque', '<rect x="3.4" y="3.4" width="17.2" height="17.2" rx="3.4"/><path d="M9.6 17V7.4h3.3a3 3 0 0 1 0 6H9.6"/>'),
  t('i-seta', '<path d="M5 12h14M13 6l6 6-6 6"/>'),
  t('i-cima', '<path d="M12 19V5M6 11l6-6 6 6"/>'),
  t('i-chevron', '<path d="m6 9 6 6 6-6"/>'),
  t('i-fechar', '<path d="M6 6l12 12M18 6 6 18"/>'),
  t('i-mais', '<path d="M12 5.5v13M5.5 12h13"/>'),
  t('i-visto', '<path d="m4.5 12.5 5 5 10-11"/>'),
  t('i-mapa', '<path d="M9 3.4 3.4 5.8v14.8L9 18.2l6 2.4 5.6-2.4V3.4L15 5.8z"/><path d="M9 3.4v14.8M15 5.8v14.8"/>'),
  `    <g id="i-whatsapp" fill="currentColor" stroke="none"><path d="M12 2.2a9.7 9.7 0 0 0-8.3 14.7L2.2 22l5.3-1.4A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 19.9Zm4.4-5.9c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4 5 5 0 0 0 3 .6 2.5 2.5 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2Z"/></g>`,
].join('\n')}
  </defs>
</svg>`;
}

/* ---------------------------------------------------------------- */
/* Escrita                                                           */
/* ---------------------------------------------------------------- */

async function escrever(lang, chave, html) {
  const dir = lang === 'pt' ? RAIZ : path.join(RAIZ, 'en');
  await mkdir(dir, { recursive: true });
  const destino = path.join(dir, paginas[chave][lang]);
  await writeFile(destino, html, 'utf8');
  return path.relative(RAIZ, destino);
}

/* Verifica que as duas árvores de conteúdo têm a mesma forma */
function compararFormas(a, b, caminho = '') {
  const avisos = [];
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const c = caminho ? `${caminho}.${k}` : k;
    if (!(k in a)) avisos.push(`falta em pt: ${c}`);
    else if (!(k in b)) avisos.push(`falta em en: ${c}`);
    else if (a[k] && b[k] && typeof a[k] === 'object' && typeof b[k] === 'object' && !Array.isArray(a[k])) {
      avisos.push(...compararFormas(a[k], b[k], c));
    } else if (Array.isArray(a[k]) && Array.isArray(b[k]) && a[k].length !== b[k].length) {
      avisos.push(`comprimentos diferentes em ${c}: pt=${a[k].length}, en=${b[k].length}`);
    }
  }
  return avisos;
}

const avisos = compararFormas(conteudo.pt, conteudo.en);
if (avisos.length) {
  console.log('AVISOS de conteúdo:');
  avisos.forEach((a) => console.log('  ' + a));
  console.log('');
}

const escritos = [];
for (const lang of ['pt', 'en']) {
  const t = conteudo[lang];
  escritos.push(await escrever(lang, 'inicio', paginaInicio({ t, lang })));

  const tratamentos = [
    ['implantologia', 'implantologia-hero'],
    ['ortodontia', 'ortodontia'],
    ['odontopediatria', 'odontopediatria'],
  ];
  for (const [chave, imagem] of tratamentos) {
    escritos.push(await escrever(lang, chave, paginaTratamento({ t, lang, chave, dados: t.tratamentos[chave], imagem })));
  }

  for (const chave of ['privacidade', 'cookies', 'termos']) {
    escritos.push(await escrever(lang, chave, paginaLegal({ t, lang, chave })));
  }

  escritos.push(await escrever(lang, 'erro', paginaErro({ t, lang })));
}

console.log(`${escritos.length} páginas geradas:`);
escritos.forEach((f) => console.log('  ' + f));
if (!DOMINIO) {
  console.log('\nNota: DOMINIO está vazio — canonical e hreflang foram omitidos.');
  console.log('Defina-o no topo de _ferramentas/build.mjs quando souber o endereço.');
}
