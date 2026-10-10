import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

export const SEO = ({ title, description, canonical }: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    // Dynamic page title
    const fullTitle = title
      ? `${title} | Ben Krack`
      : 'Ben Krack | Senior Software Engineer – Test & Infrastructure Leader';
    document.title = fullTitle;

    // Dynamic meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    // Dynamic OpenGraph Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }

    // Dynamic Canonical
    const canonicalUrl = canonical || `https://benkrack.com${location.pathname === '/' ? '' : location.pathname}`;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }
  }, [title, description, canonical, location.pathname]);

  return null;
};

export default SEO;
