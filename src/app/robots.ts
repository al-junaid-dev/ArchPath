import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard', 
        '/generator', 
        '/admin',
        '/api/',   // Protect API routes from crawlers
        '/auth/'   // Protect Supabase auth callbacks
      ],
    },
    sitemap: 'https://archpath.vercel.app/sitemap.xml',
  };
}
