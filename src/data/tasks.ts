export interface Task {
  id: string;
  species: string;
  action: string;
  location: string;
  due: string;
  status: "overdue" | "today" | "upcoming" | "completed";
  batch: string;
}

export const tasks: Task[] = [
  { 
    id: "1", 
    species: "Mānuka", 
    action: "Water Bay 01 batches", 
    location: "Bay 01", 
    due: "8:00 AM", 
    status: "overdue", 
    batch: "BATCH_MAN_WAI_01" 
  },
  { 
    id: "2", 
    species: "Harakeke", 
    action: "Move to Bay 05", 
    location: "Potting Shed", 
    due: "2:00 PM", 
    status: "today", 
    batch: "BATCH_HAR_AKL_03" 
  },
  { 
    id: "3", 
    species: "Tōtara", 
    action: "Apply fertilizer", 
    location: "Block 12", 
    due: "3:00 PM", 
    status: "today", 
    batch: "BATCH_TOT_FGR_04" 
  },
  { 
    id: "4", 
    species: "Kānuka", 
    action: "Pot up seedlings", 
    location: "ShadeHouse A", 
    due: "Tomorrow", 
    status: "upcoming", 
    batch: "BATCH_KAN_SHA_02" 
  },
  { 
    id: "5", 
    species: "Karamū", 
    action: "Check for pests", 
    location: "Bay 05", 
    due: "Tomorrow", 
    status: "upcoming", 
    batch: "BATCH_KAR_BAY_05" 
  },
  { 
    id: "6", 
    species: "Pōhutukawa", 
    action: "Water propagation trays", 
    location: "Bay 01", 
    due: "9:00 AM", 
    status: "completed", 
    batch: "BATCH_POH_BAY_01" 
  },
  { 
    id: "7", 
    species: "Mānuka", 
    action: "Transplant to larger pots", 
    location: "Potting Shed", 
    due: "10:30 AM", 
    status: "completed", 
    batch: "BATCH_MAN_POT_02" 
  },
  { 
    id: "8", 
    species: "Kawakawa", 
    action: "Prune and shape", 
    location: "Block 12", 
    due: "1:00 PM", 
    status: "completed", 
    batch: "BATCH_KAW_BLK_03" 
  },
  { 
    id: "9", 
    species: "Harakeke", 
    action: "Apply pest treatment", 
    location: "Bay 05", 
    due: "11:00 AM", 
    status: "completed", 
    batch: "BATCH_HAR_BAY_04" 
  },
];

export const getTaskById = (id: string): Task | undefined => {
  return tasks.find(task => task.id === id);
};

export const getTasksByStatus = (status: "overdue" | "today" | "upcoming" | "completed"): Task[] => {
  return tasks.filter(task => task.status === status);
};
