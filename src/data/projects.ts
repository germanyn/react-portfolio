export const projects: Project[] = [
  {
    title: "Almode PDV",
    description: "Complete POS solution with sales, payments, products management, stores, stock control, users, profiles management, customers plans and much more",
    role: "Tech Lead",
    achievements: [
      "UX/UI Designer of the entire application from scratch",
      "Participate on all important feature decisions",
      "Led a team with 9 developers",
      "Acted as owner of the product earning more attributions over time",
      "Reverted a wasted 6 months development process to take only 4 weeks",
    ],
    duration: "12 months",
    featuredImage: {
      description: 'Ongoing sale',
      url: `${process.env.PUBLIC_URL}/img/almode/almode-2.png`,
    },
    images: [
      {
        description: 'Cash open',
        url: `${process.env.PUBLIC_URL}/img/almode/almode-1.png`,
      },
      {
        description: 'Payment process',
        url: `${process.env.PUBLIC_URL}/img/almode/almode-3.png`,
      },
      {
        description: 'Sales (darkmode)',
        url: `${process.env.PUBLIC_URL}/img/almode/almode-4.png`,
      },
    ],
    technologies: [
      "Vuejs",
      "TypeScript",
      "Java",
      "AWS",
      "PostgreSQL",
    ],
    link: {
      url: 'https://www.almode.com',
      description: 'Website',
    },
  },
  {
    title: "Self Menu",
    role: 'Product Owner',
    duration: '4 Months',
    description: "Solo project to call waiter with the user's mobile device by a QR Code. The system includes a manager side for products, categories and you can even QR code customization",
    images: [
      {
        description: 'Admin view',
        url: `${process.env.PUBLIC_URL}/img/self-menu/self-menu-1.png`,
      },
      {
        description: 'QR Code generation',
        url: `${process.env.PUBLIC_URL}/img/self-menu/self-menu-2.png`,
      },
      {
        description: 'Order screen',
        url: `${process.env.PUBLIC_URL}/img/self-menu/self-menu-3.png`,
      },
    ],
    link: {
      url: 'https://self-menu.web.app/60e3d8327ec3830a4c088911',
      description: 'Menu Sample',
    },
    displayAsMobile: true,
    technologies: [
      "ReactJS",
      "TypeScript",
      "NodeJS",
      "GraphQL",
      "Firebase services",
      'MongoDB',
    ],
  },
  {
    title: 'MobiHub',
    description: 'A website that concentrate all real state at one place so you can select better price independent of who you finish the deal',
    role: 'Product Owner',
    duration: '4 Months',
    technologies: [
      'ReactJS',
      'TypeScript',
      'NextJS',
      'MongoDB',
      'AWS',
      'Web Crawlers'
    ],
    featuredImage: {
      description: 'Cash open',
      url: `${process.env.PUBLIC_URL}/img/mobihub/mobihub-1.png`,
    },
  }
]

export type ProjectImage = {
  description: string
  url: string
}

export type ExternalLink = {
  description: string
  url: string
}

export type Project = {
  title: string
  description: string
  role: string
  technologies: string[]
  achievements?: string[]
  featuredImage?: ProjectImage
  onImageClick?: (image: ProjectImage) => void
  images?: ProjectImage[]
  duration: string
  link?: ExternalLink
  displayAsMobile?: boolean
}