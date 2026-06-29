import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot'],
        allow: '/',
      },
    ],
    sitemap: 'https://bichae.today/sitemap.xml',
  };
}
