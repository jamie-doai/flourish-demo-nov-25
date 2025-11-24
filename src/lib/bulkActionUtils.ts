import { BulkActionPreview, BulkConflict } from "@/types/bulkAction";

export function generateBulkActionId(): string {
  return `bulk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function validateBulkLocationMove(
  batches: Array<{ id: string; code: string; currentLocation: string }>,
  targetLocation: string
): BulkConflict[] {
  const conflicts: BulkConflict[] = [];
  
  batches.forEach(batch => {
    if (batch.currentLocation === targetLocation) {
      conflicts.push({
        batchId: batch.id,
        batchCode: batch.code,
        reason: "Already at target location",
        severity: "warning"
      });
    }
  });
  
  return conflicts;
}

export function validateBulkStatusChange(
  batches: Array<{ id: string; code: string; currentStatus: string; onHold?: boolean }>,
  targetStatus: string
): BulkConflict[] {
  const conflicts: BulkConflict[] = [];
  
  batches.forEach(batch => {
    if (batch.currentStatus === targetStatus) {
      conflicts.push({
        batchId: batch.id,
        batchCode: batch.code,
        reason: "Already in target status",
        severity: "warning"
      });
    }
    
    if (batch.onHold) {
      conflicts.push({
        batchId: batch.id,
        batchCode: batch.code,
        reason: "Batch is on hold",
        severity: "error"
      });
    }
  });
  
  return conflicts;
}

export function generateBulkActionPreview(
  batches: Array<{ id: string; code: string; quantity: number }>,
  conflicts: BulkConflict[]
): BulkActionPreview {
  const totalPlants = batches.reduce((sum, b) => sum + b.quantity, 0);
  
  return {
    affectedBatches: batches.length,
    totalPlants,
    conflicts
  };
}
