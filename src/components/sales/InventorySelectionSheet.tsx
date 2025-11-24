import { useState, useMemo } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { batches } from "@/data/batches";
import { getSpeciesInventorySummary, searchSpecies } from "@/lib/salesUtils";
import { PendingLineItem } from "@/types/sales";
import { SpeciesInventoryCard } from "./SpeciesInventoryCard";
import { PendingSelectionBar } from "./PendingSelectionBar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InventorySelectionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddItems: (items: PendingLineItem[]) => void;
}

export function InventorySelectionSheet({ open, onOpenChange, onAddItems }: InventorySelectionSheetProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSpecies, setExpandedSpecies] = useState<Set<string>>(new Set());
  const [pendingItems, setPendingItems] = useState<PendingLineItem[]>([]);

  const inventorySummary = useMemo(() => {
    return getSpeciesInventorySummary(batches);
  }, []);
  
  const filteredInventory = useMemo(() => 
    searchSpecies(searchQuery, inventorySummary),
    [searchQuery, inventorySummary]
  );

  const toggleExpanded = (species: string) => {
    const newExpanded = new Set(expandedSpecies);
    if (newExpanded.has(species)) {
      newExpanded.delete(species);
    } else {
      newExpanded.add(species);
    }
    setExpandedSpecies(newExpanded);
  };

  const handleAddItem = (item: PendingLineItem) => {
    setPendingItems(prev => [...prev, item]);
  };

  const handleClearPending = () => {
    setPendingItems([]);
  };

  const handleAddToQuote = () => {
    onAddItems(pendingItems);
    setPendingItems([]);
    setSearchQuery("");
    setExpandedSpecies(new Set());
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0 [&>div:first-child]:!overflow-hidden [&>div:first-child]:!flex [&>div:first-child]:!flex-col [&>div:first-child]:!h-full">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-4 shrink-0">
            <SheetTitle>Select Inventory</SheetTitle>
            <SheetDescription>
              Choose plants from available stock to add to your quote
            </SheetDescription>
            
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by species or scientific name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </SheetHeader>

          <div className="flex-1 min-h-0 overflow-y-auto relative">
            <div className="px-6 pb-24">
              <div className="space-y-2">
                {filteredInventory.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    {searchQuery ? "No species found matching your search" : "No inventory available"}
                  </div>
                ) : (
                  filteredInventory.map((summary) => (
                    <SpeciesInventoryCard
                      key={summary.species}
                      summary={summary}
                      isExpanded={expandedSpecies.has(summary.species)}
                      onToggle={() => toggleExpanded(summary.species)}
                      onAddItem={handleAddItem}
                    />
                  ))
                )}
              </div>
            </div>
            
            <PendingSelectionBar
              itemCount={pendingItems.length}
              onClear={handleClearPending}
              onAddToQuote={handleAddToQuote}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
