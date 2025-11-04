export type CostCategory = 
  | 'seed' 
  | 'soil' 
  | 'pot' 
  | 'tray' 
  | 'labour' 
  | 'spray' 
  | 'maintenance' 
  | 'freight' 
  | 'overhead';

export type BatchStage = 
  | 'seed' 
  | 'propagation' 
  | 'potting' 
  | 'hardening' 
  | 'ready' 
  | 'sold';

export type ActionType = 
  | 'stage_change' 
  | 'task_completion' 
  | 'manual' 
  | 'mortality_adjustment';

export interface CostCatalogItem {
  id: string;
  name: string;
  category: CostCategory;
  unit: string;
  defaultValue: number;
  effectiveFrom: string;
  effectiveTo?: string;
  notes?: string;
  supplierReference?: string;
}

export interface BatchCostTemplate {
  id: string;
  batchId: string;
  costCatalogItemId: string;
  costName: string;
  category: CostCategory;
  unit: string;
  valueOverride?: number;
  appliesAtStage: BatchStage[];
  isActive: boolean;
  createdAt: string;
  createdBy: string;
}

export interface CostHistory {
  id: string;
  batchId: string;
  costTemplateId: string;
  costName: string;
  category: CostCategory;
  stage: BatchStage;
  amount: number;
  quantity: number;
  perUnitCost: number;
  appliedAt: string;
  appliedBy: string;
  actionType: ActionType;
  reason?: string;
  metadata?: Record<string, any>;
}

export interface BatchCostSummary {
  batchId: string;
  totalCost: number;
  currentQuantity: number;
  originalQuantity: number;
  perUnitCost: number;
  lastUpdated: string;
  costByCategory: Record<CostCategory, number>;
  costByStage: Record<BatchStage, number>;
}
