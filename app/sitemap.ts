import { MetadataRoute } from 'next';
import { getAllReportSummariesFromDb } from '@/lib/db';

export const runtime = 'edge';

const baseUrl = 'https://bichae.today';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/report/045`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/report/044`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  let reportRoutes: MetadataRoute.Sitemap = [];
  try {
    const reports = await getAllReportSummariesFromDb();
    reportRoutes = reports
      .filter((r) => r.id !== '044' && r.id !== '045')
      .map((r) => ({
        url: `${baseUrl}/report/${r.id}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  } catch {
    // Fallback static routes already cover 044 and 045
  }

  return [...staticRoutes, ...reportRoutes];
}
