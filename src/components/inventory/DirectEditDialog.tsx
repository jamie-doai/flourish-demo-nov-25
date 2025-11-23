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
import { stages } from "@/data/stages";
import { locations } from "@/data/locations";

interface DirectEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batch: Batch | null;
  onConfirm: (updates: Partial<Batch>) => void;
}

export function DirectEditDialog({ open, onOpenChange, batch, onConfirm }: DirectEditDialogProps) {
  const [quantity, setQuantity] = useState("");
  const [stage, setStage] = useState("");
  const [location, setLocation] = useState("");
  const [health, setHealth] = useState("");
  const [notes, setNotes] = useState("");

  if (!batch) return null;

  const quantityChanged = quantity && parseInt(quantity) !== batch.quantity;
  const affectsCOP = quantityChanged;

  const handleConfirm = () => {
    const updates: Partial<Batch> = {};
    
    if (quantity && parseInt(quantity) !== batch.quantity) {
      updates.quantity = parseInt(quantity);
    }
    if (stage && stage !== batch.stage) {
      updates.stage = stage;
    }
    if (location && location !== batch.location) {
      updates.location = location;
    }
    if (health && health !== batch.health) {
      updates.health = health;
    }

    onConfirm(updates);
    handleReset();
    onOpenChange(false);
  };

  const handleReset = () => {
    setQuantity("");
    setStage("");
    setLocation("");
    setHealth("");
    setNotes("");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleReset();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl !bg-green-100">
        <DialogHeader>
          <DialogTitle>Direct Edit: {batch.id}</DialogTitle>
          <DialogDescription>
            Make quick edits to batch properties. Changes are logged and can be undone within 15 minutes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current values */}
          <div className="p-4 border rounded-lg bg-muted/50">
            <Label className="mb-2">Current Values</Label>
            <div className="grid grid-cols-3 gap-4 text-sm mt-2">
              <div>
                <span className="text-muted-foreground">Quantity:</span>
                <p className="font-medium">{batch.quantity} plants</p>
              </div>
              <div>
                <span className="text-muted-foreground">Stage:</span>
                <p className="font-medium capitalize">{batch.stage}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <p className="font-medium">{batch.location}</p>
              </div>
            </div>
          </div>

          {/* Edit fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder={batch.quantity.toString()}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="health">Health Status</Label>
              <Select value={health} onValueChange={setHealth}>
                <SelectTrigger id="health">
                  <SelectValue placeholder={batch.health} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage">Stage</Label>
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger id="stage">
                  <SelectValue placeholder={batch.stage} />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location">
                  <SelectValue placeholder={batch.location} />
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Edit Notes (optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Reason for changes..."
              rows={3}
            />
          </div>

          {/* Warnings */}
          {affectsCOP && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Quantity changes will recalculate per-unit Cost of Production while maintaining total cost.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
