import { BatchStage, CostHistory, ActionType } from '@/types/cost';
import { getBatchCostTemplates } from '@/data/batchCosts';
import { getCostCatalogItem } from '@/data/costCatalog';

export const applyStageChangeCosts = (
  batchId: string,
  toStage: BatchStage,
  currentQuantity: number,
  userId: string
): CostHistory[] => {
  const templates = getBatchCostTemplates(batchId);
  const applicableCosts = templates.filter(t => 
    t.appliesAtStage.includes(toStage)
  );
  
  const history: CostHistory[] = [];
  
  applicableCosts.forEach(template => {
    const catalogItem = getCostCatalogItem(template.costCatalogItemId);
    if (!catalogItem) return;
    
    const value = template.valueOverride ?? catalogItem.defaultValue;
    let amount = 0;
    
    // Calculate amount based on unit type
    if (template.unit.includes('per plant') || template.unit.includes('per pot')) {
      amount = value * currentQuantity;
    } else if (template.unit.includes('per hour')) {
      // Estimate hours based on quantity (simplified)
      const estimatedHours = Math.ceil(currentQuantity / 40);
      amount = value * estimatedHours;
    } else {
      // Flat rate or other
      amount = value;
    }
    
    history.push({
      id: `CH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      batchId,
      costTemplateId: template.id,
      costName: template.costName,
      category: template.category,
      stage: toStage,
      amount,
      quantity: currentQuantity,
      perUnitCost: amount / currentQuantity,
      appliedAt: new Date().toISOString(),
      appliedBy: userId,
      actionType: 'stage_change',
    });
  });
  
  return history;
};

export const applyTaskCompletionCosts = (
  batchId: string,
  taskType: string,
  currentQuantity: number,
  userId: string,
  taskId: string
): CostHistory[] => {
  // Map task types to cost categories
  const taskCostMapping: Record<string, { catalogItemId: string; category: string }> = {
    'Spray': { catalogItemId: 'CC-011', category: 'spray' },
    'Fertilise': { catalogItemId: 'CC-013', category: 'maintenance' },
  };
  
  const mapping = taskCostMapping[taskType];
  if (!mapping) return [];
  
  const catalogItem = getCostCatalogItem(mapping.catalogItemId);
  if (!catalogItem) return [];
  
  const amount = catalogItem.defaultValue * currentQuantity;
  
  return [{
    id: `CH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    batchId,
    costTemplateId: `AUTO-${taskType}`,
    costName: catalogItem.name,
    category: catalogItem.category,
    stage: 'hardening', // Assume maintenance happens during hardening
    amount,
    quantity: currentQuantity,
    perUnitCost: amount / currentQuantity,
    appliedAt: new Date().toISOString(),
    appliedBy: userId,
    actionType: 'task_completion',
    metadata: { taskId },
  }];
};

export const applyMortalityAdjustment = (
  batchId: string,
  previousQuantity: number,
  newQuantity: number,
  reason: string,
  userId: string,
  currentTotalCost: number
): CostHistory => {
  // Cost stays the same, but per-unit cost increases
  return {
    id: `CH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    batchId,
    costTemplateId: 'ADJUSTMENT',
    costName: 'Mortality Adjustment',
    category: 'overhead',
    stage: 'hardening',
    amount: 0, // No new cost added
    quantity: newQuantity,
    perUnitCost: currentTotalCost / newQuantity,
    appliedAt: new Date().toISOString(),
    appliedBy: userId,
    actionType: 'mortality_adjustment',
    reason: `Quantity reduced from ${previousQuantity} to ${newQuantity}. ${reason}`,
  };
};

export const calculateCostSummary = (history: CostHistory[]) => {
  if (history.length === 0) {
    return {
      totalCost: 0,
      perUnitCost: 0,
      costByCategory: {},
      costByStage: {},
    };
  }
  
  const totalCost = history.reduce((sum, h) => sum + h.amount, 0);
  const latestEntry = history[0];
  const currentQuantity = latestEntry.quantity;
  
  const costByCategory: Record<string, number> = {};
  const costByStage: Record<string, number> = {};
  
  history.forEach(h => {
    costByCategory[h.category] = (costByCategory[h.category] || 0) + h.amount;
    costByStage[h.stage] = (costByStage[h.stage] || 0) + h.amount;
  });
  
  return {
    totalCost,
    perUnitCost: totalCost / currentQuantity,
    costByCategory,
    costByStage,
  };
};
