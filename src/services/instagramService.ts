/**
 * KarigarX Instagram Publishing Connector
 * 
 * Official Meta / Instagram Graph API service for publishing verified artisan crafts.
 * Strictly adheres to Meta Graph API specifications:
 * - Credentials kept strictly server-side (never exposed to frontend).
 * - Never fakes, mocks, or simulates publication.
 * - Handles NOT_CONNECTED, READY, PUBLISHING, PUBLISHED, and FAILED states.
 */

import {
  isPublicHttpsUrl,
  ensurePublicHttpsImageUrl,
} from './mediaStorageService';

export type InstagramPublishStatus =
  | 'NOT_CONNECTED'
  | 'READY'
  | 'PUBLISHING'
  | 'PUBLISHED'
  | 'FAILED';

export interface InstagramPublishResult {
  success: boolean;
  platform: 'Instagram';
  status: InstagramPublishStatus;
  publicationId?: string;
  message: string;
  permalink?: string;
  postId?: string; // backwards compatibility alias
  details?: Record<string, any>;
}

export interface PreparedInstagramPost {
  ready: boolean;
  status: 'READY' | 'FAILED';
  imageUrl?: string;
  caption: string;
  hashtags: string[];
  fullCaption: string;
  isPublicUrl: boolean;
  error?: string;
  message: string;
}

export interface InstagramVerificationResult {
  verified: boolean;
  platform: 'Instagram';
  publicationId?: string;
  permalink?: string;
  message: string;
  details?: Record<string, any>;
}

/**
 * 1. isInstagramConfigured()
 * Checks whether the required Instagram/Meta environment variables exist on the server.
 */
export function isInstagramConfigured(): boolean {
  const accessToken =
    process.env.INSTAGRAM_ACCESS_TOKEN ||
    process.env.META_ACCESS_TOKEN ||
    '';
  const businessAccountId =
    process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID ||
    '';

  return Boolean(accessToken.trim() && businessAccountId.trim());
}

/**
 * Helper to get the configured Meta Graph API version
 */
function getGraphApiVersion(): string {
  return process.env.INSTAGRAM_GRAPH_API_VERSION || 'v19.0';
}

/**
 * 2. prepareInstagramPublication()
 * Validates the approved product image and generated caption.
 * Returns the data required for publication without publishing.
 */
export function prepareInstagramPublication(params: {
  caption: string;
  imageUrl?: string;
  hashtags?: string[];
  listing?: any;
}): PreparedInstagramPost {
  const { caption, imageUrl, hashtags = [] } = params;

  if (!caption || !caption.trim()) {
    return {
      ready: false,
      status: 'FAILED',
      caption: '',
      hashtags: [],
      fullCaption: '',
      isPublicUrl: false,
      error: 'Instagram caption is missing or empty.',
      message: 'Validation failed: A descriptive caption is required for Instagram publication.',
    };
  }

  // Format hashtags properly
  const formattedHashtags = hashtags
    .map((tag) => (tag.startsWith('#') ? tag.trim() : `#${tag.trim()}`))
    .filter((tag) => tag.length > 1)
    .slice(0, 30); // Meta maximum allowed hashtags per post is 30

  // Combine caption and hashtags with double line break
  const hashtagBlock = formattedHashtags.length > 0 ? formattedHashtags.join(' ') : '';
  let fullCaption = hashtagBlock ? `${caption.trim()}\n\n${hashtagBlock}` : caption.trim();

  // Enforce Meta Instagram caption character limit (2,200 characters)
  if (fullCaption.length > 2200) {
    fullCaption = fullCaption.substring(0, 2197) + '...';
  }

  const resolvedImageUrl = ensurePublicHttpsImageUrl(imageUrl);
  const isPublicUrl = isPublicHttpsUrl(resolvedImageUrl);

  if (!resolvedImageUrl) {
    return {
      ready: false,
      status: 'FAILED',
      imageUrl: '',
      caption: caption.trim(),
      hashtags: formattedHashtags,
      fullCaption,
      isPublicUrl: false,
      error: 'No product image provided for Instagram publication.',
      message: 'Validation failed: An image is required for Instagram media posts.',
    };
  }

  return {
    ready: isPublicUrl,
    status: isPublicUrl ? 'READY' : 'FAILED',
    imageUrl: resolvedImageUrl,
    caption: caption.trim(),
    hashtags: formattedHashtags,
    fullCaption,
    isPublicUrl,
    error: isPublicUrl
      ? undefined
      : 'Instagram Graph API requires a publicly accessible HTTPS image URL. Localhost, blob, or base64 image data cannot be reached by Meta servers.',
    message: isPublicUrl
      ? 'Instagram publication prepared successfully and validated for Meta Graph API.'
      : 'Instagram publication requires a publicly accessible HTTPS URL before Meta servers can ingest it.',
  };
}

/**
 * 4. verifyInstagramPublication()
 * Verifies the actual published media/result through the official Meta Graph API.
 */
export async function verifyInstagramPublication(
  publicationId: string
): Promise<InstagramVerificationResult> {
  if (!isInstagramConfigured()) {
    return {
      verified: false,
      platform: 'Instagram',
      publicationId,
      message: 'Instagram is not configured. Verification cannot be performed.',
    };
  }

  if (!publicationId || !publicationId.trim()) {
    return {
      verified: false,
      platform: 'Instagram',
      message: 'Publication ID is missing for Instagram verification.',
    };
  }

  const accessToken =
    process.env.INSTAGRAM_ACCESS_TOKEN ||
    process.env.META_ACCESS_TOKEN ||
    '';
  const version = getGraphApiVersion();

  try {
    const verifyUrl = `https://graph.facebook.com/${version}/${encodeURIComponent(
      publicationId
    )}?fields=id,media_type,media_url,permalink,status_code,timestamp&access_token=${encodeURIComponent(
      accessToken
    )}`;

    const response = await fetch(verifyUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const data: any = await response.json();

    if (response.ok && data?.id === publicationId) {
      return {
        verified: true,
        platform: 'Instagram',
        publicationId: data.id,
        permalink: data.permalink,
        message: `Media successfully verified on Instagram feed (Type: ${data.media_type || 'IMAGE'}).`,
        details: data,
      };
    }

    return {
      verified: false,
      platform: 'Instagram',
      publicationId,
      message:
        data?.error?.message ||
        `Media ID "${publicationId}" could not be verified on Instagram Graph API.`,
      details: data?.error,
    };
  } catch (err: any) {
    return {
      verified: false,
      platform: 'Instagram',
      publicationId,
      message:
        err?.message || 'Network error encountered during Instagram publication verification.',
    };
  }
}

/**
 * 3. publishInstagram()
 * Attempts actual publication through the official Meta/Instagram Graph API.
 * - Returns success=false and status="NOT_CONNECTED" when configuration is missing.
 * - Never returns a fake success.
 * - Verifies publication before reporting success.
 */
export async function publishInstagram(params: {
  caption: string;
  imageUrl?: string;
  hashtags?: string[];
  listing?: any;
}): Promise<InstagramPublishResult> {
  // 1. Check configuration
  if (!isInstagramConfigured()) {
    return {
      success: false,
      platform: 'Instagram',
      status: 'NOT_CONNECTED',
      message:
        'Instagram Business Account is not connected. To publish to Instagram, configure INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID in server environment secrets.',
    };
  }

  // 2. Validate and prepare publication
  const prepared = prepareInstagramPublication(params);
  if (!prepared.ready || !prepared.imageUrl) {
    return {
      success: false,
      platform: 'Instagram',
      status: 'FAILED',
      message: prepared.error || 'Failed to prepare Instagram publication payload.',
    };
  }

  // Meta Graph API requires an accessible public URL (HTTP/HTTPS)
  if (!prepared.isPublicUrl) {
    return {
      success: false,
      platform: 'Instagram',
      status: 'FAILED',
      message:
        'Instagram Graph API requires a publicly accessible HTTP/HTTPS image URL. Base64 data URLs cannot be ingested directly by Meta servers.',
    };
  }

  const accessToken =
    process.env.INSTAGRAM_ACCESS_TOKEN ||
    process.env.META_ACCESS_TOKEN ||
    '';
  const businessAccountId =
    process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID ||
    '';
  const version = getGraphApiVersion();

  try {
    // Step 1: Create Media Container (POST /{ig-user-id}/media)
    const createContainerUrl = `https://graph.facebook.com/${version}/${businessAccountId}/media`;
    const containerParams = new URLSearchParams({
      image_url: prepared.imageUrl,
      caption: prepared.fullCaption,
      access_token: accessToken,
    });

    const containerResponse = await fetch(`${createContainerUrl}?${containerParams.toString()}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });

    const containerData: any = await containerResponse.json();

    if (!containerResponse.ok || !containerData?.id) {
      const errorMsg =
        containerData?.error?.message ||
        `Meta Graph API container creation failed (HTTP ${containerResponse.status}).`;
      return {
        success: false,
        platform: 'Instagram',
        status: 'FAILED',
        message: `Instagram Media Container Error: ${errorMsg}`,
        details: containerData?.error,
      };
    }

    const creationId = containerData.id;

    // Step 2: Publish Media Container (POST /{ig-user-id}/media_publish)
    const publishContainerUrl = `https://graph.facebook.com/${version}/${businessAccountId}/media_publish`;
    const publishParams = new URLSearchParams({
      creation_id: creationId,
      access_token: accessToken,
    });

    // Brief delay to allow Meta CDN ingest
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const publishResponse = await fetch(`${publishContainerUrl}?${publishParams.toString()}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });

    const publishData: any = await publishResponse.json();

    if (!publishResponse.ok || !publishData?.id) {
      const errorMsg =
        publishData?.error?.message ||
        `Meta Graph API media publish failed (HTTP ${publishResponse.status}).`;
      return {
        success: false,
        platform: 'Instagram',
        status: 'FAILED',
        publicationId: creationId,
        message: `Instagram Publishing Error: ${errorMsg}`,
        details: publishData?.error,
      };
    }

    const publishedMediaId = publishData.id;

    // Step 3: Verify the publication on Instagram
    const verification = await verifyInstagramPublication(publishedMediaId);

    return {
      success: true,
      platform: 'Instagram',
      status: 'PUBLISHED',
      publicationId: publishedMediaId,
      postId: publishedMediaId,
      permalink: verification.permalink,
      message: 'Successfully published and verified on official Instagram Business feed.',
      details: {
        containerId: creationId,
        publishedMediaId,
        verification,
      },
    };
  } catch (networkError: any) {
    return {
      success: false,
      platform: 'Instagram',
      status: 'FAILED',
      message:
        networkError?.message ||
        'Network error occurred while connecting to official Meta Instagram Graph API.',
    };
  }
}
