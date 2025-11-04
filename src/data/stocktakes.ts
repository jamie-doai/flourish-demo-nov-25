import { StocktakeSession, StocktakeCount } from "@/types/stocktake";

export const mockStocktakeSessions: StocktakeSession[] = [
  {
    id: "stocktake-1",
    scope: "location",
    scopeDetails: "Greenhouse 1",
    asOf: "2025-01-25T00:00:00Z",
    createdBy: "manager-1",
    createdAt: "2025-01-25T08:00:00Z",
    completedAt: "2025-01-25T16:30:00Z",
    status: "completed",
    totalBatches: 45,
    countedBatches: 45,
    varianceCount: 3,
    notes: "Quarterly count - GH1"
  }
];

export const mockStocktakeCounts: StocktakeCount[] = [
  {
    id: "count-1",
    sessionId: "stocktake-1",
    locationId: "loc-1",
    batchId: "batch-1",
    batchCode: "MAN-2024-156",
    systemQuantity: 1000,
    countedQuantity: 985,
    variance: -15,
    variancePercent: -1.5,
    reason: "mortality",
    countedBy: "worker-1",
    countedAt: "2025-01-25T10:15:00Z"
  }
];

export function getStocktakeSessions(): StocktakeSession[] {
  return mockStocktakeSessions;
}

export function getStocktakeCounts(sessionId: string): StocktakeCount[] {
  return mockStocktakeCounts.filter(c => c.sessionId === sessionId);
}
