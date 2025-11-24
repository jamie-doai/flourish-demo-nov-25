/**
 * Task utility functions
 * @ai-context - Utility functions for task-related operations including color mapping and icon selection
 */

import {
  Droplets,
  Package,
  Sprout,
  MapPin,
  CheckSquare,
  AlertCircle,
  Clock,
  type LucideIcon,
} from "lucide-react";

/**
 * Returns the CSS classes for priority-based color styling
 * @param priority - Task priority level (High, Medium, Low)
 * @returns Tailwind CSS classes for background and text color
 */
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "High":
      return "bg-destructive/10 text-destructive";
    case "Medium":
      return "bg-accent/10 text-accent";
    case "Low":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

/**
 * Returns the CSS classes for status-based color styling
 * @param status - Task status (Completed, In Progress, Pending, Scheduled)
 * @returns Tailwind CSS classes for background and text color
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case "Completed":
      return "bg-primary/10 text-primary";
    case "In Progress":
      return "bg-blue-500/10 text-blue-500";
    case "Pending":
      return "bg-yellow-500/10 text-yellow-500";
    case "Scheduled":
      return "bg-purple-500/10 text-purple-500";
    default:
      return "bg-muted text-muted-foreground";
  }
}

/**
 * Infers task type from action string for backward compatibility
 * @param action - Task action string (e.g., "Water Bay 01 batches", "Pot up seedlings")
 * @returns Task type string or null if cannot be inferred
 */
export function inferTaskTypeFromAction(action: string): string | null {
  const lowerAction = action.toLowerCase();
  
  if (lowerAction.includes("water") || lowerAction.includes("watering")) {
    return "Watering";
  }
  if (lowerAction.includes("pot") || lowerAction.includes("transplant") || lowerAction.includes("potting")) {
    return "Potting";
  }
  if (lowerAction.includes("sow") || lowerAction.includes("seed")) {
    return "Sowing";
  }
  if (lowerAction.includes("move") || lowerAction.includes("transport") || lowerAction.includes("movement")) {
    return "Movement";
  }
  if (lowerAction.includes("check") || lowerAction.includes("inspect") || lowerAction.includes("quality") || lowerAction.includes("pest")) {
    return "Quality Check";
  }
  if (lowerAction.includes("fertilize") || lowerAction.includes("apply") || lowerAction.includes("treat") || lowerAction.includes("treatment") || lowerAction.includes("prune")) {
    return "Treatment";
  }
  
  return null;
}

/**
 * Returns the appropriate icon component for a task type
 * @param type - Task type (Watering, Potting, Sowing, Movement, Quality Check, Treatment)
 * @param action - Optional action string to infer type if type is not provided
 * @returns Lucide icon component
 */
export function getTypeIcon(type?: string, action?: string): LucideIcon {
  // Use type if provided
  if (type) {
    switch (type) {
      case "Watering":
        return Droplets;
      case "Potting":
        return Package;
      case "Sowing":
        return Sprout;
      case "Movement":
        return MapPin;
      case "Quality Check":
        return CheckSquare;
      case "Treatment":
        return AlertCircle;
      default:
        // If type doesn't match, try to infer from action if provided
        if (action) {
          const inferredType = inferTaskTypeFromAction(action);
          if (inferredType) {
            return getTypeIcon(inferredType);
          }
        }
        return Clock;
    }
  }
  
  // If no type, try to infer from action
  if (action) {
    const inferredType = inferTaskTypeFromAction(action);
    if (inferredType) {
      return getTypeIcon(inferredType);
    }
  }
  
  // Default fallback
  return Clock;
}

