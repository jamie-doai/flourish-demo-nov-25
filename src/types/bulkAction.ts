export type BulkActionType = 
  | 'status_change'
  | 'location_move'
  | 'quantity_adjust'
  | 'task_add'
  | 'hold_apply'
  | 'hold_remove'
  | 'label_print'
  | 'stocktake_posting';

export type BulkActionStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'partial';

export interface BulkAction {
  id: string;
  type: BulkActionType;
  createdBy: string;
  timestamp: string;
  status: BulkActionStatus;
  totalItems: number;
  successCount: number;
  failureCount: number;
  payload: Record<string, any>;
  notes?: string;
}

export interface BulkActionItem {
  id: string;
  bulkActionId: string;
  batchId: string;
  beforePayload: Record<string, any>;
  afterPayload: Record<string, any>;
  status: 'success' | 'failed' | 'skipped';
  errorMessage?: string;
  timestamp: string;
}

export interface BulkActionPreview {
  affectedBatches: number;
  totalPlants: number;
  conflicts: BulkConflict[];
  copImpact?: {
    affected: number;
    averageChange: number;
  };
}

export interface BulkConflict {
  batchId: string;
  batchCode: string;
  reason: string;
  severity: 'warning' | 'error';
}
