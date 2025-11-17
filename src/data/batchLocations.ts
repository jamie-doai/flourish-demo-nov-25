export interface BatchLocation {
  id: string;
  batchId: string;
  locationId: string;
  quantity: number; // Plants at this location
  isPrimary: boolean; // UI hint for "main" location
  startDate: string; // ISO date when placed here
  endDate?: string; // ISO date when fully moved out (null = currently here)
  notes?: string; // Optional placement notes
  movedBy?: string; // Staff member who placed/moved
}

export const batchLocations: BatchLocation[] = [
  // ==================== SINGLE LOCATION BATCHES ====================
  
  // MAN-2024-156: Mānuka in Propagation House 1, Bay 2, Table 2A
  {
    id: "bl-001",
    batchId: "MAN-2024-156",
    locationId: "ph1-b2-t2a",
    quantity: 120,
    isPrimary: true,
    startDate: "2024-08-15T10:00:00Z",
    movedBy: "Alex Thompson"
  },

  // HAR-2024-142: Harakeke in Propagation House 2, Bay 1, Table 1B
  {
    id: "bl-003",
    batchId: "HAR-2024-142",
    locationId: "ph2-b1-t1b",
    quantity: 85,
    isPrimary: true,
    startDate: "2024-08-10T09:30:00Z",
    movedBy: "Jamie Foster"
  },

  // KOW-2024-201: Kōwhai in Potting Shed, Bay 1, Bench 1A
  {
    id: "bl-004",
    batchId: "KOW-2024-201",
    locationId: "ps-b1-t1a",
    quantity: 150,
    isPrimary: true,
    startDate: "2024-09-01T14:00:00Z",
    movedBy: "Sam Rivers"
  },

  // POH-2024-178: Pōhutukawa in Propagation House 1, Bay 1, Table 1A
  {
    id: "bl-005",
    batchId: "POH-2024-178",
    locationId: "ph1-b1-t1a",
    quantity: 95,
    isPrimary: true,
    startDate: "2024-08-25T11:15:00Z",
    movedBy: "Alex Thompson"
  },

  // KAW-2024-215: Kawakawa in Shadehouse A, Bay 1, Table 1B
  {
    id: "bl-006",
    batchId: "KAW-2024-215",
    locationId: "sha-b1-t1b",
    quantity: 110,
    isPrimary: true,
    startDate: "2024-09-10T08:45:00Z",
    movedBy: "Jamie Foster"
  },

  // KAN-2024-167: Kānuka in Propagation House 2, Bay 2, Table 2A
  {
    id: "bl-007",
    batchId: "KAN-2024-167",
    locationId: "ph2-b2-t2a",
    quantity: 130,
    isPrimary: true,
    startDate: "2024-08-20T13:20:00Z",
    movedBy: "Sam Rivers"
  },

  // KAR-2024-193: Karamū in Shadehouse B, Bay 1, Table 1A
  {
    id: "bl-008",
    batchId: "KAR-2024-193",
    locationId: "shb-b1-t1a",
    quantity: 105,
    isPrimary: true,
    startDate: "2024-09-05T10:30:00Z",
    movedBy: "Alex Thompson"
  },

  // ==================== SPLIT BATCHES (Multiple Tables) ====================

  // TOT-2024-089: Tōtara split across Shadehouse A - Bay 1, Tables 1A and 1C
  {
    id: "bl-002-a",
    batchId: "TOT-2024-089",
    locationId: "sha-b1-t1a",
    quantity: 120,
    isPrimary: true,
    startDate: "2024-07-20T09:00:00Z",
    movedBy: "Jamie Foster"
  },
  {
    id: "bl-002-b",
    batchId: "TOT-2024-089",
    locationId: "sha-b1-t1c",
    quantity: 80,
    isPrimary: false,
    startDate: "2024-09-15T14:30:00Z",
    notes: "Overflow from Table 1A due to capacity",
    movedBy: "Sam Rivers"
  },

  // MAN-2024-143: Mānuka split across Propagation House 1 - Bay 3, Tables 3A and 3B
  {
    id: "bl-009",
    batchId: "MAN-2024-143",
    locationId: "ph1-b3-t3a",
    quantity: 80,
    isPrimary: true,
    startDate: "2024-08-12T11:00:00Z",
    movedBy: "Alex Thompson"
  },
  {
    id: "bl-010",
    batchId: "MAN-2024-143",
    locationId: "ph1-b3-t3b",
    quantity: 45,
    isPrimary: false,
    startDate: "2024-09-20T15:45:00Z",
    notes: "Split for better spacing and growth",
    movedBy: "Jamie Foster"
  },

  // HAR-2024-088: Harakeke split across Shadehouse A - Bay 2, Tables 2A and 2B
  {
    id: "bl-011",
    batchId: "HAR-2024-088",
    locationId: "sha-b2-t2a",
    quantity: 65,
    isPrimary: true,
    startDate: "2024-07-15T10:15:00Z",
    movedBy: "Sam Rivers"
  },
  {
    id: "bl-012",
    batchId: "HAR-2024-088",
    locationId: "sha-b2-t2b",
    quantity: 50,
    isPrimary: false,
    startDate: "2024-08-28T13:00:00Z",
    notes: "Hardening-off section",
    movedBy: "Alex Thompson"
  },

  // POH-2024-126: Pōhutukawa split across Propagation House 2 - Bay 3, Tables 3A and 3B
  {
    id: "bl-013",
    batchId: "POH-2024-126",
    locationId: "ph2-b3-t3a",
    quantity: 55,
    isPrimary: true,
    startDate: "2024-08-05T09:30:00Z",
    movedBy: "Jamie Foster"
  },
  {
    id: "bl-014",
    batchId: "POH-2024-126",
    locationId: "ph2-b3-t3b",
    quantity: 35,
    isPrimary: false,
    startDate: "2024-09-12T16:20:00Z",
    notes: "Experimental growth conditions",
    movedBy: "Sam Rivers"
  },

  // KAN-2024-154: Kānuka spread across Shadehouse B - Bay 2, Tables 2A and 2B
  {
    id: "bl-015",
    batchId: "KAN-2024-154",
    locationId: "shb-b2-t2a",
    quantity: 90,
    isPrimary: true,
    startDate: "2024-08-18T10:45:00Z",
    movedBy: "Alex Thompson"
  },
  {
    id: "bl-016",
    batchId: "KAN-2024-154",
    locationId: "shb-b2-t2b",
    quantity: 70,
    isPrimary: false,
    startDate: "2024-09-25T11:30:00Z",
    notes: "Additional space for expansion",
    movedBy: "Jamie Foster"
  },

  // ==================== BATCHES WITH MOVEMENT HISTORY ====================

  // KOW-2024-176: Kōwhai moved from Propagation House to Potting Shed
  // Old location (ended)
  {
    id: "bl-017-old",
    batchId: "KOW-2024-176",
    locationId: "ph1-b1-t1b",
    quantity: 145,
    isPrimary: true,
    startDate: "2024-08-01T09:00:00Z",
    endDate: "2024-09-18T14:00:00Z",
    notes: "Initial propagation location",
    movedBy: "Sam Rivers"
  },
  // Current location
  {
    id: "bl-017-new",
    batchId: "KOW-2024-176",
    locationId: "ps-b2-t2a",
    quantity: 145,
    isPrimary: true,
    startDate: "2024-09-18T14:30:00Z",
    notes: "Moved for potting stage",
    movedBy: "Sam Rivers"
  },

  // KAW-2024-189: Kawakawa with multiple move history
  // First location (ended)
  {
    id: "bl-018-old1",
    batchId: "KAW-2024-189",
    locationId: "ph2-b1-t1a",
    quantity: 100,
    isPrimary: true,
    startDate: "2024-07-25T10:00:00Z",
    endDate: "2024-08-30T11:00:00Z",
    notes: "Germination phase",
    movedBy: "Jamie Foster"
  },
  // Second location (ended)
  {
    id: "bl-018-old2",
    batchId: "KAW-2024-189",
    locationId: "sha-b1-t1a",
    quantity: 98,
    isPrimary: true,
    startDate: "2024-08-30T11:30:00Z",
    endDate: "2024-10-01T15:00:00Z",
    notes: "Hardening phase - 2 plants lost to pests",
    movedBy: "Alex Thompson"
  },
  // Current location
  {
    id: "bl-018-current",
    batchId: "KAW-2024-189",
    locationId: "sha-b2-t2c",
    quantity: 98,
    isPrimary: true,
    startDate: "2024-10-01T15:30:00Z",
    notes: "Final hardening before sale",
    movedBy: "Sam Rivers"
  },

  // MAN-2024-132: Mānuka moved and split
  // Old location - full batch (ended)
  {
    id: "bl-019-old",
    batchId: "MAN-2024-132",
    locationId: "ph1-b2-t2b",
    quantity: 140,
    isPrimary: true,
    startDate: "2024-08-08T08:30:00Z",
    endDate: "2024-09-22T10:00:00Z",
    notes: "Propagation complete",
    movedBy: "Jamie Foster"
  },
  // Current locations - split into two
  {
    id: "bl-019-new-a",
    batchId: "MAN-2024-132",
    locationId: "sha-b3-t3a",
    quantity: 85,
    isPrimary: true,
    startDate: "2024-09-22T10:30:00Z",
    notes: "Primary hardening location",
    movedBy: "Jamie Foster"
  },
  {
    id: "bl-019-new-b",
    batchId: "MAN-2024-132",
    locationId: "sha-b3-t3b",
    quantity: 55,
    isPrimary: false,
    startDate: "2024-09-22T10:30:00Z",
    notes: "Secondary hardening location",
    movedBy: "Jamie Foster"
  },

  // ==================== BATCHES IN SPECIAL LOCATIONS ====================

  // HAR-2024-224: Harakeke newly received, unassigned
  {
    id: "bl-020",
    batchId: "HAR-2024-224",
    locationId: "unassigned",
    quantity: 75,
    isPrimary: true,
    startDate: "2024-10-05T16:00:00Z",
    notes: "Awaiting initial placement",
    movedBy: "Sam Rivers"
  },

  // TOT-2024-197: Tōtara in transit for customer delivery
  {
    id: "bl-021",
    batchId: "TOT-2024-197",
    locationId: "in-transit",
    quantity: 50,
    isPrimary: true,
    startDate: "2024-10-06T07:00:00Z",
    notes: "En route to customer site",
    movedBy: "Alex Thompson"
  },

  // ==================== ADDITIONAL BATCHES IN VARIOUS LOCATIONS ====================

  // KAR-2024-208: Karamū in Propagation House 1, Bay 1, Table 1C
  {
    id: "bl-022",
    batchId: "KAR-2024-208",
    locationId: "ph1-b1-t1c",
    quantity: 72,
    isPrimary: true,
    startDate: "2024-09-08T12:00:00Z",
    movedBy: "Jamie Foster"
  },

  // POH-2024-211: Pōhutukawa in Shadehouse A, Bay 3, Table 3C
  {
    id: "bl-023",
    batchId: "POH-2024-211",
    locationId: "sha-b3-t3c",
    quantity: 88,
    isPrimary: true,
    startDate: "2024-09-12T10:15:00Z",
    movedBy: "Sam Rivers"
  },

  // MAN-2024-164: Mānuka in Propagation House 2, Bay 2, Table 2B
  {
    id: "bl-024",
    batchId: "MAN-2024-164",
    locationId: "ph2-b2-t2b",
    quantity: 115,
    isPrimary: true,
    startDate: "2024-08-22T09:45:00Z",
    movedBy: "Alex Thompson"
  },

  // KAN-2024-187: Kānuka in Shadehouse B, Bay 3, Table 3A
  {
    id: "bl-025",
    batchId: "KAN-2024-187",
    locationId: "shb-b3-t3a",
    quantity: 135,
    isPrimary: true,
    startDate: "2024-09-03T11:20:00Z",
    movedBy: "Jamie Foster"
  },

  // HAR-2024-172: Harakeke split in Propagation House 1, Bay 2, Tables 2B and 2C
  {
    id: "bl-026",
    batchId: "HAR-2024-172",
    locationId: "ph1-b2-t2b",
    quantity: 60,
    isPrimary: true,
    startDate: "2024-08-28T13:30:00Z",
    movedBy: "Sam Rivers"
  },
  {
    id: "bl-027",
    batchId: "HAR-2024-172",
    locationId: "ph1-b2-t2c",
    quantity: 45,
    isPrimary: false,
    startDate: "2024-10-02T14:00:00Z",
    notes: "Additional space for growth",
    movedBy: "Alex Thompson"
  },

  // KOW-2024-195: Kōwhai in Potting Shed, Bay 1, Bench 1B
  {
    id: "bl-028",
    batchId: "KOW-2024-195",
    locationId: "ps-b1-t1b",
    quantity: 92,
    isPrimary: true,
    startDate: "2024-09-06T15:10:00Z",
    movedBy: "Jamie Foster"
  },

  // KAW-2024-203: Kawakawa in Shadehouse A, Bay 2, Table 2C
  {
    id: "bl-029",
    batchId: "KAW-2024-203",
    locationId: "sha-b2-t2c",
    quantity: 78,
    isPrimary: true,
    startDate: "2024-09-10T08:50:00Z",
    movedBy: "Sam Rivers"
  },

  // TOT-2024-219: Tōtara in Shadehouse B, Bay 3, Table 3B
  {
    id: "bl-030",
    batchId: "TOT-2024-219",
    locationId: "shb-b3-t3b",
    quantity: 110,
    isPrimary: true,
    startDate: "2024-09-18T10:00:00Z",
    movedBy: "Alex Thompson"
  },

  // Seed store batches (stored at bay level, no specific table)
  // MAN-SEED-001: Mānuka seeds in Seed Store, Bay 1 (refrigerated)
  {
    id: "bl-031",
    batchId: "MAN-SEED-001",
    locationId: "ss-bay-1",
    quantity: 2500, // seed count
    isPrimary: true,
    startDate: "2024-06-15T09:00:00Z",
    notes: "Refrigerated storage - viable until 2026",
    movedBy: "Jamie Foster"
  },

  // TOT-SEED-002: Tōtara seeds in Seed Store, Bay 2 (dry storage)
  {
    id: "bl-032",
    batchId: "TOT-SEED-002",
    locationId: "ss-bay-2",
    quantity: 1800,
    isPrimary: true,
    startDate: "2024-07-10T14:00:00Z",
    notes: "Dry storage - stratification required",
    movedBy: "Sam Rivers"
  },
];

// ==================== UTILITY FUNCTIONS ====================

export const getBatchLocationsByBatch = (batchId: string): BatchLocation[] => {
  return batchLocations.filter(bl => bl.batchId === batchId);
};

export const getCurrentBatchLocations = (batchId: string): BatchLocation[] => {
  return batchLocations.filter(bl => bl.batchId === batchId && !bl.endDate);
};

export const getBatchLocationHistory = (batchId: string): BatchLocation[] => {
  return batchLocations
    .filter(bl => bl.batchId === batchId && bl.endDate)
    .sort((a, b) => new Date(b.endDate!).getTime() - new Date(a.endDate!).getTime());
};

export const getBatchLocationsByLocation = (locationId: string): BatchLocation[] => {
  return batchLocations.filter(bl => bl.locationId === locationId && !bl.endDate);
};

export const getPrimaryBatchLocation = (batchId: string): BatchLocation | undefined => {
  return batchLocations.find(bl => bl.batchId === batchId && bl.isPrimary && !bl.endDate);
};

export const getTotalBatchQuantity = (batchId: string): number => {
  const currentLocations = getCurrentBatchLocations(batchId);
  return currentLocations.reduce((total, bl) => total + bl.quantity, 0);
};

export const getBatchLocationsById = (batchId: string) => {
  // Get all batch location records for a batch (including historical)
  return batchLocations.filter(bl => bl.batchId === batchId);
};

// Calculate total quantity at a location (including child locations)
export const getTotalQuantityAtLocation = (locationId: string): number => {
  const directLocations = getBatchLocationsByLocation(locationId);
  return directLocations.reduce((total, bl) => total + bl.quantity, 0);
};

// Get unique batches at a location
export const getUniqueBatchesAtLocation = (locationId: string): string[] => {
  const locations = getBatchLocationsByLocation(locationId);
  return [...new Set(locations.map(bl => bl.batchId))];
};
