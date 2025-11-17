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
  saleStatus?: "ready-for-sale" | "reserved" | "on-order" | null;
  orderNumber?: string;
  customerName?: string;
  totalCost?: number;
  perUnitCost?: number;
  costLastUpdated?: string;
  batchGroupId?: string;
  isDuplicate?: boolean;
  originalBatchId?: string;
  duplicateCount?: number;
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
    ageInDays: 52,
    totalCost: 243.40,
    perUnitCost: 2.03,
    costLastUpdated: "2024-09-20T10:15:00Z"
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
    container: "Individual pots",
    saleStatus: "reserved",
    customerName: "Green Gardens Ltd"
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
    container: "Individual pots",
    saleStatus: "ready-for-sale"
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
    container: "Seed trays",
    totalCost: 189.50,
    perUnitCost: 0.63,
    costLastUpdated: "2024-09-10T14:30:00Z"
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
    container: "Individual pots",
    saleStatus: "on-order",
    orderNumber: "ORD-2025-043",
    customerName: "Urban Landscapes"
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
  // Additional Mānuka batches
  { 
    id: "MAN-2024-045", 
    species: "Mānuka", 
    scientificName: "Leptospermum scoparium", 
    location: "Seed Store", 
    stage: "seed", 
    quantity: 500, 
    health: "Good", 
    container: "Seed trays",
    started: "2024-09-20",
    perUnitCost: 0.65,
    totalCost: 325.00,
    costLastUpdated: "2024-09-20T08:00:00Z"
  },
  { 
    id: "MAN-2024-112", 
    species: "Mānuka", 
    scientificName: "Leptospermum scoparium", 
    location: "Propagation House 2", 
    stage: "propagation", 
    quantity: 180, 
    health: "Excellent", 
    container: "Propagation trays",
    started: "2024-08-05",
    lastWatered: "2025-10-06",
    perUnitCost: 1.85,
    totalCost: 333.00,
    costLastUpdated: "2024-08-25T11:20:00Z"
  },
  { 
    id: "MAN-2024-087", 
    species: "Mānuka", 
    scientificName: "Leptospermum scoparium", 
    location: "Potting Shed", 
    stage: "potting", 
    quantity: 95, 
    health: "Good", 
    container: "PB3 pots",
    started: "2024-07-15",
    lastWatered: "2025-10-05",
    perUnitCost: 3.20,
    totalCost: 304.00,
    costLastUpdated: "2024-08-10T14:45:00Z"
  },
  { 
    id: "MAN-2024-023", 
    species: "Mānuka", 
    scientificName: "Leptospermum scoparium", 
    location: "Shadehouse A", 
    stage: "ready", 
    quantity: 60, 
    health: "Excellent", 
    container: "PB5 pots",
    started: "2024-05-10",
    lastWatered: "2025-10-04",
    perUnitCost: 6.50,
    totalCost: 390.00,
    saleStatus: "ready-for-sale",
    costLastUpdated: "2024-07-15T09:30:00Z"
  },
  // Additional Tōtara batches
  { 
    id: "TOT-2024-034", 
    species: "Tōtara", 
    scientificName: "Podocarpus totara", 
    location: "Propagation House 1", 
    stage: "propagation", 
    quantity: 140, 
    health: "Good", 
    container: "Propagation trays",
    started: "2024-08-12",
    lastWatered: "2025-10-06",
    perUnitCost: 2.10,
    totalCost: 294.00
  },
  { 
    id: "TOT-2024-156", 
    species: "Tōtara", 
    scientificName: "Podocarpus totara", 
    location: "Potting Shed", 
    stage: "potting", 
    quantity: 110, 
    health: "Excellent", 
    container: "PB5 pots",
    started: "2024-06-25",
    lastWatered: "2025-10-05",
    perUnitCost: 4.20,
    totalCost: 462.00
  },
  { 
    id: "TOT-2024-012", 
    species: "Tōtara", 
    scientificName: "Podocarpus totara", 
    location: "Shadehouse B", 
    stage: "ready", 
    quantity: 85, 
    health: "Excellent", 
    container: "PB8 pots",
    started: "2024-04-15",
    lastWatered: "2025-10-04",
    perUnitCost: 7.20,
    totalCost: 612.00,
    saleStatus: "ready-for-sale"
  },
  // Additional Harakeke batches
  { 
    id: "HAR-2024-078", 
    species: "Harakeke", 
    scientificName: "Phormium tenax", 
    location: "Seed Store", 
    stage: "seed", 
    quantity: 400, 
    health: "Good", 
    container: "Seed trays",
    started: "2024-09-25",
    perUnitCost: 0.55,
    totalCost: 220.00
  },
  { 
    id: "HAR-2024-198", 
    species: "Harakeke", 
    scientificName: "Phormium tenax", 
    location: "Propagation House 1", 
    stage: "propagation", 
    quantity: 165, 
    health: "Excellent", 
    container: "Propagation trays",
    started: "2024-07-28",
    lastWatered: "2025-10-06",
    perUnitCost: 1.95,
    totalCost: 321.75
  },
  { 
    id: "HAR-2024-223", 
    species: "Harakeke", 
    scientificName: "Phormium tenax", 
    location: "Shadehouse A", 
    stage: "hardening", 
    quantity: 125, 
    health: "Good", 
    container: "3L pots",
    started: "2024-06-10",
    lastWatered: "2025-10-05",
    perUnitCost: 5.10,
    totalCost: 637.50,
    saleStatus: "reserved",
    customerName: "Coastal Landscaping"
  },
  // Additional Kōwhai batches
  { 
    id: "KOW-2024-089", 
    species: "Kōwhai", 
    scientificName: "Sophora microphylla", 
    location: "Propagation House 2", 
    stage: "propagation", 
    quantity: 195, 
    health: "Excellent", 
    container: "Propagation trays",
    started: "2024-08-20",
    lastWatered: "2025-10-06",
    perUnitCost: 2.25,
    totalCost: 438.75
  },
  { 
    id: "KOW-2024-145", 
    species: "Kōwhai", 
    scientificName: "Sophora microphylla", 
    location: "Shadehouse B", 
    stage: "hardening", 
    quantity: 105, 
    health: "Good", 
    container: "PB5 pots",
    started: "2024-07-05",
    lastWatered: "2025-10-05",
    perUnitCost: 4.80,
    totalCost: 504.00
  },
  { 
    id: "KOW-2024-034", 
    species: "Kōwhai", 
    scientificName: "Sophora microphylla", 
    location: "Shadehouse A", 
    stage: "ready", 
    quantity: 70, 
    health: "Excellent", 
    container: "5L pots",
    started: "2024-05-20",
    lastWatered: "2025-10-04",
    perUnitCost: 7.80,
    totalCost: 546.00,
    saleStatus: "on-order",
    orderNumber: "ORD-2025-087",
    customerName: "Native Trees NZ"
  },
  // Additional Pōhutukawa batches
  { 
    id: "POH-2024-067", 
    species: "Pōhutukawa", 
    scientificName: "Metrosideros excelsa", 
    location: "Propagation House 1", 
    stage: "propagation", 
    quantity: 170, 
    health: "Good", 
    container: "Propagation trays",
    started: "2024-08-08",
    lastWatered: "2025-10-06",
    perUnitCost: 2.15,
    totalCost: 365.50
  },
  { 
    id: "POH-2024-112", 
    species: "Pōhutukawa", 
    scientificName: "Metrosideros excelsa", 
    location: "Potting Shed", 
    stage: "potting", 
    quantity: 130, 
    health: "Excellent", 
    container: "PB3 pots",
    started: "2024-07-12",
    lastWatered: "2025-10-05",
    perUnitCost: 3.60,
    totalCost: 468.00
  },
  { 
    id: "POH-2024-245", 
    species: "Pōhutukawa", 
    scientificName: "Metrosideros excelsa", 
    location: "Shadehouse B", 
    stage: "ready", 
    quantity: 80, 
    health: "Excellent", 
    container: "PB5 pots",
    started: "2024-05-25",
    lastWatered: "2025-10-04",
    perUnitCost: 6.90,
    totalCost: 552.00,
    saleStatus: "ready-for-sale"
  },
  // Additional Karamū batches
  { 
    id: "KAR-2024-056", 
    species: "Karamū", 
    scientificName: "Coprosma robusta", 
    location: "Seed Store", 
    stage: "seed", 
    quantity: 350, 
    health: "Good", 
    container: "Seed trays",
    started: "2024-09-18",
    perUnitCost: 0.50,
    totalCost: 175.00
  },
  { 
    id: "KAR-2024-189", 
    species: "Karamū", 
    scientificName: "Coprosma robusta", 
    location: "Propagation House 2", 
    stage: "propagation", 
    quantity: 145, 
    health: "Good", 
    container: "Propagation trays",
    started: "2024-07-30",
    lastWatered: "2025-10-06",
    perUnitCost: 1.75,
    totalCost: 253.75
  },
  { 
    id: "KAR-2024-234", 
    species: "Karamū", 
    scientificName: "Coprosma robusta", 
    location: "Shadehouse A", 
    stage: "hardening", 
    quantity: 90, 
    health: "Fair", 
    container: "PB3 pots",
    started: "2024-06-20",
    lastWatered: "2025-10-05",
    perUnitCost: 4.50,
    totalCost: 405.00
  },
  // Additional Rimu batches
  { 
    id: "RIM-2024-123", 
    species: "Rimu", 
    scientificName: "Dacrydium cupressinum", 
    location: "Propagation House 1", 
    stage: "propagation", 
    quantity: 220, 
    health: "Excellent", 
    container: "Propagation trays",
    started: "2024-08-15",
    lastWatered: "2025-10-06",
    perUnitCost: 2.30,
    totalCost: 506.00
  },
  { 
    id: "RIM-2024-178", 
    species: "Rimu", 
    scientificName: "Dacrydium cupressinum", 
    location: "Potting Shed", 
    stage: "potting", 
    quantity: 155, 
    health: "Good", 
    container: "PB3 pots",
    started: "2024-07-18",
    lastWatered: "2025-10-05",
    perUnitCost: 3.90,
    totalCost: 604.50
  },
  { 
    id: "RIM-2024-045", 
    species: "Rimu", 
    scientificName: "Dacrydium cupressinum", 
    location: "Shadehouse B", 
    stage: "ready", 
    quantity: 95, 
    health: "Excellent", 
    container: "PB5 pots",
    started: "2024-05-12",
    lastWatered: "2025-10-04",
    perUnitCost: 7.50,
    totalCost: 712.50,
    saleStatus: "reserved",
    customerName: "Heritage Gardens"
  },
  // Additional Kahikatea batches
  { 
    id: "KAH-2024-067", 
    species: "Kahikatea", 
    scientificName: "Dacrycarpus dacrydioides", 
    location: "Seed Store", 
    stage: "seed", 
    quantity: 280, 
    health: "Good", 
    container: "Seed trays",
    started: "2024-09-22",
    perUnitCost: 0.60,
    totalCost: 168.00
  },
  { 
    id: "KAH-2024-201", 
    species: "Kahikatea", 
    scientificName: "Dacrycarpus dacrydioides", 
    location: "Propagation House 2", 
    stage: "propagation", 
    quantity: 175, 
    health: "Good", 
    container: "Propagation trays",
    started: "2024-07-25",
    lastWatered: "2025-10-06",
    perUnitCost: 2.05,
    totalCost: 358.75
  },
  { 
    id: "KAH-2024-089", 
    species: "Kahikatea", 
    scientificName: "Dacrycarpus dacrydioides", 
    location: "Shadehouse A", 
    stage: "hardening", 
    quantity: 100, 
    health: "Excellent", 
    container: "PB5 pots",
    started: "2024-06-15",
    lastWatered: "2025-10-05",
    perUnitCost: 5.20,
    totalCost: 520.00
  },
  // Additional Puriri batches
  { 
    id: "PUR-2024-156", 
    species: "Puriri", 
    scientificName: "Vitex lucens", 
    location: "Propagation House 1", 
    stage: "propagation", 
    quantity: 135, 
    health: "Good", 
    container: "Propagation trays",
    started: "2024-08-22",
    lastWatered: "2025-10-06",
    perUnitCost: 2.40,
    totalCost: 324.00
  },
  { 
    id: "PUR-2024-189", 
    species: "Puriri", 
    scientificName: "Vitex lucens", 
    location: "Potting Shed", 
    stage: "potting", 
    quantity: 105, 
    health: "Excellent", 
    container: "2L pots",
    started: "2024-07-08",
    lastWatered: "2025-10-05",
    perUnitCost: 3.80,
    totalCost: 399.00
  },
  { 
    id: "PUR-2024-034", 
    species: "Puriri", 
    scientificName: "Vitex lucens", 
    location: "Shadehouse B", 
    stage: "ready", 
    quantity: 65, 
    health: "Good", 
    container: "3L pots",
    started: "2024-05-18",
    lastWatered: "2025-10-04",
    perUnitCost: 7.00,
    totalCost: 455.00,
    saleStatus: "ready-for-sale"
  },
  // Additional Kauri batches
  { 
    id: "KAU-2024-123", 
    species: "Kauri", 
    scientificName: "Agathis australis", 
    location: "Propagation House 2", 
    stage: "propagation", 
    quantity: 160, 
    health: "Excellent", 
    container: "Propagation trays",
    started: "2024-08-18",
    lastWatered: "2025-10-06",
    perUnitCost: 2.50,
    totalCost: 400.00
  },
  { 
    id: "KAU-2024-178", 
    species: "Kauri", 
    scientificName: "Agathis australis", 
    location: "Potting Shed", 
    stage: "potting", 
    quantity: 120, 
    health: "Good", 
    container: "PB3 pots",
    started: "2024-07-10",
    lastWatered: "2025-10-05",
    perUnitCost: 4.10,
    totalCost: 492.00
  },
  { 
    id: "KAU-2024-056", 
    species: "Kauri", 
    scientificName: "Agathis australis", 
    location: "Shadehouse A", 
    stage: "hardening", 
    quantity: 85, 
    health: "Excellent", 
    container: "PB5 pots",
    started: "2024-06-05",
    lastWatered: "2025-10-05",
    perUnitCost: 6.20,
    totalCost: 527.00,
    saleStatus: "on-order",
    orderNumber: "ORD-2025-056",
    customerName: "Auckland Native Nursery"
  },
  // Additional Ngaio batches
  { 
    id: "NGA-2024-112", 
    species: "Ngaio", 
    scientificName: "Myoporum laetum", 
    location: "Propagation House 1", 
    stage: "propagation", 
    quantity: 185, 
    health: "Good", 
    container: "Propagation trays",
    started: "2024-08-25",
    lastWatered: "2025-10-06",
    perUnitCost: 1.90,
    totalCost: 351.50
  },
  { 
    id: "NGA-2024-234", 
    species: "Ngaio", 
    scientificName: "Myoporum laetum", 
    location: "Shadehouse B", 
    stage: "hardening", 
    quantity: 115, 
    health: "Excellent", 
    container: "PB3 pots",
    started: "2024-06-28",
    lastWatered: "2025-10-05",
    perUnitCost: 4.70,
    totalCost: 540.50
  },
  { 
    id: "NGA-2024-067", 
    species: "Ngaio", 
    scientificName: "Myoporum laetum", 
    location: "Shadehouse A", 
    stage: "ready", 
    quantity: 75, 
    health: "Good", 
    container: "PB5 pots",
    started: "2024-05-08",
    lastWatered: "2025-10-04",
    perUnitCost: 6.80,
    totalCost: 510.00,
    saleStatus: "ready-for-sale"
  },
  // Kānuka batches (new species)
  { 
    id: "KAN-2024-089", 
    species: "Kānuka", 
    scientificName: "Kunzea ericoides", 
    location: "Seed Store", 
    stage: "seed", 
    quantity: 450, 
    health: "Excellent", 
    container: "Seed trays",
    started: "2024-09-28",
    perUnitCost: 0.58,
    totalCost: 261.00
  },
  { 
    id: "KAN-2024-145", 
    species: "Kānuka", 
    scientificName: "Kunzea ericoides", 
    location: "Propagation House 2", 
    stage: "propagation", 
    quantity: 200, 
    health: "Good", 
    container: "Propagation trays",
    started: "2024-08-10",
    lastWatered: "2025-10-06",
    perUnitCost: 1.80,
    totalCost: 360.00
  },
  { 
    id: "KAN-2024-201", 
    species: "Kānuka", 
    scientificName: "Kunzea ericoides", 
    location: "Potting Shed", 
    stage: "potting", 
    quantity: 140, 
    health: "Excellent", 
    container: "PB3 pots",
    started: "2024-07-15",
    lastWatered: "2025-10-05",
    perUnitCost: 3.40,
    totalCost: 476.00
  },
  { 
    id: "KAN-2024-034", 
    species: "Kānuka", 
    scientificName: "Kunzea ericoides", 
    location: "Shadehouse B", 
    stage: "ready", 
    quantity: 90, 
    health: "Good", 
    container: "PB5 pots",
    started: "2024-05-22",
    lastWatered: "2025-10-04",
    perUnitCost: 6.40,
    totalCost: 576.00,
    saleStatus: "reserved",
    customerName: "Waikato Landscaping"
  },
  // Kawakawa batches (new species)
  { 
    id: "KAW-2024-123", 
    species: "Kawakawa", 
    scientificName: "Macropiper excelsum", 
    location: "Propagation House 1", 
    stage: "propagation", 
    quantity: 190, 
    health: "Excellent", 
    container: "Propagation trays",
    started: "2024-08-28",
    lastWatered: "2025-10-06",
    perUnitCost: 2.00,
    totalCost: 380.00
  },
  { 
    id: "KAW-2024-178", 
    species: "Kawakawa", 
    scientificName: "Macropiper excelsum", 
    location: "Propagation House 2", 
    stage: "propagation", 
    quantity: 155, 
    health: "Good", 
    container: "Propagation trays",
    started: "2024-08-05",
    lastWatered: "2025-10-06",
    perUnitCost: 1.95,
    totalCost: 302.25
  },
  { 
    id: "KAW-2024-234", 
    species: "Kawakawa", 
    scientificName: "Macropiper excelsum", 
    location: "Potting Shed", 
    stage: "potting", 
    quantity: 125, 
    health: "Good", 
    container: "2L pots",
    started: "2024-07-20",
    lastWatered: "2025-10-05",
    perUnitCost: 3.70,
    totalCost: 462.50
  },
  { 
    id: "KAW-2024-067", 
    species: "Kawakawa", 
    scientificName: "Macropiper excelsum", 
    location: "Shadehouse A", 
    stage: "ready", 
    quantity: 80, 
    health: "Excellent", 
    container: "3L pots",
    started: "2024-05-15",
    lastWatered: "2025-10-04",
    perUnitCost: 6.60,
    totalCost: 528.00,
    saleStatus: "ready-for-sale"
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
