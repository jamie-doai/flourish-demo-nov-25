export type HoldReason = 
  | 'quality_issue'
  | 'pest_disease'
  | 'reserved'
  | 'quarantine'
  | 'pending_inspection'
  | 'other';

export interface Hold {
  id: string;
  batchId: string;
  orderId?: string;
  reason: HoldReason;
  details?: string;
  appliedBy: string;
  appliedAt: string;
  releasedBy?: string;
  releasedAt?: string;
  isActive: boolean;
}
