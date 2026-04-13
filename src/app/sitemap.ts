import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://archpath.vercel.app';

  const careers = [
    // Artificial Intelligence & Data
    'ai-prompt-engineer', 
    'generative-ai-developer', 
    'mlops-engineer', 
    'nlp-engineer', 
    'ai-ethics-researcher', 
    'data-visualization-specialist',
    
    // Cybersecurity & Cloud
    'cloud-security-architect', 
    'penetration-tester', 
    'devsecops-engineer', 
    'blockchain-smart-contract-auditor',
    
    // Specialized Development
    'ar-vr-experience-developer', 
    'iot-solutions-architect', 
    'rust-systems-programmer', 
    'fintech-integration-developer',
    
    // Next-Gen Design & Product
    'conversation-designer', 
    'growth-product-manager', 
    'ux-researcher', 
    'technical-writer-api', 
    'developer-advocate', 
    'scrum-master-agile-coach'
  ];

  const careerUrls = careers.map((slug) => ({
    url: `${baseUrl}/careers/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...careerUrls,
  ];
}
