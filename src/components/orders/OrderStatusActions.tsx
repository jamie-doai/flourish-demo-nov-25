import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order } from "@/data/orders";
import { OrderStatus, getNextStatus } from "@/lib/orderLifecycle";
import { OrderStageDialog } from "./OrderStageDialog";
import { 
  CheckCircle2, 
  Play, 
  Package, 
  Truck, 
  Download, 
  Receipt, 
  XCircle,
  MoreVertical
} from "lucide-react";

interface OrderStatusActionsProps {
  order: Order;
  onStatusChange: (newStatus: OrderStatus, notes?: string) => void;
  onDownloadPackingSlip?: () => void;
  onGenerateInvoice?: () => void;
}

export function OrderStatusActions({
  order,
  onStatusChange,
  onDownloadPackingSlip,
  onGenerateInvoice,
}: OrderStatusActionsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);

  const nextStatus = getNextStatus(order.status);

  const handleStatusClick = (status: OrderStatus) => {
    setPendingStatus(status);
    setDialogOpen(true);
  };

  const handleConfirmStatusChange = (notes?: string) => {
    if (pendingStatus) {
      onStatusChange(pendingStatus, notes);
    }
  };

  const getNextActionButton = () => {
    if (!nextStatus) return null;

    const buttonConfig = {
      approved: {
        label: "Approve Order",
        icon: CheckCircle2,
        variant: "default" as const,
      },
      in_progress: {
        label: "Start Order",
        icon: Play,
        variant: "default" as const,
      },
      ready_to_dispatch: {
        label: "Mark Ready",
        icon: Package,
        variant: "default" as const,
      },
      dispatched: {
        label: "Mark Dispatched",
        icon: Truck,
        variant: "default" as const,
      },
      completed: {
        label: "Mark Complete",
        icon: CheckCircle2,
        variant: "default" as const,
      },
    };

    const config = buttonConfig[nextStatus as keyof typeof buttonConfig];
    if (!config) return null;

    const Icon = config.icon;

    return (
      <Button
        onClick={() => handleStatusClick(nextStatus)}
        variant={config.variant}
      >
        <Icon className="w-3 h-3 mr-2" />
        {config.label}
      </Button>
    );
  };

  const showCancelOption = order.status !== "completed" && order.status !== "cancelled";
  const showPackingSlip = onDownloadPackingSlip && 
    (order.status === "in_progress" || 
     order.status === "ready_to_dispatch" || 
     order.status === "dispatched");
  const showInvoiceOption = onGenerateInvoice && 
    (order.status === "dispatched" || order.status === "completed");
  
  const hasSecondaryActions = showCancelOption || showPackingSlip || showInvoiceOption;

  return (
    <div className="flex items-center gap-2">
      {/* Primary next action button - always visible when available */}
      {getNextActionButton()}

      {/* Secondary actions in dropdown */}
      {hasSecondaryActions && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
...
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Confirmation Dialog */}
      {pendingStatus && (
        <OrderStageDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          currentStatus={order.status}
          nextStatus={pendingStatus}
          onConfirm={handleConfirmStatusChange}
          orderNumber={order.orderNumber}
        />
      )}
    </div>
  );
}
