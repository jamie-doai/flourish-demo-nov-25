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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Batch } from "@/data/batches";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface LossAdjustmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batches: Batch[];
  onConfirm: (adjustments: Array<{ batchId: string; newQuantity: number; reason: string; notes: string }>) => void;
}

const lossReasons = [
  { value: "mortality", label: "Plant Mortality" },
  { value: "damage", label: "Physical Damage" },
  { value: "disease", label: "Disease/Pest" },
  { value: "theft", label: "Theft/Loss" },
  { value: "count_error", label: "Count Correction" },
  { value: "other", label: "Other" },
];

export function LossAdjustmentDialog({ open, onOpenChange, batches, onConfirm }: LossAdjustmentDialogProps) {
  const [adjustments, setAdjustments] = useState<Record<string, number>>({});
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleAdjustmentChange = (batchId: string, value: string) => {
    const newQty = parseInt(value) || 0;
    setAdjustments(prev => ({ ...prev, [batchId]: newQty }));
  };

  const getTotalLoss = () => {
    return batches.reduce((sum, batch) => {
      const newQty = adjustments[batch.id] ?? batch.quantity;
      return sum + (batch.quantity - newQty);
    }, 0);
  };

  const handleConfirm = () => {
    const adjustmentList = batches
      .filter(batch => adjustments[batch.id] !== undefined && adjustments[batch.id] !== batch.quantity)
      .map(batch => ({
        batchId: batch.id,
        newQuantity: adjustments[batch.id],
        reason,
        notes,
      }));

    if (adjustmentList.length === 0) return;
    
    onConfirm(adjustmentList);
    setAdjustments({});
    setReason("");
    setNotes("");
    onOpenChange(false);
  };

  const totalLoss = getTotalLoss();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adjust Quantity - Loss Tracking</DialogTitle>
          <DialogDescription>
            Record quantity reductions for {batches.length} batch(es). COP per unit remains constant.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Reason selection */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Adjustment *</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select reason..." />
              </SelectTrigger>
              <SelectContent>
                {lossReasons.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Batch adjustments */}
          <div className="space-y-3">
            <Label>Batch Adjustments</Label>
            {batches.map((batch) => {
              const newQty = adjustments[batch.id] ?? batch.quantity;
              const loss = batch.quantity - newQty;
              const lossPercent = (loss / batch.quantity) * 100;

              return (
                <div key={batch.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium font-mono">{batch.id}</p>
                      <p className="text-sm text-muted-foreground">{batch.species}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">Current</p>
                      <p className="font-semibold">{batch.quantity} plants</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">New Quantity</Label>
                      <Input
                        type="number"
                        value={adjustments[batch.id] ?? ""}
                        onChange={(e) => handleAdjustmentChange(batch.id, e.target.value)}
                        placeholder={batch.quantity.toString()}
                        min="0"
                        max={batch.quantity}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Loss</Label>
                      <Input value={loss} disabled className="font-semibold" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Loss %</Label>
                      <Input
                        value={lossPercent.toFixed(1) + "%"}
                        disabled
                        className={loss > 0 ? "text-destructive font-semibold" : ""}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detailed explanation of loss..."
              rows={3}
            />
          </div>

          {/* Summary */}
          {totalLoss > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Total loss across {batches.length} batch(es): <strong>{totalLoss} plants</strong>.
                Per-unit costs will be recalculated automatically.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!reason || totalLoss === 0}>
            Record Adjustment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
