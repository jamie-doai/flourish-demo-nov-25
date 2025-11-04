import { CostCatalogItem } from '@/types/cost';

export const costCatalog: CostCatalogItem[] = [
  // Seed stage
  { 
    id: "CC-001", 
    name: "Native Seed Mix", 
    category: "seed", 
    unit: "per 100g", 
    defaultValue: 12.50, 
    effectiveFrom: "2025-01-01",
    notes: "Premium native seed mix for propagation"
  },
  { 
    id: "CC-002", 
    name: "Propagation Tray", 
    category: "tray", 
    unit: "per tray", 
    defaultValue: 0.85, 
    effectiveFrom: "2025-01-01",
    notes: "Standard 128-cell propagation tray"
  },
  { 
    id: "CC-003", 
    name: "Seed Raising Mix", 
    category: "soil", 
    unit: "per litre", 
    defaultValue: 0.45, 
    effectiveFrom: "2025-01-01",
    supplierReference: "SUP-SRM-2024"
  },
  
  // Potting stage
  { 
    id: "CC-004", 
    name: "PB3 Pot", 
    category: "pot", 
    unit: "per pot", 
    defaultValue: 0.22, 
    effectiveFrom: "2025-01-01",
    notes: "Standard PB3 planter bag"
  },
  { 
    id: "CC-005", 
    name: "PB5 Pot", 
    category: "pot", 
    unit: "per pot", 
    defaultValue: 0.35, 
    effectiveFrom: "2025-01-01",
    notes: "Large PB5 planter bag"
  },
  { 
    id: "CC-006", 
    name: "PB8 Pot", 
    category: "pot", 
    unit: "per pot", 
    defaultValue: 0.55, 
    effectiveFrom: "2025-01-01",
    notes: "Extra large PB8 planter bag"
  },
  { 
    id: "CC-007", 
    name: "Potting Mix Premium", 
    category: "soil", 
    unit: "per litre", 
    defaultValue: 0.65, 
    effectiveFrom: "2025-01-01",
    supplierReference: "SUP-PMP-2024"
  },
  
  // Labour
  { 
    id: "CC-008", 
    name: "Propagation Labour", 
    category: "labour", 
    unit: "per hour", 
    defaultValue: 28.50, 
    effectiveFrom: "2025-01-01",
    notes: "Skilled propagation work"
  },
  { 
    id: "CC-009", 
    name: "Potting Labour", 
    category: "labour", 
    unit: "per hour", 
    defaultValue: 28.50, 
    effectiveFrom: "2025-01-01",
    notes: "Potting and transplanting"
  },
  { 
    id: "CC-010", 
    name: "General Labour", 
    category: "labour", 
    unit: "per hour", 
    defaultValue: 25.00, 
    effectiveFrom: "2025-01-01",
    notes: "Maintenance and general work"
  },
  
  // Maintenance
  { 
    id: "CC-011", 
    name: "Fungicide Spray", 
    category: "spray", 
    unit: "per application", 
    defaultValue: 0.08, 
    effectiveFrom: "2025-01-01",
    notes: "Per plant application cost"
  },
  { 
    id: "CC-012", 
    name: "Insecticide Treatment", 
    category: "spray", 
    unit: "per application", 
    defaultValue: 0.12, 
    effectiveFrom: "2025-01-01"
  },
  { 
    id: "CC-013", 
    name: "Fertiliser Slow Release", 
    category: "maintenance", 
    unit: "per plant", 
    defaultValue: 0.15, 
    effectiveFrom: "2025-01-01",
    notes: "3-month slow release fertiliser"
  },
  { 
    id: "CC-014", 
    name: "Liquid Feed", 
    category: "maintenance", 
    unit: "per application", 
    defaultValue: 0.05, 
    effectiveFrom: "2025-01-01"
  },
  
  // Overhead
  { 
    id: "CC-015", 
    name: "Overhead Allocation", 
    category: "overhead", 
    unit: "per plant", 
    defaultValue: 0.25, 
    effectiveFrom: "2025-01-01",
    notes: "Covers utilities, facilities, administration"
  },
  { 
    id: "CC-016", 
    name: "Freight Regional", 
    category: "freight", 
    unit: "per delivery", 
    defaultValue: 120.00, 
    effectiveFrom: "2025-01-01",
    notes: "Standard regional delivery"
  },
  { 
    id: "CC-017", 
    name: "Freight Metro", 
    category: "freight", 
    unit: "per delivery", 
    defaultValue: 85.00, 
    effectiveFrom: "2025-01-01",
    notes: "Metropolitan area delivery"
  },
];

// Version history for cost changes
export const costCatalogHistory: CostCatalogItem[] = [
  { 
    id: "CC-004", 
    name: "PB3 Pot", 
    category: "pot", 
    unit: "per pot", 
    defaultValue: 0.20, 
    effectiveFrom: "2024-01-01", 
    effectiveTo: "2024-12-31", 
    notes: "Old supplier pricing - superseded"
  },
  { 
    id: "CC-008", 
    name: "Propagation Labour", 
    category: "labour", 
    unit: "per hour", 
    defaultValue: 26.50, 
    effectiveFrom: "2024-01-01", 
    effectiveTo: "2024-12-31", 
    notes: "Previous rate before 2025 increase"
  },
];

export const getCostCatalogItem = (id: string): CostCatalogItem | undefined => {
  return costCatalog.find(item => item.id === id);
};

export const getCostCatalogByCategory = (category: string): CostCatalogItem[] => {
  return costCatalog.filter(item => item.category === category);
};

export const getActiveCostCatalog = (): CostCatalogItem[] => {
  const now = new Date().toISOString();
  return costCatalog.filter(item => 
    item.effectiveFrom <= now && (!item.effectiveTo || item.effectiveTo >= now)
  );
};

export const getCostHistory = (id: string): CostCatalogItem[] => {
  return costCatalogHistory.filter(item => item.id === id);
};
