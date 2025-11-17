import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SpeciesInventorySummary, PendingLineItem } from "@/types/sales";
import { StageInventoryItem } from "./StageInventoryItem";

interface SpeciesInventoryCardProps {
  summary: SpeciesInventorySummary;
  isExpanded: boolean;
  onToggle: () => void;
  onAddItem: (item: PendingLineItem) => void;
}

export function SpeciesInventoryCard({ summary, isExpanded, onToggle, onAddItem }: SpeciesInventoryCardProps) {
  return (
    <Card className="overflow-hidden">
      <Button
        variant="ghost"
        className="w-full p-4 h-auto flex items-start justify-between hover:bg-muted/50"
        onClick={onToggle}
      >
        <div className="flex-1 text-left">
          <div className="font-semibold text-base">{summary.species}</div>
          <div className="text-sm text-muted-foreground italic">{summary.scientificName}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {summary.totalQuantity} plants • {summary.batchCount} {summary.batchCount === 1 ? 'batch' : 'batches'}
          </div>
        </div>
        <div className="ml-2">
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </Button>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-3 border-t">
          {summary.stages.map((stageData) => (
            <StageInventoryItem
              key={stageData.stage}
              species={summary.species}
              scientificName={summary.scientificName}
              stageData={stageData}
              onAddItem={onAddItem}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
