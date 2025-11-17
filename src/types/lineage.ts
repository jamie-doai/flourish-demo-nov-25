export type LineageRelation = 'split' | 'merge' | 'transfer' | 'duplicate';

export interface BatchLineage {
  id: string;
  batchId: string;
  parentId?: string;
  childIds?: string[];
  relation: LineageRelation;
  quantity: number;
  timestamp: string;
  byUser: string;
  notes?: string;
  metadata?: Record<string, any>;
}

export interface SplitResult {
  parentId: string;
  children: Array<{
    batchId: string;
    quantity: number;
    suffix: string;
  }>;
  totalQuantity: number;
  timestamp: string;
}

export interface MergeResult {
  newBatchId: string;
  sourceBatchIds: string[];
  totalQuantity: number;
  weightedCOP: number;
  timestamp: string;
}
