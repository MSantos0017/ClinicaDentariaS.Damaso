# Clínica Dentária S. Dâmaso — site institucional

Site estático (HTML, CSS e JavaScript puro). **Não precisa de Node, PHP ou base de dados
em produção** — basta copiar os ficheiros para o alojamento. O Node só foi usado, no
computador, para otimizar imagens e correr auditorias.

---

## 1. Antes de publicar — lista de verificação

Há quatro coisas que só o cliente pode confirmar. Estão todas marcadas no código.

| # | O quê | Onde |
|---|-------|------|
| 1 | **Domínio real.** Está usado `https://www.clinicadamaso.pt` como exemplo. Substituir em todos os ficheiros. | `index.html`, páginas legais, `robots.txt`, `sitemap.xml` |
| 2 | **Entidade RAL** (resolução alternativa de litígios). A Lei 144/2015 obriga a indicar a entidade competente. | `termos-condicoes.html`, comentário no ponto 7 |
| 3 | **Ativar HSTS** depois de confirmar que o HTTPS funciona em todo o site. | `.htaccess`, linha comentada `Strict-Transport-Security` |
| 4 | **Redirecionamento www / sem-www.** Escolher a versão canónica. | `.htaccess`, bloco comentado na secção 1 |

Para trocar o domínio de uma vez, a partir da pasta do projeto:

```bash
grep -rl "www.clinicadamaso.pt" . --exclude-dir=_originais | xargs sed -i "s|www.clinicadamaso.pt|O-SEU-DOMINIO.pt|g"
```

Pode ainda querer acrescentar o **número de registo na ERS** e o **NIF** no rodapé ou nos
termos — é prática corrente em sites de clínicas, mas não tinha esses dados.

---

## 2. Como publicar (cPanel ou FTP)

Copiar para a pasta `public_html/` **apenas**:

```
index.html
politica-privacidade.html
politica-cookies.html
termos-condicoes.html
404.html
style.css
script.js
.htaccess          ← importante: é um ficheiro oculto, confirme que foi enviado
robots.txt
sitemap.xml
site.webmanifest
assets/            ← pasta inteira (imagens, tipos de letra, ícones)
```

**Não enviar** (só servem para desenvolvimento):

```
_originais/        fotografias e logótipos originais, guardados como cópia de segurança
_ferramentas/      scripts de apoio (otimização de imagens, servidor local)
.claude/           configuração do editor
README.md
```

Depois de publicar, confirmar:

- o site abre em `https://` e o `http://` redireciona;
- a página `404.html` aparece ao visitar um endereço inexistente;
- os tipos de letra carregam (se falharem, o `.htaccess` não foi enviado ou o servidor
  não tem `mod_mime` — ver secção 3 do `.htaccess`).

---

## 3. Estrutura

```
index.html                  página única com todas as secções
politica-*.html             páginas legais
404.html                    página de erro
style.css                   folha de estilos (mobile-first, com variáveis CSS no topo)
script.js                   interações, sem bibliotecas externas
.htaccess                   segurança, compressão, cache, HTTPS
assets/
  fonts/                    Fraunces + Manrope, subconjunto latino (self-hosted)
  img/                      fotografias em AVIF e WebP, em vários tamanhos
  img/equipa/               retratos da equipa
  icons/                    favicons e ícones da aplicação
_originais/                 ficheiros originais, não publicar
```

### Onde mexer para as alterações mais comuns

| Quero… | Onde |
|--------|------|
| mudar cores ou espaçamentos | `style.css`, bloco `:root` no topo |
| mudar telefones / e-mail / morada | `index.html` (secção Contactos e rodapé) + páginas legais |
| acrescentar uma especialidade | duplicar um `<li class="especialidade">` em `index.html` |
| acrescentar alguém à equipa | duplicar um `<li>` da `grelha-equipa` e juntar as fotos a `assets/img/equipa/` |
| alterar os números da implantologia | atributos `data-alvo` na secção `#implantologia` |

As oito primeiras especialidades aparecem logo; as restantes ficam atrás do botão
«Ver todas». Para mudar quais, é só acrescentar ou tirar a classe `especialidade--extra`
e o atributo `hidden`.

---

## 4. Decisões que vale a pena conhecer

**Não há banner de cookies — de propósito.** O site não instala cookies, não tem Google
Analytics e não carrega nada de servidores externos. Um banner a pedir consentimento para
cookies que não existem seria ruído e não traria valor legal. O único conteúdo de terceiros
é o mapa do Google, que **só carrega depois de o visitante clicar no botão**, com o aviso ao
lado. Se mais tarde acrescentar estatísticas ou pixéis de publicidade, aí passa a ser
obrigatório pedir consentimento prévio e atualizar a `politica-cookies.html`.

**Tipos de letra alojados no próprio servidor.** Não se usa o Google Fonts por CDN: evita
um pedido a servidores externos (mais rápido) e afasta a questão de RGPD associada à
partilha do IP dos visitantes com o Google.

**Imagens em AVIF com alternativa WebP.** Cada fotografia existe em vários tamanhos e o
navegador escolhe o mais adequado ao ecrã. O conjunto passou de cerca de 5 MB para 1,5 MB.

**Fotografias de ambiente.** As imagens da clínica, do diagnóstico e da implantologia são
de banco de imagens (Unsplash, uso comercial livre). **Recomendo substituí-las por
fotografias reais da clínica** assim que possível — é o que mais diferencia um site destes.
Basta trocar os ficheiros em `assets/img/` mantendo os nomes, ou voltar a correr o script
de otimização.

---

## 5. Resultados das auditorias

Medido com Lighthouse 12 (Chrome), com compressão ativa:

| Página | | Desempenho | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|---|
| `index.html` | telemóvel | 99 | 100 | 100 | 100 |
| `index.html` | computador | 100 | 100 | 100 | 100 |
| `politica-cookies.html` | telemóvel | 100 | 100 | 100 | 100 |

Core Web Vitals no perfil móvel (4G simulado): **LCP 2,3 s · CLS 0 · TBT 0 ms** — dentro
dos limites do Google (LCP < 2,5 s, CLS < 0,1). Em computador, LCP de 0,5 s.

O ponto em falta no telemóvel vem de a folha de estilos bloquear a primeira renderização
durante ~150 ms. Seria possível chegar a 100 embutindo o CSS crítico no `<head>`, mas isso
duplicaria os estilos e tornaria o site bastante mais difícil de editar à mão. Não compensa
para o que o site é.

> Nota: o Lighthouse assinala as fotografias como «maiores do que o necessário». O aviso
> ignora a densidade de píxeis dos telemóveis (2× a 3×): servir imagens mais pequenas
> deixaria as fotos desfocadas em ecrãs modernos. Foi uma escolha deliberada.

### Segurança

O `.htaccess` envia `Content-Security-Policy` restritiva (nada de scripts, estilos ou
tipos de letra externos), `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
`Permissions-Policy` e `Cross-Origin-Opener-Policy`, força HTTPS e bloqueia a listagem de
diretórios. Depois de publicar, vale a pena confirmar em
[securityheaders.com](https://securityheaders.com) — com o HSTS ativado (ponto 3 da lista
de verificação) o resultado deve ser A ou A+.

---

## 6. Voltar a otimizar imagens

Só é preciso se substituir fotografias. Requer Node instalado:

```bash
npm install sharp
node _ferramentas/build-assets.mjs
```

O script gera, para cada fotografia, as versões AVIF e WebP nos vários tamanhos. Repare que
os caminhos no topo do ficheiro apontam para a pasta do projeto — ajuste-os se mudar o
projeto de sítio. Em alternativa, qualquer conversor para AVIF/WebP serve, desde que
mantenha os nomes e os tamanhos existentes em `assets/img/`.

Para ver o site localmente antes de publicar (útil para testar o `.htaccess` não é, mas
serve para o resto):

```bash
node _ferramentas/dev-server.mjs
```

Depois abrir `http://localhost:5173`.
