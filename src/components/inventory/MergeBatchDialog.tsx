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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { validateMergeCompatibility, calculateWeightedCOP } from "@/lib/lineageUtils";
import { useState } from "react";

interface MergeBatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batches: Batch[];
  onConfirm: (newBatchCode: string) => void;
}

export function MergeBatchDialog({ open, onOpenChange, batches, onConfirm }: MergeBatchDialogProps) {
  const [newBatchCode, setNewBatchCode] = useState("");

  if (batches.length === 0) return null;

  const compatibility = validateMergeCompatibility(
    batches.map(b => ({
      species: b.species,
      potSize: b.container,
      stage: b.stage,
    }))
  );

  const totalQuantity = batches.reduce((sum, b) => sum + b.quantity, 0);
  
  const weightedCOP = batches.some(b => !b.perUnitCost)
    ? null
    : calculateWeightedCOP(
        batches.map(b => ({
          quantity: b.quantity,
          cop: b.perUnitCost || 0,
        }))
      );

  const handleConfirm = () => {
    if (!newBatchCode.trim()) return;
    onConfirm(newBatchCode);
    setNewBatchCode("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Merge Batches</DialogTitle>
          <DialogDescription>
            Combine {batches.length} batches into a single new batch
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Compatibility check */}
          {!compatibility.compatible && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{compatibility.reason}</AlertDescription>
            </Alert>
          )}

          {/* Source batches */}
          <div>
            <Label className="mb-3">Source Batches</Label>
            <div className="space-y-2">
              {batches.map((batch) => (
                <div key={batch.id} className="p-3 border rounded-lg bg-muted/50">
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Code:</span>
                      <p className="font-medium font-mono">{batch.id}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Species:</span>
                      <p className="font-medium">{batch.species}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Quantity:</span>
                      <p className="font-medium">{batch.quantity} plants</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">COP:</span>
                      <p className="font-medium">
                        ${batch.perUnitCost?.toFixed(2) || "N/A"}/unit
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New batch details */}
          <div className="space-y-4">
            <Label>New Batch Code</Label>
            <Input
              value={newBatchCode}
              onChange={(e) => setNewBatchCode(e.target.value)}
              placeholder="e.g., MAN-2025-001-M"
              className="font-mono"
            />
          </div>

          {/* Merge summary */}
          {compatibility.compatible && (
            <div className="p-4 border rounded-lg bg-primary/5">
              <Label className="mb-3">Merged Batch Summary</Label>
              <div className="grid grid-cols-3 gap-4 text-sm mt-2">
                <div>
                  <span className="text-muted-foreground">Species:</span>
                  <p className="font-medium">{batches[0].species}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Quantity:</span>
                  <p className="font-semibold text-lg">{totalQuantity} plants</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Weighted COP:</span>
                  <p className="font-semibold text-lg">
                    {weightedCOP ? `$${weightedCOP.toFixed(2)}/unit` : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!compatibility.compatible || !newBatchCode.trim()}
          >
            Merge Batches
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
