/**
 * Dashboard utility functions
 * @ai-context - KPI calculation functions for dashboard metrics
 */

/**
 * Batch interface for KPI calculations
 */
interface Batch {
  quantity: number;
  stage?: string;
}

/**
 * Task interface for KPI calculations
 */
interface Task {
  status: string;
}

/**
 * Location interface for KPI calculations
 */
interface Location {
  percentage: number;
}

/**
 * Calculates the total number of plants across all batches
 * @param batches - Array of batch objects with quantity property
 * @returns Total number of plants
 */
export function calculateTotalPlants(batches: Batch[]): number {
  return batches.reduce((sum, batch) => sum + batch.quantity, 0);
}

/**
 * Calculates the number of tasks due today or overdue
 * @param tasks - Array of task objects with status property
 * @returns Count of tasks due today or overdue
 */
export function calculateTasksDueToday(tasks: Task[]): number {
  return tasks.filter(
    (t) => t.status === "today" || t.status === "overdue"
  ).length;
}

/**
 * Calculates the number of overdue tasks
 * @param tasks - Array of task objects with status property
 * @returns Count of overdue tasks
 */
export function calculateOverdueTasks(tasks: Task[]): number {
  return tasks.filter((t) => t.status === "overdue").length;
}

/**
 * Calculates the number of batches ready to move (in hardening stage)
 * @param batches - Array of batch objects with stage property
 * @returns Count of batches in hardening stage
 */
export function calculateBatchesReadyToMove(batches: Batch[]): number {
  return batches.filter((b) => b.stage === "hardening").length;
}

/**
 * Calculates the average capacity percentage across all locations
 * @param locations - Array of location objects with percentage property
 * @returns Average capacity percentage (rounded)
 */
export function calculateAverageCapacity(locations: Location[]): number {
  if (locations.length === 0) return 0;
  return Math.round(
    locations.reduce((sum, loc) => sum + loc.percentage, 0) / locations.length
  );
}

