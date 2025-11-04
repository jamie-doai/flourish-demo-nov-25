import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  buildSearchIndex,
  searchIndex,
  getSuggestions,
  SearchIndexItem,
  SearchFilters,
  EntityType,
  saveRecentSearch,
  getRecentSearches,
} from '@/data/search';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  // Build index once and cache
  const searchIndexData = useMemo(() => buildSearchIndex(), []);
  
  // Load recent searches
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);
  
  // Debounced search results
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // Get suggestions for dropdown (grouped by type, limited)
  const suggestions = useMemo(() => {
    if (!debouncedQuery.trim()) return new Map<EntityType, SearchIndexItem[]>();
    return getSuggestions(searchIndexData, debouncedQuery, 5);
  }, [searchIndexData, debouncedQuery]);
  
  // Get full results for results page
  const results = useMemo(() => {
    return searchIndex(searchIndexData, debouncedQuery, filters);
  }, [searchIndexData, debouncedQuery, filters]);
  
  // Execute search and save to recent
  const executeSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      setRecentSearches(getRecentSearches());
    }
  }, []);
  
  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setFilters({});
  }, []);
  
  return {
    query,
    setQuery,
    filters,
    setFilters,
    isOpen,
    setIsOpen,
    suggestions,
    results,
    recentSearches,
    executeSearch,
    clearSearch,
    hasResults: results.length > 0,
    isEmpty: debouncedQuery.trim() !== '' && results.length === 0,
  };
}
