export interface ActivityLog {
  id: string;
  user: {
    name: string;
    initials: string;
  };
  action: string;
  timestamp: string;
  tags: ("Batch" | "Task" | "Location")[];
}

export const activityLogs: ActivityLog[] = [
  {
    id: "act-1",
    user: { name: "Liam", initials: "LT" },
    action: "Moved Batch 2025-06-20 → ShadeHouse A",
    timestamp: "08:50",
    tags: ["Batch", "Location"]
  },
  {
    id: "act-2",
    user: { name: "Mereana", initials: "MK" },
    action: "Completed watering task in Bay 01",
    timestamp: "08:35",
    tags: ["Task", "Location"]
  },
  {
    id: "act-3",
    user: { name: "Alex", initials: "AW" },
    action: "Created new Harakeke batch",
    timestamp: "08:20",
    tags: ["Batch"]
  },
  {
    id: "act-4",
    user: { name: "Kiri", initials: "KP" },
    action: "Updated Bay 03 temperature settings",
    timestamp: "08:05",
    tags: ["Location"]
  },
  {
    id: "act-5",
    user: { name: "Liam", initials: "LT" },
    action: "Marked dispatch task complete",
    timestamp: "07:45",
    tags: ["Task"]
  },
];
