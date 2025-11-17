export type LocationType = 'BUILDING' | 'BAY' | 'TABLE' | 'OTHER';

export interface Location {
  id: string;
  name: string;
  code?: string; // Short code for labels (e.g., "B1", "T3A")
  type: LocationType;
  parentLocationId?: string; // For hierarchy: table→bay→building
  
  // Environmental (mainly for BUILDING type)
  temperature?: string;
  humidity?: string;
  climateControl?: string; // "Climate Controlled", "Ambient", etc.
  
  // Capacity tracking
  maxCapacity?: number; // Max plants/trays this location can hold
  currentCapacity?: number; // Derived from batch_locations
  
  // Maintenance (mainly for BUILDING type)
  lastMaintenance?: string;
  nextMaintenance?: string;
  
  // Status
  isActive: boolean;
  
  // Metadata
  notes?: string;
  dimensions?: string; // e.g., "4m x 8m"
  
  // Legacy fields for backwards compatibility
  batches?: number;
  capacity?: number;
  percentage?: number;
  plants?: number;
  totalPlants?: number;
}

export const locations: Location[] = [
  // ==================== BUILDINGS ====================
  { 
    id: "prop-house-1", 
    name: "Propagation House 1",
    code: "PH1",
    type: "BUILDING",
    climateControl: "Climate Controlled",
    temperature: "18°C",
    humidity: "65%",
    lastMaintenance: "2025-09-28",
    nextMaintenance: "2025-10-28",
    isActive: true,
    dimensions: "12m x 20m",
    maxCapacity: 600,
    batches: 4,
    capacity: 6,
    percentage: 67,
    totalPlants: 470
  },
  { 
    id: "prop-house-2", 
    name: "Propagation House 2",
    code: "PH2",
    type: "BUILDING",
    climateControl: "Climate Controlled",
    temperature: "19°C",
    humidity: "63%",
    lastMaintenance: "2025-09-25",
    nextMaintenance: "2025-10-25",
    isActive: true,
    dimensions: "12m x 20m",
    maxCapacity: 600,
    batches: 3,
    capacity: 6,
    percentage: 50,
    totalPlants: 295
  },
  { 
    id: "shadehouse-a", 
    name: "Shadehouse A",
    code: "SHA",
    type: "BUILDING",
    climateControl: "Ambient",
    temperature: "21°C",
    humidity: "58%",
    lastMaintenance: "2025-09-20",
    nextMaintenance: "2025-10-20",
    isActive: true,
    dimensions: "15m x 25m",
    maxCapacity: 800,
    batches: 5,
    capacity: 6,
    percentage: 83,
    totalPlants: 575
  },
  { 
    id: "shadehouse-b", 
    name: "Shadehouse B",
    code: "SHB",
    type: "BUILDING",
    climateControl: "Ambient",
    temperature: "20°C",
    humidity: "60%",
    lastMaintenance: "2025-09-22",
    nextMaintenance: "2025-10-22",
    isActive: true,
    dimensions: "15m x 25m",
    maxCapacity: 800,
    batches: 2,
    capacity: 6,
    percentage: 33,
    totalPlants: 195
  },
  { 
    id: "potting-shed", 
    name: "Potting Shed",
    code: "PS",
    type: "BUILDING",
    climateControl: "Work Area",
    temperature: "17°C",
    humidity: "55%",
    lastMaintenance: "2025-09-30",
    nextMaintenance: "2025-10-30",
    isActive: true,
    dimensions: "8m x 12m",
    maxCapacity: 400,
    batches: 2,
    capacity: 4,
    percentage: 50,
    totalPlants: 280
  },
  { 
    id: "seed-store", 
    name: "Seed Store",
    code: "SS",
    type: "BUILDING",
    climateControl: "Cold Storage",
    temperature: "12°C",
    humidity: "45%",
    lastMaintenance: "2025-09-18",
    nextMaintenance: "2025-10-18",
    isActive: true,
    dimensions: "6m x 8m",
    maxCapacity: 1000,
    batches: 2,
    capacity: 3,
    percentage: 67,
    totalPlants: 550
  },

  // ==================== PROPAGATION HOUSE 1 - BAYS ====================
  {
    id: "ph1-bay-1",
    name: "Bay 1",
    code: "PH1-B1",
    type: "BAY",
    parentLocationId: "prop-house-1",
    maxCapacity: 200,
    isActive: true,
    dimensions: "4m x 10m",
    notes: "Main propagation area"
  },
  {
    id: "ph1-bay-2",
    name: "Bay 2",
    code: "PH1-B2",
    type: "BAY",
    parentLocationId: "prop-house-1",
    maxCapacity: 200,
    isActive: true,
    dimensions: "4m x 10m"
  },
  {
    id: "ph1-bay-3",
    name: "Bay 3",
    code: "PH1-B3",
    type: "BAY",
    parentLocationId: "prop-house-1",
    maxCapacity: 200,
    isActive: true,
    dimensions: "4m x 10m"
  },

  // ==================== PROPAGATION HOUSE 1 - BAY 1 TABLES ====================
  {
    id: "ph1-b1-t1a",
    name: "Table 1A",
    code: "T1A",
    type: "TABLE",
    parentLocationId: "ph1-bay-1",
    maxCapacity: 80,
    isActive: true,
    dimensions: "2m x 4m"
  },
  {
    id: "ph1-b1-t1b",
    name: "Table 1B",
    code: "T1B",
    type: "TABLE",
    parentLocationId: "ph1-bay-1",
    maxCapacity: 80,
    isActive: true,
    dimensions: "2m x 4m"
  },
  {
    id: "ph1-b1-t1c",
    name: "Table 1C",
    code: "T1C",
    type: "TABLE",
    parentLocationId: "ph1-bay-1",
    maxCapacity: 60,
    isActive: true,
    dimensions: "1.5m x 4m"
  },

  // ==================== PROPAGATION HOUSE 1 - BAY 2 TABLES ====================
  {
    id: "ph1-b2-t2a",
    name: "Table 2A",
    code: "T2A",
    type: "TABLE",
    parentLocationId: "ph1-bay-2",
    maxCapacity: 80,
    isActive: true,
    dimensions: "2m x 4m"
  },
  {
    id: "ph1-b2-t2b",
    name: "Table 2B",
    code: "T2B",
    type: "TABLE",
    parentLocationId: "ph1-bay-2",
    maxCapacity: 80,
    isActive: true,
    dimensions: "2m x 4m"
  },
  {
    id: "ph1-b2-t2c",
    name: "Table 2C",
    code: "T2C",
    type: "TABLE",
    parentLocationId: "ph1-bay-2",
    maxCapacity: 60,
    isActive: true,
    dimensions: "1.5m x 4m"
  },

  // ==================== PROPAGATION HOUSE 1 - BAY 3 TABLES ====================
  {
    id: "ph1-b3-t3a",
    name: "Table 3A",
    code: "T3A",
    type: "TABLE",
    parentLocationId: "ph1-bay-3",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 4m"
  },
  {
    id: "ph1-b3-t3b",
    name: "Table 3B",
    code: "T3B",
    type: "TABLE",
    parentLocationId: "ph1-bay-3",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 4m"
  },

  // ==================== PROPAGATION HOUSE 2 - BAYS ====================
  {
    id: "ph2-bay-1",
    name: "Bay 1",
    code: "PH2-B1",
    type: "BAY",
    parentLocationId: "prop-house-2",
    maxCapacity: 200,
    isActive: true,
    dimensions: "4m x 10m"
  },
  {
    id: "ph2-bay-2",
    name: "Bay 2",
    code: "PH2-B2",
    type: "BAY",
    parentLocationId: "prop-house-2",
    maxCapacity: 200,
    isActive: true,
    dimensions: "4m x 10m"
  },
  {
    id: "ph2-bay-3",
    name: "Bay 3",
    code: "PH2-B3",
    type: "BAY",
    parentLocationId: "prop-house-2",
    maxCapacity: 200,
    isActive: true,
    dimensions: "4m x 10m"
  },

  // ==================== PROPAGATION HOUSE 2 - BAY 1 TABLES ====================
  {
    id: "ph2-b1-t1a",
    name: "Table 1A",
    code: "T1A",
    type: "TABLE",
    parentLocationId: "ph2-bay-1",
    maxCapacity: 80,
    isActive: true,
    dimensions: "2m x 4m"
  },
  {
    id: "ph2-b1-t1b",
    name: "Table 1B",
    code: "T1B",
    type: "TABLE",
    parentLocationId: "ph2-bay-1",
    maxCapacity: 80,
    isActive: true,
    dimensions: "2m x 4m"
  },
  {
    id: "ph2-b1-t1c",
    name: "Table 1C",
    code: "T1C",
    type: "TABLE",
    parentLocationId: "ph2-bay-1",
    maxCapacity: 60,
    isActive: true,
    dimensions: "1.5m x 4m"
  },

  // ==================== PROPAGATION HOUSE 2 - BAY 2 TABLES ====================
  {
    id: "ph2-b2-t2a",
    name: "Table 2A",
    code: "T2A",
    type: "TABLE",
    parentLocationId: "ph2-bay-2",
    maxCapacity: 80,
    isActive: true,
    dimensions: "2m x 4m"
  },
  {
    id: "ph2-b2-t2b",
    name: "Table 2B",
    code: "T2B",
    type: "TABLE",
    parentLocationId: "ph2-bay-2",
    maxCapacity: 80,
    isActive: true,
    dimensions: "2m x 4m"
  },

  // ==================== PROPAGATION HOUSE 2 - BAY 3 TABLES ====================
  {
    id: "ph2-b3-t3a",
    name: "Table 3A",
    code: "T3A",
    type: "TABLE",
    parentLocationId: "ph2-bay-3",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 4m"
  },
  {
    id: "ph2-b3-t3b",
    name: "Table 3B",
    code: "T3B",
    type: "TABLE",
    parentLocationId: "ph2-bay-3",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 4m"
  },

  // ==================== SHADEHOUSE A - BAYS ====================
  {
    id: "sha-bay-1",
    name: "Bay 1",
    code: "SHA-B1",
    type: "BAY",
    parentLocationId: "shadehouse-a",
    maxCapacity: 250,
    isActive: true,
    dimensions: "5m x 12m"
  },
  {
    id: "sha-bay-2",
    name: "Bay 2",
    code: "SHA-B2",
    type: "BAY",
    parentLocationId: "shadehouse-a",
    maxCapacity: 250,
    isActive: true,
    dimensions: "5m x 12m"
  },
  {
    id: "sha-bay-3",
    name: "Bay 3",
    code: "SHA-B3",
    type: "BAY",
    parentLocationId: "shadehouse-a",
    maxCapacity: 300,
    isActive: true,
    dimensions: "5m x 13m"
  },

  // ==================== SHADEHOUSE A - BAY 1 TABLES ====================
  {
    id: "sha-b1-t1a",
    name: "Table 1A",
    code: "T1A",
    type: "TABLE",
    parentLocationId: "sha-bay-1",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 5m"
  },
  {
    id: "sha-b1-t1b",
    name: "Table 1B",
    code: "T1B",
    type: "TABLE",
    parentLocationId: "sha-bay-1",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 5m"
  },
  {
    id: "sha-b1-t1c",
    name: "Table 1C",
    code: "T1C",
    type: "TABLE",
    parentLocationId: "sha-bay-1",
    maxCapacity: 80,
    isActive: true,
    dimensions: "2m x 5m"
  },

  // ==================== SHADEHOUSE A - BAY 2 TABLES ====================
  {
    id: "sha-b2-t2a",
    name: "Table 2A",
    code: "T2A",
    type: "TABLE",
    parentLocationId: "sha-bay-2",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 5m"
  },
  {
    id: "sha-b2-t2b",
    name: "Table 2B",
    code: "T2B",
    type: "TABLE",
    parentLocationId: "sha-bay-2",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 5m"
  },
  {
    id: "sha-b2-t2c",
    name: "Table 2C",
    code: "T2C",
    type: "TABLE",
    parentLocationId: "sha-bay-2",
    maxCapacity: 80,
    isActive: true,
    dimensions: "2m x 5m"
  },

  // ==================== SHADEHOUSE A - BAY 3 TABLES ====================
  {
    id: "sha-b3-t3a",
    name: "Table 3A",
    code: "T3A",
    type: "TABLE",
    parentLocationId: "sha-bay-3",
    maxCapacity: 120,
    isActive: true,
    dimensions: "3m x 5m"
  },
  {
    id: "sha-b3-t3b",
    name: "Table 3B",
    code: "T3B",
    type: "TABLE",
    parentLocationId: "sha-bay-3",
    maxCapacity: 120,
    isActive: true,
    dimensions: "3m x 5m"
  },
  {
    id: "sha-b3-t3c",
    name: "Table 3C",
    code: "T3C",
    type: "TABLE",
    parentLocationId: "sha-bay-3",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 5m"
  },

  // ==================== SHADEHOUSE B - BAYS ====================
  {
    id: "shb-bay-1",
    name: "Bay 1",
    code: "SHB-B1",
    type: "BAY",
    parentLocationId: "shadehouse-b",
    maxCapacity: 250,
    isActive: true,
    dimensions: "5m x 12m"
  },
  {
    id: "shb-bay-2",
    name: "Bay 2",
    code: "SHB-B2",
    type: "BAY",
    parentLocationId: "shadehouse-b",
    maxCapacity: 250,
    isActive: true,
    dimensions: "5m x 12m"
  },
  {
    id: "shb-bay-3",
    name: "Bay 3",
    code: "SHB-B3",
    type: "BAY",
    parentLocationId: "shadehouse-b",
    maxCapacity: 300,
    isActive: true,
    dimensions: "5m x 13m"
  },

  // ==================== SHADEHOUSE B - BAY 1 TABLES ====================
  {
    id: "shb-b1-t1a",
    name: "Table 1A",
    code: "T1A",
    type: "TABLE",
    parentLocationId: "shb-bay-1",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 5m"
  },
  {
    id: "shb-b1-t1b",
    name: "Table 1B",
    code: "T1B",
    type: "TABLE",
    parentLocationId: "shb-bay-1",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 5m"
  },

  // ==================== SHADEHOUSE B - BAY 2 TABLES ====================
  {
    id: "shb-b2-t2a",
    name: "Table 2A",
    code: "T2A",
    type: "TABLE",
    parentLocationId: "shb-bay-2",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 5m"
  },
  {
    id: "shb-b2-t2b",
    name: "Table 2B",
    code: "T2B",
    type: "TABLE",
    parentLocationId: "shb-bay-2",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 5m"
  },

  // ==================== SHADEHOUSE B - BAY 3 TABLES ====================
  {
    id: "shb-b3-t3a",
    name: "Table 3A",
    code: "T3A",
    type: "TABLE",
    parentLocationId: "shb-bay-3",
    maxCapacity: 150,
    isActive: true,
    dimensions: "3m x 6m"
  },
  {
    id: "shb-b3-t3b",
    name: "Table 3B",
    code: "T3B",
    type: "TABLE",
    parentLocationId: "shb-bay-3",
    maxCapacity: 150,
    isActive: true,
    dimensions: "3m x 6m"
  },

  // ==================== POTTING SHED - BAYS ====================
  {
    id: "ps-bay-1",
    name: "Bay 1",
    code: "PS-B1",
    type: "BAY",
    parentLocationId: "potting-shed",
    maxCapacity: 150,
    isActive: true,
    dimensions: "4m x 6m",
    notes: "Work benches for potting"
  },
  {
    id: "ps-bay-2",
    name: "Bay 2",
    code: "PS-B2",
    type: "BAY",
    parentLocationId: "potting-shed",
    maxCapacity: 150,
    isActive: true,
    dimensions: "4m x 6m",
    notes: "Storage and staging area"
  },
  {
    id: "ps-bay-3",
    name: "Bay 3",
    code: "PS-B3",
    type: "BAY",
    parentLocationId: "potting-shed",
    maxCapacity: 100,
    isActive: true,
    dimensions: "4m x 6m",
    notes: "Equipment storage"
  },

  // ==================== POTTING SHED - BAY 1 TABLES ====================
  {
    id: "ps-b1-t1a",
    name: "Bench 1A",
    code: "B1A",
    type: "TABLE",
    parentLocationId: "ps-bay-1",
    maxCapacity: 80,
    isActive: true,
    dimensions: "2m x 3m",
    notes: "Primary potting bench"
  },
  {
    id: "ps-b1-t1b",
    name: "Bench 1B",
    code: "B1B",
    type: "TABLE",
    parentLocationId: "ps-bay-1",
    maxCapacity: 80,
    isActive: true,
    dimensions: "2m x 3m"
  },

  // ==================== POTTING SHED - BAY 2 TABLES ====================
  {
    id: "ps-b2-t2a",
    name: "Staging 2A",
    code: "S2A",
    type: "TABLE",
    parentLocationId: "ps-bay-2",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 3m",
    notes: "Temporary holding"
  },
  {
    id: "ps-b2-t2b",
    name: "Staging 2B",
    code: "S2B",
    type: "TABLE",
    parentLocationId: "ps-bay-2",
    maxCapacity: 100,
    isActive: true,
    dimensions: "2.5m x 3m"
  },

  // ==================== SEED STORE - BAYS (No tables, storage only) ====================
  {
    id: "ss-bay-1",
    name: "Bay 1",
    code: "SS-B1",
    type: "BAY",
    parentLocationId: "seed-store",
    maxCapacity: 500,
    isActive: true,
    dimensions: "3m x 4m",
    notes: "Refrigerated storage"
  },
  {
    id: "ss-bay-2",
    name: "Bay 2",
    code: "SS-B2",
    type: "BAY",
    parentLocationId: "seed-store",
    maxCapacity: 500,
    isActive: true,
    dimensions: "3m x 4m",
    notes: "Dry storage"
  },

  // ==================== VIRTUAL/SPECIAL LOCATIONS ====================
  {
    id: "unassigned",
    name: "Unassigned Inventory",
    code: "UNASSIGNED",
    type: "OTHER",
    isActive: true,
    notes: "Newly received or not yet placed inventory"
  },
  {
    id: "offsite",
    name: "Offsite Storage",
    code: "OFFSITE",
    type: "OTHER",
    isActive: true,
    notes: "Inventory stored at external locations"
  },
  {
    id: "in-transit",
    name: "In Transit",
    code: "TRANSIT",
    type: "OTHER",
    isActive: true,
    notes: "Inventory currently being moved"
  },
];

// ==================== UTILITY FUNCTIONS ====================

export const getLocationById = (id: string): Location | undefined => {
  return locations.find(location => location.id === id);
};

export const getLocationNames = (): string[] => {
  return locations.map(location => location.name);
};

export const getLocationsByType = (type: LocationType): Location[] => {
  return locations.filter(location => location.type === type);
};

export const getChildLocations = (parentId: string): Location[] => {
  return locations.filter(location => location.parentLocationId === parentId);
};

export const getBuildingLocations = (): Location[] => {
  return locations.filter(location => location.type === 'BUILDING');
};

export const getBaysByBuilding = (buildingId: string): Location[] => {
  return locations.filter(location => 
    location.type === 'BAY' && location.parentLocationId === buildingId
  );
};

export const getTablesByBay = (bayId: string): Location[] => {
  return locations.filter(location => 
    location.type === 'TABLE' && location.parentLocationId === bayId
  );
};

// Get full location path as array (e.g., [Building, Bay, Table])
export const getLocationPath = (locationId: string): Location[] => {
  const path: Location[] = [];
  let currentLocation = getLocationById(locationId);
  
  while (currentLocation) {
    path.unshift(currentLocation);
    currentLocation = currentLocation.parentLocationId 
      ? getLocationById(currentLocation.parentLocationId)
      : undefined;
  }
  
  return path;
};

// Get full location path as string (e.g., "Propagation House 1 > Bay 2 > Table 1A")
export const getLocationPathString = (locationId: string): string => {
  const path = getLocationPath(locationId);
  return path.map(loc => loc.name).join(' > ');
};

// Get all descendant locations recursively
export const getAllDescendants = (locationId: string): Location[] => {
  const children = getChildLocations(locationId);
  let descendants = [...children];
  
  children.forEach(child => {
    descendants = [...descendants, ...getAllDescendants(child.id)];
  });
  
  return descendants;
};
