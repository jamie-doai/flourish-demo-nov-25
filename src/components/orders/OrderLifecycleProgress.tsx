import { Order } from "@/data/orders";
import { ORDER_STAGES, getStageIndex } from "@/lib/orderLifecycle";
import { CheckCircle2, Circle } from "lucide-react";
import { format } from "date-fns";

interface OrderLifecycleProgressProps {
  order: Order;
}

export function OrderLifecycleProgress({ order }: OrderLifecycleProgressProps) {
  const currentStageIndex = getStageIndex(order.status);
  
  const getStageTimestamp = (status: string): { date?: string; by?: string } => {
    switch (status) {
      case "pending":
        return { date: order.dateCreated };
      case "approved":
        return { date: order.approvedDate, by: order.approvedBy };
      case "in_progress":
        return { date: order.startedDate, by: order.startedBy };
      case "ready_to_dispatch":
        return { date: order.readyForDispatchDate, by: order.readyForDispatchBy };
      case "dispatched":
        return { date: order.dispatchedDate, by: order.dispatchedBy };
      case "completed":
        return { date: order.completedDate, by: order.completedBy };
      default:
        return {};
    }
  };

  return (
    <div className="mb-6 p-4 bg-muted/30 rounded-lg border">
      <div className="flex items-center justify-between">
        {ORDER_STAGES.map((stage, index) => {
          const isCompleted = index <= currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const timestamp = getStageTimestamp(stage.status);
          const showLine = index < ORDER_STAGES.length - 1;

          return (
            <div key={stage.status} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-background border-muted-foreground/30 text-muted-foreground"
                  } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <Circle className="w-3 h-3" />
                  )}
                </div>
                <div className="mt-2 text-center min-w-[100px]">
                  <div
                    className={`text-sm font-medium ${
                      isCompleted ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {stage.label}
                  </div>
                  {timestamp.date && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {format(new Date(timestamp.date), "MMM d")}
                    </div>
                  )}
                  {timestamp.by && (
                    <div className="text-xs text-muted-foreground">
                      {timestamp.by}
                    </div>
                  )}
                </div>
              </div>
              {showLine && (
                <div className="flex-1 h-0.5 mx-2 mb-12">
                  <div
                    className={`h-full transition-all ${
                      isCompleted && index < currentStageIndex
                        ? "bg-primary"
                        : "bg-muted-foreground/20"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
