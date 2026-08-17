import { useEffect } from 'react';
import { siteConfig } from '@/data/profile';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  /** Falls back to siteConfig.ogImage. Skipped entirely if neither is set — never a broken image tag. */
  image?: string;
}

function setMetaTag(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function removeMetaTag(attribute: 'name' | 'property', key: string) {
  document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)?.remove();
}

export function Seo({ title, description, path = '', image }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} — ${siteConfig.name}`;
    document.title = fullTitle;

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', `${siteConfig.siteUrl}${path}`);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);

    const resolvedImage = image ?? siteConfig.ogImage;
    if (resolvedImage) {
      const absoluteImage = resolvedImage.startsWith('http')
        ? resolvedImage
        : `${siteConfig.siteUrl}${resolvedImage}`;
      setMetaTag('property', 'og:image', absoluteImage);
      setMetaTag('name', 'twitter:image', absoluteImage);
    } else {
      removeMetaTag('property', 'og:image');
      removeMetaTag('name', 'twitter:image');
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${siteConfig.siteUrl}${path}`);
  }, [title, description, path, image]);

  return null;
}
