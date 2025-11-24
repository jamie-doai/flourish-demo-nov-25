import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Task } from "@/data/tasks";
import { getTypeIcon } from "@/lib/taskUtils";

interface TaskCardProps {
  task: Task;
  href?: string;
}

export function TaskCard({ task, href }: TaskCardProps) {
  const getColorClasses = (type?: string) => {
    // Use consistent color scheme based on task type
    switch (type) {
      case "Watering":
        return {
          bgClass: "bg-cyan-100 dark:bg-cyan-950",
          iconClass: "text-cyan-600 dark:text-cyan-400"
        };
      case "Potting":
        return {
          bgClass: "bg-blue-100 dark:bg-blue-950",
          iconClass: "text-blue-600 dark:text-blue-400"
        };
      case "Sowing":
        return {
          bgClass: "bg-green-100 dark:bg-green-950",
          iconClass: "text-green-600 dark:text-green-400"
        };
      case "Movement":
        return {
          bgClass: "bg-orange-100 dark:bg-orange-950",
          iconClass: "text-orange-600 dark:text-orange-400"
        };
      case "Quality Check":
        return {
          bgClass: "bg-purple-100 dark:bg-purple-950",
          iconClass: "text-purple-600 dark:text-purple-400"
        };
      case "Treatment":
        return {
          bgClass: "bg-yellow-100 dark:bg-yellow-950",
          iconClass: "text-yellow-600 dark:text-yellow-400"
        };
      default:
        return {
          bgClass: "bg-purple-100 dark:bg-purple-950",
          iconClass: "text-purple-600 dark:text-purple-400"
        };
    }
  };

  const getStatusBadge = () => {
    if (task.status === "overdue") {
      return { variant: "destructive" as const, label: "Overdue" };
    }
    if (task.status === "today") {
      return { variant: "default" as const, label: "Today" };
    }
    return { variant: "secondary" as const, label: "Upcoming" };
  };

  const Icon = getTypeIcon(task.type, task.action);
  const { bgClass, iconClass } = getColorClasses(task.type);
  const statusBadge = getStatusBadge();

  const content = (
    <Card className={`hover:shadow-card transition-all ${href ? 'hover:bg-gray-50' : ''}`}>
      <div className="flex items-start gap-1.5">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${bgClass}`}>
          <Icon className={`w-3 h-3 ${iconClass}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-body">{task.action}</p>
          <p className={`text-body text-muted-foreground ${href ? 'truncate' : ''}`}>
            {task.species} — {task.location}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{task.due}</span>
            <Badge variant={statusBadge.variant} className="text-xs">
              {statusBadge.label}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
}

