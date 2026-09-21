/* =========================================================
   Clínica Dentária S. Dâmaso — comportamento da interface
   Sem dependências externas. Carregado com `defer`.
   ========================================================= */
(function () {
  'use strict';

  var movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Cabeçalho: estado ao deslocar ----------
     Usa uma sentinela observada em vez de um listener de scroll: evita
     ler window.scrollY a cada evento, o que forçava recálculos de layout. */
  var cabecalho = document.getElementById('cabecalho');
  if (cabecalho && 'IntersectionObserver' in window) {
    var sentinela = document.createElement('div');
    sentinela.setAttribute('aria-hidden', 'true');
    sentinela.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:12px;pointer-events:none';
    document.body.prepend(sentinela);

    new IntersectionObserver(function (entradas) {
      cabecalho.dataset.deslocado = entradas[0].isIntersecting ? 'false' : 'true';
    }).observe(sentinela);
  }

  /* ---------- Navegação em telemóvel ---------- */
  var botaoMenu = document.getElementById('hamburguer');
  var navegacao = document.getElementById('navegacao');
  var veu = document.getElementById('veu');
  var principal = document.getElementById('conteudo');
  var rodape = document.querySelector('.rodape');

  function alternaMenu(abrir) {
    if (!botaoMenu || !navegacao) return;
    botaoMenu.setAttribute('aria-expanded', String(abrir));
    botaoMenu.querySelector('.sr-only').textContent = abrir
      ? 'Fechar menu de navegação'
      : 'Abrir menu de navegação';
    navegacao.dataset.aberta = String(abrir);
    if (veu) veu.hidden = !abrir;
    document.body.style.overflow = abrir ? 'hidden' : '';

    // Isola o resto da página dos leitores de ecrã e do teclado
    [principal, rodape, cabecalho ? cabecalho.querySelector('.marca') : null].forEach(function (el) {
      if (!el) return;
      if (abrir) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });

    if (abrir) {
      // espera pelo recálculo de estilo: um elemento ainda invisível não aceita foco
      requestAnimationFrame(function () {
        var primeiro = navegacao.querySelector('a');
        if (primeiro) primeiro.focus();
      });
    } else {
      botaoMenu.focus();
    }
  }

  if (botaoMenu && navegacao) {
    botaoMenu.addEventListener('click', function () {
      alternaMenu(botaoMenu.getAttribute('aria-expanded') !== 'true');
    });
    if (veu) veu.addEventListener('click', function () { alternaMenu(false); });

    navegacao.addEventListener('click', function (evento) {
      if (evento.target.closest('a') && window.matchMedia('(max-width: 61.999em)').matches) {
        alternaMenu(false);
      }
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && botaoMenu.getAttribute('aria-expanded') === 'true') {
        alternaMenu(false);
      }
    });

    // Se o ecrã crescer com o painel aberto, repõe o estado normal
    window.matchMedia('(min-width: 62em)').addEventListener('change', function (evento) {
      if (evento.matches && botaoMenu.getAttribute('aria-expanded') === 'true') alternaMenu(false);
    });
  }

  /* ---------- Revelação progressiva ----------
     O CSS não esconde nada: é o JS que aplica o estado inicial,
     garantindo que o conteúdo continua visível sem JavaScript. */
  var reveláveis = Array.prototype.slice.call(document.querySelectorAll('[data-revelar]'));

  if (reveláveis.length && 'IntersectionObserver' in window && !movimentoReduzido) {
    reveláveis.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
    });

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.style.opacity = '';
        entrada.target.style.transform = '';
        observador.unobserve(entrada.target);
      });
      // limiar 0 para que blocos altos (grelhas) não fiquem à espera
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

    reveláveis.forEach(function (el) { observador.observe(el); });
  }

  /* ---------- Contadores ---------- */
  var contadores = Array.prototype.slice.call(document.querySelectorAll('.contador'));

  function anima(contador) {
    var alvo = Number(contador.dataset.alvo || 0);
    var sufixo = contador.dataset.sufixo || '';
    var formatador = new Intl.NumberFormat('pt-PT');

    if (movimentoReduzido) {
      contador.textContent = formatador.format(alvo) + sufixo;
      return;
    }

    var duracao = 1500;
    var inicio = null;

    function passo(agora) {
      if (inicio === null) inicio = agora;
      var progresso = Math.min((agora - inicio) / duracao, 1);
      var suavizado = 1 - Math.pow(1 - progresso, 3);
      contador.textContent = formatador.format(Math.round(alvo * suavizado)) + sufixo;
      if (progresso < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  if (contadores.length && 'IntersectionObserver' in window) {
    var obsContadores = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        anima(entrada.target);
        obsContadores.unobserve(entrada.target);
      });
    }, { threshold: 0.6 });
    contadores.forEach(function (c) { obsContadores.observe(c); });
  } else {
    contadores.forEach(anima);
  }

  /* ---------- Especialidades: mostrar todas ---------- */
  var botaoEspecialidades = document.getElementById('botao-especialidades');
  if (botaoEspecialidades) {
    var extras = Array.prototype.slice.call(document.querySelectorAll('.especialidade--extra'));
    var rotulo = botaoEspecialidades.querySelector('span');

    botaoEspecialidades.addEventListener('click', function () {
      var expandir = botaoEspecialidades.getAttribute('aria-expanded') !== 'true';
      botaoEspecialidades.setAttribute('aria-expanded', String(expandir));
      rotulo.textContent = expandir
        ? rotulo.dataset.rotuloAberto
        : rotulo.dataset.rotuloFechado;

      extras.forEach(function (item, indice) {
        if (expandir) {
          item.hidden = false;
          item.style.animationDelay = movimentoReduzido ? '0s' : indice * 45 + 'ms';
        } else {
          item.hidden = true;
        }
      });

      if (!expandir) {
        botaoEspecialidades.scrollIntoView({ block: 'center', behavior: movimentoReduzido ? 'auto' : 'smooth' });
      }
    });
  }

  /* ---------- Modal da equipa ---------- */
  var modal = document.getElementById('modal-pessoa');
  if (modal && typeof modal.showModal === 'function') {
    var modalNome = document.getElementById('modal-nome');
    var modalFuncao = document.getElementById('modal-funcao');
    var modalCreditos = document.getElementById('modal-creditos');
    var modalImg = document.getElementById('modal-img');
    var modalAvif = document.getElementById('modal-avif');
    var modalWebp = document.getElementById('modal-webp');

    document.querySelectorAll('.pessoa').forEach(function (cartao) {
      cartao.addEventListener('click', function () {
        var slug = cartao.dataset.foto;
        var nome = cartao.dataset.nome;

        modalNome.textContent = nome;
        modalFuncao.textContent = cartao.dataset.funcao;
        modalImg.alt = 'Retrato de ' + nome + '.';
        modalAvif.srcset = 'assets/img/equipa/' + slug + '-400.avif 400w, assets/img/equipa/' + slug + '-600.avif 600w';
        modalWebp.srcset = 'assets/img/equipa/' + slug + '-400.webp 400w, assets/img/equipa/' + slug + '-600.webp 600w';
        modalImg.src = 'assets/img/equipa/' + slug + '-600.webp';

        modalCreditos.replaceChildren();
        var modelo = cartao.querySelector('template');
        if (modelo) modalCreditos.append(modelo.content.cloneNode(true));

        modal.showModal();
      });
    });

    var fecharModal = document.getElementById('modal-fechar');
    if (fecharModal) fecharModal.addEventListener('click', function () { modal.close(); });

    // Fecha ao clicar fora do cartão
    modal.addEventListener('click', function (evento) {
      if (evento.target === modal) modal.close();
    });
  }

  /* ---------- Mapa: só carrega com consentimento explícito ---------- */
  var botaoMapa = document.getElementById('carregar-mapa');
  var mapa = document.getElementById('mapa');
  if (botaoMapa && mapa) {
    botaoMapa.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = mapa.dataset.src;
      iframe.title = 'Mapa com a localização da Clínica Dentária S. Dâmaso, na Alameda S. Dâmaso 23, Guimarães';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.allowFullscreen = true;
      mapa.replaceChildren(iframe);
    });
  }

  /* ---------- Botão flutuante de telefone ---------- */
  var botaoTelefone = document.getElementById('botao-telefone');
  var opcoesTelefone = document.getElementById('opcoes-telefone');
  if (botaoTelefone && opcoesTelefone) {
    var alternaTelefone = function (abrir) {
      botaoTelefone.setAttribute('aria-expanded', String(abrir));
      opcoesTelefone.hidden = !abrir;
    };

    botaoTelefone.addEventListener('click', function (evento) {
      evento.stopPropagation();
      alternaTelefone(botaoTelefone.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('click', function (evento) {
      if (botaoTelefone.getAttribute('aria-expanded') !== 'true') return;
      if (!evento.target.closest('.accao-flutuante')) alternaTelefone(false);
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && botaoTelefone.getAttribute('aria-expanded') === 'true') {
        alternaTelefone(false);
        botaoTelefone.focus();
      }
    });
  }

  /* ---------- Secção ativa na navegação ---------- */
  var seccoes = Array.prototype.slice.call(
    document.querySelectorAll('main section[id]')
  );
  var ligacoesNav = Array.prototype.slice.call(
    document.querySelectorAll('.navegacao__lista a')
  );

  if (seccoes.length && ligacoesNav.length && 'IntersectionObserver' in window) {
    var obsSeccoes = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        var id = entrada.target.id;
        ligacoesNav.forEach(function (ligacao) {
          var ativa = ligacao.getAttribute('href') === '#' + id;
          if (ativa) ligacao.setAttribute('aria-current', 'true');
          else ligacao.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    seccoes.forEach(function (seccao) { obsSeccoes.observe(seccao); });
  }
})();
