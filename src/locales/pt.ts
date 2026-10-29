import type { Translation } from './en'

// Portuguese (Brazil) copy, based on the original CV wording.
const pt: Translation = {
  nav: {
    projects: 'Projetos',
    about: 'Sobre',
    career: 'Carreira',
    skills: 'Habilidades',
    contact: 'Contato',
    backToTop: 'Voltar ao topo',
    sections: 'Seções',
    language: 'Idioma',
  },
  sections: {
    projects: { kicker: 'Seleção de fase', title: 'Projetos' },
    about: { kicker: 'Ficha do personagem', title: 'Sobre mim' },
    career: { kicker: 'Ato I — A escalada', title: 'Mapa da carreira' },
    skills: { kicker: 'Painel de comandos', title: 'Habilidades' },
    contact: { kicker: 'Fim de jogo?', title: 'Fale comigo' },
  },
  profile: {
    title: 'Desenvolvedor Web Sênior',
    tagline: 'Front-end · Back-end · Full stack',
    summary:
      'Desenvolvedor web com conhecimentos de engenharia de software, metodologias ágeis e liderança técnica. Gosto de arquiteturas desacopladas, bundles enxutos e de deixar o código melhor do que encontrei.',
    location: 'Jaraguá do Sul, Brasil',
    degree: 'Bacharelado em Engenharia de Computação',
    schoolPlace: 'Itajaí, Brasil',
    languages: ['Português (nativo)', 'Inglês (C2)'],
    hobbies: ['Magic: The Gathering', 'Metroidvanias', 'Roguelikes de deckbuilding', 'Jogos retrô', 'Projetos pessoais'],
  },
  hero: {
    player: 'Jogador 1 · Nv {{level}}',
    yearsBuilding: '{{count}} anos criando aplicações web',
    start: '▶ Aperte start',
  },
  projects: {
    stage: 'Fase {{number}}',
    role: 'Papel',
    time: 'Duração',
    achievements: 'Conquistas desbloqueadas',
    expandImage: 'Ampliar imagem: {{description}}',
    close: 'Fechar',
    items: {
      almode: {
        description:
          'Solução completa de PDV: vendas, pagamentos, gestão de produtos, lojas, controle de estoque, usuários, perfis e planos de clientes.',
        role: 'Líder Técnico',
        duration: '12 meses',
        link: 'Site',
        images: ['Venda em andamento', 'Abertura de caixa', 'Processo de pagamento', 'Vendas (modo escuro)'],
        achievements: [
          'Design de UX/UI de toda a aplicação do zero',
          'Participação em todas as decisões importantes de funcionalidades',
          'Liderança de um time de 9 desenvolvedores',
          'Atuação como dono do produto, ganhando mais atribuições ao longo do tempo',
          'Reverteu um desenvolvimento parado para uma solução entregue em semanas',
        ],
      },
      selfMenu: {
        description:
          'Projeto solo: chame o garçom pelo celular do cliente via QR code. Inclui um painel administrativo para produtos, categorias e personalização do QR code.',
        role: 'Dono do Produto',
        duration: '4 meses',
        link: 'Cardápio de exemplo',
        images: ['Painel administrativo', 'Geração de QR code', 'Tela de pedido'],
        achievements: [],
      },
      mobihub: {
        description:
          'Reúne anúncios de imóveis em um só lugar para você encontrar o melhor preço, independente de quem fecha o negócio.',
        role: 'Dono do Produto',
        duration: '4 meses',
        link: '',
        images: ['Anúncios'],
        achievements: [],
      },
    },
  },
  about: {
    hi: 'Olá, eu sou o Germano 👋',
    class: 'Classe',
    xp: 'XP',
    years: '{{count}}+ anos',
    base: 'Base',
    training: 'Formação',
    languages: 'Idiomas',
    sideQuests: 'Missões extras',
  },
  card: {
    label: '{{name}}, como uma carta de Magic',
    type: 'Criatura — Humano Desenvolvedor',
    keywords: 'Voar, vigilância',
    ability: 'Programador alvo não pode ser bloqueado até o final do turno.',
    flavor: '"Teste de sanidade!"',
    mythic: 'Raro mítico',
    blueMana: 'mana azul',
    genericMana: '{{amount}} de mana genérica',
  },
  career: {
    legend: 'Legenda',
    present: 'atual',
    startingRelic: 'Relíquia inicial',
    kinds: {
      boss: 'Chefe',
      elite: 'Elite',
      event: 'Evento',
      rest: 'Descanso',
      treasure: 'Tesouro',
      start: 'Neow',
    },
    jobs: {
      clinicorp: {
        role: 'Analista de Desenvolvimento Sênior',
        place: 'Jaraguá do Sul, Brasil',
        highlights: [
          'Desenvolvimento de arquitetura de microfrontend agnóstico com webpack Module Federation e comunicação orientada a eventos para um SaaS de saúde.',
          'Migração dos principais módulos legados — login, tela inicial e agenda — para a nova arquitetura.',
        ],
      },
      umbrage: {
        role: 'Programador',
        place: 'Houston, EUA',
        highlights: [
          'Aplicação para o setor petrolífero com React e ASP.NET.',
          'Proatividade no desenvolvimento de camadas de stream de dados com SignalR WebSocket.',
        ],
      },
      bytecom: {
        role: 'Desenvolvedor Full Stack',
        place: 'Jaraguá do Sul, Brasil',
        highlights: [
          'Aplicação de ERP com Kotlin, Spring Boot e Vue.',
          'Repasse de conhecimentos como clean code e testes unitários; implantação de processo ágil com board kanban.',
        ],
      },
      outsera: {
        role: 'Engenheiro de Software Sênior',
        place: 'Joinville, Brasil',
        highlights: [
          'Plataforma fintech com React, React Native, Node.js e microsserviços na AWS.',
          'Reconhecido pela gestão como uma "contratação fora da curva" — o "camisa 10 do time".',
        ],
      },
      multiplier: {
        role: 'Desenvolvedor Front-end',
        place: 'Jaraguá do Sul, Brasil',
        highlights: [
          'CRM desenvolvido com Vue e micro frontends.',
          'Implantação de Storybook, testes E2E e testes unitários no fluxo de trabalho.',
          'Scrum master de um time de até 4 desenvolvedores.',
        ],
      },
      groundbreaker: {
        role: 'Engenheiro Full Stack Sênior',
        place: 'Chicago, EUA',
        highlights: [
          'Plataforma proptech com React, Node.js, Terraform e microsserviços na AWS.',
          'Redução do bundle de cada microsserviço de 24 MB para 2 MB.',
        ],
      },
      almode: {
        role: 'Líder Técnico',
        place: 'Jaraguá do Sul, Brasil',
        highlights: [
          'Liderança de 9 desenvolvedores em uma plataforma de PDV com Vue, Spring Boot e AWS.',
          'Levantamento de requisitos em reuniões diretas com o cliente e o time.',
          'Reverteu um desenvolvimento parado há 2 meses para uma solução melhor entregue em 2 semanas.',
        ],
      },
      somar: {
        role: 'Desenvolvedor Freelancer',
        place: 'Jaraguá do Sul, Brasil',
        highlights: [
          'Único desenvolvedor de um aplicativo de agenda criado do zero — UX/UI, arquitetura e gestão do projeto.',
          'Ainda usado diariamente, mais de 6 anos depois.',
        ],
      },
      adapcon: {
        role: 'Programador',
        place: 'Jaraguá do Sul, Brasil',
        highlights: [
          'Portal do cliente SPA com Node.js, Vue, PostgreSQL e AWS.',
          'Criação de ferramentas internas de versionamento e geração de código usadas até hoje.',
          'Atuação entre Caché ObjectScript legado e web moderna, trazendo mais de 20 projetos inovadores.',
        ],
      },
    },
  },
  skills: {
    level: 'Nível {{level}} — {{name}}',
    levels: ['Aprendiz', 'Adepto', 'Mestre'],
    groups: {
      frontend: 'Front-end',
      backend: 'Back-end',
      data: 'Dados & Nuvem',
      leadership: 'Liderança',
    },
    notes: {
      react: 'SPAs, React Native, design systems',
      microFrontends: 'webpack Module Federation, orientado a eventos',
      testing: 'Unitários e E2E',
      csharp: 'SignalR WebSockets',
      aws: 'DynamoDB, S3, CloudFront, Lambda, RDS',
      leadership: 'Liderou até 9 desenvolvedores',
      agile: 'Experiência como scrum master',
    },
    names: {
      testing: 'Testes',
      leadership: 'Liderança de Times',
      agile: 'Scrum & Kanban',
      projectManagement: 'Gestão de Projetos',
      businessAnalysis: 'Análise de Negócios',
      problemSolving: 'Resolução de Problemas',
      communication: 'Comunicação Assertiva',
      english: 'Inglês (C2)',
    },
  },
  contact: {
    continue: 'Continuar?',
    pitch:
      'Aberto a novas oportunidades, freelas e um bom papo sobre código, negócios ou jogos. Escolha seu canal:',
  },
  footer: {
    builtWith: 'Feito com React & Vite',
  },
}

export default pt
