/* =====================================================================
   Conteúdo do site, nas duas línguas.
   As duas árvores têm exatamente a mesma forma — se acrescentar um campo
   em `pt`, acrescente o equivalente em `en`, senão o gerador avisa.
   Editar aqui e voltar a correr `node _ferramentas/build.mjs`.
   ===================================================================== */

/* Dados que não se traduzem */
export const comum = {
  nome: 'Clínica Dentária S. Dâmaso',
  telefone: '253 041 692',
  telefoneLink: '+351253041692',
  telemovel: '93 93 99 333',
  telemovelLink: '+351939399333',
  // CONFIRMAR COM A CLÍNICA se este número tem WhatsApp ativo
  whatsapp: '351939399333',
  email: 'clinica_damaso@netcabo.pt',
  rua: 'Alameda S. Dâmaso 23',
  codigoPostal: '4810-286 Guimarães',
  mapa: 'https://www.google.com/maps?q=Alameda%20S.%20D%C3%A2maso%2023%2C%204810-286%20Guimar%C3%A3es&z=16&output=embed',
  direcoes: 'https://www.google.com/maps/dir/?api=1&destination=Alameda+S.+D%C3%A2maso+23%2C+4810-286+Guimar%C3%A3es',
  equipa: ['carmen', 'antonio', 'fabiana', 'isabel', 'elsa', 'andreia', 'bebiana'],
  clinicos: ['carmen', 'antonio', 'fabiana', 'isabel'],
  apoio: ['elsa', 'andreia', 'bebiana'],
};

/* Ligação entre páginas: a mesma página tem nomes de ficheiro diferentes
   por língua, e é isto que permite gerar o `hreflang` e o seletor de idioma. */
export const paginas = {
  inicio: { pt: 'index.html', en: 'index.html' },
  implantologia: { pt: 'implantologia.html', en: 'implants.html' },
  ortodontia: { pt: 'ortodontia.html', en: 'orthodontics.html' },
  odontopediatria: { pt: 'odontopediatria.html', en: 'childrens-dentistry.html' },
  privacidade: { pt: 'politica-privacidade.html', en: 'privacy-policy.html' },
  cookies: { pt: 'politica-cookies.html', en: 'cookie-policy.html' },
  termos: { pt: 'termos-condicoes.html', en: 'terms-and-conditions.html' },
  erro: { pt: '404.html', en: '404.html' },
};

export const conteudo = {
  /* ================================================================= */
  /* ============================ PORTUGUÊS ========================== */
  /* ================================================================= */
  pt: {
    codigo: 'pt',
    htmlLang: 'pt-PT',
    ogLocale: 'pt_PT',
    nomeIdioma: 'Português',
    outroIdioma: { codigo: 'en', rotulo: 'EN', titulo: 'Switch to English' },

    ui: {
      saltar: 'Saltar para o conteúdo principal',
      abrirMenu: 'Abrir menu de navegação',
      fecharMenu: 'Fechar menu de navegação',
      marcar: 'Marcar consulta',
      voltarSite: 'Voltar ao site',
      voltarInicio: '← Voltar à página inicial',
      saberMais: 'Saber mais',
      verPercurso: 'ver percurso',
      fechar: 'Fechar',
      topo: 'Voltar ao topo',
      ligar: 'Ligar',
      contactosTelefonicos: 'Contactos telefónicos',
      chamadaNota: 'Chamada para a rede fixa e móvel nacional.',
      duvidasTitulo: 'Ficou com alguma dúvida?',
      duvidasTexto: 'Ligue-nos e fale com alguém da equipa. Esclarecer ao telefone poupa-lhe muitas vezes uma deslocação.',
    },

    nav: [
      { pagina: 'inicio', ancora: 'clinica', rotulo: 'A Clínica' },
      { pagina: 'inicio', ancora: 'especialidades', rotulo: 'Especialidades' },
      { pagina: 'implantologia', rotulo: 'Implantologia' },
      { pagina: 'inicio', ancora: 'equipa', rotulo: 'Equipa' },
      { pagina: 'inicio', ancora: 'contactos', rotulo: 'Contactos' },
    ],

    meta: {
      inicio: {
        titulo: 'Clínica Dentária S. Dâmaso | Medicina Dentária em Guimarães',
        descricao:
          'Clínica dentária em Guimarães com laboratório de prótese próprio e cerca de 20 anos de experiência em implantologia. Implantes, ortodontia, odontopediatria e estética dentária na Alameda S. Dâmaso.',
      },
      implantologia: {
        titulo: 'Implantes Dentários em Guimarães | Clínica S. Dâmaso',
        descricao:
          'Dentes fixos sobre implantes no próprio dia, com planeamento digital apoiado em TAC. Cerca de 20 anos de experiência em implantologia, em Guimarães.',
      },
      ortodontia: {
        titulo: 'Aparelho Dentário e Alinhadores em Guimarães | Clínica S. Dâmaso',
        descricao:
          'Aparelho fixo, alinhadores invisíveis e contenção. Conheça cada método de ortodontia, para adultos e crianças, na Clínica Dentária S. Dâmaso em Guimarães.',
      },
      odontopediatria: {
        titulo: 'Dentista para Crianças em Guimarães | Clínica S. Dâmaso',
        descricao:
          'Consultas de medicina dentária pensadas para crianças, ao ritmo delas. Prevenção, selantes e primeira visita sem medo, em Guimarães.',
      },
      erro: { titulo: 'Página não encontrada', descricao: 'A página que procura não existe.' },
    },

    hero: {
      sobretitulo: 'Medicina dentária em Guimarães',
      titulo: ['O seu sorriso, cuidado ao ', 'detalhe', '.'],
      lead:
        'Na Alameda S. Dâmaso, reunimos uma equipa multidisciplinar, laboratório de prótese próprio e tecnologia de diagnóstico avançada — para lhe dar respostas rigorosas e sem esperas.',
      ctaPrimario: 'Marcar consulta',
      ctaSecundario: 'Ver especialidades',
      alt: 'Médico dentista a explicar uma radiografia panorâmica a uma paciente sentada na cadeira de consulta.',
      provas: [
        { valor: '~20 anos', nota: 'de experiência em implantologia' },
        { valor: 'Laboratório', nota: 'de prótese na própria clínica' },
        { valor: 'Top 5% PME', nota: 'distinção Scoring 2025' },
      ],
    },

    clinica: {
      sobretitulo: 'A nossa essência',
      titulo: ['Um legado de ', 'excelência', ' no centro de Guimarães'],
      citacao:
        'Capacitar toda a estrutura com as melhores soluções técnicas e humanas, para prestar aos pacientes as melhores soluções em todas as áreas da medicina dentária.',
      texto:
        'Situados na icónica Alameda S. Dâmaso, temos laboratório de prótese interno — o que permite uma resposta mais breve e eficaz na reabilitação oral, seja com prótese fixa ou removível.',
      altPrincipal: 'Gabinete da clínica com cadeira de consulta e equipamento dentário.',
      altSecundaria: 'Médico dentista a analisar reconstruções 3D de uma tomografia dentária.',
      altSelo: 'Selo Top 5% PME 2025 atribuído pela Scoring.',
      vantagens: [
        {
          icone: 'i-lab',
          titulo: 'Laboratório interno',
          texto: 'Próteses fixas e removíveis com prazos curtos e controlo de qualidade em cada etapa.',
        },
        {
          icone: 'i-tecnologia',
          titulo: 'Diagnóstico avançado',
          texto: 'Ortopantomografia, telerradiografia e TAC no local, para planear com rigor.',
        },
        {
          icone: 'i-coracao',
          titulo: 'Acompanhamento dedicado',
          texto: 'Uma equipa multidisciplinar centrada no seu conforto em cada consulta.',
        },
      ],
    },

    especialidades: {
      sobretitulo: 'O que fazemos',
      titulo: 'Especialidades',
      lead: 'Todas as áreas da medicina dentária, num só lugar e com a mesma equipa a acompanhá-lo.',
      verTodas: 'Ver todas as especialidades',
      verMenos: 'Ver menos',
      itens: [
        { icone: 'i-implante', nome: 'Implantologia', nota: 'Dentes fixos sobre implantes.', pagina: 'implantologia' },
        { icone: 'i-ortodontia', nome: 'Ortodontia', nota: 'Aparelho fixo para alinhar o sorriso.', pagina: 'ortodontia' },
        { icone: 'i-alinhador', nome: 'Alinhadores invisíveis', nota: 'Correção discreta e removível.', pagina: 'ortodontia', ancora: 'alinhador' },
        { icone: 'i-crianca', nome: 'Odontopediatria', nota: 'Cuidados dentários para crianças.', pagina: 'odontopediatria' },
        { icone: 'i-faceta', nome: 'Facetas dentárias', nota: 'Estética natural em cerâmica.' },
        { icone: 'i-coroa', nome: 'Coroas e pontes', nota: 'Reabilitação de dentes danificados.' },
        { icone: 'i-protese', nome: 'Prótese dentária', nota: 'Fixa ou removível, com laboratório próprio.' },
        { icone: 'i-branqueamento', nome: 'Branqueamento', nota: 'Clareamento seguro e acompanhado.' },
        { icone: 'i-estetica', nome: 'Dentisteria estética', nota: 'Restaurações discretas e duradouras.', extra: true },
        { icone: 'i-endodontia', nome: 'Endodontia', nota: 'Tratamento de canais radiculares.', extra: true },
        { icone: 'i-periodontologia', nome: 'Periodontologia', nota: 'Saúde das gengivas e do osso de suporte.', extra: true },
        { icone: 'i-cirurgia', nome: 'Cirurgia oral', nota: 'Extrações e pequenas cirurgias.', extra: true },
        { icone: 'i-higiene', nome: 'Higiene oral', nota: 'Destartarização e prevenção.', extra: true },
        { icone: 'i-raiox', nome: 'Ortopantomografia', nota: 'Radiografia panorâmica no local.', extra: true },
        { icone: 'i-tac', nome: 'TAC e telerradiografia', nota: 'Imagem 3D para planeamento rigoroso.', extra: true },
      ],
    },

    destaqueImplante: {
      sobretitulo: 'Especialidade de excelência',
      titulo: ['Implantologia com ', 'dentes fixos no próprio dia'],
      texto:
        'Há cerca de 20 anos que colocamos dentes fixos sobre implantes. O planeamento digital, apoiado em TAC, permite-nos antecipar cada passo da cirurgia — com mais previsibilidade, menos tempo de cadeira e um resultado que acompanha a sua expressão natural.',
      alt: 'Planeamento digital de implantes numa tomografia 3D apresentada num ecrã tátil.',
      cta: 'Conhecer a implantologia',
      contadores: [
        { alvo: 20, sufixo: '', nota: 'anos de experiência em implantologia' },
        { alvo: 10000, sufixo: '+', nota: 'implantes colocados' },
        { alvo: 1, sufixo: ' dia', nota: 'para sair com dentes fixos' },
      ],
    },

    criancas: {
      sobretitulo: 'Odontopediatria',
      titulo: ['Com as crianças, o tempo é ', 'delas'],
      texto:
        'A primeira ida ao dentista marca a relação de uma criança com a saúde oral para o resto da vida. Por isso não apressamos nada: explicamos cada passo por palavras que elas percebem, deixamos tocar no espelho e no aspirador, e só avançamos quando estão à vontade.',
      pontos: [
        { icone: 'i-crianca', titulo: 'Primeira visita sem tratamento', texto: 'Serve só para conhecer a clínica, a cadeira e a equipa.' },
        { icone: 'i-coracao', titulo: 'Nada de surpresas', texto: 'Explicamos cada passo por palavras que a criança percebe.' },
        { icone: 'i-visto', titulo: 'Pais sempre presentes', texto: 'Ficam no gabinete do princípio ao fim da consulta.' },
        { icone: 'i-higiene', titulo: 'Prevenção primeiro', texto: 'Selantes, flúor e escovagem orientada, com os pais a ver.' },
      ],
      cta: 'Ver consultas para crianças',
      alt: 'Criança a sorrir de forma espontânea.',
    },

    faq: {
      sobretitulo: 'Antes de vir',
      titulo: 'Perguntas frequentes',
      lead: 'Se ficar com alguma dúvida por responder, ligue-nos — respondemos de bom grado.',
      itens: [
        {
          p: 'Preciso de marcação ou posso aparecer?',
          r: 'As consultas são sempre por marcação, por telefone ou e-mail. Em caso de dor aguda, ligue-nos: procuramos sempre encaixar as urgências no próprio dia.',
        },
        {
          p: 'Onde posso estacionar?',
          r: 'Tem uma hora de estacionamento gratuito no Centro Comercial S. Francisco, a cerca de 200 metros — dois minutos a pé da clínica.',
        },
        {
          p: 'Fazem radiografias no local?',
          r: 'Sim. Temos ortopantomografia, telerradiografia e TAC na própria clínica, o que evita deslocações e permite decidir o tratamento na mesma consulta.',
        },
        {
          p: 'Quanto tempo demora uma prótese?',
          r: 'Como o laboratório de prótese é nosso e fica dentro da clínica, os prazos são bastante mais curtos do que o habitual e qualquer acerto é feito no momento, sem esperar por terceiros.',
        },
        {
          p: 'É mesmo possível sair com dentes fixos no próprio dia?',
          r: 'Em muitos casos, sim — é uma técnica que praticamos há cerca de 20 anos. Depende da quantidade e da qualidade do osso, que avaliamos com TAC numa consulta de diagnóstico antes de qualquer decisão.',
        },
        {
          p: 'A partir de que idade devo trazer o meu filho?',
          r: 'Por volta do primeiro ano de idade, ou assim que nascerem os primeiros dentes. A primeira visita serve sobretudo para a criança conhecer o espaço e para orientarmos os pais na higiene.',
        },
      ],
    },

    equipa: {
      sobretitulo: 'Quem o recebe',
      titulo: ['A equipa que cuida de ', 'si'],
      lead:
        'Médicos dentistas e assistentes que acompanham cada tratamento do princípio ao fim — sempre as mesmas caras, consulta após consulta.',
      grupoClinico: 'Corpo clínico',
      grupoClinicoNota: '4 médicos dentistas',
      grupoApoio: 'Equipa de apoio',
      grupoApoioNota: '3 assistentes dentárias',
      pessoas: {
        carmen: {
          nome: 'Dra. Cármen Capelo',
          funcao: 'Diretora Clínica',
          creditos: ['Médica dentista', 'Especialização em Periodontologia', 'Pós-graduação em Odontopediatria', 'Pós-graduação em Ortodontia'],
        },
        antonio: {
          nome: 'Dr. António Sousa Carvalho',
          funcao: 'Médico Dentista',
          creditos: ['Especialização em Periodontologia', 'Formação avançada em Implantologia', 'Responsável pelo departamento de reabilitação oral em Implantologia'],
        },
        fabiana: {
          nome: 'Dra. Fabiana Duarte',
          funcao: 'Médica Dentista',
          creditos: ['Pós-graduação em Ortodontia', 'Formação em Dentisteria Estética'],
        },
        isabel: {
          nome: 'Dra. Isabel Mesquita',
          funcao: 'Médica Dentista',
          creditos: ['Formação avançada em Endodontia'],
        },
        elsa: { nome: 'Elsa Salgado', funcao: 'Assistente Dentária', creditos: ['Responsável Intra Office'] },
        andreia: {
          nome: 'Andreia Salgado',
          funcao: 'Assistente Dentária',
          creditos: ['Responsável pela receção', 'Comunicação com os utentes'],
        },
        bebiana: {
          nome: 'Bebiana Martins',
          funcao: 'Assistente Dentária',
          creditos: ['Licenciada em Sociologia', 'Responsável de Back Office', 'Comunicação com fornecedores'],
        },
      },
    },

    contactos: {
      sobretitulo: 'Estamos aqui para si',
      titulo: 'Contactos e localização',
      rotuloTelefone: 'Telefone da clínica',
      rotuloTelemovel: 'Telemóvel',
      rotuloEmail: 'E-mail',
      rotuloMorada: 'Morada',
      rotuloWhatsapp: 'WhatsApp',
      whatsappNota: 'Resposta em horário de expediente',
      estacionamentoTitulo: '1 hora de estacionamento grátis',
      estacionamentoTexto: ['No Centro Comercial S. Francisco, a cerca de 200 m — ', '2 minutos a pé', ' da clínica.'],
      mapaTitulo: 'Alameda S. Dâmaso 23, Guimarães',
      mapaAviso:
        'O mapa é fornecido pelo Google Maps. Ao carregá-lo, aceita que o Google possa recolher dados e instalar cookies no seu dispositivo.',
      mapaBotao: 'Carregar o mapa',
      mapaAlternativa: 'Abrir direções numa nova janela',
      mapaTituloIframe: 'Mapa com a localização da Clínica Dentária S. Dâmaso, na Alameda S. Dâmaso 23, Guimarães',
    },

    rodape: {
      descricao: 'Medicina dentária com laboratório de prótese próprio, no coração de Guimarães.',
      colunaClinica: 'Clínica',
      colunaContactos: 'Contactos',
      colunaLegal: 'Informação legal',
      livroReclamacoes: 'Livro de Reclamações',
      direitos: 'Todos os direitos reservados.',
      altLogo: 'Logótipo da Clínica Dentária S. Dâmaso.',
      altSelo: 'Selo Top 5% PME 2025 atribuído pela Scoring.',
    },

    /* ---------- Páginas de tratamento ---------- */
    tratamentos: {
      implantologia: {
        factos: [
          { valor: '~20 anos', nota: 'a colocar implantes' },
          { valor: 'TAC no local', nota: 'diagnóstico sem deslocações' },
          { valor: 'Laboratório próprio', nota: 'coroas feitas na clínica' },
        ],
        porqueTitulo: 'Porquê na S. Dâmaso',
        sobretitulo: 'Especialidade de excelência',
        titulo: ['Implantes dentários, com ', 'dentes fixos no próprio dia'],
        lead:
          'Um implante substitui a raiz de um dente perdido. Sobre ele assenta uma coroa feita à medida, que volta a dar-lhe função e naturalidade — para mastigar, falar e sorrir sem pensar no assunto.',
        alt: 'Médico dentista a analisar reconstruções tridimensionais de uma tomografia dentária num negatoscópio.',
        intro: {
          titulo: 'Para quem faz sentido',
          texto:
            'Para quem perdeu um dente, vários ou todos. Também para quem usa prótese removível e quer deixar de a tirar e pôr. O que determina o plano não é a idade, é a quantidade e a qualidade do osso disponível — e isso avaliamos com uma TAC feita aqui, antes de qualquer decisão.',
        },
        metodosTitulo: 'As soluções que usamos',
        metodosLead: 'Cada boca é um caso. Estas são as três abordagens mais frequentes.',
        metodos: [
          {
            icone: 'i-implante',
            nome: 'Implante unitário',
            texto:
              'Substitui um só dente, sem tocar nos vizinhos. É a diferença face a uma ponte tradicional, que obriga a desgastar os dentes de cada lado.',
          },
          {
            icone: 'i-coroa',
            nome: 'Vários dentes sobre implantes',
            texto:
              'Quando faltam dentes seguidos, alguns implantes bem posicionados suportam uma ponte fixa — não é preciso um implante por cada dente.',
          },
          {
            icone: 'i-protese',
            nome: 'Dentes fixos no próprio dia',
            texto:
              'Em casos selecionados, colocamos os implantes e uma prótese fixa provisória na mesma sessão. Sai da clínica com dentes, e a prótese definitiva é feita depois da cicatrização.',
          },
        ],
        processoTitulo: 'Como decorre',
        processo: [
          { titulo: 'Diagnóstico', texto: 'Consulta de avaliação com TAC e radiografia feitas no local. Saímos daqui com um plano e um orçamento escritos.' },
          { titulo: 'Planeamento digital', texto: 'Estudamos a posição de cada implante sobre a imagem 3D, antes de entrar no bloco. Menos surpresas, cirurgia mais curta.' },
          { titulo: 'Colocação', texto: 'Cirurgia com anestesia local, em ambiente controlado. A maioria dos pacientes retoma a rotina no dia seguinte.' },
          { titulo: 'Coroa definitiva', texto: 'Feita no nosso laboratório, dentro da clínica, com acertos de cor e forma no momento.' },
          { titulo: 'Acompanhamento', texto: 'Consultas de revisão e higiene para manter o implante saudável a longo prazo.' },
        ],
        faqTitulo: 'Dúvidas frequentes sobre implantes',
        faq: [
          { p: 'Dói?', r: 'A cirurgia é feita sob anestesia local e não se sente dor durante o procedimento. No pós-operatório há algum desconforto, controlado com a medicação que prescrevemos.' },
          { p: 'Quanto tempo dura um implante?', r: 'Com higiene cuidada e consultas de revisão, um implante pode durar muitos anos. O que mais compromete a longevidade é a doença das gengivas e o tabaco.' },
          { p: 'E se não tiver osso suficiente?', r: 'Há técnicas de regeneração óssea que permitem recuperar volume. A TAC diz-nos com rigor o que é possível no seu caso.' },
          { p: 'Sou diabético ou fumador. Posso fazer?', r: 'Na maioria dos casos sim, mas exige avaliação prévia e um acompanhamento mais próximo. Falamos disso abertamente na consulta de diagnóstico.' },
        ],
        ctaTitulo: 'Quer saber se é candidato?',
        ctaTexto: 'A consulta de diagnóstico esclarece o que é possível no seu caso, com imagem e orçamento por escrito.',
      },

      ortodontia: {
        factos: [
          { valor: 'Fixo e invisível', nota: 'os dois métodos na mesma clínica' },
          { valor: 'Raio-X no local', nota: 'panorâmica e telerradiografia' },
          { valor: 'Sem limite de idade', nota: 'crianças, adolescentes e adultos' },
        ],
        porqueTitulo: 'Porquê na S. Dâmaso',
        sobretitulo: 'Ortodontia',
        titulo: ['Alinhar os dentes, no método que ', 'lhe assenta'],
        lead:
          'Dentes alinhados não são só uma questão de estética: distribuem melhor a força da mastigação, são mais fáceis de escovar e protegem as gengivas. Há mais do que uma forma de lá chegar.',
        alt: 'Pormenor de um aparelho dentário fixo durante uma consulta de ortodontia.',
        intro: {
          titulo: 'Não há idade para começar',
          texto:
            'Tratamos crianças, adolescentes e adultos. Nas crianças, começar cedo pode orientar o crescimento dos maxilares e evitar tratamentos mais longos depois. Nos adultos, o que costuma pesar é a discrição — e é aí que os alinhadores mudaram o jogo.',
        },
        metodosTitulo: 'Os métodos',
        metodosLead: 'Na primeira consulta avaliamos o seu caso e explicamos qual faz mais sentido, e porquê.',
        metodos: [
          {
            icone: 'i-ortodontia',
            nome: 'Aparelho fixo',
            texto:
              'Brackets colados aos dentes, ligados por um arco. É o método mais versátil: resolve praticamente todos os casos, incluindo os mais complexos. Não depende da colaboração do paciente, porque não se tira.',
            bom: 'Casos complexos, crianças e adolescentes',
          },
          {
            icone: 'i-alinhador',
            nome: 'Alinhadores invisíveis',
            texto:
              'Uma sequência de moldeiras transparentes, feitas à medida, que vai movendo os dentes por etapas. Tiram-se para comer e escovar, e passam praticamente despercebidas.',
            bom: 'Adultos e casos ligeiros a moderados',
          },
          {
            icone: 'i-faceta',
            nome: 'Contenção',
            texto:
              'A fase que ninguém deve saltar. Depois de alinhados, os dentes tendem a voltar atrás; a contenção — fixa ou removível — é o que garante que o resultado se mantém.',
            bom: 'Todos os tratamentos, depois de terminados',
          },
        ],
        processoTitulo: 'Como decorre',
        processo: [
          { titulo: 'Avaliação', texto: 'Observação, radiografia panorâmica e telerradiografia, feitas aqui. Percebemos o que há a corrigir e porquê.' },
          { titulo: 'Plano e orçamento', texto: 'Apresentamos as opções possíveis, o tempo estimado e o custo de cada uma, por escrito.' },
          { titulo: 'Colocação', texto: 'Colamos o aparelho ou entregamos a primeira sequência de alinhadores, com instruções claras.' },
          { titulo: 'Consultas de controlo', texto: 'Ajustes regulares para manter o movimento no rumo certo. O intervalo depende do método.' },
          { titulo: 'Contenção', texto: 'Terminado o alinhamento, passamos à fase de estabilização — e mantemos a vigilância.' },
        ],
        faqTitulo: 'Dúvidas frequentes sobre ortodontia',
        faq: [
          { p: 'Quanto tempo demora?', r: 'Depende muito do caso. Correções ligeiras podem resolver-se em poucos meses; situações complexas levam um a dois anos. Damos uma estimativa realista na consulta de avaliação.' },
          { p: 'Os alinhadores servem para toda a gente?', r: 'Não. São excelentes em casos ligeiros a moderados, mas há movimentos que o aparelho fixo faz melhor. Preferimos dizer-lhe isso à partida do que prometer o que não se cumpre.' },
          { p: 'Dói pôr aparelho?', r: 'Colocar não dói. Nos dias seguintes a cada ajuste há sensibilidade ao morder, que passa. É sinal de que os dentes se estão a mover.' },
          { p: 'Posso fazer ortodontia com as gengivas inflamadas?', r: 'Não convém. Tratamos primeiro a gengiva e só depois iniciamos o movimento — mover dentes sobre gengivas doentes agrava o problema.' },
        ],
        ctaTitulo: 'Quer perceber que método lhe serve?',
        ctaTexto: 'Na consulta de avaliação mostramos-lhe as opções e damos-lhe uma estimativa de tempo e de custo.',
      },

      odontopediatria: {
        factos: [
          { valor: '1.ª visita', nota: 'sem tratamento nenhum' },
          { valor: 'Pais presentes', nota: 'no gabinete, sempre' },
          { valor: 'Desde 1 ano', nota: 'ou aos primeiros dentes' },
        ],
        porqueTitulo: 'Porquê na S. Dâmaso',
        sobretitulo: 'Odontopediatria',
        titulo: ['Com as crianças, o tempo é ', 'delas'],
        lead:
          'A forma como corre a primeira ida ao dentista fica. Se correr bem, ganha-se um adulto que vai ao dentista sem drama — e é isso que procuramos em cada consulta.',
        alt: 'Criança a sorrir, com os dentes à vista.',
        intro: {
          titulo: 'A primeira visita é só para conhecer',
          texto:
            'Marcamos a primeira consulta sem tratamento nenhum. A criança senta-se na cadeira, sobe e desce, pega no espelho, ouve o aspirador. Contamos o que cada coisa faz por palavras que ela percebe. Só marcamos tratamento depois — e já com o sítio conhecido.',
        },
        metodosTitulo: 'O que fazemos',
        metodosLead: 'Prevenir é quase sempre mais simples, mais barato e menos assustador do que tratar.',
        metodos: [
          {
            icone: 'i-higiene',
            nome: 'Prevenção',
            texto:
              'Selantes de fissura nos dentes definitivos, aplicação de flúor e escovagem orientada — com os pais presentes, para depois se repetir em casa da mesma maneira.',
          },
          {
            icone: 'i-crianca',
            nome: 'Cáries em dentes de leite',
            texto:
              'Os dentes de leite tratam-se: guardam o espaço para os definitivos e doem como quaisquer outros. Restauramos com técnicas pensadas para consultas curtas.',
          },
          {
            icone: 'i-ortodontia',
            nome: 'Vigilância do crescimento',
            texto:
              'Acompanhamos a troca de dentição e a forma como os maxilares crescem. Detetado a tempo, um desvio corrige-se de forma mais simples.',
          },
        ],
        processoTitulo: 'Como preparamos a visita',
        processo: [
          { titulo: 'Antes de vir', texto: 'Evite frases como «não vai doer» — introduzem a ideia de dor. Diga só que vamos contar os dentes.' },
          { titulo: 'Na receção', texto: 'Damos tempo. Se a criança precisar de ver outra pessoa entrar primeiro, esperamos.' },
          { titulo: 'No gabinete', texto: 'Os pais ficam sempre presentes. Explicamos cada instrumento antes de o usar, e mostramos primeiro na mão.' },
          { titulo: 'No fim', texto: 'Sai sempre com uma vitória, por pequena que seja. A consulta seguinte começa daí.' },
        ],
        faqTitulo: 'Dúvidas frequentes dos pais',
        faq: [
          { p: 'Com que idade deve ser a primeira consulta?', r: 'Por volta do primeiro ano, ou assim que nascerem os primeiros dentes. Mesmo que não haja nada a tratar, é a altura de orientar a higiene e os hábitos alimentares.' },
          { p: 'Vale a pena tratar dentes de leite?', r: 'Vale. Guardam o espaço para os dentes definitivos, são precisos para mastigar e falar, e uma cárie não tratada dói e pode afetar o dente que vem por baixo.' },
          { p: 'E se o meu filho não deixar?', r: 'Acontece e não é problema. Paramos, voltamos noutro dia e vamos por etapas. Forçar uma primeira consulta é a melhor forma de criar um medo que dura anos.' },
          { p: 'Posso estar presente?', r: 'Sim, e preferimos que esteja. A presença dos pais dá segurança à criança, sobretudo nas primeiras vezes.' },
        ],
        ctaTitulo: 'Quer marcar a primeira visita?',
        ctaTexto: 'Ligue-nos e diga a idade da criança. Reservamos um horário com tempo, sem pressa.',
      },
    },

    /* ---------- Páginas legais (texto em build.mjs para não inchar aqui) ---------- */
    legal: {
      sobretitulo: 'Informação legal',
      atualizacao: 'Última atualização: setembro de 2026',
      resumo: 'Em resumo:',
    },

    erro: {
      titulo: 'Não encontrámos esta página',
      texto: 'A ligação que seguiu pode estar desatualizada ou ter sido escrita incorretamente. Pode voltar ao início ou falar diretamente connosco.',
      voltar: 'Voltar ao início',
    },
  },

  /* ================================================================= */
  /* ============================= ENGLISH =========================== */
  /* ================================================================= */
  en: {
    codigo: 'en',
    htmlLang: 'en-GB',
    ogLocale: 'en_GB',
    nomeIdioma: 'English',
    outroIdioma: { codigo: 'pt', rotulo: 'PT', titulo: 'Ver em português' },

    ui: {
      saltar: 'Skip to main content',
      abrirMenu: 'Open navigation menu',
      fecharMenu: 'Close navigation menu',
      marcar: 'Book an appointment',
      voltarSite: 'Back to the site',
      voltarInicio: '← Back to the home page',
      saberMais: 'Find out more',
      verPercurso: 'view background',
      fechar: 'Close',
      topo: 'Back to top',
      ligar: 'Call',
      contactosTelefonicos: 'Telephone contacts',
      chamadaNota: 'Calls charged at standard Portuguese landline and mobile rates.',
      duvidasTitulo: 'Still have a question?',
      duvidasTexto: 'Give us a ring and speak to someone on the team. A quick call often saves you a trip.',
    },

    nav: [
      { pagina: 'inicio', ancora: 'clinica', rotulo: 'The Practice' },
      { pagina: 'inicio', ancora: 'especialidades', rotulo: 'Treatments' },
      { pagina: 'implantologia', rotulo: 'Implants' },
      { pagina: 'inicio', ancora: 'equipa', rotulo: 'Our Team' },
      { pagina: 'inicio', ancora: 'contactos', rotulo: 'Contact' },
    ],

    meta: {
      inicio: {
        titulo: 'S. Dâmaso Dental Practice | Dentist in Guimarães, Portugal',
        descricao:
          'English-speaking dental practice in Guimarães with its own on-site prosthetics laboratory and around 20 years of implant experience. Implants, orthodontics, children’s dentistry and cosmetic treatments.',
      },
      implantologia: {
        titulo: 'Dental Implants in Guimarães | S. Dâmaso Dental Practice',
        descricao:
          'Fixed teeth on implants in a single day, planned digitally from a CT scan. Around 20 years of implant experience in Guimarães, Portugal.',
      },
      ortodontia: {
        titulo: 'Braces and Clear Aligners in Guimarães | S. Dâmaso Dental Practice',
        descricao:
          'Fixed braces, clear aligners and retention. Compare each orthodontic method, for adults and children, at S. Dâmaso Dental Practice in Guimarães.',
      },
      odontopediatria: {
        titulo: 'Children’s Dentist in Guimarães | S. Dâmaso Dental Practice',
        descricao:
          'Dental appointments built around children and their pace. Prevention, fissure sealants and a first visit without fear, in Guimarães.',
      },
      erro: { titulo: 'Page not found', descricao: 'The page you are looking for does not exist.' },
    },

    hero: {
      sobretitulo: 'Dental care in Guimarães',
      titulo: ['Your smile, cared for in ', 'detail', '.'],
      lead:
        'On the Alameda S. Dâmaso, we bring together a multidisciplinary team, our own prosthetics laboratory and advanced diagnostic imaging — so you get precise answers without the waiting.',
      ctaPrimario: 'Book an appointment',
      ctaSecundario: 'See our treatments',
      alt: 'A dentist explaining a panoramic X-ray to a patient sitting in the treatment chair.',
      provas: [
        { valor: '~20 years', nota: 'of experience in implant dentistry' },
        { valor: 'On-site lab', nota: 'prosthetics made in the practice' },
        { valor: 'Top 5% SME', nota: 'Scoring 2025 distinction' },
      ],
    },

    clinica: {
      sobretitulo: 'What drives us',
      titulo: ['A legacy of ', 'excellence', ' in the heart of Guimarães'],
      citacao:
        'To equip the whole practice with the best technical and human resources, so that we can offer our patients the best solutions across every area of dentistry.',
      texto:
        'Based on the landmark Alameda S. Dâmaso, we have an in-house prosthetics laboratory — which means faster, more reliable oral rehabilitation, whether with fixed or removable prosthetics.',
      altPrincipal: 'A treatment room at the practice, with dental chair and equipment.',
      altSecundaria: 'A dentist reviewing 3D reconstructions from a dental CT scan.',
      altSelo: 'Top 5% SME 2025 seal awarded by Scoring.',
      vantagens: [
        {
          icone: 'i-lab',
          titulo: 'In-house laboratory',
          texto: 'Fixed and removable prosthetics with short turnarounds and quality control at every stage.',
        },
        {
          icone: 'i-tecnologia',
          titulo: 'Advanced diagnostics',
          texto: 'Panoramic X-ray, cephalometric imaging and CT scanning on site, for precise planning.',
        },
        {
          icone: 'i-coracao',
          titulo: 'Care that follows through',
          texto: 'A multidisciplinary team focused on your comfort at every appointment.',
        },
      ],
    },

    especialidades: {
      sobretitulo: 'What we do',
      titulo: 'Treatments',
      lead: 'Every area of dentistry in one place, with the same team looking after you throughout.',
      verTodas: 'See all treatments',
      verMenos: 'Show fewer',
      itens: [
        { icone: 'i-implante', nome: 'Dental implants', nota: 'Fixed teeth on implants.', pagina: 'implantologia' },
        { icone: 'i-ortodontia', nome: 'Orthodontics', nota: 'Fixed braces to straighten your smile.', pagina: 'ortodontia' },
        { icone: 'i-alinhador', nome: 'Clear aligners', nota: 'Discreet, removable correction.', pagina: 'ortodontia', ancora: 'alinhador' },
        { icone: 'i-crianca', nome: 'Children’s dentistry', nota: 'Dental care built around children.', pagina: 'odontopediatria' },
        { icone: 'i-faceta', nome: 'Veneers', nota: 'Natural-looking ceramic aesthetics.' },
        { icone: 'i-coroa', nome: 'Crowns and bridges', nota: 'Restoring damaged teeth.' },
        { icone: 'i-protese', nome: 'Dentures and prosthetics', nota: 'Fixed or removable, made in our own lab.' },
        { icone: 'i-branqueamento', nome: 'Teeth whitening', nota: 'Safe, supervised whitening.' },
        { icone: 'i-estetica', nome: 'Cosmetic dentistry', nota: 'Discreet, long-lasting restorations.', extra: true },
        { icone: 'i-endodontia', nome: 'Root canal treatment', nota: 'Treating the root canals.', extra: true },
        { icone: 'i-periodontologia', nome: 'Periodontics', nota: 'Health of the gums and supporting bone.', extra: true },
        { icone: 'i-cirurgia', nome: 'Oral surgery', nota: 'Extractions and minor surgery.', extra: true },
        { icone: 'i-higiene', nome: 'Hygiene and scaling', nota: 'Scaling, polishing and prevention.', extra: true },
        { icone: 'i-raiox', nome: 'Panoramic X-ray', nota: 'Panoramic imaging on site.', extra: true },
        { icone: 'i-tac', nome: 'CT and cephalometric imaging', nota: '3D imaging for precise planning.', extra: true },
      ],
    },

    destaqueImplante: {
      sobretitulo: 'Our flagship treatment',
      titulo: ['Dental implants with ', 'fixed teeth in a single day'],
      texto:
        'We have been placing fixed teeth on implants for around 20 years. Digital planning, based on a CT scan, lets us map out every step of the surgery in advance — more predictable, less time in the chair, and a result that matches your natural expression.',
      alt: 'Digital implant planning on a 3D scan shown on a touchscreen.',
      cta: 'Explore implant treatment',
      contadores: [
        { alvo: 20, sufixo: '', nota: 'years of implant experience' },
        { alvo: 10000, sufixo: '+', nota: 'implants placed' },
        { alvo: 1, sufixo: ' day', nota: 'to leave with fixed teeth' },
      ],
    },

    criancas: {
      sobretitulo: 'Children’s dentistry',
      titulo: ['With children, we work at ', 'their pace'],
      texto:
        'A child’s first trip to the dentist shapes how they feel about dental care for the rest of their life. So we never rush: we explain each step in words they understand, let them handle the mirror and the suction, and only move on once they are comfortable.',
      pontos: [
        { icone: 'i-crianca', titulo: 'A first visit with no treatment', texto: 'Just to get to know the practice, the chair and the team.' },
        { icone: 'i-coracao', titulo: 'No surprises', texto: 'We explain each step in words the child understands.' },
        { icone: 'i-visto', titulo: 'Parents always stay', texto: 'In the room from the start of the appointment to the end.' },
        { icone: 'i-higiene', titulo: 'Prevention first', texto: 'Sealants, fluoride and guided brushing, with parents watching.' },
      ],
      cta: 'See children’s appointments',
      alt: 'A child smiling naturally.',
    },

    faq: {
      sobretitulo: 'Before you come in',
      titulo: 'Frequently asked questions',
      lead: 'If something is still unclear, do give us a ring — we are happy to talk it through.',
      itens: [
        {
          p: 'Do I need an appointment, or can I walk in?',
          r: 'Appointments are always booked in advance, by phone or email. If you are in acute pain, call us: we do our best to fit emergencies in the same day.',
        },
        {
          p: 'Where can I park?',
          r: 'You get one hour of free parking at the S. Francisco shopping centre, about 200 metres away — a two-minute walk from the practice.',
        },
        {
          p: 'Do you take X-rays on site?',
          r: 'Yes. We have panoramic, cephalometric and CT imaging in the practice itself, which saves you a separate trip and lets us decide on treatment during the same visit.',
        },
        {
          p: 'How long do prosthetics take?',
          r: 'Because the prosthetics laboratory is ours and sits inside the practice, turnarounds are considerably shorter than usual and any adjustment is made on the spot, without waiting on a third party.',
        },
        {
          p: 'Can I really leave with fixed teeth the same day?',
          r: 'In many cases, yes — it is a technique we have practised for around 20 years. It depends on the volume and quality of bone, which we assess by CT scan at a diagnostic appointment before any decision is made.',
        },
        {
          p: 'From what age should I bring my child?',
          r: 'At around one year old, or as soon as the first teeth come through. The first visit is mainly so the child gets to know the place and so we can guide parents on brushing.',
        },
      ],
    },

    equipa: {
      sobretitulo: 'Who will see you',
      titulo: ['The team looking after ', 'you'],
      lead:
        'Dentists and dental nurses who follow every treatment from start to finish — the same faces, appointment after appointment.',
      grupoClinico: 'Clinical team',
      grupoClinicoNota: '4 dentists',
      grupoApoio: 'Support team',
      grupoApoioNota: '3 dental nurses',
      pessoas: {
        carmen: {
          nome: 'Dr Cármen Capelo',
          funcao: 'Clinical Director',
          creditos: ['Dentist', 'Specialist training in Periodontics', 'Postgraduate in Paediatric Dentistry', 'Postgraduate in Orthodontics'],
        },
        antonio: {
          nome: 'Dr António Sousa Carvalho',
          funcao: 'Dentist',
          creditos: ['Specialist training in Periodontics', 'Advanced training in Implantology', 'Head of oral rehabilitation on implants'],
        },
        fabiana: {
          nome: 'Dr Fabiana Duarte',
          funcao: 'Dentist',
          creditos: ['Postgraduate in Orthodontics', 'Training in Cosmetic Dentistry'],
        },
        isabel: {
          nome: 'Dr Isabel Mesquita',
          funcao: 'Dentist',
          creditos: ['Advanced training in Endodontics'],
        },
        elsa: { nome: 'Elsa Salgado', funcao: 'Dental Nurse', creditos: ['Intra-office lead'] },
        andreia: {
          nome: 'Andreia Salgado',
          funcao: 'Dental Nurse',
          creditos: ['Reception lead', 'Patient communication'],
        },
        bebiana: {
          nome: 'Bebiana Martins',
          funcao: 'Dental Nurse',
          creditos: ['BA in Sociology', 'Back-office lead', 'Supplier liaison'],
        },
      },
    },

    contactos: {
      sobretitulo: 'We are here to help',
      titulo: 'Contact and location',
      rotuloTelefone: 'Practice telephone',
      rotuloTelemovel: 'Mobile',
      rotuloEmail: 'Email',
      rotuloMorada: 'Address',
      rotuloWhatsapp: 'WhatsApp',
      whatsappNota: 'We reply during opening hours',
      estacionamentoTitulo: '1 hour of free parking',
      estacionamentoTexto: ['At the S. Francisco shopping centre, about 200 m away — a ', '2-minute walk', ' from the practice.'],
      mapaTitulo: 'Alameda S. Dâmaso 23, Guimarães',
      mapaAviso:
        'The map is provided by Google Maps. By loading it, you accept that Google may collect data and place cookies on your device.',
      mapaBotao: 'Load the map',
      mapaAlternativa: 'Open directions in a new window',
      mapaTituloIframe: 'Map showing the location of S. Dâmaso Dental Practice, Alameda S. Dâmaso 23, Guimarães',
    },

    rodape: {
      descricao: 'Dental care with an in-house prosthetics laboratory, in the heart of Guimarães.',
      colunaClinica: 'Practice',
      colunaContactos: 'Contact',
      colunaLegal: 'Legal',
      livroReclamacoes: 'Complaints Book',
      direitos: 'All rights reserved.',
      altLogo: 'S. Dâmaso Dental Practice logo.',
      altSelo: 'Top 5% SME 2025 seal awarded by Scoring.',
    },

    tratamentos: {
      implantologia: {
        factos: [
          { valor: '~20 years', nota: 'placing dental implants' },
          { valor: 'CT scan on site', nota: 'diagnosis without a separate trip' },
          { valor: 'Our own lab', nota: 'crowns made in the practice' },
        ],
        porqueTitulo: 'Why choose S. Dâmaso',
        sobretitulo: 'Our flagship treatment',
        titulo: ['Dental implants, with ', 'fixed teeth in a single day'],
        lead:
          'An implant replaces the root of a missing tooth. A crown made to measure sits on top, giving back function and a natural look — so you can chew, speak and smile without thinking about it.',
        alt: 'A dentist reviewing three-dimensional reconstructions from a dental CT scan on a light box.',
        intro: {
          titulo: 'Who it suits',
          texto:
            'Anyone who has lost a tooth, several, or all of them. Also anyone wearing a removable denture who would rather stop taking it in and out. What decides the plan is not your age but the volume and quality of bone available — and we assess that with a CT scan taken here, before any decision.',
        },
        metodosTitulo: 'The approaches we use',
        metodosLead: 'Every mouth is different. These are the three most common routes.',
        metodos: [
          {
            icone: 'i-implante',
            nome: 'Single implant',
            texto:
              'Replaces one tooth without touching its neighbours. That is the difference from a traditional bridge, which means grinding down the teeth on either side.',
          },
          {
            icone: 'i-coroa',
            nome: 'Several teeth on implants',
            texto:
              'Where consecutive teeth are missing, a few well-placed implants can support a fixed bridge — you do not need one implant per tooth.',
          },
          {
            icone: 'i-protese',
            nome: 'Fixed teeth in a single day',
            texto:
              'In selected cases we place the implants and a fixed temporary bridge in the same session. You leave with teeth, and the definitive work follows once healing is complete.',
          },
        ],
        processoTitulo: 'How it works',
        processo: [
          { titulo: 'Diagnosis', texto: 'An assessment appointment with CT and X-ray imaging taken on site. You leave with a written plan and quote.' },
          { titulo: 'Digital planning', texto: 'We work out the position of each implant on the 3D scan before surgery. Fewer surprises, shorter procedure.' },
          { titulo: 'Placement', texto: 'Surgery under local anaesthetic in a controlled setting. Most patients are back to their routine the next day.' },
          { titulo: 'Definitive crown', texto: 'Made in our own laboratory inside the practice, with shade and shape adjusted there and then.' },
          { titulo: 'Follow-up', texto: 'Review and hygiene appointments to keep the implant healthy over the long term.' },
        ],
        faqTitulo: 'Common questions about implants',
        faq: [
          { p: 'Does it hurt?', r: 'The surgery is done under local anaesthetic and you feel no pain during the procedure. Afterwards there is some discomfort, managed with the medication we prescribe.' },
          { p: 'How long does an implant last?', r: 'With careful hygiene and regular reviews, an implant can last many years. What most threatens its longevity is gum disease and smoking.' },
          { p: 'What if I do not have enough bone?', r: 'Bone regeneration techniques can restore volume. The CT scan tells us precisely what is possible in your case.' },
          { p: 'I am diabetic, or I smoke. Can I still have implants?', r: 'In most cases yes, but it calls for prior assessment and closer follow-up. We will talk about that openly at the diagnostic appointment.' },
        ],
        ctaTitulo: 'Want to know whether implants suit you?',
        ctaTexto: 'A diagnostic appointment sets out what is possible in your case, with imaging and a written quote.',
      },

      ortodontia: {
        factos: [
          { valor: 'Fixed and invisible', nota: 'both methods under one roof' },
          { valor: 'X-rays on site', nota: 'panoramic and cephalometric' },
          { valor: 'No age limit', nota: 'children, teenagers and adults' },
        ],
        porqueTitulo: 'Why choose S. Dâmaso',
        sobretitulo: 'Orthodontics',
        titulo: ['Straighter teeth, by the method that ', 'suits you'],
        lead:
          'Straight teeth are not only about looks: they spread the force of chewing more evenly, are easier to brush, and protect the gums. There is more than one way to get there.',
        alt: 'Close-up of fixed braces during an orthodontic appointment.',
        intro: {
          titulo: 'There is no right age to start',
          texto:
            'We treat children, teenagers and adults. In children, starting early can guide jaw growth and avoid longer treatment later. In adults, the deciding factor is usually discretion — and that is where aligners changed things.',
        },
        metodosTitulo: 'The methods',
        metodosLead: 'At the first appointment we assess your case and explain which one makes most sense, and why.',
        metodos: [
          {
            icone: 'i-ortodontia',
            nome: 'Fixed braces',
            texto:
              'Brackets bonded to the teeth and joined by an archwire. The most versatile method: it handles virtually every case, including the complex ones. It does not depend on the patient remembering to wear it, because it does not come out.',
            bom: 'Complex cases, children and teenagers',
          },
          {
            icone: 'i-alinhador',
            nome: 'Clear aligners',
            texto:
              'A sequence of transparent, custom-made trays that move the teeth in stages. You take them out to eat and brush, and they go all but unnoticed.',
            bom: 'Adults, and mild to moderate cases',
          },
          {
            icone: 'i-faceta',
            nome: 'Retention',
            texto:
              'The stage nobody should skip. Once straightened, teeth tend to drift back; a retainer — fixed or removable — is what keeps the result.',
            bom: 'Every treatment, once finished',
          },
        ],
        processoTitulo: 'How it works',
        processo: [
          { titulo: 'Assessment', texto: 'Examination, panoramic X-ray and cephalometric imaging, all taken here. We establish what needs correcting, and why.' },
          { titulo: 'Plan and quote', texto: 'We set out the available options, the estimated duration and the cost of each, in writing.' },
          { titulo: 'Fitting', texto: 'We bond the brace or hand over the first set of aligners, with clear instructions.' },
          { titulo: 'Review appointments', texto: 'Regular adjustments to keep the movement on track. How often depends on the method.' },
          { titulo: 'Retention', texto: 'Once alignment is finished we move to the stabilising phase — and keep an eye on it.' },
        ],
        faqTitulo: 'Common questions about orthodontics',
        faq: [
          { p: 'How long does it take?', r: 'It varies a great deal. Minor corrections can be done in a few months; complex cases take one to two years. We give a realistic estimate at the assessment appointment.' },
          { p: 'Are aligners suitable for everyone?', r: 'No. They are excellent for mild to moderate cases, but there are movements that fixed braces handle better. We would rather tell you that up front than promise what we cannot deliver.' },
          { p: 'Does fitting a brace hurt?', r: 'Fitting does not hurt. For a few days after each adjustment there is tenderness when biting, which passes. It is a sign the teeth are moving.' },
          { p: 'Can I have orthodontic treatment with inflamed gums?', r: 'It is not advisable. We treat the gums first and only then start moving teeth — moving teeth over diseased gums makes the problem worse.' },
        ],
        ctaTitulo: 'Want to know which method fits?',
        ctaTexto: 'At the assessment appointment we will show you the options and give you an estimate of time and cost.',
      },

      odontopediatria: {
        factos: [
          { valor: 'First visit', nota: 'with no treatment at all' },
          { valor: 'Parents in the room', nota: 'for the whole appointment' },
          { valor: 'From age 1', nota: 'or as soon as teeth appear' },
        ],
        porqueTitulo: 'Why choose S. Dâmaso',
        sobretitulo: 'Children’s dentistry',
        titulo: ['With children, we work at ', 'their pace'],
        lead:
          'How the first trip to the dentist goes tends to stick. Get it right and you get an adult who visits the dentist without dread — and that is what we aim for at every appointment.',
        alt: 'A child smiling, teeth showing.',
        intro: {
          titulo: 'The first visit is just to get acquainted',
          texto:
            'We book the first appointment with no treatment at all. The child sits in the chair, goes up and down, holds the mirror, hears the suction. We explain what everything does in words they understand. Treatment is booked afterwards — by which point the place is familiar.',
        },
        metodosTitulo: 'What we do',
        metodosLead: 'Prevention is almost always simpler, cheaper and far less frightening than treatment.',
        metodos: [
          {
            icone: 'i-higiene',
            nome: 'Prevention',
            texto:
              'Fissure sealants on the adult teeth, fluoride application and guided brushing — with parents in the room, so the same routine can be repeated at home.',
          },
          {
            icone: 'i-crianca',
            nome: 'Decay in baby teeth',
            texto:
              'Baby teeth are worth treating: they hold the space for the adult teeth and they ache just like any other. We restore them using techniques designed for short appointments.',
          },
          {
            icone: 'i-ortodontia',
            nome: 'Monitoring growth',
            texto:
              'We follow the change of dentition and the way the jaws are developing. Caught early, a problem is corrected far more simply.',
          },
        ],
        processoTitulo: 'How we prepare for the visit',
        processo: [
          { titulo: 'Before you come', texto: 'Avoid phrases like “it won’t hurt” — they plant the idea of pain. Just say we are going to count the teeth.' },
          { titulo: 'At reception', texto: 'We allow time. If the child needs to watch someone else go in first, we wait.' },
          { titulo: 'In the surgery', texto: 'Parents always stay. We explain each instrument before using it, and let them hold it first.' },
          { titulo: 'At the end', texto: 'They always leave with a win, however small. The next appointment starts from there.' },
        ],
        faqTitulo: 'Common questions from parents',
        faq: [
          { p: 'What age should the first appointment be?', r: 'At around one year old, or as soon as the first teeth appear. Even if there is nothing to treat, it is the moment to set up good brushing and eating habits.' },
          { p: 'Is it worth treating baby teeth?', r: 'It is. They hold the space for the adult teeth, they are needed for chewing and speech, and untreated decay hurts and can affect the tooth developing beneath.' },
          { p: 'What if my child will not cooperate?', r: 'It happens, and it is not a problem. We stop, come back another day and go step by step. Forcing a first appointment is the surest way to create a fear that lasts years.' },
          { p: 'Can I stay with them?', r: 'Yes, and we would prefer you did. Having a parent there reassures the child, especially the first few times.' },
        ],
        ctaTitulo: 'Would you like to book a first visit?',
        ctaTexto: 'Give us a ring and tell us your child’s age. We will set aside an unhurried slot.',
      },
    },

    legal: {
      sobretitulo: 'Legal',
      atualizacao: 'Last updated: September 2026',
      resumo: 'In short:',
    },

    erro: {
      titulo: 'We could not find this page',
      texto: 'The link you followed may be out of date or mistyped. You can go back to the home page or get in touch with us directly.',
      voltar: 'Back to the home page',
    },
  },
};
