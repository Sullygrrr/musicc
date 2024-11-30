const PLATFORM_PATTERNS = {
  spotify: /^https:\/\/open\.spotify\.com\/(track|album|playlist)\/[a-zA-Z0-9]+$/,
  deezer: /^https:\/\/(?:www\.)?deezer\.com\/(track|album|playlist)\/\d+$/,
  youtube: /^https:\/\/(?:www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]+$/,
};

export const validatePlatformUrl = async (platform: keyof typeof PLATFORM_PATTERNS, url: string) => {
  if (!url) return true; // Empty URLs are valid (optional fields)
  
  // Check URL pattern
  if (!PLATFORM_PATTERNS[platform].test(url)) {
    return false;
  }

  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};