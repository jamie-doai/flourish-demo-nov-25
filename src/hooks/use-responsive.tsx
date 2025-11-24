import { useMediaQuery } from "./use-media-query";

/**
 * Hook to check if screen is mobile size (< 500px)
 * Used for bottom navigation display
 */
export function useIsMobile() {
  return useMediaQuery("(max-width: 499px)");
}

/**
 * Hook to check if screen is tablet size (500px - 999px)
 * Used for hamburger menu display
 */
export function useIsTablet() {
  return useMediaQuery("(min-width: 500px) and (max-width: 999px)");
}

/**
 * Hook to check if screen is desktop size (>= 1000px)
 * Used for full navigation items display
 */
export function useIsDesktop() {
  return useMediaQuery("(min-width: 1000px)");
}
