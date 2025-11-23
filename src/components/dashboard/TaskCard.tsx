import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Package, Droplets, Clipboard, Clock } from "lucide-react";
import { Task } from "@/data/tasks";

interface TaskCardProps {
  task: Task;
  href?: string;
}

export function TaskCard({ task, href }: TaskCardProps) {
  const getIconAndColor = () => {
    if (task.action.includes("Potting")) {
      return {
        icon: Package,
        bgClass: "bg-blue-100 dark:bg-blue-950",
        iconClass: "text-blue-600 dark:text-blue-400"
      };
    }
    if (task.action.includes("Watering")) {
      return {
        icon: Droplets,
        bgClass: "bg-cyan-100 dark:bg-cyan-950",
        iconClass: "text-cyan-600 dark:text-cyan-400"
      };
    }
    return {
      icon: Clipboard,
      bgClass: "bg-purple-100 dark:bg-purple-950",
      iconClass: "text-purple-600 dark:text-purple-400"
    };
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

  const { icon: Icon, bgClass, iconClass } = getIconAndColor();
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

