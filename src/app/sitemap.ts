import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://archpath.vercel.app';

  // These slugs match the programmatic links in your Career Directory
  const careers = [
    'software-engineer', 
    'full-stack-developer', 
    'mobile-app-developer', 
    'cloud-architect',
    'data-scientist', 
    'ai-prompt-engineer', 
    'machine-learning-engineer', 
    'data-analyst',
    'ui-ux-designer', 
    'product-designer', 
    'graphic-designer',
    'product-manager', 
    'digital-marketer', 
    'business-analyst'
  ];

  // Dynamically generate the sitemap objects for the career pages
  const careerUrls = careers.map((slug) => ({
    url: `${baseUrl}/careers/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8, // Content pages get strong priority
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // Absolute highest priority for the root landing page
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // Main directory index is the second most important page
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5, // Login gets lower priority (not a content page)
    },
    ...careerUrls, // Spreads all 14 dynamic career URLs into the sitemap
  ];
}
