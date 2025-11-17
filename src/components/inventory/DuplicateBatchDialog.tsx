import { useState, useEffect } from "react";
import { Batch } from "@/data/batches";
import { locations } from "@/data";
import { lifecycleStages } from "@/data/stages";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateBatchId, getNextAvailableSuffix } from "@/lib/batchIdUtils";
import { batches } from "@/data/batches";
import { Copy, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DuplicateBatchDialogProps {
  batch: Batch;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (newBatch: Partial<Batch>) => void;
}

export function DuplicateBatchDialog({
  batch,
  open,
  onOpenChange,
  onConfirm,
}: DuplicateBatchDialogProps) {
  const [quantity, setQuantity] = useState(batch.quantity);
  const [location, setLocation] = useState(batch.location);
  const [status, setStatus] = useState(batch.stage);
  const [notes, setNotes] = useState("");
  const [batchId, setBatchId] = useState("");

  useEffect(() => {
    if (open) {
      // Generate new batch ID with suffix
      const speciesCode = batch.id.split('-')[0];
      const locationCode = location.substring(0, 3).toUpperCase().replace(/\s/g, '');
      const baseId = generateBatchId(speciesCode, locationCode, new Date());
      const suffix = getNextAvailableSuffix(baseId, batches);
      setBatchId(`${baseId}-${suffix}`);
    }
  }, [open, batch.id, location]);

  const handleConfirm = () => {
    const newBatch: Partial<Batch> = {
      id: batchId,
      species: batch.species,
      scientificName: batch.scientificName,
      location,
      stage: status,
      quantity,
      health: "Good",
      started: new Date().toISOString().split('T')[0],
      container: batch.container,
      sourceLocation: batch.sourceLocation,
      isDuplicate: true,
      originalBatchId: batch.id,
    };
    onConfirm(newBatch);
    onOpenChange(false);
  };

  const copiedFields = [
    { label: "Species", value: batch.scientificName },
    { label: "Common Name", value: batch.species },
    { label: "Container Type", value: batch.container },
    { label: "Source Location", value: batch.sourceLocation },
  ];

  const resetFields = [
    "Batch ID (new unique ID)",
    "All dates (started date = today)",
    "Health status (defaults to Good)",
    "Activity log (fresh log)",
    "Cost data (recalculated)",
    "Sale status (cleared)",
    "Age in days (0)",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Copy className="w-5 h-5" />
            Duplicate Batch
          </DialogTitle>
          <DialogDescription>
            Create a copy of {batch.id} with a new batch number
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Preview Section */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                Fields That Copy
              </h4>
              <div className="space-y-2 text-sm">
                {copiedFields.map((field) => (
                  <div key={field.label} className="flex justify-between">
                    <span className="text-muted-foreground">{field.label}:</span>
                    <span className="font-medium">{field.value || "-"}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <X className="w-4 h-4 text-orange-600" />
                Fields That Reset
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {resetFields.map((field) => (
                  <li key={field}>• {field}</li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Editable Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="batchId">New Batch ID</Label>
              <Input
                id="batchId"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                placeholder="Batch ID"
              />
              <p className="text-xs text-muted-foreground">
                Auto-generated but you can edit if needed
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Initial Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc.id} value={loc.name}>
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Starting Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lifecycleStages.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Reason for duplication..."
                rows={3}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!batchId || quantity <= 0}>
            <Copy className="w-4 h-4 mr-2" />
            Create Duplicate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
