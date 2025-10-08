import { locations } from './locations';

export interface Batch {
  id: string;
  species: string;
  scientificName: string;
  location: string;
  stage: string;
  quantity: number;
  health: string;
  urgent?: boolean;
  started?: string;
  lastWatered?: string;
  container?: string;
  plantedDate?: string;
  sourceLocation?: string;
  lastFertilized?: string;
  lastTreatment?: string;
  expectedReadyDate?: string;
  ageInDays?: number;
}

export const batches: Batch[] = [
  { 
    id: "MAN-2024-156", 
    species: "Mānuka", 
    scientificName: "Leptospermum scoparium", 
    location: "Propagation House 1", 
    stage: "propagation", 
    quantity: 120, 
    health: "Excellent", 
    urgent: false, 
    started: "2024-08-15",
    lastWatered: "2025-10-06",
    container: "Propagation trays",
    plantedDate: "2024-08-15",
    sourceLocation: "Coromandel Peninsula",
    lastFertilized: "2025-10-01",
    lastTreatment: "2025-09-28",
    expectedReadyDate: "2025-11-15",
    ageInDays: 52
  },
  { 
    id: "TOT-2024-089", 
    species: "Tōtara", 
    scientificName: "Podocarpus totara", 
    location: "Shadehouse A", 
    stage: "hardening", 
    quantity: 200, 
    health: "Good", 
    urgent: false, 
    started: "2024-07-20",
    lastWatered: "2025-10-05",
    container: "Individual pots"
  },
  { 
    id: "HAR-2024-142", 
    species: "Harakeke", 
    scientificName: "Phormium tenax", 
    location: "Propagation House 2", 
    stage: "propagation", 
    quantity: 85, 
    health: "Excellent", 
    urgent: false, 
    started: "2024-08-10",
    lastWatered: "2025-10-06",
    container: "Propagation trays"
  },
  { 
    id: "KOW-2024-201", 
    species: "Kōwhai", 
    scientificName: "Sophora microphylla", 
    location: "Potting Shed", 
    stage: "potting", 
    quantity: 150, 
    health: "Good", 
    urgent: false, 
    started: "2024-09-01",
    lastWatered: "2025-10-06",
    container: "Individual pots"
  },
  { 
    id: "POH-2024-178", 
    species: "Pōhutukawa", 
    scientificName: "Metrosideros excelsa", 
    location: "Shadehouse B", 
    stage: "ready", 
    quantity: 95, 
    health: "Excellent", 
    urgent: false, 
    started: "2024-06-15",
    lastWatered: "2025-10-05",
    container: "Individual pots"
  },
  { 
    id: "KAR-2024-123", 
    species: "Karamū", 
    scientificName: "Coprosma robusta", 
    location: "Propagation House 1", 
    stage: "propagation", 
    quantity: 60, 
    health: "Fair", 
    urgent: true, 
    started: "2024-08-25",
    lastWatered: "2025-10-04",
    container: "Propagation trays"
  },
  { 
    id: "RIM-2024-067", 
    species: "Rimu", 
    scientificName: "Dacrydium cupressinum", 
    location: "Seed Store", 
    stage: "seed", 
    quantity: 300, 
    health: "Good", 
    urgent: false, 
    started: "2024-09-10",
    lastWatered: "N/A",
    container: "Seed trays"
  },
  { 
    id: "KAH-2024-134", 
    species: "Kahikatea", 
    scientificName: "Dacrycarpus dacrydioides", 
    location: "Propagation House 2", 
    stage: "propagation", 
    quantity: 110, 
    health: "Good", 
    urgent: false, 
    started: "2024-08-18",
    lastWatered: "2025-10-06",
    container: "Propagation trays"
  },
  { 
    id: "PUR-2024-098", 
    species: "Puriri", 
    scientificName: "Vitex lucens", 
    location: "Shadehouse A", 
    stage: "hardening", 
    quantity: 75, 
    health: "Good", 
    urgent: false, 
    started: "2024-07-25",
    lastWatered: "2025-10-05",
    container: "Individual pots"
  },
  { 
    id: "KAU-2024-045", 
    species: "Kauri", 
    scientificName: "Agathis australis", 
    location: "Seed Store", 
    stage: "seed", 
    quantity: 250, 
    health: "Good", 
    urgent: false, 
    started: "2024-09-15",
    lastWatered: "N/A",
    container: "Seed trays"
  },
  { 
    id: "NGA-2024-187", 
    species: "Ngaio", 
    scientificName: "Myoporum laetum", 
    location: "Potting Shed", 
    stage: "potting", 
    quantity: 130, 
    health: "Good", 
    urgent: false, 
    started: "2024-09-05",
    lastWatered: "2025-10-06",
    container: "Individual pots"
  },
];

export const getBatchById = (id: string): Batch | undefined => {
  return batches.find(batch => batch.id === id);
};

export const getBatchesByLocation = (locationId: string): Batch[] => {
  // First, try to get the location name from the locations array
  const location = locations.find(loc => loc.id === locationId);
  
  if (!location) {
    return [];
  }
  
  // Filter batches by matching location name
  return batches.filter(batch => batch.location === location.name);
};

export const getBatchesByStage = (stage: string): Batch[] => {
  return batches.filter(batch => batch.stage === stage);
};
