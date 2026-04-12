import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/generator', '/admin'], // Keep private routes hidden
    },
    sitemap: 'https://pathfinder-ai.vercel.app/sitemap.xml',
  };
}
