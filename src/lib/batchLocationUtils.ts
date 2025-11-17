import {
  BatchLocation,
  batchLocations,
  getCurrentBatchLocations,
  getBatchLocationHistory,
  getPrimaryBatchLocation,
  getTotalBatchQuantity
} from '@/data/batchLocations';
import { 
  getLocationById, 
  getLocationHierarchyString,
  hasCapacity,
  validateBatchPlacement 
} from './locationUtils';

// ==================== BATCH LOCATION RETRIEVAL ====================

/**
 * Get all current locations for a batch (active only)
 */
export function getBatchCurrentLocations(batchId: string): BatchLocation[] {
  return getCurrentBatchLocations(batchId);
}

/**
 * Get all historical locations for a batch
 */
export function getBatchHistoricalLocations(batchId: string): BatchLocation[] {
  return getBatchLocationHistory(batchId);
}

/**
 * Get primary location for a batch
 */
export function getBatchPrimaryLocation(batchId: string): BatchLocation | undefined {
  return getPrimaryBatchLocation(batchId);
}

/**
 * Get all locations (current + historical) for a batch
 */
export function getAllBatchLocations(batchId: string): BatchLocation[] {
  return batchLocations.filter(bl => bl.batchId === batchId);
}

/**
 * Get total quantity of batch across all locations
 */
export function getBatchTotalQuantity(batchId: string): number {
  return getTotalBatchQuantity(batchId);
}

/**
 * Get quantity at specific location
 */
export function getBatchQuantityAtLocation(batchId: string, locationId: string): number {
  const location = batchLocations.find(
    bl => bl.batchId === batchId && bl.locationId === locationId && !bl.endDate
  );
  return location?.quantity || 0;
}

/**
 * Check if batch is at specific location
 */
export function isBatchAtLocation(batchId: string, locationId: string): boolean {
  return getBatchQuantityAtLocation(batchId, locationId) > 0;
}

/**
 * Check if batch is split across multiple locations
 */
export function isBatchSplit(batchId: string): boolean {
  const currentLocations = getCurrentBatchLocations(batchId);
  return currentLocations.length > 1;
}

/**
 * Get split locations count
 */
export function getBatchSplitCount(batchId: string): number {
  return getCurrentBatchLocations(batchId).length;
}

// ==================== BATCH LOCATION DISPLAY ====================

/**
 * Get formatted location summary for a batch
 */
export function getBatchLocationSummary(batchId: string): {
  locations: Array<{
    locationId: string;
    locationName: string;
    locationPath: string;
    quantity: number;
    isPrimary: boolean;
  }>;
  totalQuantity: number;
  isSplit: boolean;
} {
  const currentLocations = getCurrentBatchLocations(batchId);
  const totalQuantity = getBatchTotalQuantity(batchId);
  
  const locations = currentLocations.map(bl => {
    const location = getLocationById(bl.locationId);
    return {
      locationId: bl.locationId,
      locationName: location?.name || 'Unknown',
      locationPath: getLocationHierarchyString(bl.locationId),
      quantity: bl.quantity,
      isPrimary: bl.isPrimary
    };
  });
  
  return {
    locations,
    totalQuantity,
    isSplit: locations.length > 1
  };
}

/**
 * Get primary location path string
 */
export function getBatchPrimaryLocationPath(batchId: string): string {
  const primary = getPrimaryBatchLocation(batchId);
  if (!primary) return 'No location assigned';
  
  return getLocationHierarchyString(primary.locationId);
}

/**
 * Get batch movement timeline
 */
export function getBatchMovementTimeline(batchId: string): Array<{
  locationId: string;
  locationPath: string;
  quantity: number;
  startDate: string;
  endDate?: string;
  duration?: number;
  movedBy?: string;
  notes?: string;
  isCurrent: boolean;
}> {
  const allLocations = getAllBatchLocations(batchId);
  
  return allLocations
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .map(bl => {
      const duration = bl.endDate 
        ? Math.floor((new Date(bl.endDate).getTime() - new Date(bl.startDate).getTime()) / (1000 * 60 * 60 * 24))
        : undefined;
      
      return {
        locationId: bl.locationId,
        locationPath: getLocationHierarchyString(bl.locationId),
        quantity: bl.quantity,
        startDate: bl.startDate,
        endDate: bl.endDate,
        duration,
        movedBy: bl.movedBy,
        notes: bl.notes,
        isCurrent: !bl.endDate
      };
    });
}

// ==================== BATCH MOVEMENT VALIDATION ====================

/**
 * Validate moving batch between locations
 */
export function validateBatchMove(
  batchId: string,
  fromLocationId: string,
  toLocationId: string,
  quantity: number
): {
  valid: boolean;
  reason?: string;
  warnings?: string[];
} {
  const warnings: string[] = [];
  
  // Check if source and destination are the same
  if (fromLocationId === toLocationId) {
    return { valid: false, reason: 'Source and destination cannot be the same' };
  }
  
  // Check if batch exists at source location
  const sourceQuantity = getBatchQuantityAtLocation(batchId, fromLocationId);
  if (sourceQuantity === 0) {
    return { valid: false, reason: 'Batch not found at source location' };
  }
  
  // Check if quantity is valid
  if (quantity <= 0) {
    return { valid: false, reason: 'Quantity must be greater than 0' };
  }
  
  if (quantity > sourceQuantity) {
    return { 
      valid: false, 
      reason: `Insufficient quantity at source. Available: ${sourceQuantity}, Requested: ${quantity}` 
    };
  }
  
  // Check destination capacity
  const capacityCheck = validateBatchPlacement(toLocationId, quantity, { checkActive: true });
  if (!capacityCheck.valid) {
    return capacityCheck;
  }
  
  if (capacityCheck.warnings) {
    warnings.push(...capacityCheck.warnings);
  }
  
  // Check if batch already at destination
  if (isBatchAtLocation(batchId, toLocationId)) {
    warnings.push('Batch already exists at destination - quantities will be merged');
  }
  
  return {
    valid: true,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

/**
 * Validate splitting batch to new location
 */
export function validateBatchSplit(
  batchId: string,
  sourceLocationId: string,
  targetLocationId: string,
  splitQuantity: number
): {
  valid: boolean;
  reason?: string;
  warnings?: string[];
} {
  // Same validation as move, but ensure some quantity remains at source
  const result = validateBatchMove(batchId, sourceLocationId, targetLocationId, splitQuantity);
  
  if (!result.valid) return result;
  
  const sourceQuantity = getBatchQuantityAtLocation(batchId, sourceLocationId);
  const remainingQuantity = sourceQuantity - splitQuantity;
  
  if (remainingQuantity <= 0) {
    return {
      valid: false,
      reason: 'Split would empty source location. Use move instead.'
    };
  }
  
  if (remainingQuantity < 5) {
    const warnings = result.warnings || [];
    warnings.push('Very few plants will remain at source location');
    return { ...result, warnings };
  }
  
  return result;
}

/**
 * Validate removing batch from location
 */
export function validateBatchRemoval(
  batchId: string,
  locationId: string,
  reason?: 'move' | 'loss' | 'sale' | 'other'
): {
  valid: boolean;
  reason?: string;
  warnings?: string[];
} {
  const warnings: string[] = [];
  
  // Check if batch exists at location
  const quantity = getBatchQuantityAtLocation(batchId, locationId);
  if (quantity === 0) {
    return { valid: false, reason: 'Batch not found at location' };
  }
  
  // Check if this is the only location
  const currentLocations = getCurrentBatchLocations(batchId);
  if (currentLocations.length === 1 && !reason) {
    warnings.push('This is the only location for this batch. Removal will leave batch without location.');
  }
  
  return {
    valid: true,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

// ==================== BATCH MOVEMENT OPERATIONS (Simulated) ====================

/**
 * Simulate moving batch between locations
 * Returns new batch location records that would be created
 */
export function simulateMoveBatch(
  batchId: string,
  fromLocationId: string,
  toLocationId: string,
  quantity: number,
  movedBy: string,
  notes?: string
): {
  success: boolean;
  updatedSourceLocation?: Partial<BatchLocation>;
  newTargetLocation?: Partial<BatchLocation>;
  mergedTargetLocation?: Partial<BatchLocation>;
  error?: string;
} {
  const validation = validateBatchMove(batchId, fromLocationId, toLocationId, quantity);
  
  if (!validation.valid) {
    return { success: false, error: validation.reason };
  }
  
  const sourceQuantity = getBatchQuantityAtLocation(batchId, fromLocationId);
  const targetQuantity = getBatchQuantityAtLocation(batchId, toLocationId);
  const now = new Date().toISOString();
  
  // If moving all from source
  if (quantity === sourceQuantity) {
    const updatedSourceLocation: Partial<BatchLocation> = {
      batchId,
      locationId: fromLocationId,
      quantity: 0,
      endDate: now,
      notes: notes ? `Moved to ${getLocationHierarchyString(toLocationId)}: ${notes}` : undefined
    };
    
    // If target already has batch, merge
    if (targetQuantity > 0) {
      return {
        success: true,
        updatedSourceLocation,
        mergedTargetLocation: {
          batchId,
          locationId: toLocationId,
          quantity: targetQuantity + quantity,
          notes: notes ? `Merged from ${getLocationHierarchyString(fromLocationId)}: ${notes}` : undefined
        }
      };
    } else {
      // Create new target location
      return {
        success: true,
        updatedSourceLocation,
        newTargetLocation: {
          batchId,
          locationId: toLocationId,
          quantity,
          isPrimary: false, // Keep existing primary
          startDate: now,
          movedBy,
          notes
        }
      };
    }
  } else {
    // Partial move (split)
    const updatedSourceLocation: Partial<BatchLocation> = {
      batchId,
      locationId: fromLocationId,
      quantity: sourceQuantity - quantity
    };
    
    if (targetQuantity > 0) {
      return {
        success: true,
        updatedSourceLocation,
        mergedTargetLocation: {
          batchId,
          locationId: toLocationId,
          quantity: targetQuantity + quantity,
          notes: notes ? `Received ${quantity} from ${getLocationHierarchyString(fromLocationId)}: ${notes}` : undefined
        }
      };
    } else {
      return {
        success: true,
        updatedSourceLocation,
        newTargetLocation: {
          batchId,
          locationId: toLocationId,
          quantity,
          isPrimary: false,
          startDate: now,
          movedBy,
          notes
        }
      };
    }
  }
}

/**
 * Simulate splitting batch to new location
 */
export function simulateSplitBatch(
  batchId: string,
  sourceLocationId: string,
  targetLocationId: string,
  splitQuantity: number,
  movedBy: string,
  notes?: string
): {
  success: boolean;
  updatedSourceLocation?: Partial<BatchLocation>;
  newTargetLocation?: Partial<BatchLocation>;
  error?: string;
} {
  const validation = validateBatchSplit(batchId, sourceLocationId, targetLocationId, splitQuantity);
  
  if (!validation.valid) {
    return { success: false, error: validation.reason };
  }
  
  const sourceQuantity = getBatchQuantityAtLocation(batchId, sourceLocationId);
  const now = new Date().toISOString();
  
  return {
    success: true,
    updatedSourceLocation: {
      batchId,
      locationId: sourceLocationId,
      quantity: sourceQuantity - splitQuantity
    },
    newTargetLocation: {
      batchId,
      locationId: targetLocationId,
      quantity: splitQuantity,
      isPrimary: false,
      startDate: now,
      movedBy,
      notes: notes || `Split from ${getLocationHierarchyString(sourceLocationId)}`
    }
  };
}

/**
 * Simulate consolidating batch from multiple locations to one
 */
export function simulateConsolidateBatch(
  batchId: string,
  targetLocationId: string,
  movedBy: string,
  notes?: string
): {
  success: boolean;
  closedLocations?: Array<{ locationId: string; quantity: number }>;
  targetLocation?: Partial<BatchLocation>;
  error?: string;
} {
  const currentLocations = getCurrentBatchLocations(batchId);
  
  if (currentLocations.length <= 1) {
    return { success: false, error: 'Batch is not split across multiple locations' };
  }
  
  const totalQuantity = getBatchTotalQuantity(batchId);
  
  // Check capacity at target
  const capacityCheck = validateBatchPlacement(targetLocationId, totalQuantity);
  if (!capacityCheck.valid) {
    return { success: false, error: capacityCheck.reason };
  }
  
  const now = new Date().toISOString();
  const closedLocations = currentLocations
    .filter(bl => bl.locationId !== targetLocationId)
    .map(bl => ({ locationId: bl.locationId, quantity: bl.quantity }));
  
  return {
    success: true,
    closedLocations,
    targetLocation: {
      batchId,
      locationId: targetLocationId,
      quantity: totalQuantity,
      isPrimary: true,
      startDate: now,
      movedBy,
      notes: notes || 'Consolidated from multiple locations'
    }
  };
}

/**
 * Calculate optimal split quantities based on capacity
 */
export function calculateOptimalSplit(
  batchId: string,
  targetLocationIds: string[]
): Array<{
  locationId: string;
  locationName: string;
  suggestedQuantity: number;
  availableCapacity: number;
}> {
  const totalQuantity = getBatchTotalQuantity(batchId);
  
  // Calculate available capacity at each location
  const locationCapacities = targetLocationIds.map(id => {
    const location = getLocationById(id);
    const available = location ? hasCapacity(id, 0) : false;
    
    return {
      locationId: id,
      locationName: location?.name || 'Unknown',
      availableCapacity: available ? (location?.maxCapacity || 0) - (location?.currentCapacity || 0) : 0
    };
  }).filter(loc => loc.availableCapacity > 0);
  
  if (locationCapacities.length === 0) {
    return [];
  }
  
  // Calculate total available capacity
  const totalCapacity = locationCapacities.reduce((sum, loc) => sum + loc.availableCapacity, 0);
  
  // Distribute proportionally
  return locationCapacities.map(loc => {
    const proportion = loc.availableCapacity / totalCapacity;
    const suggestedQuantity = Math.floor(totalQuantity * proportion);
    
    return {
      locationId: loc.locationId,
      locationName: loc.locationName,
      suggestedQuantity,
      availableCapacity: loc.availableCapacity
    };
  });
}

// ==================== BATCH STATISTICS ====================

/**
 * Get batch location statistics
 */
export function getBatchLocationStats(batchId: string): {
  totalQuantity: number;
  locationCount: number;
  primaryLocation: string | null;
  isSplit: boolean;
  moveCount: number;
  averageDaysPerLocation: number;
} {
  const allLocations = getAllBatchLocations(batchId);
  const currentLocations = getCurrentBatchLocations(batchId);
  const historicalLocations = getBatchHistoricalLocations(batchId);
  const primary = getPrimaryBatchLocation(batchId);
  
  // Calculate average days per location for completed moves
  let totalDays = 0;
  historicalLocations.forEach(bl => {
    if (bl.endDate) {
      const days = Math.floor(
        (new Date(bl.endDate).getTime() - new Date(bl.startDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      totalDays += days;
    }
  });
  
  const averageDaysPerLocation = historicalLocations.length > 0 
    ? Math.round(totalDays / historicalLocations.length)
    : 0;
  
  return {
    totalQuantity: getBatchTotalQuantity(batchId),
    locationCount: currentLocations.length,
    primaryLocation: primary ? getLocationHierarchyString(primary.locationId) : null,
    isSplit: currentLocations.length > 1,
    moveCount: historicalLocations.length,
    averageDaysPerLocation
  };
}

/**
 * Get time spent at current location
 */
export function getDaysAtCurrentLocation(batchId: string, locationId: string): number {
  const batchLocation = batchLocations.find(
    bl => bl.batchId === batchId && bl.locationId === locationId && !bl.endDate
  );
  
  if (!batchLocation) return 0;
  
  const days = Math.floor(
    (Date.now() - new Date(batchLocation.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  return days;
}
