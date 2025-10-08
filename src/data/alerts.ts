export interface Alert {
  id: string;
  type: "warning" | "error" | "info";
  icon: "⚠" | "❗" | "🌱";
  message: string;
  linkedTo?: {
    type: "batch" | "location" | "task";
    id: string;
  };
}

export const alerts: Alert[] = [
  {
    id: "alert-1",
    type: "warning",
    icon: "⚠",
    message: "Bay 05 nearing capacity (95%)",
    linkedTo: { type: "location", id: "bay-05" }
  },
  {
    id: "alert-2",
    type: "error",
    icon: "❗",
    message: "Mānuka batch 2025-06-20 low germination rate",
    linkedTo: { type: "batch", id: "batch-manuka-001" }
  },
  {
    id: "alert-3",
    type: "info",
    icon: "🌱",
    message: "3 trays ready for hardening-off",
  },
];
