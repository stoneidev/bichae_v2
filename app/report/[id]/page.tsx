import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeaderWidget, DailyReportWidget, FooterWidget } from '@/src/widgets';
import { getReportByIdFromDb } from '@/lib/db';

export const runtime = 'edge';

const SITE_URL = 'https://bichae.today';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getReportByIdFromDb(id);

  if (!data) {
    return { title: 'Report not found' };
  }

  const { report, product } = data;
  const title = `${product.brand_name} ${product.name} — Review, Ingredients & Best Price`;
  const description = product.description?.slice(0, 155) || report.title;
  const url = `${SITE_URL}/report/${id}`;
  const image = product.image_url || `${SITE_URL}/images/beauty_of_joseon_sunscreen.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getReportByIdFromDb(id);

  if (!data) notFound();

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeaderWidget />
      <DailyReportWidget reportId={id} initialData={data} />
      <FooterWidget />
    </main>
  );
}
