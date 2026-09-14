import type { Metadata, Viewport } from 'next';
import './globals.css';
import { properties } from '@/data/properties';

const SITE_URL = 'https://thetreehotels.com'; // TODO: replace with the real production domain

export const metadata: Metadata = {
 metadataBase: new URL(SITE_URL),
 title: { default: 'The Tree Hotels & Resorts | Pune & Lonavala', template: '%s | The Tree Hotels & Resorts' },
 description: 'Discover The Tree Hotels & Resorts across Ravet, Hinjewadi Phase 3 and Lonavala. Contemporary stays, thoughtful hospitality and memorable experiences.',
 keywords: ['The Tree Hotel', 'The Tree Ravet', 'The Tree Hinjewadi', 'The Tree Lonavala', 'hotels in Pune', 'resort in Lonavala', 'villa stay Lonavala', 'Ravet hotel', 'Hinjewadi Phase 3 hotel'],
 authors: [{ name: 'The Tree Hotels & Resorts' }],
 alternates: { canonical: '/' },
 robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
 openGraph: {
  title: 'The Tree Hotels & Resorts',
  description: 'Stay. Relax. Experience The Tree — across Ravet, Hinjewadi Phase 3 and Lonavala.',
  type: 'website',
  siteName: 'The Tree Hotels & Resorts',
  locale: 'en_IN',
  images: [{ url: '/images/lonavala/hero.jpg', width: 1556, height: 1168, alt: 'The Tree Hotels & Resorts' }]
 },
 twitter: { card: 'summary_large_image', title: 'The Tree Hotels & Resorts', description: 'Stay. Relax. Experience The Tree.' },
 icons: { icon: '/favicon.ico' }
};

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#06241b', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
 const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Tree Hotels & Resorts',
  url: SITE_URL,
  brand: 'The Tree',
  sameAs: [],
  subOrganization: properties.map(p => ({
   '@type': 'Hotel',
   name: p.name,
   description: p.description,
   telephone: p.phone,
   email: p.email,
   address: { '@type': 'PostalAddress', streetAddress: p.address },
   url: `${SITE_URL}/properties/${p.slug}`
  }))
 };
 return (
  <html lang="en">
   <body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    {children}
   </body>
  </html>
 );
}
