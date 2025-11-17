import { 
  Location, 
  LocationType,
  locations, 
  getLocationById as getLocationByIdFromData,
  getChildLocations as getChildLocationsFromData,
  getLocationPath as getLocationPathFromData,
  getAllDescendants as getAllDescendantsFromData
} from '@/data/locations';
import { 
  getBatchLocationsByLocation,
  getTotalQuantityAtLocation 
} from '@/data/batchLocations';

// ==================== LOCATION RETRIEVAL ====================

/**
 * Get a location by its ID
 */
export function getLocationById(locationId: string): Location | undefined {
  return getLocationByIdFromData(locationId);
}

/**
 * Get direct children of a location
 */
export function getChildLocations(locationId: string, type?: LocationType): Location[] {
  const children = getChildLocationsFromData(locationId);
  return type ? children.filter(loc => loc.type === type) : children;
}

/**
 * Get all locations of a specific type
 */
export function getLocationsByType(type: LocationType): Location[] {
  return locations.filter(loc => loc.type === type);
}

/**
 * Get all building locations
 */
export function getBuildings(): Location[] {
  return getLocationsByType('BUILDING');
}

/**
 * Get all bays within a building
 */
export function getBaysByBuilding(buildingId: string): Location[] {
  return getChildLocations(buildingId, 'BAY');
}

/**
 * Get all tables within a bay
 */
export function getTablesByBay(bayId: string): Location[] {
  return getChildLocations(bayId, 'TABLE');
}

/**
 * Get all active locations (excluding deactivated ones)
 */
export function getActiveLocations(type?: LocationType): Location[] {
  const filtered = type ? getLocationsByType(type) : locations;
  return filtered.filter(loc => loc.isActive);
}

// ==================== HIERARCHY NAVIGATION ====================

/**
 * Get full location path as array from root to target
 * Example: [Building, Bay, Table]
 */
export function getLocationPath(locationId: string): Location[] {
  return getLocationPathFromData(locationId);
}

/**
 * Get full location path as formatted string
 * Example: "Propagation House 1 > Bay 2 > Table 1A"
 */
export function getLocationHierarchyString(locationId: string): string {
  const path = getLocationPath(locationId);
  return path.map(loc => loc.name).join(' > ');
}

/**
 * Get location path with codes
 * Example: "PH1 > B2 > T1A"
 */
export function getLocationCodePath(locationId: string): string {
  const path = getLocationPath(locationId);
  return path.map(loc => loc.code || loc.name).join(' > ');
}

/**
 * Get all descendant locations recursively
 */
export function getAllDescendants(locationId: string, type?: LocationType): Location[] {
  const descendants = getAllDescendantsFromData(locationId);
  return type ? descendants.filter(loc => loc.type === type) : descendants;
}

/**
 * Get parent location
 */
export function getParentLocation(locationId: string): Location | undefined {
  const location = getLocationById(locationId);
  return location?.parentLocationId 
    ? getLocationById(location.parentLocationId)
    : undefined;
}

/**
 * Get root location (top-most parent, usually building)
 */
export function getRootLocation(locationId: string): Location | undefined {
  const path = getLocationPath(locationId);
  return path.length > 0 ? path[0] : undefined;
}

/**
 * Get sibling locations (same parent)
 */
export function getSiblingLocations(locationId: string): Location[] {
  const location = getLocationById(locationId);
  if (!location?.parentLocationId) return [];
  
  return getChildLocations(location.parentLocationId)
    .filter(loc => loc.id !== locationId);
}

/**
 * Check if a location is an ancestor of another
 */
export function isAncestor(ancestorId: string, descendantId: string): boolean {
  const path = getLocationPath(descendantId);
  return path.some(loc => loc.id === ancestorId);
}

/**
 * Get depth level of location in hierarchy
 * 0 = building, 1 = bay, 2 = table
 */
export function getLocationDepth(locationId: string): number {
  const path = getLocationPath(locationId);
  return path.length - 1;
}

// ==================== CAPACITY CALCULATIONS ====================

/**
 * Get current capacity usage at a location
 */
export function getCurrentCapacity(locationId: string): number {
  return getTotalQuantityAtLocation(locationId);
}

/**
 * Get maximum capacity of a location
 */
export function getMaxCapacity(locationId: string): number {
  const location = getLocationById(locationId);
  return location?.maxCapacity || 0;
}

/**
 * Get available capacity at a location
 */
export function getAvailableCapacity(locationId: string): number {
  const max = getMaxCapacity(locationId);
  const current = getCurrentCapacity(locationId);
  return Math.max(0, max - current);
}

/**
 * Get capacity usage percentage
 */
export function getCapacityPercentage(locationId: string): number {
  const max = getMaxCapacity(locationId);
  if (max === 0) return 0;
  
  const current = getCurrentCapacity(locationId);
  return Math.round((current / max) * 100);
}

/**
 * Check if location has available capacity for quantity
 */
export function hasCapacity(locationId: string, requiredQuantity: number): boolean {
  const available = getAvailableCapacity(locationId);
  return available >= requiredQuantity;
}

/**
 * Get capacity status with warning levels
 */
export function getCapacityStatus(locationId: string): {
  current: number;
  max: number;
  available: number;
  percentage: number;
  status: 'available' | 'warning' | 'full' | 'over-capacity';
  color: string;
} {
  const current = getCurrentCapacity(locationId);
  const max = getMaxCapacity(locationId);
  const available = getAvailableCapacity(locationId);
  const percentage = getCapacityPercentage(locationId);
  
  let status: 'available' | 'warning' | 'full' | 'over-capacity';
  let color: string;
  
  if (percentage >= 100) {
    status = current > max ? 'over-capacity' : 'full';
    color = 'destructive';
  } else if (percentage >= 80) {
    status = 'warning';
    color = 'warning';
  } else {
    status = 'available';
    color = 'success';
  }
  
  return { current, max, available, percentage, status, color };
}

/**
 * Get aggregated capacity for location and all descendants
 */
export function getAggregatedCapacity(locationId: string): {
  totalMax: number;
  totalCurrent: number;
  totalAvailable: number;
  percentage: number;
} {
  const location = getLocationById(locationId);
  const descendants = getAllDescendants(locationId);
  const allLocations = [location, ...descendants].filter(Boolean) as Location[];
  
  const totalMax = allLocations.reduce((sum, loc) => sum + (loc.maxCapacity || 0), 0);
  const totalCurrent = allLocations.reduce((sum, loc) => sum + getCurrentCapacity(loc.id), 0);
  const totalAvailable = totalMax - totalCurrent;
  const percentage = totalMax > 0 ? Math.round((totalCurrent / totalMax) * 100) : 0;
  
  return { totalMax, totalCurrent, totalAvailable, percentage };
}

// ==================== BATCH TRACKING ====================

/**
 * Get all batches currently at a location
 */
export function getBatchesAtLocation(locationId: string, includeChildren = false): string[] {
  if (!includeChildren) {
    const batchLocations = getBatchLocationsByLocation(locationId);
    return [...new Set(batchLocations.map(bl => bl.batchId))];
  }
  
  // Include children
  const location = getLocationById(locationId);
  const descendants = getAllDescendants(locationId);
  const allLocations = [location, ...descendants].filter(Boolean) as Location[];
  
  const allBatchIds = new Set<string>();
  allLocations.forEach(loc => {
    const batchLocations = getBatchLocationsByLocation(loc.id);
    batchLocations.forEach(bl => allBatchIds.add(bl.batchId));
  });
  
  return Array.from(allBatchIds);
}

/**
 * Get count of batches at location
 */
export function getBatchCountAtLocation(locationId: string, includeChildren = false): number {
  return getBatchesAtLocation(locationId, includeChildren).length;
}

/**
 * Check if location has any batches
 */
export function hasActiveBatches(locationId: string): boolean {
  return getBatchCountAtLocation(locationId) > 0;
}

// ==================== VALIDATION ====================

/**
 * Validate if a batch can be placed at a location
 */
export function validateBatchPlacement(
  locationId: string,
  quantity: number,
  options?: {
    allowOverCapacity?: boolean;
    checkActive?: boolean;
  }
): {
  valid: boolean;
  reason?: string;
  warnings?: string[];
} {
  const warnings: string[] = [];
  const location = getLocationById(locationId);
  
  // Check if location exists
  if (!location) {
    return { valid: false, reason: 'Location not found' };
  }
  
  // Check if location is active
  if (options?.checkActive && !location.isActive) {
    return { valid: false, reason: 'Location is not active' };
  }
  
  // Check capacity
  const capacityStatus = getCapacityStatus(locationId);
  const availableAfterPlacement = capacityStatus.available - quantity;
  
  if (availableAfterPlacement < 0 && !options?.allowOverCapacity) {
    return { 
      valid: false, 
      reason: `Insufficient capacity. Available: ${capacityStatus.available}, Required: ${quantity}` 
    };
  }
  
  // Add warnings
  if (availableAfterPlacement < 0) {
    warnings.push('Placement will exceed location capacity');
  } else if (capacityStatus.percentage >= 70) {
    warnings.push('Location is nearing capacity');
  }
  
  return { 
    valid: true, 
    warnings: warnings.length > 0 ? warnings : undefined 
  };
}

/**
 * Validate location hierarchy (prevent circular references)
 */
export function validateLocationHierarchy(
  locationId: string,
  newParentId: string
): {
  valid: boolean;
  reason?: string;
} {
  // Cannot set parent to self
  if (locationId === newParentId) {
    return { valid: false, reason: 'Location cannot be its own parent' };
  }
  
  // Check if new parent would create circular reference
  const newParentPath = getLocationPath(newParentId);
  if (newParentPath.some(loc => loc.id === locationId)) {
    return { valid: false, reason: 'Would create circular reference in hierarchy' };
  }
  
  return { valid: true };
}

/**
 * Validate location type hierarchy (tables must be in bays, bays in buildings)
 */
export function validateLocationTypeHierarchy(
  locationType: LocationType,
  parentLocationId?: string
): {
  valid: boolean;
  reason?: string;
} {
  if (!parentLocationId && locationType !== 'BUILDING' && locationType !== 'OTHER') {
    return { valid: false, reason: `${locationType} must have a parent location` };
  }
  
  if (parentLocationId) {
    const parent = getLocationById(parentLocationId);
    if (!parent) {
      return { valid: false, reason: 'Parent location not found' };
    }
    
    // Validate parent-child type relationships
    if (locationType === 'BAY' && parent.type !== 'BUILDING') {
      return { valid: false, reason: 'Bays must be placed in buildings' };
    }
    
    if (locationType === 'TABLE' && parent.type !== 'BAY') {
      return { valid: false, reason: 'Tables must be placed in bays' };
    }
  }
  
  return { valid: true };
}

// ==================== SEARCH & FILTER ====================

/**
 * Search locations by name or code
 */
export function searchLocations(query: string, options?: {
  type?: LocationType;
  activeOnly?: boolean;
}): Location[] {
  const searchTerm = query.toLowerCase().trim();
  let results = locations;
  
  // Filter by type
  if (options?.type) {
    results = results.filter(loc => loc.type === options.type);
  }
  
  // Filter by active status
  if (options?.activeOnly) {
    results = results.filter(loc => loc.isActive);
  }
  
  // Search by name or code
  return results.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm) ||
    loc.code?.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get locations with low capacity
 */
export function getLocationsWithLowCapacity(threshold = 20): Location[] {
  return locations
    .filter(loc => loc.isActive && loc.maxCapacity && loc.maxCapacity > 0)
    .filter(loc => {
      const available = getAvailableCapacity(loc.id);
      const percentage = (available / (loc.maxCapacity || 1)) * 100;
      return percentage <= threshold;
    });
}

/**
 * Get locations near or over capacity
 */
export function getLocationsNearCapacity(threshold = 80): Location[] {
  return locations
    .filter(loc => loc.isActive && loc.maxCapacity && loc.maxCapacity > 0)
    .filter(loc => getCapacityPercentage(loc.id) >= threshold)
    .sort((a, b) => getCapacityPercentage(b.id) - getCapacityPercentage(a.id));
}

/**
 * Get empty locations
 */
export function getEmptyLocations(type?: LocationType): Location[] {
  let filtered = locations.filter(loc => loc.isActive);
  
  if (type) {
    filtered = filtered.filter(loc => loc.type === type);
  }
  
  return filtered.filter(loc => getCurrentCapacity(loc.id) === 0);
}

// ==================== FORMATTING ====================

/**
 * Format capacity display string
 */
export function formatCapacity(locationId: string): string {
  const current = getCurrentCapacity(locationId);
  const max = getMaxCapacity(locationId);
  const percentage = getCapacityPercentage(locationId);
  
  if (max === 0) return 'No capacity limit';
  
  return `${current}/${max} plants (${percentage}%)`;
}

/**
 * Get location icon based on type
 */
export function getLocationIcon(type: LocationType): string {
  const icons: Record<LocationType, string> = {
    BUILDING: '🏢',
    BAY: '📦',
    TABLE: '📋',
    OTHER: '📍'
  };
  return icons[type];
}

/**
 * Get location type label
 */
export function getLocationTypeLabel(type: LocationType): string {
  const labels: Record<LocationType, string> = {
    BUILDING: 'Building',
    BAY: 'Bay',
    TABLE: 'Table',
    OTHER: 'Other'
  };
  return labels[type];
}
