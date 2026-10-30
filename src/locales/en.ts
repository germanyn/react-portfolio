// English copy. `pt.ts` must have the same shape (enforced by its type).
const en = {
  nav: {
    projects: 'Projects',
    about: 'About',
    career: 'Career',
    skills: 'Skills',
    contact: 'Say hi',
    backToTop: 'Back to top',
    sections: 'Sections',
    menu: 'Menu',
    language: 'Language',
  },
  sections: {
    projects: { kicker: 'Stage select', title: 'Projects' },
    about: { kicker: 'Character sheet', title: 'About me' },
    career: { kicker: 'The climb', title: 'Career map' },
    skills: { kicker: 'Command card', title: 'Skills' },
    contact: { kicker: 'Game over?', title: 'Get in touch' },
  },
  profile: {
    title: 'Senior Web Developer',
    tagline: 'Front-end · Back-end · Full stack',
    summary:
      'Web developer with a background in software engineering, agile methodologies and technical leadership. I like decoupled architectures, fast bundles, and leaving a codebase better than I found it.',
    location: 'Jaraguá do Sul, Brazil',
    degree: "Bachelor's in Computer Engineering",
    schoolPlace: 'Itajaí, Brazil',
    languages: ['Portuguese (native)', 'English (C2)'],
    hobbies: ['Magic: The Gathering', 'Metroidvanias', 'Roguelike deckbuilders', 'Retro games', 'Side projects'],
  },
  hero: {
    player: 'Player 1 · Lv {{level}}',
    yearsBuilding: '{{count}} years building web apps',
    start: '▶ Press start',
  },
  projects: {
    stage: 'Stage {{number}}',
    role: 'Role',
    time: 'Time',
    achievements: 'Achievements unlocked',
    expandImage: 'Expand image: {{description}}',
    close: 'Close',
    items: {
      almode: {
        description:
          'Complete POS solution: sales, payments, product management, stores, stock control, users, profiles and customer plans.',
        role: 'Tech Lead',
        duration: '12 months',
        link: 'Website',
        images: ['Ongoing sale', 'Cash open', 'Payment process', 'Sales (dark mode)'],
        achievements: [
          'UX/UI design of the entire application from scratch',
          'Took part in every important feature decision',
          'Led a team of 9 developers',
          'Acted as product owner, earning more responsibilities over time',
          'Turned a stalled development into a solution shipped in weeks',
        ],
      },
      selfMenu: {
        description:
          "Solo project: call the waiter from the customer's phone via QR code. Includes an admin side for products, categories and QR code customization.",
        role: 'Product Owner',
        duration: '4 months',
        link: 'Menu sample',
        images: ['Admin view', 'QR code generation', 'Order screen'],
        achievements: [] as string[],
      },
      mobihub: {
        description:
          'Aggregates real estate listings in one place so you can find the best price no matter who closes the deal.',
        role: 'Product Owner',
        duration: '4 months',
        link: '',
        images: ['Listings'],
        achievements: [] as string[],
      },
    },
  },
  about: {
    hi: "Hi, I'm Germano 👋",
    class: 'Class',
    xp: 'XP',
    years: '{{count}}+ years',
    base: 'Base',
    training: 'Training',
    languages: 'Languages',
    sideQuests: 'Side quests',
  },
  card: {
    label: '{{name}}, as a Magic card',
    type: 'Creature — Human Developer',
    keywords: 'Flying, vigilance',
    ability: "Target programmer can't be blocked until end of turn.",
    flavor: '"Sanity test!"',
    mythic: 'Mythic rare',
    blueMana: 'blue mana',
    genericMana: '{{amount}} generic mana',
  },
  career: {
    legend: 'Legend',
    present: 'present',
    actsLabel: 'Acts',
    acts: {
      start: { number: 'Act I', name: 'The Start' },
      senior: { number: 'Act II', name: 'Senior Ascension' },
      architect: { number: 'Act III', name: 'Architect' },
    },
    // Each node kind follows a rule, shown in the legend.
    kinds: {
      enemy: { name: 'Enemy', meaning: 'role' },
      elite: { name: 'Elite', meaning: 'senior role' },
      boss: { name: 'Boss', meaning: 'leading a team' },
      treasure: { name: 'Treasure', meaning: 'freelance' },
      rest: { name: 'Rest site', meaning: 'studies' },
    },
    jobs: {
      clinicorp: {
        role: 'Senior Development Analyst',
        place: 'Jaraguá do Sul, Brazil',
        highlights: [
          'Built an agnostic micro frontend architecture with webpack Module Federation and event-driven communication for a health-tech SaaS.',
          'Migrated core legacy modules — login, home and scheduling — to the new architecture.',
        ],
      },
      umbrage: {
        role: 'Developer',
        place: 'Houston, USA',
        highlights: [
          'Oil & gas application built with React and ASP.NET.',
          'Proactively built real-time data stream layers with SignalR WebSockets.',
        ],
      },
      bytecom: {
        role: 'Full Stack Developer',
        place: 'Jaraguá do Sul, Brazil',
        highlights: [
          'ERP application with Kotlin, Spring Boot and Vue.',
          'Mentored the team on clean code and unit testing; introduced a kanban-based agile process.',
        ],
      },
      outsera: {
        role: 'Senior Software Engineer',
        place: 'Joinville, Brazil',
        highlights: [
          'Fintech platform with React, React Native, Node.js and AWS microservices.',
          'Recognized by management as an "off-the-curve hire" — the team\'s number 10.',
        ],
      },
      multiplier: {
        role: 'Front-end Developer',
        place: 'Jaraguá do Sul, Brazil',
        highlights: [
          'CRM built with Vue and micro frontends.',
          'Introduced Storybook, E2E and unit testing to the workflow.',
          'Led the team as scrum master for 3 developers.',
        ],
      },
      groundbreaker: {
        role: 'Senior Full Stack Engineer',
        place: 'Chicago, USA',
        highlights: [
          'Proptech platform with React, Node.js, Terraform and AWS microservices.',
          'Cut each microservice bundle from 24 MB down to 2 MB.',
          'Technical reference for TypeScript usage on the team.',
        ],
      },
      almode: {
        role: 'Tech Lead',
        place: 'Jaraguá do Sul, Brazil',
        highlights: [
          'Led 9 developers building a POS platform with Vue, Spring Boot and AWS.',
          'Gathered requirements directly with the client and the team.',
          'Turned a development stalled for 2 months into a better solution shipped in 2 weeks.',
        ],
      },
      somar: {
        role: 'Freelance Developer',
        place: 'Jaraguá do Sul, Brazil',
        highlights: [
          'Sole developer of a scheduling app built from scratch — UX/UI, architecture and project management.',
          'Still used daily, 6+ years later.',
        ],
      },
      adapcon: {
        role: 'Developer',
        place: 'Jaraguá do Sul, Brazil',
        highlights: [
          'Customer portal SPA with Node.js, Vue, PostgreSQL and AWS.',
          'Built internal versioning and code generation tools that are still in use.',
          'Bridged legacy Caché ObjectScript and modern web, shipping 20+ innovative projects.',
        ],
      },
    },
  },
  skills: {
    level: 'Level {{level}} — {{name}}',
    usedAt: 'Used at',
    noJobs: 'Side projects and studies',
    hint: 'Click a skill to pin it here.',
    levels: ['Apprentice', 'Adept', 'Master'],
    groups: {
      frontend: 'Front-end',
      backend: 'Back-end',
      data: 'Data & Cloud',
      soft: 'Soft skills',
    },
    notes: {
      react: 'SPAs, React Native, design systems',
      microFrontends: 'webpack Module Federation, event-driven',
      testing: 'Unit and E2E',
      csharp: 'SignalR WebSockets',
      aws: 'DynamoDB, S3, CloudFront, Lambda, RDS',
      leadership: 'Led up to 9 developers',
      agile: 'Scrum master experience',
    },
    names: {
      testing: 'Testing',
      microservices: 'Microservices',
      leadership: 'Team Leadership',
      agile: 'Scrum & Kanban',
      projectManagement: 'Project Management',
      businessAnalysis: 'Business Analysis',
      problemSolving: 'Problem Solving',
      communication: 'Assertive Communication',
      english: 'English (C2)',
    },
  },
  contact: {
    continue: 'Continue?',
    pitch:
      'Open to new opportunities, freelance work and a good chat about code, business or games. Pick your channel:',
  },
  footer: {
    builtWith: 'Built with React & Vite',
  },
}

export type Translation = typeof en

export default en
