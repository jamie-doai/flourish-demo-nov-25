import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Clock, X } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { SearchResultGroup } from './SearchResultGroup';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';

export function SearchSidebar() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { open, setOpen } = useSidebar();
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
      setOpen(false);
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
    setOpen(false);
  };
  
  const hasResults = Array.from(suggestions.values()).some(items => items.length > 0);
  const showEmpty = query.trim() && !hasResults;
  const showRecent = !query.trim() && recentSearches.length > 0;
  
  return (
    <Sidebar side="right" className="w-96 border-l">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-lg">Search</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search everything..."
            className="pl-9 pr-4"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
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
        
        {query.trim() && hasResults && (
          <div className="p-4 border-t bg-muted/30">
            <Button
              onClick={handleViewMore}
              variant="ghost"
              className="w-full justify-between"
            >
              <span>View all results</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
