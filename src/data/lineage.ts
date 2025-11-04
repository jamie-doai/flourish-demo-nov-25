import { BatchLineage } from "@/types/lineage";

export const mockBatchLineage: BatchLineage[] = [
  {
    id: "lineage-1",
    batchId: "batch-1",
    relation: "split",
    quantity: 1000,
    timestamp: "2025-01-15T10:30:00Z",
    byUser: "manager-1",
    notes: "Split for different locations"
  },
  {
    id: "lineage-2",
    batchId: "batch-2",
    parentId: "batch-1",
    relation: "split",
    quantity: 700,
    timestamp: "2025-01-15T10:30:00Z",
    byUser: "manager-1"
  },
  {
    id: "lineage-3",
    batchId: "batch-3",
    parentId: "batch-1",
    relation: "split",
    quantity: 300,
    timestamp: "2025-01-15T10:30:00Z",
    byUser: "manager-1"
  }
];

export function getBatchLineage(batchId: string): BatchLineage[] {
  return mockBatchLineage.filter(
    l => l.batchId === batchId || l.parentId === batchId
  );
}

export function getLineageHistory(batchId: string): BatchLineage[] {
  const history: BatchLineage[] = [];
  const findAncestors = (id: string) => {
    const lineage = mockBatchLineage.filter(l => l.batchId === id);
    lineage.forEach(l => {
      history.push(l);
      if (l.parentId) findAncestors(l.parentId);
    });
  };
  findAncestors(batchId);
  return history;
}
