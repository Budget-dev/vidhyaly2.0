import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/profile', '/auth'],
    },
    sitemap: 'https://vidhyaly.com/sitemap.xml',
  };
}
