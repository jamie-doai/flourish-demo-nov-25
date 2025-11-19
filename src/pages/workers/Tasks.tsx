import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkerBottomNav } from "@/components/WorkerBottomNav";
import { DevBar } from "@/components/DevBar";
import { WorkerPageHeader } from "@/components/WorkerPageHeader";
import { Leaf, MapPin, ChevronDown, ChevronUp, Droplets, Move, Sprout, Flower2, Search } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { tasks, locations } from "@/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WorkerTasks() {
  const [filter, setFilter] = useState<"all" | "overdue" | "todo" | "complete-this-week">("all");
  const [groupBy, setGroupBy] = useState<"location" | "task">("location");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  // Helper to get simplified action name for grouping
  const getSimplifiedAction = (action: string) => {
    const lowerAction = action.toLowerCase();
    if (lowerAction.includes("water")) return "Water";
    if (lowerAction.includes("move") || lowerAction.includes("transport")) return "Move";
    if (lowerAction.includes("fertilize") || lowerAction.includes("apply fertilizer") || lowerAction.includes("treat")) return "Apply fertilizer";
    if (lowerAction.includes("pot") || lowerAction.includes("transplant")) return "Pot up";
    if (lowerAction.includes("check") || lowerAction.includes("inspect") || lowerAction.includes("pest")) return "Check";
    if (lowerAction.includes("sow") || lowerAction.includes("seed")) return "Sow";
    if (lowerAction.includes("prune")) return "Prune";
    return action; // Return original if no match
  };

  // Helper to get icon for task action
  const getTaskIcon = (action: string) => {
    const simplifiedAction = getSimplifiedAction(action);
    const lowerAction = simplifiedAction.toLowerCase();
    if (lowerAction.includes("water")) return Droplets;
    if (lowerAction.includes("move")) return Move;
    if (lowerAction.includes("fertilize") || lowerAction.includes("apply")) return Sprout;
    if (lowerAction.includes("pot")) return Flower2;
    if (lowerAction.includes("check")) return Search;
    if (lowerAction.includes("sow")) return Sprout;
    return Leaf; // Default icon
  };

  // Filter tasks based on status
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "overdue") return task.status === "overdue";
    if (filter === "todo") return task.status === "today" || task.status === "upcoming";
    if (filter === "complete-this-week") return task.status === "completed";
    return true;
  });

  // Helper to get location ID from location name
  const getLocationId = (locationName: string) => {
    const location = locations.find(loc => loc.name === locationName);
    return location?.id;
  };

  // Group tasks based on selected view
  const groupedTasks = groupBy === "location" 
    ? // Group by location, then by simplified task type within each location
      filteredTasks.reduce((acc, task) => {
        const simplifiedAction = getSimplifiedAction(task.action);
        if (!acc[task.location]) {
          acc[task.location] = {};
        }
        if (!acc[task.location][simplifiedAction]) {
          acc[task.location][simplifiedAction] = [];
        }
        acc[task.location][simplifiedAction].push(task);
        return acc;
      }, {} as Record<string, Record<string, typeof tasks>>)
    : // Group by simplified task type only
      filteredTasks.reduce((acc, task) => {
        const simplifiedAction = getSimplifiedAction(task.action);
        if (!acc[simplifiedAction]) {
          acc[simplifiedAction] = [];
        }
        acc[simplifiedAction].push(task);
        return acc;
      }, {} as Record<string, typeof tasks>);

  return (
    <div className="min-h-screen bg-forest-green">
      <div className="max-w-[500px] mx-auto bg-white min-h-screen pb-20">
        <DevBar />
      <WorkerPageHeader 
        title="Home" 
        backTo="/workers"
      />

      <div className="container mx-auto px-4 pt-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-heading-2 font-heading font-bold text-forest-green">Tasks</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary-outline" className="text-forest-green">
                {filter === "all" && "All"}
                {filter === "overdue" && "Overdue"}
                {filter === "todo" && "Todo"}
                {filter === "complete-this-week" && "Complete this week"}
                <ChevronDown className="w-6 h-6 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white z-50 border-2 border-forest-green">
              <DropdownMenuItem onClick={() => setFilter("all")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("overdue")}>
                Overdue
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("todo")}>
                Todo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("complete-this-week")}>
                Complete this week
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Group By Switch */}
        <div className="flex items-center gap-2 mb-6 bg-white rounded-lg p-1 border-2 border-forest-green w-fit">
          <button
            onClick={() => setGroupBy("location")}
            className={`px-4 py-2 rounded-md text-body font-heading font-bold transition-colors ${
              groupBy === "location"
                ? "bg-forest-green text-white"
                : "text-forest-green hover:bg-lime-green/20"
            }`}
          >
            Location
          </button>
          <button
            onClick={() => setGroupBy("task")}
            className={`px-4 py-2 rounded-md text-body font-heading font-bold transition-colors ${
              groupBy === "task"
                ? "bg-forest-green text-white"
                : "text-forest-green hover:bg-lime-green/20"
            }`}
          >
            Task
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 bg-white">
        <div className="space-y-6">
          {groupBy === "location" ? (
            // Location view: group by location, then by task type
            Object.entries(groupedTasks as Record<string, Record<string, typeof tasks>>).map(([location, tasksByType]) => {
              const locationId = getLocationId(location);
              const totalTasks = Object.values(tasksByType).flat().length;
              
              return (
                <div key={location} className="space-y-3 mb-12">
                  {locationId ? (
                    <Link to={`/workers/locations/${locationId}`} className="flex items-center gap-2 mb-3 hover:opacity-70 transition-opacity">
                      <MapPin className="w-6 h-6 text-forest-green" />
                      <h2 className="text-heading-2 font-heading font-bold text-forest-green">{location}</h2>
                      <span className="text-body text-muted-foreground">({totalTasks})</span>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-6 h-6 text-forest-green" />
                      <h2 className="text-heading-2 font-heading font-bold text-forest-green">{location}</h2>
                      <span className="text-body text-muted-foreground">({totalTasks})</span>
                    </div>
                  )}
                  
                  {Object.entries(tasksByType).map(([action, actionTasks]) => {
                    const groupKey = `${location}-${action}`;
                    const isOpen = openGroups[groupKey] !== false; // Default to open
                    
                    if (actionTasks.length === 1) {
                      // Single task - no grouping
                      const task = actionTasks[0];
                      const TaskIcon = getTaskIcon(task.action);
                      return (
                        <div key={`${location}-${action}`} className="px-4">
                          <Link to={`/workers/tasks/${task.id}`}>
                            <Card className="border-2 border-forest-green hover:border-lime-green hover:shadow-card transition-all">
                              <div className="flex items-start gap-1.5">
                                <div className="flex-shrink-0 mt-1">
                                  <TaskIcon className="w-8 h-8 text-forest-green" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-3">
                                    <span className="text-heading-2 font-heading font-bold text-forest-green">
                                      {task.action}
                                    </span>
                                    <span className={`px-4 py-1 text-body rounded-full font-heading font-bold ${
                                      task.status === "overdue" 
                                        ? "bg-caution/20 text-caution"
                                        : task.status === "completed"
                                        ? "bg-sage-gray/20 text-muted-foreground"
                                        : "bg-info/20 text-info"
                                    }`}>
                                      {task.status === "overdue" ? "Overdue" : task.status === "completed" ? "Complete" : "To-Do"}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-body text-forest-green mb-2">
                                    <Leaf className="w-6 h-6" />
                                    <span>{task.species}</span>
                                  </div>
                                  <div className="text-body-small text-muted-foreground">
                                    {task.batch || "Multiple batches"}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </Link>
                        </div>
                      );
                    }
                    
                    // Multiple tasks - grouped in collapsible container
                    const GroupIcon = getTaskIcon(action);
                    return (
                      <Collapsible
                        key={groupKey}
                        open={isOpen}
                        onOpenChange={(open) => setOpenGroups(prev => ({ ...prev, [groupKey]: open }))}
                      >
                        <Card className="bg-lime-green/20 border-2 border-forest-green">
                          <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-lime-green/30 transition-colors">
                            <div className="flex items-center gap-1.5">
                              <GroupIcon className="w-6 h-6 text-forest-green" />
                              <h3 className="text-heading-4 font-heading font-bold text-forest-green">{action}</h3>
                              <span className="text-body-small text-muted-foreground">({actionTasks.length})</span>
                            </div>
                            {isOpen ? (
                              <ChevronUp className="w-6 h-6 text-forest-green" />
                            ) : (
                              <ChevronDown className="w-6 h-6 text-forest-green" />
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="p-4 pt-0 space-y-3">
                              {actionTasks.map((task) => {
                                const TaskIcon = getTaskIcon(task.action);
                                return (
                                  <Link key={task.id} to={`/workers/tasks/${task.id}`}>
                                    <Card className="border-2 border-forest-green hover:border-lime-green hover:shadow-card transition-all">
                                      <div className="flex items-start gap-1.5">
                                        <div className="flex-shrink-0 mt-1">
                                          <TaskIcon className="w-8 h-8 text-forest-green" />
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-3">
                                            <span className="text-heading-2 font-heading font-bold text-forest-green">
                                              {task.action}
                                            </span>
                                            <span className={`px-4 py-1 text-body rounded-full font-heading font-bold ${
                                              task.status === "overdue" 
                                                ? "bg-caution/20 text-caution"
                                                : task.status === "completed"
                                                ? "bg-sage-gray/20 text-muted-foreground"
                                                : "bg-info/20 text-info"
                                            }`}>
                                              {task.status === "overdue" ? "Overdue" : task.status === "completed" ? "Complete" : "To-Do"}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2 text-body text-forest-green mb-2">
                                            <Leaf className="w-6 h-6" />
                                            <span>{task.species}</span>
                                          </div>
                                          <div className="text-body-small text-muted-foreground">
                                            {task.batch || "Multiple batches"}
                                          </div>
                                        </div>
                                      </div>
                                    </Card>
                                  </Link>
                                );
                              })}
                            </div>
                          </CollapsibleContent>
                        </Card>
                      </Collapsible>
                    );
                  })}
                </div>
              );
            })
          ) : (
            // Task view: group by task type only
            Object.entries(groupedTasks as Record<string, typeof tasks>).map(([action, actionTasks]) => {
              const groupKey = `task-${action}`;
              const isOpen = openGroups[groupKey] !== false; // Default to open
              
              if (actionTasks.length === 1) {
                // Single task - no grouping
                const task = actionTasks[0];
                const TaskIcon = getTaskIcon(task.action);
                return (
                  <div key={`task-${action}`} className="px-4 mb-6">
                    <Link to={`/workers/tasks/${task.id}`}>
                      <Card className="border-2 border-forest-green hover:border-lime-green hover:shadow-card transition-all">
                        <div className="flex items-start gap-1.5">
                          <div className="flex-shrink-0 mt-1">
                            <TaskIcon className="w-8 h-8 text-forest-green" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-heading-2 font-heading font-bold text-forest-green">
                                {task.action}
                              </span>
                              <span className={`px-4 py-1 text-body rounded-full font-heading font-bold ${
                                task.status === "overdue" 
                                  ? "bg-caution/20 text-caution"
                                  : task.status === "completed"
                                  ? "bg-sage-gray/20 text-muted-foreground"
                                  : "bg-info/20 text-info"
                              }`}>
                                {task.status === "overdue" ? "Overdue" : task.status === "completed" ? "Complete" : "To-Do"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-body text-forest-green mb-2">
                              <Leaf className="w-6 h-6" />
                              <span>{task.species}</span>
                            </div>
                            <div className="flex items-center gap-2 text-body-small text-muted-foreground">
                              <MapPin className="w-6 h-6" />
                              <span>{task.location}</span>
                            </div>
                            <div className="text-body-small text-muted-foreground mt-0.5">
                              {task.batch || "Multiple batches"}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                );
              }
              
              // Multiple tasks - grouped in collapsible container
              const GroupIcon = getTaskIcon(action);
              return (
                <Collapsible
                  key={groupKey}
                  open={isOpen}
                  onOpenChange={(open) => setOpenGroups(prev => ({ ...prev, [groupKey]: open }))}
                  className="mb-6"
                >
                  <Card className="bg-lime-green/20 border-2 border-forest-green">
                    <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-lime-green/30 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <GroupIcon className="w-6 h-6 text-forest-green" />
                        <h2 className="text-heading-3 font-heading font-bold text-forest-green">{action}</h2>
                        <span className="text-body-small text-muted-foreground">({actionTasks.length})</span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-6 h-6 text-forest-green" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-forest-green" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-4 pt-0 space-y-3">
                        {actionTasks.map((task) => {
                          const TaskIcon = getTaskIcon(task.action);
                          return (
                            <Link key={task.id} to={`/workers/tasks/${task.id}`}>
                              <Card className="border-2 border-forest-green hover:border-lime-green hover:shadow-card transition-all">
                                <div className="flex items-start gap-1.5">
                                  <div className="flex-shrink-0 mt-1">
                                    <TaskIcon className="w-8 h-8 text-forest-green" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                      <span className="text-heading-2 font-heading font-bold text-forest-green">
                                        {task.action}
                                      </span>
                                      <span className={`px-4 py-1 text-body rounded-full font-heading font-bold ${
                                        task.status === "overdue" 
                                          ? "bg-caution/20 text-caution"
                                          : task.status === "completed"
                                          ? "bg-sage-gray/20 text-muted-foreground"
                                          : "bg-info/20 text-info"
                                      }`}>
                                        {task.status === "overdue" ? "Overdue" : task.status === "completed" ? "Complete" : "To-Do"}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-body text-forest-green mb-2">
                                      <Leaf className="w-6 h-6" />
                                      <span>{task.species}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-body-small text-muted-foreground">
                                      <MapPin className="w-6 h-6" />
                                      <span>{task.location}</span>
                                    </div>
                                    <div className="text-body-small text-muted-foreground mt-0.5">
                                      {task.batch || "Multiple batches"}
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </Link>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            })
          )}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-6">
            <p className="text-body text-muted-foreground">No tasks found</p>
          </div>
        )}
      </main>

      <WorkerBottomNav />
      </div>
    </div>
  );
}
