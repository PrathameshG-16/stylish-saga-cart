
/**
 * Utility functions for image handling across the application
 */

/**
 * Creates a placeholder image URL with custom text
 * @param width Image width
 * @param height Image height 
 * @param text Text to display on placeholder
 * @returns Placeholder image URL
 */
export const createPlaceholder = (
  width = 400, 
  height = 400, 
  text = "Image"
): string => {
  return `https://placehold.co/${width}x${height}/e2e8f0/a1a1aa?text=${encodeURIComponent(text)}`;
};

/**
 * Checks if a URL is external (absolute) or local (relative)
 * @param url URL to check
 * @returns Boolean indicating if URL is external
 */
export const isExternalUrl = (url: string): boolean => {
  return /^https?:\/\//.test(url) || url.startsWith("data:");
};

/**
 * Common image error handler for components
 * @param e Error event
 * @param fallbackText Text to show on fallback image
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackText = "No Image"
): void => {
  const target = e.target as HTMLImageElement;
  target.src = createPlaceholder(400, 400, fallbackText);
};
