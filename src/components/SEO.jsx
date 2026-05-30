import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  absoluteUrl,
  buildStructuredData,
  getRouteSeo,
  imageUrl,
  siteConfig
} from '../utils/seo.js'

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function updateJsonLd(metadata) {
  let script = document.getElementById('structured-data')

  if (!script) {
    script = document.createElement('script')
    script.id = 'structured-data'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  script.textContent = JSON.stringify(buildStructuredData(metadata))
}

export default function SEO() {
  const location = useLocation()

  useEffect(() => {
    const metadata = getRouteSeo(location.pathname)
    const canonical = absoluteUrl(metadata.path)
    const previewImage = imageUrl(metadata.image || siteConfig.image)
    const robots = metadata.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

    document.documentElement.lang = siteConfig.language
    document.title = metadata.title

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: metadata.description
    })
    upsertMeta('meta[name="author"]', { name: 'author', content: siteConfig.author })
    upsertMeta('meta[name="creator"]', { name: 'creator', content: siteConfig.author })
    upsertMeta('meta[name="publisher"]', { name: 'publisher', content: siteConfig.name })
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots })
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#050505' })
    upsertMeta('meta[name="application-name"]', {
      name: 'application-name',
      content: siteConfig.name
    })

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonical })

    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: siteConfig.name
    })
    upsertMeta('meta[property="og:locale"]', {
      property: 'og:locale',
      content: siteConfig.locale
    })
    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: metadata.schemaType === 'ProfilePage' ? 'profile' : 'website'
    })
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: metadata.title
    })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: metadata.description
    })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: previewImage
    })
    upsertMeta('meta[property="og:image:secure_url"]', {
      property: 'og:image:secure_url',
      content: previewImage
    })
    upsertMeta('meta[property="og:image:type"]', {
      property: 'og:image:type',
      content: 'image/png'
    })
    upsertMeta('meta[property="og:image:width"]', {
      property: 'og:image:width',
      content: String(siteConfig.imageWidth)
    })
    upsertMeta('meta[property="og:image:height"]', {
      property: 'og:image:height',
      content: String(siteConfig.imageHeight)
    })
    upsertMeta('meta[property="og:image:alt"]', {
      property: 'og:image:alt',
      content: metadata.imageAlt || siteConfig.imageAlt
    })

    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image'
    })
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: metadata.title
    })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: metadata.description
    })
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: previewImage
    })
    upsertMeta('meta[name="twitter:image:alt"]', {
      name: 'twitter:image:alt',
      content: metadata.imageAlt || siteConfig.imageAlt
    })

    updateJsonLd(metadata)
  }, [location.pathname])

  return null
}
