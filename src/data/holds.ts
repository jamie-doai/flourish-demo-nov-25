import { Hold } from "@/types/hold";

export const mockHolds: Hold[] = [
  {
    id: "hold-1",
    batchId: "batch-5",
    reason: "quality_issue",
    details: "Leaf discoloration - pending inspection",
    appliedBy: "manager-1",
    appliedAt: "2025-01-20T14:00:00Z",
    isActive: true
  },
  {
    id: "hold-2",
    batchId: "batch-8",
    orderId: "order-12",
    reason: "reserved",
    details: "Reserved for Order #ORD-2024-045",
    appliedBy: "sales-1",
    appliedAt: "2025-01-18T11:30:00Z",
    isActive: true
  }
];

export function getHolds(batchId?: string): Hold[] {
  if (batchId) {
    return mockHolds.filter(h => h.batchId === batchId && h.isActive);
  }
  return mockHolds.filter(h => h.isActive);
}

export function getBatchHold(batchId: string): Hold | undefined {
  return mockHolds.find(h => h.batchId === batchId && h.isActive);
}
