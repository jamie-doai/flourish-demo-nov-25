import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/hooks/useSearch';
import { SearchResultGroup } from './SearchResultGroup';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuickFilterDropdown } from './QuickFilterDropdown';

interface ExpandingSearchProps {
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
}

export function ExpandingSearch({ isExpanded, onExpandChange }: ExpandingSearchProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    query,
    setQuery,
    suggestions,
    recentSearches,
    executeSearch,
    quickFilter,
    setQuickFilter,
  } = useSearch();
  
  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isExpanded]);
  
  // Close on outside click (but not when clicking select dropdown)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      // Check if click is on a select dropdown (Radix Portals)
      const isSelectDropdown = (target as Element).closest('[role="listbox"]') || 
                               (target as Element).closest('[data-radix-select-content]');
      
      if (containerRef.current && !containerRef.current.contains(target) && !isSelectDropdown) {
        onExpandChange(false);
      }
    };
    
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isExpanded, onExpandChange]);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onExpandChange(!isExpanded);
      }
      if (e.key === 'Escape' && isExpanded) {
        onExpandChange(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, onExpandChange]);
  
  const handleViewMore = () => {
    if (query.trim()) {
      executeSearch(query);
      navigate(`/managers/search?q=${encodeURIComponent(query)}`);
      onExpandChange(false);
    }
  };
  
  const handleRecentClick = (recentQuery: string) => {
    setQuery(recentQuery);
  };
  
  const handleKeyDownInput = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      handleViewMore();
    }
  };
  
  const handleSelect = () => {
    executeSearch(query);
    onExpandChange(false);
  };
  
  const handleClose = () => {
    setQuery('');
    onExpandChange(false);
  };
  
  const hasResults = Array.from(suggestions.values()).some(items => items.length > 0);
  const showEmpty = query.trim() && !hasResults;
  const showRecent = !query.trim() && recentSearches.length > 0;
  const showDropdown = isExpanded && (hasResults || showEmpty || showRecent || !query.trim());
  
  if (!isExpanded) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => onExpandChange(true)}
        className="border-white text-white hover:bg-lime-green/20"
      >
        <Search className="w-3 h-3" />
      </Button>
    );
  }
  
  return (
    <div ref={containerRef} className="relative flex-1 max-w-2xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground z-10" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDownInput}
            placeholder="Search everything..."
            className="pl-12 pr-[calc(160px+2.5rem)] h-10"
          />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute right-[calc(160px+0.5rem)] top-[40px] h-8 w-8 p-1 z-10"
        >
          <X className="w-3 h-3" />
        </Button>
        <div className="absolute right-1 top-1/2 -translate-y-1/2 z-10">
          <QuickFilterDropdown 
            value={quickFilter}
            onValueChange={setQuickFilter}
          />
        </div>
      </div>
      
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-lg shadow-lg z-50 flex flex-col max-h-[calc(100vh-200px)]">
          {/* Scrollable Results Area */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {showRecent && (
                <div className="space-y-1 mb-4">
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Recent Searches
                    </h3>
                  </div>
                  {recentSearches.map((recent, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentClick(recent)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
                    >
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{recent}</span>
                    </button>
                  ))}
                </div>
              )}
              
              {hasResults && (
                <>
                  {Array.from(suggestions.entries()).map(([type, items]) => (
                    <SearchResultGroup
                      key={type}
                      type={type}
                      items={items}
                      query={query}
                      onSelect={handleSelect}
                    />
                  ))}
                </>
              )}
              
              {showEmpty && (
                <div className="text-center py-8 px-4">
                  <p className="text-muted-foreground mb-2">No results found for "{query}"</p>
                  <p className="text-sm text-muted-foreground">Try a different search term or filter</p>
                </div>
              )}
              
              {!showRecent && !hasResults && !showEmpty && (
                <div className="text-center py-8 px-4">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Search batches, tasks, species, and locations
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Sticky Footer - Show More Button */}
          {query.trim() && (
            <div className="sticky bottom-0 p-3 border-t bg-background/95 backdrop-blur-sm shrink-0">
              <Button
                onClick={handleViewMore}
                variant="default"
                className="w-full"
              >
                <span>Show more results</span>
                <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
