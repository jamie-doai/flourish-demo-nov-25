import { Button } from "@/components/ui/button";
import { X, ShoppingCart } from "lucide-react";

interface PendingSelectionBarProps {
  itemCount: number;
  onClear: () => void;
  onAddToQuote: () => void;
}

export function PendingSelectionBar({ itemCount, onClear, onAddToQuote }: PendingSelectionBarProps) {
  if (itemCount === 0) return null;

  return (
    <div className="sticky bottom-0 left-0 right-0 border-t bg-lime-green-000 p-6 flex flex-col gap-3 z-10 shadow-lg">
      <div className="flex items-center gap-2">
        <ShoppingCart className="h-5 w-5 text-primary" />
        <span className="font-medium">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
        </span>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onClear} className="flex-1">
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
        <Button size="sm" onClick={onAddToQuote} className="flex-1">
          Add {itemCount} {itemCount === 1 ? 'Item' : 'Items'} to Quote
        </Button>
      </div>
    </div>
  );
}
