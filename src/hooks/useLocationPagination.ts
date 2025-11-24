/**
 * Custom hook for location pagination logic
 * @ai-context - Encapsulates pagination logic for location lists in Dashboard
 */

import { useState, useMemo } from "react";

interface Location {
  id: string;
  [key: string]: unknown;
}

interface UseLocationPaginationResult {
  currentPage: number;
  totalPages: number;
  paginatedLocations: Location[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

/**
 * Hook for paginating location lists
 * @param locations - Array of all locations
 * @param itemsPerPage - Number of items per page (default: 3)
 * @returns Pagination state and functions
 */
export function useLocationPagination(
  locations: Location[],
  itemsPerPage: number = 3
): UseLocationPaginationResult {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = useMemo(
    () => Math.ceil(locations.length / itemsPerPage),
    [locations.length, itemsPerPage]
  );

  const paginatedLocations = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return locations.slice(start, end);
  }, [locations, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const previousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return {
    currentPage,
    totalPages,
    paginatedLocations,
    goToPage,
    nextPage,
    previousPage,
  };
}

