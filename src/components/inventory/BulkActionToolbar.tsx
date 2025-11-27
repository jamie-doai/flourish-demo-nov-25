import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPin, GitBranch, GitMerge, AlertCircle, PrinterIcon, X, FileText } from "lucide-react";

interface BulkActionToolbarProps {
  selectedCount: number;
  totalPlants: number;
  onClearSelection: () => void;
  onMoveLocation: () => void;
  onChangeStatus: () => void;
  onSplit: () => void;
  onMerge: () => void;
  onAdjustQuantity: () => void;
  onPrintLabels: () => void;
  onApplyHold: () => void;
  onCreateQuote: () => void;
}

export function BulkActionToolbar({
  selectedCount,
  totalPlants,
  onClearSelection,
  onMoveLocation,
  onChangeStatus,
  onSplit,
  onMerge,
  onAdjustQuantity,
  onPrintLabels,
  onApplyHold,
  onCreateQuote,
}: BulkActionToolbarProps) {
  if (selectedCount === 0) return null;

  return (
    <Card className="fixed bottom-6 left-1/2 -translate-x-1/2 p-4 shadow-lg z-50 border border-forest-green bg-lime-green">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-sm">
            <span className="font-semibold text-lg">{selectedCount}</span> batches selected
            <span className="text-muted-foreground ml-2">
              ({totalPlants.toLocaleString()} plants)
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClearSelection}>
            <X className="w-3 h-3" />
          </Button>
        </div>

        <div className="h-8 w-px bg-forest-green" />

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onCreateQuote} className="border-forest-green">
            <FileText className="w-3 h-3 mr-2" />
            Create Quote
          </Button>

          <Button variant="outline" size="sm" onClick={onMoveLocation} className="border-forest-green">
            <MapPin className="w-3 h-3 mr-2" />
            Move Location
          </Button>

          <Button variant="outline" size="sm" onClick={onChangeStatus} className="border-forest-green">
            Change Status
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-forest-green">
                More Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onSplit} disabled={selectedCount !== 1}>
                <GitBranch className="w-3 h-3 mr-2" />
                Split Batch
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onMerge} disabled={selectedCount < 2}>
                <GitMerge className="w-3 h-3 mr-2" />
                Merge Batches
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onAdjustQuantity}>
                <AlertCircle className="w-3 h-3 mr-2" />
                Adjust Quantity
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onPrintLabels}>
                <PrinterIcon className="w-3 h-3 mr-2" />
                Print Labels
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onApplyHold}>
                Apply Hold
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
