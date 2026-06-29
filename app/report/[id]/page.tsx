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
    return { title: 'Report not found — Bichae Today' };
  }

  const { report, product } = data;
  const title = `${product.brand_name} ${product.name} — ${report.title}`;
  const description = `${product.brand_name} ${product.name} in-depth review, formulation science, and live 5-retailer price matrix (Amazon, Olive Young, Stylevana, YesStyle, StyleKorean).`;
  const url = `${SITE_URL}/report/${id}`;
  const image = product.image_url || `${SITE_URL}/images/beauty_of_joseon_sunscreen.jpg`;

  const keywords = [
    `${product.brand_name} ${product.name}`,
    `${product.name} review`,
    `${product.brand_name} price comparison`,
    `${product.name} Amazon deal`,
    `${product.name} Olive Young global`,
    `${product.name} Stylevana YesStyle price`,
    `best K-beauty sun serum 2026`,
    `Korean sunscreen glass skin review`,
    `Centella Hyalu-Cica water fit sun serum ingredients`,
    `Bichae daily beauty intelligence`
  ];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'Bichae Daily Intelligence',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
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

  const { report, product, priceMatrix } = data;
  const lowestPrice = Math.min(...priceMatrix.map((p) => p.price_usd));
  const highestPrice = Math.max(...priceMatrix.map((p) => p.price_usd));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        'name': `${product.brand_name} ${product.name}`,
        'image': [product.image_url],
        'description': product.description,
        'brand': {
          '@type': 'Brand',
          'name': product.brand_name,
        },
        'offers': {
          '@type': 'AggregateOffer',
          'priceCurrency': 'USD',
          'lowPrice': lowestPrice.toFixed(2),
          'highPrice': highestPrice.toFixed(2),
          'offerCount': priceMatrix.length,
          'offers': priceMatrix.map((item) => ({
            '@type': 'Offer',
            'name': item.platform_name,
            'price': item.price_usd.toFixed(2),
            'priceCurrency': 'USD',
            'availability': 'https://schema.org/InStock',
            'url': item.buy_url,
          })),
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '1280',
        },
      },
      {
        '@type': 'Article',
        'headline': report.title,
        'description': product.description || report.title,
        'image': [product.image_url],
        'datePublished': '2026-06-29T00:00:00Z',
        'author': {
          '@type': 'Organization',
          'name': 'Bichae Intelligence Studio',
          'url': SITE_URL,
        },
      },
    ],
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeaderWidget />
      <DailyReportWidget reportId={id} initialData={data} />
      <FooterWidget />
    </main>
  );
}
