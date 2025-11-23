import { useState, useEffect } from "react";

/**
 * Hook to check if a media query matches
 * Uses standard CSS media query API (window.matchMedia)
 * 
 * @param query - CSS media query string (e.g., "(min-width: 768px)")
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mql = window.matchMedia(query);
    
    const onChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    
    // Set initial value
    setMatches(mql.matches);
    
    // Listen for changes
    mql.addEventListener("change", onChange);
    
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [query]);

  // Return false during SSR or before first render
  return !!matches;
}
