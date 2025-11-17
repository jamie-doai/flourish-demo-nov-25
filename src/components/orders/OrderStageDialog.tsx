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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OrderStatus, getStatusLabel } from "@/lib/orderLifecycle";

interface OrderStageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStatus: OrderStatus;
  nextStatus: OrderStatus;
  onConfirm: (notes?: string) => void;
  orderNumber: string;
}

export function OrderStageDialog({
  open,
  onOpenChange,
  currentStatus,
  nextStatus,
  onConfirm,
  orderNumber,
}: OrderStageDialogProps) {
  const [notes, setNotes] = useState("");

  const handleConfirm = () => {
    onConfirm(notes);
    setNotes("");
    onOpenChange(false);
  };

  const getActionMessage = () => {
    switch (nextStatus) {
      case "approved":
        return "Approve this order and begin processing?";
      case "in_progress":
        return "Start preparing this order?";
      case "ready_to_dispatch":
        return "Mark this order as ready for dispatch?";
      case "dispatched":
        return "Mark this order as dispatched?";
      case "completed":
        return "Mark this order as completed?";
      case "cancelled":
        return "Cancel this order? This action will stop all processing.";
      default:
        return `Update order status to ${getStatusLabel(nextStatus)}?`;
    }
  };

  const requiresNotes = nextStatus === "dispatched" || nextStatus === "cancelled";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {nextStatus === "cancelled" ? "Cancel Order" : `Update Order Status`}
          </DialogTitle>
          <DialogDescription>
            {getActionMessage()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Order:</strong> {orderNumber}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Current Status:</strong> {getStatusLabel(currentStatus)}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>New Status:</strong> {getStatusLabel(nextStatus)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">
              {requiresNotes ? "Notes (Required)" : "Notes (Optional)"}
            </Label>
            <Textarea
              id="notes"
              placeholder={
                nextStatus === "dispatched"
                  ? "Enter courier details, tracking number, etc."
                  : nextStatus === "cancelled"
                  ? "Enter reason for cancellation..."
                  : "Add any notes about this status change..."
              }
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant={nextStatus === "cancelled" ? "destructive" : "default"}
            disabled={requiresNotes && !notes.trim()}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
