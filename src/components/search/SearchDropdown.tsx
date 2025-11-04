import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Clock } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { SearchResultGroup } from './SearchResultGroup';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SearchDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDropdown({ open, onOpenChange }: SearchDropdownProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    query,
    setQuery,
    suggestions,
    recentSearches,
    executeSearch,
  } = useSearch();
  
  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);
  
  const handleViewMore = () => {
    if (query.trim()) {
      executeSearch(query);
      navigate(`/managers/search?q=${encodeURIComponent(query)}`);
      onOpenChange(false);
    }
  };
  
  const handleRecentClick = (recentQuery: string) => {
    setQuery(recentQuery);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      handleViewMore();
    }
  };
  
  const handleSelect = () => {
    executeSearch(query);
    onOpenChange(false);
  };
  
  const hasResults = Array.from(suggestions.values()).some(items => items.length > 0);
  const showEmpty = query.trim() && !hasResults;
  const showRecent = !query.trim() && recentSearches.length > 0;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 max-h-[80vh]">
        {/* Search Input */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search batches, tasks, species, locations..."
              className="pl-9 pr-4 h-12 text-base"
            />
          </div>
        </div>
        
        {/* Results */}
        <ScrollArea className="max-h-[400px]">
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
                    <Clock className="w-4 h-4 text-muted-foreground" />
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
                <p className="text-sm text-muted-foreground">Try a different search term</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Footer */}
        {query.trim() && hasResults && (
          <div className="p-4 border-t bg-muted/30">
            <Button
              onClick={handleViewMore}
              variant="ghost"
              className="w-full justify-between"
            >
              <span>View more results for "{query}"</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
