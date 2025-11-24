import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskCard } from "./TaskCard";

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

interface TaskStatusColumnProps {
  title: string;
  tasks: Task[];
  variant?: "default" | "in-progress" | "completed";
}

export function TaskStatusColumn({
  title,
  tasks,
  variant = "default",
}: TaskStatusColumnProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
        <h3 className="font-semibold">{title}</h3>
        <Badge variant="secondary">{tasks.length}</Badge>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} variant={variant} />
        ))}
      </div>
    </div>
  );
}

