/**
 * Custom hook for task filtering and status management
 * @ai-context - Encapsulates task filtering logic for Operations page
 */

import { useMemo } from "react";

interface Task {
  id: string;
  status: string;
  [key: string]: unknown;
}

interface UseTaskFilteringResult {
  filteredTasks: Task[];
  tasksByStatus: {
    pending: Task[];
    inProgress: Task[];
    scheduled: Task[];
    completed: Task[];
  };
}

/**
 * Hook for filtering and organizing tasks by status
 * @param tasks - Array of all tasks
 * @param selectedStatus - Currently selected status filter ("all" or specific status)
 * @returns Filtered tasks and tasks organized by status
 */
export function useTaskFiltering(
  tasks: Task[],
  selectedStatus: string
): UseTaskFilteringResult {
  const filteredTasks = useMemo(() => {
    if (selectedStatus === "all") {
      return tasks;
    }
    return tasks.filter((task) => task.status === selectedStatus);
  }, [tasks, selectedStatus]);

  const tasksByStatus = useMemo(
    () => ({
      pending: tasks.filter((t) => t.status === "Pending"),
      inProgress: tasks.filter((t) => t.status === "In Progress"),
      scheduled: tasks.filter((t) => t.status === "Scheduled"),
      completed: tasks.filter((t) => t.status === "Completed"),
    }),
    [tasks]
  );

  return { filteredTasks, tasksByStatus };
}

