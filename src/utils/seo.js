export const siteConfig = {
  name: 'Celestial Core',
  title: 'Celestial Core | RealDzolat Systems & Game Engineering',
  description:
    "Celestial Core is RealDzolat's portfolio for production software, Roblox/Luau game systems, React projects, and scalable engineering craft.",
  url: 'https://celestialcore.cc',
  locale: 'en_US',
  language: 'en',
  author: 'RealDzolat',
  email: 'admin@celestialcore.cc',
  image: '/projects/celestial.png',
  imageWidth: 1355,
  imageHeight: 759,
  imageAlt: 'Celestial Core portfolio interface preview',
  dateModified: '2026-05-31',
  socialLinks: [
    'https://github.com/Dzolat',
    'https://github.com/Celestial-Core-Official',
    'https://discord.gg/UkkJ2UKZ6W'
  ]
}

export const routeSeo = {
  '/': {
    path: '/',
    title: siteConfig.title,
    description: siteConfig.description,
    schemaType: 'WebPage',
    priority: '1.0',
    changefreq: 'weekly'
  },
  '/games': {
    path: '/games',
    title: 'Games | Celestial Core Roblox and Luau Engineering',
    description:
      'Games by Celestial Core: Roblox experiences, Luau architecture, simulation systems, and long-lived worlds engineered by RealDzolat.',
    schemaType: 'CollectionPage',
    priority: '0.9',
    changefreq: 'monthly'
  },
  '/projects': {
    path: '/projects',
    title: 'Projects | Celestial Core Software Engineering Portfolio',
    description:
      'Explore Celestial Core projects from RealDzolat, including React/Vite interfaces, backend systems, Supabase integrations, and production engineering work.',
    schemaType: 'CollectionPage',
    priority: '0.9',
    changefreq: 'weekly'
  },
  '/about': {
    path: '/about',
    title: 'About RealDzolat | Celestial Core',
    description:
      'Learn about RealDzolat and Celestial Core, a small systems engineering studio focused on clean architecture, scalable software, and disciplined craft.',
    schemaType: 'ProfilePage',
    priority: '0.8',
    changefreq: 'monthly'
  },
  '/contact': {
    path: '/contact',
    title: 'Contact | Celestial Core',
    description:
      'Contact Celestial Core for collaborations, software engineering work, Roblox/Luau systems, community questions, or direct messages to RealDzolat.',
    schemaType: 'ContactPage',
    priority: '0.7',
    changefreq: 'monthly'
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy | Celestial Core',
    description:
      'Read the Celestial Core privacy policy for details about data collection, cookies, third-party services, and how to contact the site owner.',
    schemaType: 'WebPage',
    priority: '0.4',
    changefreq: 'yearly'
  },
  '*': {
    path: '/',
    title: 'Page Not Found | Celestial Core',
    description:
      'The requested Celestial Core page could not be found. Return to the portfolio homepage, projects, or contact page.',
    schemaType: 'WebPage',
    noindex: true
  }
}

export function normalizePath(pathname = '/') {
  const path = pathname.split('?')[0].split('#')[0]
  if (!path || path === '/') return '/'
  return path.replace(/\/+$/, '') || '/'
}

export function getRouteSeo(pathname = '/') {
  const path = normalizePath(pathname)
  if (routeSeo[path]) return routeSeo[path]
  return { ...routeSeo['*'], path }
}

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return normalizedPath === '/'
    ? `${siteConfig.url}/`
    : `${siteConfig.url}${normalizedPath}`
}

export function imageUrl(path = siteConfig.image) {
  if (/^https?:\/\//.test(path)) return path
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildStructuredData(metadata = routeSeo['/']) {
  const pageUrl = absoluteUrl(metadata.path)
  const organizationId = `${siteConfig.url}/#organization`
  const personId = `${siteConfig.url}/#person`
  const websiteId = `${siteConfig.url}/#website`
  const pageId = `${pageUrl}#webpage`

  const organization = {
    '@type': 'Organization',
    '@id': organizationId,
    name: siteConfig.name,
    url: absoluteUrl('/'),
    logo: imageUrl('/logo_bg.png'),
    founder: { '@id': personId },
    sameAs: siteConfig.socialLinks
  }

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: siteConfig.author,
    alternateName: siteConfig.author,
    url: absoluteUrl('/about'),
    image: imageUrl('/realdzolat.png'),
    email: siteConfig.email,
    jobTitle: 'Systems and game engineer',
    knowsAbout: [
      'React',
      'TypeScript',
      'Vite',
      'Roblox',
      'Luau',
      'software architecture',
      'game systems engineering'
    ],
    sameAs: siteConfig.socialLinks,
    worksFor: { '@id': organizationId }
  }

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: absoluteUrl('/'),
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { '@id': organizationId },
    creator: { '@id': personId }
  }

  const page = {
    '@type': metadata.schemaType || 'WebPage',
    '@id': pageId,
    url: pageUrl,
    name: metadata.title,
    description: metadata.description,
    isPartOf: { '@id': websiteId },
    inLanguage: siteConfig.language,
    dateModified: siteConfig.dateModified,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: imageUrl(metadata.image || siteConfig.image),
      width: siteConfig.imageWidth,
      height: siteConfig.imageHeight
    },
    about: [{ '@id': organizationId }, { '@id': personId }]
  }

  if (metadata.schemaType === 'ProfilePage') {
    page.mainEntity = { '@id': personId }
  }

  if (metadata.schemaType === 'ContactPage') {
    page.mainEntity = { '@id': organizationId }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, person, website, page]
  }
}
