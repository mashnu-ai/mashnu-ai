import { useEffect } from 'react';

const SITE_URL = 'https://mashnu.com';
const SITE_NAME = 'Mashnu AI';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  /** JSON-LD structured data object(s) for this page, in addition to the site-wide Organization schema in index.html. */
  structuredData?: object | object[];
  /** Set true for pages intentionally not meant to be indexed or discovered by search/AI crawlers (e.g. hidden features still reachable by direct URL). */
  noindex?: boolean;
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLinkTag(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

const STRUCTURED_DATA_ID = 'page-structured-data';

/**
 * Updates document title, meta description, canonical URL, and Open
 * Graph/Twitter tags for the current route, plus injects page-specific
 * JSON-LD. This is a client-rendered SPA (no SSR), so this only affects
 * what's in the DOM after JS runs, it does not change the raw HTML crawlers
 * see on first byte. It still meaningfully helps: Googlebot and most modern
 * crawlers execute JS before indexing, and it keeps the tab title, browser
 * history, and social-share previews correct during client-side navigation.
 */
export function useSEO(props: SEOProps | null) {
  useEffect(() => {
    if (!props) return;
    const { title, description, path, structuredData, noindex } = props;
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setLinkTag('canonical', url);

    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', url);

    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);

    const existing = document.getElementById(STRUCTURED_DATA_ID);
    if (existing) existing.remove();

    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = STRUCTURED_DATA_ID;
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [props?.title, props?.description, props?.path, props?.structuredData, props?.noindex]);
}
