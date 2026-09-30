import mappingData from '@/data/cloudinary-mapping.json';

const mapping = mappingData as Record<string, string>;

/**
 * Returns the Cloudinary CDN URL for an image if mapped,
 * otherwise falls back to the local public path.
 */
export function getImageUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return mapping[path] || path;
}
