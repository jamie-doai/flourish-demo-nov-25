import { BulkAction, BulkActionItem } from "@/types/bulkAction";

export const mockBulkActions: BulkAction[] = [
  {
    id: "bulk-1",
    type: "location_move",
    createdBy: "manager-1",
    timestamp: "2025-01-20T14:30:00Z",
    status: "completed",
    totalItems: 25,
    successCount: 25,
    failureCount: 0,
    payload: {
      targetLocation: "GH-1-A",
      reason: "Reorganization"
    }
  },
  {
    id: "bulk-2",
    type: "status_change",
    createdBy: "manager-1",
    timestamp: "2025-01-22T09:15:00Z",
    status: "completed",
    totalItems: 12,
    successCount: 11,
    failureCount: 1,
    payload: {
      newStatus: "ready",
      previousStatus: "germinating"
    }
  }
];

export const mockBulkActionItems: BulkActionItem[] = [
  {
    id: "item-1",
    bulkActionId: "bulk-1",
    batchId: "batch-1",
    beforePayload: { location: "GH-2-B" },
    afterPayload: { location: "GH-1-A" },
    status: "success",
    timestamp: "2025-01-20T14:30:05Z"
  }
];

export function getBulkActions(): BulkAction[] {
  return mockBulkActions;
}

export function getBulkActionItems(bulkActionId: string): BulkActionItem[] {
  return mockBulkActionItems.filter(i => i.bulkActionId === bulkActionId);
}
