export type StocktakeScope = 'full' | 'location' | 'area';
export type StocktakeStatus = 'draft' | 'in_progress' | 'completed' | 'posted';
export type VarianceReason = 
  | 'mortality'
  | 'theft'
  | 'damaged'
  | 'count_error'
  | 'system_error'
  | 'other';

export interface StocktakeSession {
  id: string;
  scope: StocktakeScope;
  scopeDetails?: string;
  asOf: string;
  createdBy: string;
  createdAt: string;
  completedAt?: string;
  status: StocktakeStatus;
  totalBatches: number;
  countedBatches: number;
  varianceCount: number;
  notes?: string;
}

export interface StocktakeCount {
  id: string;
  sessionId: string;
  locationId: string;
  batchId: string;
  batchCode: string;
  systemQuantity: number;
  countedQuantity: number;
  variance: number;
  variancePercent: number;
  reason?: VarianceReason;
  notes?: string;
  countedBy: string;
  countedAt: string;
}

export interface StocktakeVarianceReport {
  sessionId: string;
  totalVariance: number;
  varianceByReason: Record<VarianceReason, number>;
  significantVariances: StocktakeCount[];
  thresholdPercent: number;
}
