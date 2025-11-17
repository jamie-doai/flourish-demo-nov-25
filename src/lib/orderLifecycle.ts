export type OrderStatus = 
  | "pending" 
  | "approved" 
  | "in_progress" 
  | "ready_to_dispatch" 
  | "dispatched" 
  | "completed"
  | "cancelled";

export interface OrderStage {
  status: OrderStatus;
  label: string;
  description: string;
  icon: string;
}

export const ORDER_STAGES: OrderStage[] = [
  {
    status: "pending",
    label: "Pending",
    description: "Awaiting approval",
    icon: "clock"
  },
  {
    status: "approved",
    label: "Approved",
    description: "Order approved by manager",
    icon: "check-circle"
  },
  {
    status: "in_progress",
    label: "In Progress",
    description: "Order being prepared",
    icon: "package"
  },
  {
    status: "ready_to_dispatch",
    label: "Ready to Dispatch",
    description: "Packed and ready for delivery",
    icon: "box"
  },
  {
    status: "dispatched",
    label: "Dispatched",
    description: "Out for delivery",
    icon: "truck"
  },
  {
    status: "completed",
    label: "Completed",
    description: "Order completed",
    icon: "check"
  }
];

export const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-600";
    case "approved":
      return "bg-sky-100 text-sky-700 border-sky-500 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-600";
    case "in_progress":
      return "bg-blue-100 text-blue-700 border-blue-500 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-600";
    case "ready_to_dispatch":
      return "bg-purple-100 text-purple-700 border-purple-500 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-600";
    case "dispatched":
      return "bg-green-100 text-green-700 border-green-500 dark:bg-green-900/30 dark:text-green-300 dark:border-green-600";
    case "completed":
      return "bg-emerald-100 text-emerald-700 border-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-600";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-500 dark:bg-red-900/30 dark:text-red-300 dark:border-red-600";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getStatusLabel = (status: OrderStatus): string => {
  return ORDER_STAGES.find(s => s.status === status)?.label || status;
};

export const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
  const statusOrder: OrderStatus[] = ["pending", "approved", "in_progress", "ready_to_dispatch", "dispatched", "completed"];
  const currentIndex = statusOrder.indexOf(currentStatus);
  if (currentIndex === -1 || currentIndex === statusOrder.length - 1) return null;
  return statusOrder[currentIndex + 1];
};

export const canTransitionTo = (currentStatus: OrderStatus, nextStatus: OrderStatus): boolean => {
  if (nextStatus === "cancelled") return currentStatus !== "completed";
  
  const statusOrder: OrderStatus[] = ["pending", "approved", "in_progress", "ready_to_dispatch", "dispatched", "completed"];
  const currentIndex = statusOrder.indexOf(currentStatus);
  const nextIndex = statusOrder.indexOf(nextStatus);
  
  return nextIndex === currentIndex + 1;
};

export const getStageIndex = (status: OrderStatus): number => {
  return ORDER_STAGES.findIndex(s => s.status === status);
};

export const isStageCompleted = (status: OrderStatus, currentStatus: OrderStatus): boolean => {
  const statusIndex = getStageIndex(status);
  const currentIndex = getStageIndex(currentStatus);
  return statusIndex <= currentIndex;
};
