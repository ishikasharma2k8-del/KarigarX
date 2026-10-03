/**
 * KarigarX Public Media Storage Service
 * 
 * Provides a server-side storage and hosting mechanism for product images.
 * Instagram/Meta Content Publishing API requires a publicly accessible HTTPS image URL.
 * Meta's servers fetch the image directly via HTTP GET; they reject:
 * - base64 / data URLs
 * - browser blob URLs (blob:http://...)
 * - localhost / 127.0.0.1 URLs
 * - temporary frontend-only paths
 * 
 * This service converts incoming captured/uploaded craft images into
 * publicly hosted HTTPS endpoints served by this application.
 */

import fs from 'fs';
import path from 'path';

export interface StoredMediaRecord {
  mediaId: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  createdAt: string;
  buffer?: Buffer;
}

// In-memory cache for high-speed serving
const mediaMemoryCache = new Map<string, { buffer: Buffer; contentType: string }>();

// Local storage directory on the server
const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads');

// Ensure storage directory exists
try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('Could not initialize public uploads directory on disk, using memory cache:', err);
}

/**
 * Checks whether a URL is a genuinely public HTTPS/HTTP URL
 * (i.e. not base64, not blob:, not localhost, not 127.0.0.1).
 */
export function isPublicHttpsUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) return false;
  if (!trimmed.startsWith('https://') && !trimmed.startsWith('http://')) return false;

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host.endsWith('.local') ||
      host.endsWith('.internal')
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Resolves the public base URL of this application deployment.
 */
export function getPublicBaseUrl(customHeaderHost?: string, proto = 'https'): string {
  // 1. Explicit environment variable APP_URL if set and valid
  const envAppUrl = process.env.APP_URL;
  if (
    envAppUrl &&
    envAppUrl !== 'MY_APP_URL' &&
    envAppUrl.startsWith('http') &&
    isPublicHttpsUrl(envAppUrl)
  ) {
    return envAppUrl.replace(/\/$/, '');
  }

  // 2. Request host from header if public
  if (customHeaderHost && !customHeaderHost.includes('localhost') && !customHeaderHost.includes('127.0.0.1')) {
    return `${proto}://${customHeaderHost}`.replace(/\/$/, '');
  }

  // 3. Fallback to Cloud Run deployment domain
  return 'https://ais-dev-4ofotlcxlofzbpqgumca2c-820953592633.asia-east1.run.app';
}

/**
 * Stores an image (from Base64, Data URL, or binary Buffer)
 * and returns its public HTTPS URL and unique media ID.
 */
export function storeMediaImage(
  input: string | Buffer,
  options?: {
    mimeType?: string;
    baseUrl?: string;
  }
): {
  mediaId: string;
  filename: string;
  publicUrl: string;
  contentType: string;
  sizeBytes: number;
} {
  let buffer: Buffer;
  let detectedMime = options?.mimeType || 'image/jpeg';

  if (Buffer.isBuffer(input)) {
    buffer = input;
  } else if (typeof input === 'string') {
    if (input.startsWith('data:')) {
      const match = input.match(/^data:([^;]+);base64,(.+)$/s);
      if (match) {
        detectedMime = match[1];
        buffer = Buffer.from(match[2], 'base64');
      } else {
        const commaIdx = input.indexOf(',');
        const rawBase64 = commaIdx >= 0 ? input.slice(commaIdx + 1) : input;
        buffer = Buffer.from(rawBase64, 'base64');
      }
    } else {
      buffer = Buffer.from(input, 'base64');
    }
  } else {
    throw new Error('Invalid media input: expected base64 string or binary Buffer.');
  }

  const extension = detectedMime.includes('png') ? 'png' : 'jpg';
  const mediaId = `kx_artisan_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const filename = `${mediaId}.${extension}`;

  // 1. Cache in memory for instant delivery
  mediaMemoryCache.set(filename, { buffer, contentType: detectedMime });
  mediaMemoryCache.set(mediaId, { buffer, contentType: detectedMime });

  // 2. Persist to disk in public/uploads if filesystem is writable
  try {
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.writeFileSync(filePath, buffer);
  } catch (e) {
    // Memory cache will still serve the image
    console.warn(`Could not persist ${filename} to disk, cached in memory only.`, e);
  }

  const baseUrl = options?.baseUrl || getPublicBaseUrl();
  const publicUrl = `${baseUrl}/api/media/${filename}`;

  return {
    mediaId,
    filename,
    publicUrl,
    contentType: detectedMime,
    sizeBytes: buffer.length,
  };
}

/**
 * Retrieves stored media buffer and content type by mediaId or filename.
 */
export function getStoredMedia(identifier: string): { buffer: Buffer; contentType: string } | null {
  // 1. Check memory cache first
  const cached = mediaMemoryCache.get(identifier);
  if (cached) {
    return cached;
  }

  // 2. Try loading from public/uploads disk
  try {
    const safeFilename = path.basename(identifier);
    const filePath = path.join(UPLOADS_DIR, safeFilename);
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      const isPng = safeFilename.endsWith('.png');
      const contentType = isPng ? 'image/png' : 'image/jpeg';
      mediaMemoryCache.set(safeFilename, { buffer, contentType });
      return { buffer, contentType };
    }
  } catch (err) {
    console.warn('Error reading media from disk:', err);
  }

  return null;
}

/**
 * Ensures a product image URL is a valid, publicly accessible HTTPS URL.
 * If given a base64 / data URL, it stores it and returns the public HTTPS URL.
 * If given an already public HTTPS URL, returns it directly.
 */
export function ensurePublicHttpsImageUrl(
  imageInput?: string,
  baseUrl?: string
): string {
  if (!imageInput || typeof imageInput !== 'string') {
    // Verified fallback public craft image hosted on CDN with proper aspect ratio
    return 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80';
  }

  const trimmed = imageInput.trim();

  // If already a public HTTPS URL (e.g. Unsplash or external CDN), return as-is
  if (isPublicHttpsUrl(trimmed)) {
    return trimmed;
  }

  // If base64 or data URL, store it and return the public URL
  if (trimmed.startsWith('data:') || trimmed.length > 500) {
    try {
      const stored = storeMediaImage(trimmed, { baseUrl });
      return stored.publicUrl;
    } catch (err) {
      console.warn('Failed to store base64 media image, using fallback craft image:', err);
    }
  }

  // Fallback craft image
  return 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80';
}
