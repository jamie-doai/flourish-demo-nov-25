export interface Task {
  id: string;
  species: string;
  action: string;
  title?: string;
  location: string;
  due: string;
  dueDate?: string;
  status: "overdue" | "today" | "upcoming" | "completed" | "Pending" | "In Progress" | "Scheduled" | "Completed";
  batch: string;
  assignee?: string;
  priority?: "High" | "Medium" | "Low";
  type?: "Watering" | "Potting" | "Sowing" | "Movement" | "Quality Check" | "Treatment";
  estimatedHours?: number;
}

// Location name mapping to handle variations
const locationNameMap: Record<string, string> = {
  "Bay 01": "Propagation House 1",
  "Bay 05": "Shadehouse A",
  "Potting Shed": "Potting Shed",
  "Block 12": "Block 12",
  "ShadeHouse A": "Shadehouse A",
  "PropHouse 1": "Propagation House 1",
  "Dispatch Pad C": "Dispatch Pad C",
  "Seed Store": "Seed Store",
  "Bay 12": "Bay 12",
  "All Bays": "All Bays",
};

export const tasks: Task[] = [
  // Worker tasks
  { 
    id: "1", 
    species: "Mānuka", 
    action: "Water Bay 01 batches",
    title: "Water Bay 01 batches", 
    location: "Bay 01", 
    due: "8:00 AM", 
    dueDate: "2025-01-23",
    status: "overdue", 
    batch: "BATCH_MAN_WAI_01",
    assignee: "Mereana",
    priority: "High",
    type: "Watering",
    estimatedHours: 2
  },
  { 
    id: "2", 
    species: "Harakeke", 
    action: "Move to Bay 05", 
    title: "Move Harakeke to Bay 05",
    location: "Potting Shed", 
    due: "2:00 PM", 
    dueDate: "2025-01-23",
    status: "today", 
    batch: "BATCH_HAR_AKL_03",
    assignee: "Liam",
    priority: "Medium",
    type: "Movement",
    estimatedHours: 1.5
  },
  { 
    id: "3", 
    species: "Tōtara", 
    action: "Apply fertilizer",
    title: "Fertilize Tōtara - Block 12", 
    location: "Block 12", 
    due: "3:00 PM", 
    dueDate: "2025-01-23",
    status: "today", 
    batch: "BATCH_TOT_FGR_04",
    assignee: "Sofia",
    priority: "Medium",
    type: "Treatment",
    estimatedHours: 3
  },
  { 
    id: "4", 
    species: "Kānuka", 
    action: "Pot up seedlings",
    title: "Pot up Kānuka seedlings", 
    location: "ShadeHouse A", 
    due: "Tomorrow", 
    dueDate: "2025-01-24",
    status: "upcoming", 
    batch: "BATCH_KAN_SHA_02",
    assignee: "Liam",
    priority: "Medium",
    type: "Potting",
    estimatedHours: 4
  },
  { 
    id: "5", 
    species: "Karamū", 
    action: "Check for pests",
    title: "Quality check - Karamū", 
    location: "Bay 05", 
    due: "Tomorrow", 
    dueDate: "2025-01-24",
    status: "upcoming", 
    batch: "BATCH_KAR_BAY_05",
    assignee: "Sofia",
    priority: "Low",
    type: "Quality Check",
    estimatedHours: 1
  },
  { 
    id: "6", 
    species: "Pōhutukawa", 
    action: "Water propagation trays",
    title: "Water Pōhutukawa propagation trays", 
    location: "Bay 01", 
    due: "9:00 AM", 
    dueDate: "2025-01-22",
    status: "completed", 
    batch: "BATCH_POH_BAY_01",
    assignee: "Mereana",
    priority: "High",
    type: "Watering",
    estimatedHours: 2
  },
  { 
    id: "7", 
    species: "Mānuka", 
    action: "Transplant to larger pots",
    title: "Pot up Mānuka batch", 
    location: "Potting Shed", 
    due: "10:30 AM", 
    dueDate: "2025-01-22",
    status: "completed", 
    batch: "BATCH_MAN_POT_02",
    assignee: "Liam",
    priority: "Medium",
    type: "Potting",
    estimatedHours: 4
  },
  { 
    id: "8", 
    species: "Kawakawa", 
    action: "Prune and shape",
    title: "Prune Kawakawa - Block 12", 
    location: "Block 12", 
    due: "1:00 PM", 
    dueDate: "2025-01-22",
    status: "completed", 
    batch: "BATCH_KAW_BLK_03",
    assignee: "Sofia",
    priority: "Low",
    type: "Treatment",
    estimatedHours: 1
  },
  { 
    id: "9", 
    species: "Harakeke", 
    action: "Apply pest treatment",
    title: "Treatment - Harakeke pest control", 
    location: "Bay 05", 
    due: "11:00 AM", 
    dueDate: "2025-01-22",
    status: "completed", 
    batch: "BATCH_HAR_BAY_04",
    assignee: "Sofia",
    priority: "Medium",
    type: "Treatment",
    estimatedHours: 2
  },
  // Additional manager-specific tasks
  { 
    id: "T-2025-089", 
    species: "Mānuka", 
    action: "Water ShadeHouse A - Mānuka hardening",
    title: "Water ShadeHouse A - Mānuka hardening",
    location: "ShadeHouse A", 
    due: "Today", 
    dueDate: "2025-01-23",
    status: "In Progress", 
    batch: "MAN-2024-156",
    assignee: "Mereana",
    priority: "High",
    type: "Watering",
    estimatedHours: 2
  },
  { 
    id: "T-2025-090", 
    species: "Tōtara", 
    action: "Pot up Batch TOT-2024-089",
    title: "Pot up Batch TOT-2024-089",
    location: "Potting Shed", 
    due: "Today", 
    dueDate: "2025-01-23",
    status: "Pending", 
    batch: "TOT-2024-089",
    assignee: "Liam",
    priority: "High",
    type: "Potting",
    estimatedHours: 4
  },
  { 
    id: "T-2025-091", 
    species: "Harakeke", 
    action: "Quality check - Harakeke ready for dispatch",
    title: "Quality check - Harakeke ready for dispatch",
    location: "Dispatch Pad C", 
    due: "Today", 
    dueDate: "2025-01-23",
    status: "Pending", 
    batch: "HAR-2025-012",
    assignee: "Sofia",
    priority: "Medium",
    type: "Quality Check",
    estimatedHours: 1
  },
];

export const getTaskById = (id: string): Task | undefined => {
  return tasks.find(task => task.id === id);
};

export const getTasksByStatus = (status: "overdue" | "today" | "upcoming" | "completed" | "Pending" | "In Progress" | "Scheduled" | "Completed"): Task[] => {
  return tasks.filter(task => task.status === status);
};

export const getTasksByLocation = (locationName: string): Task[] => {
  // Normalize location name and find matches
  const normalizedLocation = locationName.toLowerCase();
  
  return tasks.filter(task => {
    const taskLocation = task.location.toLowerCase();
    const mappedLocation = locationNameMap[task.location]?.toLowerCase();
    
    return taskLocation === normalizedLocation || 
           mappedLocation === normalizedLocation ||
           taskLocation.includes(normalizedLocation) ||
           normalizedLocation.includes(taskLocation);
  });
};

export const getTasksByBatch = (batchId: string): Task[] => {
  return tasks.filter(task => task.batch === batchId);
};

export const getTasksByAssignee = (assigneeName: string): Task[] => {
  return tasks.filter(task => task.assignee?.toLowerCase() === assigneeName.toLowerCase());
};
