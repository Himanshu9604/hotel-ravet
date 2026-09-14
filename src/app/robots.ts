import { MetadataRoute } from 'next';

const SITE_URL = 'https://thetreehotels.com'; // TODO: replace with the real production domain

export default function robots(): MetadataRoute.Robots {
 return {
  rules: { userAgent: '*', allow: '/' },
  sitemap: `${SITE_URL}/sitemap.xml`
 };
}
