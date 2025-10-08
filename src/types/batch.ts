export type BatchType = "seed-collection" | "cuttings" | "bought-in";

export type BatchStatus = "seed" | "germinating" | "potted" | "propagation" | "hardening" | "ready";

export type StorageCondition = "dry" | "chilled" | "frozen";

export interface BatchFormData {
  // Step 1 - Type
  batchType: BatchType;
  
  // Step 2 - Species
  species: string;
  commonName: string;
  variety?: string;
  intendedPurpose?: string;
  
  // Step 3 - Source/Origin
  sourceLocation?: string;
  gpsCoordinates?: string;
  dateCollected?: Date;
  collectedBy?: string;
  quantity?: number;
  quantityUnit?: "grams" | "kg" | "cuttings" | "trays" | "pots";
  storageCondition?: StorageCondition;
  
  // For cuttings
  parentPlant?: string;
  dateTaken?: Date;
  
  // For bought-in
  supplierName?: string;
  invoiceReference?: string;
  dateReceived?: Date;
  certificationFiles?: File[];
  
  // Step 4 - Location
  initialLocation: string;
  expectedMoveDate?: Date;
  responsiblePerson?: string;
  trackMovements?: boolean;
  
  // Step 5 - Details
  batchId?: string;
  currentStatus?: BatchStatus;
  expectedGerminationDate?: Date;
  notes?: string;
  
  // Step 6 - Attachments
  photos?: File[];
  documents?: File[];
}

export interface Species {
  id: string;
  scientificName: string;
  commonName: string;
  code: string;
  defaultPropagationTime?: number;
  successRate?: number;
  defaultPotSize?: string;
}

export const mockSpecies: Species[] = [
  { id: "1", scientificName: "Leptospermum scoparium", commonName: "Mānuka", code: "MAN", defaultPropagationTime: 21, successRate: 85, defaultPotSize: "PB3" },
  { id: "2", scientificName: "Phormium tenax", commonName: "Harakeke", code: "HAR", defaultPropagationTime: 14, successRate: 90, defaultPotSize: "PB5" },
  { id: "3", scientificName: "Podocarpus totara", commonName: "Tōtara", code: "TOT", defaultPropagationTime: 28, successRate: 70, defaultPotSize: "PB3" },
  { id: "4", scientificName: "Kunzea ericoides", commonName: "Kānuka", code: "KAN", defaultPropagationTime: 21, successRate: 80, defaultPotSize: "PB3" },
  { id: "5", scientificName: "Coprosma robusta", commonName: "Karamū", code: "KAR", defaultPropagationTime: 18, successRate: 85, defaultPotSize: "PB5" },
  { id: "6", scientificName: "Metrosideros excelsa", commonName: "Pōhutukawa", code: "POH", defaultPropagationTime: 24, successRate: 75, defaultPotSize: "PB5" },
  { id: "7", scientificName: "Macropiper excelsum", commonName: "Kawakawa", code: "KAW", defaultPropagationTime: 14, successRate: 88, defaultPotSize: "PB3" },
];
