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
  const [quickFilter, setQuickFilter] = useState<EntityType | 'all'>('all');
  
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
    return getSuggestions(searchIndexData, debouncedQuery, 8);
  }, [searchIndexData, debouncedQuery]);
  
  // Filter suggestions based on quick filter
  const filteredSuggestions = useMemo(() => {
    if (quickFilter === 'all') return suggestions;
    
    const filtered = new Map<EntityType, SearchIndexItem[]>();
    if (suggestions.has(quickFilter as EntityType)) {
      filtered.set(quickFilter as EntityType, suggestions.get(quickFilter as EntityType)!);
    }
    return filtered;
  }, [suggestions, quickFilter]);
  
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
    suggestions: filteredSuggestions,
    results,
    recentSearches,
    executeSearch,
    clearSearch,
    quickFilter,
    setQuickFilter,
    hasResults: results.length > 0,
    isEmpty: debouncedQuery.trim() !== '' && results.length === 0,
  };
}
