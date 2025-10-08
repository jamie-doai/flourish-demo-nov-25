export interface Location {
  id: string;
  name: string;
  batches: number;
  capacity: number;
  percentage?: number;
  plants?: number;
  type: string;
  temperature: string;
  humidity?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  totalPlants?: number;
}

export const locations: Location[] = [
  { 
    id: "prop-house-1", 
    name: "Propagation House 1", 
    batches: 4, 
    capacity: 6, 
    percentage: 67, 
    plants: 470,
    totalPlants: 470,
    type: "Climate Controlled", 
    temperature: "18°C",
    humidity: "65%",
    lastMaintenance: "2025-09-28",
    nextMaintenance: "2025-10-28"
  },
  { 
    id: "prop-house-2", 
    name: "Propagation House 2", 
    batches: 3, 
    capacity: 6, 
    percentage: 50, 
    plants: 295,
    totalPlants: 295,
    type: "Climate Controlled", 
    temperature: "19°C",
    humidity: "63%",
    lastMaintenance: "2025-09-25",
    nextMaintenance: "2025-10-25"
  },
  { 
    id: "shadehouse-a", 
    name: "Shadehouse A", 
    batches: 5, 
    capacity: 6, 
    percentage: 83, 
    plants: 575,
    totalPlants: 575,
    type: "Ambient", 
    temperature: "21°C",
    humidity: "58%",
    lastMaintenance: "2025-09-20",
    nextMaintenance: "2025-10-20"
  },
  { 
    id: "shadehouse-b", 
    name: "Shadehouse B", 
    batches: 2, 
    capacity: 6, 
    percentage: 33, 
    plants: 195,
    totalPlants: 195,
    type: "Ambient", 
    temperature: "20°C",
    humidity: "60%",
    lastMaintenance: "2025-09-22",
    nextMaintenance: "2025-10-22"
  },
  { 
    id: "potting-shed", 
    name: "Potting Shed", 
    batches: 2, 
    capacity: 4, 
    percentage: 50, 
    plants: 280,
    totalPlants: 280,
    type: "Work Area", 
    temperature: "17°C",
    humidity: "55%",
    lastMaintenance: "2025-09-30",
    nextMaintenance: "2025-10-30"
  },
  { 
    id: "seed-store", 
    name: "Seed Store", 
    batches: 2, 
    capacity: 3, 
    percentage: 67, 
    plants: 550,
    totalPlants: 550,
    type: "Cold Storage", 
    temperature: "12°C",
    humidity: "45%",
    lastMaintenance: "2025-09-18",
    nextMaintenance: "2025-10-18"
  },
];

export const getLocationById = (id: string): Location | undefined => {
  return locations.find(location => location.id === id);
};

export const getLocationNames = (): string[] => {
  return locations.map(location => location.name);
};
