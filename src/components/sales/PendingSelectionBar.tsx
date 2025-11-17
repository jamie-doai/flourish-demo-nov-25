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
    <div className="border-t bg-card p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <ShoppingCart className="h-5 w-5 text-primary" />
        <span className="font-medium">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
        </span>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onClear}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
        <Button size="sm" onClick={onAddToQuote}>
          Add {itemCount} {itemCount === 1 ? 'Item' : 'Items'} to Quote
        </Button>
      </div>
    </div>
  );
}
