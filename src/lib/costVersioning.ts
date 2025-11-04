import { CostCatalogItem } from '@/types/cost';
import { batchCostTemplates } from '@/data/batchCosts';

export interface CostUpdateImpact {
  affectedBatchCount: number;
  affectedBatches: string[];
  estimatedDelta: number;
  currentValue: number;
  newValue: number;
}

export const analyzeCostUpdateImpact = (
  costItemId: string,
  newValue: number,
  currentCatalog: CostCatalogItem[]
): CostUpdateImpact => {
  const currentItem = currentCatalog.find(item => item.id === costItemId);
  if (!currentItem) {
    return {
      affectedBatchCount: 0,
      affectedBatches: [],
      estimatedDelta: 0,
      currentValue: 0,
      newValue,
    };
  }
  
  // Find all batches using this cost item
  const affectedTemplates = batchCostTemplates.filter(
    t => t.costCatalogItemId === costItemId && t.isActive
  );
  
  const affectedBatches = [...new Set(affectedTemplates.map(t => t.batchId))];
  const valueDelta = newValue - currentItem.defaultValue;
  const estimatedDelta = valueDelta * affectedTemplates.length;
  
  return {
    affectedBatchCount: affectedBatches.length,
    affectedBatches,
    estimatedDelta,
    currentValue: currentItem.defaultValue,
    newValue,
  };
};

export const createNewCostVersion = (
  currentItem: CostCatalogItem,
  newValue: number,
  effectiveFrom: string
): { updatedItem: CostCatalogItem; historicalItem: CostCatalogItem } => {
  // Close out the current version
  const historicalItem: CostCatalogItem = {
    ...currentItem,
    effectiveTo: new Date(new Date(effectiveFrom).getTime() - 86400000).toISOString().split('T')[0],
  };
  
  // Create new version
  const updatedItem: CostCatalogItem = {
    ...currentItem,
    defaultValue: newValue,
    effectiveFrom,
    effectiveTo: undefined,
  };
  
  return { updatedItem, historicalItem };
};

export const shouldWarnAboutRetroactiveChange = (
  costItemId: string,
  affectedBatchCount: number
): boolean => {
  return affectedBatchCount > 0;
};

export const formatCostDelta = (delta: number): string => {
  const sign = delta >= 0 ? '+' : '';
  return `${sign}$${delta.toFixed(2)}`;
};
