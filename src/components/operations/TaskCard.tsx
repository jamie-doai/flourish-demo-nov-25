import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Clock, Package, CheckSquare } from "lucide-react";
import { getPriorityColor, getTypeIcon } from "@/lib/taskUtils";

interface Task {
  id: string;
  title: string;
  type: string;
  priority: string;
  assignee: string;
  location: string;
  dueDate: string;
  batch?: string;
  status: string;
}

interface TaskCardProps {
  task: Task;
  variant?: "default" | "in-progress" | "completed";
}

export function TaskCard({ task, variant = "default" }: TaskCardProps) {
  const Icon = getTypeIcon(task.type, task.title);

  if (variant === "completed") {
    return (
      <Link to={`/managers/tasks/${task.id}`}>
        <Card className="p-3 cursor-pointer hover:shadow-md hover:bg-gray-50 transition-shadow opacity-75">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Icon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-muted-foreground">{task.type}</span>
              </div>
              <CheckSquare className="w-3 h-3 text-primary" />
            </div>
            <h4 className="font-medium text-sm leading-tight line-through">{task.title}</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {task.assignee}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {task.location}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/managers/tasks/${task.id}`}>
      <Card
        className={`p-3 cursor-pointer hover:shadow-md hover:bg-gray-50 transition-shadow ${
          variant === "in-progress" ? "border-l-4 border-l-blue-500" : ""
        }`}
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Icon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{task.type}</span>
            </div>
            <Badge className={getPriorityColor(task.priority)} variant="outline">
              {task.priority}
            </Badge>
          </div>
          <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {task.assignee}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {task.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {task.dueDate}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

