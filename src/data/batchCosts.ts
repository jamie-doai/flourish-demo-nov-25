import { BatchCostTemplate, CostHistory, BatchCostSummary, CostCategory, BatchStage } from '@/types/cost';

export const batchCostTemplates: BatchCostTemplate[] = [
  // MAN-2024-156 - Mānuka
  {
    id: "BCT-001",
    batchId: "MAN-2024-156",
    costCatalogItemId: "CC-001",
    costName: "Native Seed Mix",
    category: "seed",
    unit: "per 100g",
    appliesAtStage: ["seed"],
    isActive: true,
    createdAt: "2024-08-15T08:00:00Z",
    createdBy: "ADMIN"
  },
  {
    id: "BCT-002",
    batchId: "MAN-2024-156",
    costCatalogItemId: "CC-002",
    costName: "Propagation Tray",
    category: "tray",
    unit: "per tray",
    appliesAtStage: ["seed"],
    isActive: true,
    createdAt: "2024-08-15T08:00:00Z",
    createdBy: "ADMIN"
  },
  {
    id: "BCT-003",
    batchId: "MAN-2024-156",
    costCatalogItemId: "CC-004",
    costName: "PB3 Pot",
    category: "pot",
    unit: "per pot",
    appliesAtStage: ["potting"],
    isActive: true,
    createdAt: "2024-08-15T08:00:00Z",
    createdBy: "ADMIN"
  },
  {
    id: "BCT-004",
    batchId: "MAN-2024-156",
    costCatalogItemId: "CC-007",
    costName: "Potting Mix Premium",
    category: "soil",
    unit: "per litre",
    appliesAtStage: ["potting"],
    isActive: true,
    createdAt: "2024-08-15T08:00:00Z",
    createdBy: "ADMIN"
  },
  {
    id: "BCT-005",
    batchId: "MAN-2024-156",
    costCatalogItemId: "CC-009",
    costName: "Potting Labour",
    category: "labour",
    unit: "per hour",
    appliesAtStage: ["potting"],
    isActive: true,
    createdAt: "2024-08-15T08:00:00Z",
    createdBy: "ADMIN"
  },
  {
    id: "BCT-006",
    batchId: "MAN-2024-156",
    costCatalogItemId: "CC-015",
    costName: "Overhead Allocation",
    category: "overhead",
    unit: "per plant",
    appliesAtStage: ["seed"],
    isActive: true,
    createdAt: "2024-08-15T08:00:00Z",
    createdBy: "ADMIN"
  },
  
  // RIM-2024-067 - Rimu
  {
    id: "BCT-201",
    batchId: "RIM-2024-067",
    costCatalogItemId: "CC-001",
    costName: "Native Seed Mix",
    category: "seed",
    unit: "per 100g",
    appliesAtStage: ["seed"],
    isActive: true,
    createdAt: "2024-09-10T14:00:00Z",
    createdBy: "ADMIN"
  },
  {
    id: "BCT-202",
    batchId: "RIM-2024-067",
    costCatalogItemId: "CC-002",
    costName: "Propagation Tray",
    category: "tray",
    unit: "per tray",
    appliesAtStage: ["seed"],
    isActive: true,
    createdAt: "2024-09-10T14:00:00Z",
    createdBy: "ADMIN"
  },
  {
    id: "BCT-203",
    batchId: "RIM-2024-067",
    costCatalogItemId: "CC-003",
    costName: "Seed Raising Mix",
    category: "soil",
    unit: "per litre",
    appliesAtStage: ["seed"],
    isActive: true,
    createdAt: "2024-09-10T14:00:00Z",
    createdBy: "ADMIN"
  },
  {
    id: "BCT-204",
    batchId: "RIM-2024-067",
    costCatalogItemId: "CC-007",
    costName: "Propagation Labour",
    category: "labour",
    unit: "per hour",
    appliesAtStage: ["seed"],
    isActive: true,
    createdAt: "2024-09-10T14:00:00Z",
    createdBy: "ADMIN"
  },
  {
    id: "BCT-205",
    batchId: "RIM-2024-067",
    costCatalogItemId: "CC-011",
    costName: "Overhead Allocation",
    category: "overhead",
    unit: "per plant",
    appliesAtStage: ["seed", "propagation", "potting", "hardening"],
    isActive: true,
    createdAt: "2024-09-10T14:00:00Z",
    createdBy: "ADMIN"
  },
];

export const costHistory: CostHistory[] = [
  {
    id: "CH-001",
    batchId: "MAN-2024-156",
    costTemplateId: "BCT-001",
    costName: "Native Seed Mix",
    category: "seed",
    stage: "seed",
    amount: 15.00,
    quantity: 120,
    perUnitCost: 0.125,
    appliedAt: "2024-08-15T08:30:00Z",
    appliedBy: "SYSTEM",
    actionType: "stage_change"
  },
  {
    id: "CH-002",
    batchId: "MAN-2024-156",
    costTemplateId: "BCT-002",
    costName: "Propagation Tray",
    category: "tray",
    stage: "seed",
    amount: 8.50,
    quantity: 120,
    perUnitCost: 0.071,
    appliedAt: "2024-08-15T08:30:00Z",
    appliedBy: "SYSTEM",
    actionType: "stage_change"
  },
  {
    id: "CH-003",
    batchId: "MAN-2024-156",
    costTemplateId: "BCT-006",
    costName: "Overhead Allocation",
    category: "overhead",
    stage: "seed",
    amount: 30.00,
    quantity: 120,
    perUnitCost: 0.25,
    appliedAt: "2024-08-15T08:30:00Z",
    appliedBy: "SYSTEM",
    actionType: "stage_change"
  },
  {
    id: "CH-004",
    batchId: "MAN-2024-156",
    costTemplateId: "BCT-003",
    costName: "PB3 Pot",
    category: "pot",
    stage: "potting",
    amount: 26.40,
    quantity: 120,
    perUnitCost: 0.22,
    appliedAt: "2024-09-20T10:15:00Z",
    appliedBy: "SYSTEM",
    actionType: "stage_change"
  },
  {
    id: "CH-005",
    batchId: "MAN-2024-156",
    costTemplateId: "BCT-004",
    costName: "Potting Mix Premium",
    category: "soil",
    stage: "potting",
    amount: 78.00,
    quantity: 120,
    perUnitCost: 0.65,
    appliedAt: "2024-09-20T10:15:00Z",
    appliedBy: "SYSTEM",
    actionType: "stage_change"
  },
  {
    id: "CH-006",
    batchId: "MAN-2024-156",
    costTemplateId: "BCT-005",
    costName: "Potting Labour",
    category: "labour",
    stage: "potting",
    amount: 85.50,
    quantity: 120,
    perUnitCost: 0.713,
    appliedAt: "2024-09-20T10:15:00Z",
    appliedBy: "SYSTEM",
    actionType: "stage_change",
    metadata: { hours: 3 }
  },
  
  // RIM-2024-067 cost history
  {
    id: "CH-301",
    batchId: "RIM-2024-067",
    costTemplateId: "BCT-201",
    costName: "Native Seed Mix",
    category: "seed",
    stage: "seed",
    amount: 37.50,
    quantity: 300,
    perUnitCost: 0.125,
    appliedAt: "2024-09-10T14:30:00Z",
    appliedBy: "SYSTEM",
    actionType: "stage_change"
  },
  {
    id: "CH-302",
    batchId: "RIM-2024-067",
    costTemplateId: "BCT-202",
    costName: "Propagation Tray",
    category: "tray",
    stage: "seed",
    amount: 25.50,
    quantity: 300,
    perUnitCost: 0.085,
    appliedAt: "2024-09-10T14:30:00Z",
    appliedBy: "SYSTEM",
    actionType: "stage_change"
  },
  {
    id: "CH-303",
    batchId: "RIM-2024-067",
    costTemplateId: "BCT-203",
    costName: "Seed Raising Mix",
    category: "soil",
    stage: "seed",
    amount: 27.00,
    quantity: 300,
    perUnitCost: 0.09,
    appliedAt: "2024-09-10T14:30:00Z",
    appliedBy: "SYSTEM",
    actionType: "stage_change"
  },
  {
    id: "CH-304",
    batchId: "RIM-2024-067",
    costTemplateId: "BCT-204",
    costName: "Propagation Labour",
    category: "labour",
    stage: "seed",
    amount: 24.50,
    quantity: 300,
    perUnitCost: 0.082,
    appliedAt: "2024-09-10T14:30:00Z",
    appliedBy: "SYSTEM",
    actionType: "stage_change"
  },
  {
    id: "CH-305",
    batchId: "RIM-2024-067",
    costTemplateId: "BCT-205",
    costName: "Overhead Allocation",
    category: "overhead",
    stage: "seed",
    amount: 75.00,
    quantity: 300,
    perUnitCost: 0.25,
    appliedAt: "2024-09-10T14:30:00Z",
    appliedBy: "SYSTEM",
    actionType: "stage_change"
  },
];

export const getBatchCostTemplates = (batchId: string): BatchCostTemplate[] => {
  return batchCostTemplates.filter(t => t.batchId === batchId && t.isActive);
};

export const getCostHistoryByBatch = (batchId: string): CostHistory[] => {
  return costHistory.filter(h => h.batchId === batchId).sort((a, b) => 
    new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
  );
};

export const getBatchCostSummary = (batchId: string): BatchCostSummary | null => {
  const history = getCostHistoryByBatch(batchId);
  if (history.length === 0) return null;
  
  const totalCost = history.reduce((sum, h) => sum + h.amount, 0);
  const latestEntry = history[0];
  const currentQuantity = latestEntry.quantity;
  const originalQuantity = history[history.length - 1].quantity;
  
  const costByCategory: Partial<Record<CostCategory, number>> = {};
  const costByStage: Partial<Record<BatchStage, number>> = {};
  
  history.forEach(h => {
    costByCategory[h.category] = (costByCategory[h.category] || 0) + h.amount;
    costByStage[h.stage] = (costByStage[h.stage] || 0) + h.amount;
  });
  
  return {
    batchId,
    totalCost,
    currentQuantity,
    originalQuantity,
    perUnitCost: totalCost / currentQuantity,
    lastUpdated: latestEntry.appliedAt,
    costByCategory: costByCategory as Record<CostCategory, number>,
    costByStage: costByStage as Record<BatchStage, number>,
  };
};

export const addCustomCost = (
  batchId: string,
  costName: string,
  category: CostCategory,
  amount: number,
  stage: BatchStage,
  quantity: number,
  appliedBy: string = 'USER',
  reason?: string
): CostHistory => {
  const newCost: CostHistory = {
    id: `CH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    batchId,
    costTemplateId: `CUSTOM-${Date.now()}`,
    costName,
    category,
    stage,
    amount,
    quantity,
    perUnitCost: amount / quantity,
    appliedAt: new Date().toISOString(),
    appliedBy,
    actionType: 'manual',
    reason,
  };
  
  costHistory.unshift(newCost); // Add to beginning (most recent first)
  return newCost;
};
