import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Batch } from "@/data/batches";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateBatchSuffix, validateSplitCompatibility } from "@/lib/lineageUtils";

interface SplitBatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batch: Batch | null;
  onConfirm: (splits: number[]) => void;
}

export function SplitBatchDialog({ open, onOpenChange, batch, onConfirm }: SplitBatchDialogProps) {
  const { toast } = useToast();
  const [splits, setSplits] = useState<number[]>([0, 0]);

  if (!batch) return null;

  const handleAddSplit = () => {
    setSplits([...splits, 0]);
  };

  const handleRemoveSplit = (index: number) => {
    if (splits.length <= 2) {
      toast({
        title: "Cannot remove",
        description: "Must have at least 2 splits",
        variant: "destructive",
      });
      return;
    }
    setSplits(splits.filter((_, i) => i !== index));
  };

  const handleSplitChange = (index: number, value: string) => {
    const newSplits = [...splits];
    newSplits[index] = parseInt(value) || 0;
    setSplits(newSplits);
  };

  const totalSplit = splits.reduce((sum, val) => sum + val, 0);
  const remaining = batch.quantity - totalSplit;
  const validation = validateSplitCompatibility(batch.quantity, splits);

  const handleConfirm = () => {
    if (!validation.valid) {
      toast({
        title: "Invalid split",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    onConfirm(splits);
    setSplits([0, 0]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Split Batch: {batch.id}</DialogTitle>
          <DialogDescription>
            Divide this batch into multiple child batches. Total must equal {batch.quantity} plants.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Parent batch info */}
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Species:</span>
                <p className="font-medium">{batch.species}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Current Quantity:</span>
                <p className="font-medium">{batch.quantity} plants</p>
              </div>
              <div>
                <span className="text-muted-foreground">COP:</span>
                <p className="font-medium">${batch.perUnitCost?.toFixed(2) || "N/A"}/unit</p>
              </div>
            </div>
          </div>

          {/* Split inputs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Child Batches</Label>
              <Button variant="outline" size="sm" onClick={handleAddSplit}>
                <Plus className="w-4 h-4 mr-2" />
                Add Split
              </Button>
            </div>

            {splits.map((split, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">New Batch Code</Label>
                    <Input
                      value={generateBatchSuffix(batch.id, index + 1)}
                      disabled
                      className="font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Quantity</Label>
                    <Input
                      type="number"
                      value={split || ""}
                      onChange={(e) => handleSplitChange(index, e.target.value)}
                      placeholder="0"
                      min="1"
                      max={batch.quantity}
                    />
                  </div>
                </div>
                {splits.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSplit(index)}
                    className="mt-5"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="p-4 border rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Allocated:</span>
                <p className="font-semibold">{totalSplit} plants</p>
              </div>
              <div>
                <span className="text-muted-foreground">Remaining:</span>
                <p className={`font-semibold ${remaining !== 0 ? "text-destructive" : "text-green-600"}`}>
                  {remaining} plants
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">New Batches:</span>
                <p className="font-semibold">{splits.length}</p>
              </div>
            </div>
            {!validation.valid && (
              <p className="text-sm text-destructive mt-2">{validation.error}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!validation.valid}>
            Split Batch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
