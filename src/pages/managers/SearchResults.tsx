import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ManagerLayout } from '@/components/layouts/ManagerLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchResultItem } from '@/components/search/SearchResultItem';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

export default function ManagerSearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const initialQuery = searchParams.get('q') || '';
  
  const {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    executeSearch,
    hasResults,
    isEmpty,
  } = useSearch();
  
  // Initialize query from URL
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      executeSearch(initialQuery);
    }
  }, [initialQuery, setQuery, executeSearch]);
  
  const [searchInput, setSearchInput] = useState(initialQuery);
  
  const handleSearch = () => {
    if (searchInput.trim()) {
      setQuery(searchInput);
      executeSearch(searchInput);
      navigate(`/managers/search?q=${encodeURIComponent(searchInput)}`);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const FiltersSidebar = () => (
    <SearchFilters filters={filters} onChange={setFilters} />
  );
  
  return (
    <ManagerLayout>
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search batches, tasks, species, locations..."
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button onClick={handleSearch} size="lg">
              Search
            </Button>
            
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="tertiary" size="lg">
                    <SlidersHorizontal className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <FiltersSidebar />
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
        
        {/* Results */}
        <div className="flex gap-6">
          {/* Filters Sidebar - Desktop */}
          {!isMobile && <FiltersSidebar />}
          
          {/* Results List */}
          <div className="flex-1 space-y-4">
            {query && (
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {hasResults ? `${results.length} results` : 'No results'} for "{query}"
                </h2>
              </div>
            )}
            
            {hasResults && (
              <Card className="divide-y">
                {results.map((item) => (
                  <SearchResultItem
                    key={`${item.type}-${item.id}`}
                    item={item}
                    query={query}
                  />
                ))}
              </Card>
            )}
            
            {isEmpty && (
              <Card className="p-12">
                <div className="text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuery('');
                      setSearchInput('');
                      setFilters({});
                    }}
                  >
                    Clear search
                  </Button>
                </div>
              </Card>
            )}
            
            {!query && (
              <Card className="p-12">
                <div className="text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Start searching</h3>
                  <p className="text-muted-foreground">
                    Search across batches, tasks, species, and locations
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ManagerLayout>
  );
}
