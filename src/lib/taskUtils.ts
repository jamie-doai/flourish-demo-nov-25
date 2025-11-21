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
 * Returns the appropriate icon component for a task type
 * @param type - Task type (Watering, Potting, Sowing, Movement, Quality Check, Treatment)
 * @returns Lucide icon component
 */
export function getTypeIcon(type: string): LucideIcon {
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
      return Clock;
  }
}

