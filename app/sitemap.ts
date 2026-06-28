import { MetadataRoute } from 'next';
import { getAllReportSummariesFromDb } from '@/lib/db';

export const runtime = 'edge';

const baseUrl = 'https://bichae-v2.pages.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1.0,
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
    reportRoutes = reports.map((r) => ({
      url: `${baseUrl}/report/${r.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    // If the report list can't be loaded, still return the static routes.
  }

  return [...staticRoutes, ...reportRoutes];
}
