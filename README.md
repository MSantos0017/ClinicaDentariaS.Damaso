# Clínica Dentária S. Dâmaso — site institucional

Site estático bilingue (português e inglês). **Não precisa de Node, PHP ou base de dados
em produção** — basta copiar os ficheiros para o alojamento. O Node serve apenas, no
computador, para gerar as páginas e otimizar imagens.

> ## ⚠️ Os ficheiros `.html` são gerados automaticamente
>
> Não edite `index.html`, `implantologia.html` nem nenhum outro `.html` à mão: as
> alterações perdem-se na geração seguinte. **Todo o texto do site está em
> [`_ferramentas/conteudo.mjs`](_ferramentas/conteudo.mjs)** (e os textos legais em
> `_ferramentas/conteudo-legal.mjs`). Edite aí e volte a correr:
>
> ```bash
> node _ferramentas/build.mjs
> ```
>
> São 16 páginas (8 em cada língua) — mantê-las à mão seria impossível sem divergirem.

---

## 1. Antes de publicar — lista de verificação

| # | O quê | Onde |
|---|-------|------|
| 1 | **Confirmar o número de WhatsApp.** Assumi que o telemóvel 93 93 99 333 tem WhatsApp. Se não tiver, corrija ou remova. | `_ferramentas/conteudo.mjs`, campo `whatsapp` |
| 2 | **Entidade RAL** (resolução alternativa de litígios). A Lei 144/2015 obriga a indicar a entidade competente. | `_ferramentas/conteudo-legal.mjs`, ponto 7 dos termos |
| 3 | **Ativar HSTS** depois de confirmar que o HTTPS funciona em todo o site. | `.htaccess`, linha comentada `Strict-Transport-Security` |
| 4 | **Redirecionamento www / sem-www.** Escolher a versão canónica. | `.htaccess`, bloco comentado na secção 1 |
| 5 | **Horário de funcionamento.** Ainda não está no site — é das primeiras coisas que um doente procura. | acrescentar a `conteudo.mjs` |

Pode ainda querer acrescentar o **número de registo na ERS** e o **NIF** no rodapé — é
prática corrente em sites de clínicas, mas não tinha esses dados.

### 1.2 Quando o domínio estiver escolhido

Abra `_ferramentas/build.mjs`, preencha a constante do topo e volte a gerar:

```js
const DOMINIO = 'https://www.oseudominio.pt';   // sem barra final
```

Isso passa a produzir automaticamente, em todas as páginas, as etiquetas `canonical` e
`hreflang` que dizem à Google que existe uma versão portuguesa e uma inglesa da mesma
página. Sem domínio essas etiquetas são omitidas de propósito — exigem endereços
absolutos, e é melhor não as ter do que tê-las erradas.

Falta então só criar o `sitemap.xml` na raiz e apontar-lhe no `robots.txt` (a linha já lá
está em comentário):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://SEU-DOMINIO/</loc><priority>1.0</priority></url>
  <url><loc>https://SEU-DOMINIO/implantologia.html</loc><priority>0.8</priority></url>
  <url><loc>https://SEU-DOMINIO/ortodontia.html</loc><priority>0.8</priority></url>
  <url><loc>https://SEU-DOMINIO/odontopediatria.html</loc><priority>0.8</priority></url>
  <url><loc>https://SEU-DOMINIO/en/</loc><priority>0.9</priority></url>
  <url><loc>https://SEU-DOMINIO/en/implants.html</loc><priority>0.7</priority></url>
  <url><loc>https://SEU-DOMINIO/en/orthodontics.html</loc><priority>0.7</priority></url>
  <url><loc>https://SEU-DOMINIO/en/childrens-dentistry.html</loc><priority>0.7</priority></url>
</urlset>
```

Para a imagem que aparece ao partilhar o link no WhatsApp ou no Facebook, acrescente
também em `build.mjs`, dentro da função `documento`, as etiquetas `og:url` e `og:image`
com o endereço completo.

---

## 2. Como publicar (cPanel ou FTP)

Copiar para `public_html/` **apenas**:

```
*.html             as 8 páginas em português
en/                as 8 páginas em inglês (e o .htaccess da pasta)
assets/            imagens, tipos de letra e ícones
style.css
script.js
.htaccess          ← ficheiro oculto: confirme que foi mesmo enviado
robots.txt
site.webmanifest
```

**Não enviar:**

```
_ferramentas/      gerador e scripts de imagens
_originais/        fotografias originais, cópia de segurança
.claude/           configuração do editor
README.md
```

Depois de publicar, confirmar: o site abre em `https://`, o `http://` redireciona,
`/en/` mostra a versão inglesa, e um endereço inexistente mostra a página 404.

---

## 3. Estrutura

```
index.html                 página inicial (PT)
implantologia.html         página de tratamento
ortodontia.html            página de tratamento
odontopediatria.html       página de tratamento
politica-*.html            páginas legais
404.html
en/                        as mesmas 8 páginas em inglês
style.css                  folha de estilos (mobile-first, variáveis no topo)
script.js                  interações, sem bibliotecas externas
.htaccess                  segurança, compressão, cache, HTTPS
assets/
  fonts/                   Fraunces + Manrope, subconjunto latino
  img/                     fotografias em AVIF e WebP, vários tamanhos
  img/equipa/              retratos recortados, com transparência
  icons/                   favicons
_ferramentas/
  conteudo.mjs             ← TODO o texto do site, PT e EN
  conteudo-legal.mjs       ← textos das páginas legais
  build.mjs                gerador das 16 páginas
  normaliza-equipa.mjs     recorte e uniformização dos retratos
  build-assets.mjs         otimização das restantes imagens
  dev-server.mjs           servidor local para pré-visualizar
_originais/                ficheiros originais, não publicar
```

### Onde mexer para as alterações mais comuns

| Quero… | Onde |
|--------|------|
| mudar qualquer texto | `_ferramentas/conteudo.mjs` → correr o gerador |
| mudar textos legais | `_ferramentas/conteudo-legal.mjs` → correr o gerador |
| mudar cores ou espaçamentos | `style.css`, bloco `:root` no topo |
| acrescentar uma especialidade | array `especialidades.itens`, nas duas línguas |
| acrescentar alguém à equipa | `equipa.pessoas` + `comum.clinicos`/`comum.apoio`, e juntar a foto |
| criar outra página de tratamento | acrescentar a `paginas`, a `meta`, a `tratamentos` e à lista no fim de `build.mjs` |

O gerador avisa se acrescentar um campo numa língua e se esquecer da outra.

---

## 4. Decisões que vale a pena conhecer

**Não há banner de cookies — de propósito.** O site não instala cookies, não tem
analítica e não carrega nada de servidores externos. Um banner a pedir consentimento para
cookies que não existem seria ruído sem valor legal. O único conteúdo de terceiros é o
mapa do Google, que **só carrega depois de o visitante clicar num botão**, com o aviso ao
lado. Se acrescentar estatísticas ou pixéis de publicidade, aí passa a ser obrigatório
pedir consentimento prévio e atualizar a política de cookies.

**Duas línguas com URLs próprios, não tradução por JavaScript.** O inglês vive em `/en/`,
com páginas reais. Traduzir no navegador seria mais simples de programar, mas a Google
indexaria apenas a versão portuguesa — e uma cidade como Guimarães tem procura em inglês
que vale a pena captar.

**Tipos de letra alojados no próprio servidor.** Não se usa o Google Fonts por CDN: é mais
rápido e afasta a questão de RGPD associada à partilha do IP dos visitantes com o Google.

**Os retratos da equipa são recortados.** As fotografias originais tinham enquadramentos
muito diferentes — umas de perto, outras de longe — e era isso que fazia a grelha parecer
amadora. O script `normaliza-equipa.mjs` remove o fundo branco, mede a largura da cabeça
de cada pessoa e uniformiza a escala e a posição. Ao substituir fotografias, corra-o
outra vez; o array `PESSOAS` tem um campo `ajuste` (`zoom`, `dx`, `dy`) para afinar casos
em que apareçam cadeiras ou objetos no enquadramento.

---

## 5. Resultados das auditorias

Lighthouse 12 (Chrome), perfil móvel, com compressão ativa:

| Página | Desempenho | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| `index.html` | 99 | 100 | 100 | 100 |
| `en/index.html` | 99 | 100 | 100 | 100 |
| `implantologia.html` | 100 | 100 | 100 | 100 |

Core Web Vitals (4G simulado): **LCP 2,1 s · CLS 0 · TBT 0 ms** — dentro dos limites do
Google. Em computador, 100 em tudo e LCP de 0,5 s.

O ponto em falta vem de a folha de estilos bloquear a primeira renderização durante
~150 ms. Chegar a 100 exigiria embutir o CSS crítico em cada página, o que duplicaria os
estilos. Não compensa.

> Nota: o Lighthouse assinala as fotografias como «maiores do que o necessário». O aviso
> ignora a densidade de píxeis dos telemóveis (2× a 3×): servir imagens mais pequenas
> deixaria as fotos desfocadas. Foi uma escolha deliberada.

### Segurança

O `.htaccess` envia `Content-Security-Policy` restritiva, `X-Content-Type-Options`,
`Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` e `Cross-Origin-Opener-Policy`,
força HTTPS e bloqueia a listagem de diretórios. Depois de publicar, confirme em
[securityheaders.com](https://securityheaders.com) — com o HSTS ativado o resultado deve
ser A ou A+.

---

## 6. Trabalhar no site localmente

```bash
npm install sharp                      # só necessário para mexer em imagens
node _ferramentas/build.mjs            # gera as 16 páginas
node _ferramentas/dev-server.mjs       # pré-visualizar em http://localhost:5173
```

Para voltar a otimizar fotografias depois de as substituir:

```bash
node _ferramentas/normaliza-equipa.mjs   # retratos da equipa
node _ferramentas/build-assets.mjs       # restantes imagens
```

---

## 7. O que falta, por ordem de impacto

1. **Fotografia real da clínica.** As imagens de ambiente são de banco de imagens. Meio
   dia de fotógrafo — receção, dois gabinetes, o laboratório de prótese em trabalho, e os
   sete retratos refeitos na mesma sessão — é o maior salto disponível.
2. **Horário de funcionamento** no site e nos dados estruturados.
3. **Avaliações Google** — em saúde, a prova social pesa mais do que qualquer texto.
4. **Casos antes/depois** em implantologia, com consentimento escrito dos doentes.
5. **Convenções e seguros aceites** — os doentes filtram por isto antes de ligar.
