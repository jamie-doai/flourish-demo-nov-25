import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { StageInventoryData, PendingLineItem } from "@/types/sales";

interface StageInventoryItemProps {
  species: string;
  scientificName: string;
  stageData: StageInventoryData;
  onAddItem: (item: PendingLineItem) => void;
}

export function StageInventoryItem({ species, scientificName, stageData, onAddItem }: StageInventoryItemProps) {
  const [quantity, setQuantity] = useState<string>("");
  const StageIcon = stageData.stageIcon;

  const handleAdd = () => {
    const qty = parseInt(quantity);
    if (!qty || qty <= 0 || qty > stageData.totalQuantity) return;

    const item: PendingLineItem = {
      id: `${species}-${stageData.stage}-${Date.now()}`,
      species,
      scientificName,
      stage: stageData.stage,
      stageName: stageData.stageName,
      quantity: qty,
      availableQuantity: stageData.totalQuantity,
      containerType: stageData.containerType,
      batchIds: stageData.batches.map(b => b.id),
      costPerUnit: stageData.avgCostPerUnit
    };

    onAddItem(item);
    setQuantity("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-muted/30 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {StageIcon && <StageIcon className="h-4 w-4 text-muted-foreground" />}
          <div>
            <div className="font-medium">{stageData.stageName}</div>
            <div className="text-sm text-muted-foreground">
              {stageData.totalQuantity} plants • {stageData.batchCount} {stageData.batchCount === 1 ? 'batch' : 'batches'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Container:</span>
          <div className="font-medium">{stageData.containerType}</div>
        </div>
        <div>
          <span className="text-muted-foreground">Cost/unit:</span>
          <div className="font-medium">
            ${stageData.avgCostPerUnit > 0 ? stageData.avgCostPerUnit.toFixed(2) : '0.00'}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Qty"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onKeyPress={handleKeyPress}
            min="1"
            max={stageData.totalQuantity}
            className="h-9"
          />
        </div>
        <Button 
          size="sm" 
          onClick={handleAdd}
          disabled={!quantity || parseInt(quantity) <= 0 || parseInt(quantity) > stageData.totalQuantity}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {quantity && parseInt(quantity) > stageData.totalQuantity && (
        <p className="text-xs text-destructive">
          Maximum available: {stageData.totalQuantity}
        </p>
      )}
    </div>
  );
}
