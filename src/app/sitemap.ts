import { MetadataRoute } from 'next';
import { properties } from '@/data/properties';

const SITE_URL = 'https://thetreehotels.com'; // TODO: replace with the real production domain

export default function sitemap(): MetadataRoute.Sitemap {
 return [
  { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ...properties.map(p => ({ url: `${SITE_URL}/properties/${p.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 }))
 ];
}
