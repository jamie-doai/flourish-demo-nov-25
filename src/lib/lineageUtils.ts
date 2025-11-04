import { SplitResult, MergeResult } from "@/types/lineage";

export function generateBatchSuffix(parentCode: string, index: number): string {
  return `${parentCode}.${index}`;
}

export function calculateSplitQuantities(
  totalQuantity: number,
  splits: number[]
): number[] {
  const sum = splits.reduce((a, b) => a + b, 0);
  if (sum !== totalQuantity) {
    throw new Error("Split quantities must equal total quantity");
  }
  return splits;
}

export function calculateWeightedCOP(
  batches: Array<{ quantity: number; cop: number }>
): number {
  const totalQuantity = batches.reduce((sum, b) => sum + b.quantity, 0);
  const totalValue = batches.reduce((sum, b) => sum + b.quantity * b.cop, 0);
  return totalValue / totalQuantity;
}

export function validateSplitCompatibility(
  parentQuantity: number,
  childQuantities: number[]
): { valid: boolean; error?: string } {
  const total = childQuantities.reduce((a, b) => a + b, 0);
  
  if (total > parentQuantity) {
    return { valid: false, error: "Split quantities exceed parent quantity" };
  }
  
  if (childQuantities.some(q => q <= 0)) {
    return { valid: false, error: "All split quantities must be positive" };
  }
  
  return { valid: true };
}

export function validateMergeCompatibility(
  batches: Array<{ species: string; potSize?: string; stage: string }>
): { compatible: boolean; reason?: string } {
  if (batches.length < 2) {
    return { compatible: false, reason: "Need at least 2 batches to merge" };
  }
  
  const firstBatch = batches[0];
  const incompatible = batches.find(
    b => b.species !== firstBatch.species || 
         b.potSize !== firstBatch.potSize || 
         b.stage !== firstBatch.stage
  );
  
  if (incompatible) {
    return { 
      compatible: false, 
      reason: "Batches must have same species, pot size, and stage" 
    };
  }
  
  return { compatible: true };
}
