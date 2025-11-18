import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkerBottomNav } from "@/components/WorkerBottomNav";
import { DevBar } from "@/components/DevBar";
import { WorkerPageHeader } from "@/components/WorkerPageHeader";
import { Leaf, MapPin, ChevronDown, Droplets, Move, Sprout, Flower2, Search } from "lucide-react";
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

  // Helper to get icon for task action
  const getTaskIcon = (action: string) => {
    const lowerAction = action.toLowerCase();
    if (lowerAction.includes("water")) return Droplets;
    if (lowerAction.includes("move") || lowerAction.includes("transport")) return Move;
    if (lowerAction.includes("fertilize") || lowerAction.includes("apply") || lowerAction.includes("treat")) return Sprout;
    if (lowerAction.includes("pot") || lowerAction.includes("transplant")) return Flower2;
    if (lowerAction.includes("check") || lowerAction.includes("inspect") || lowerAction.includes("pest")) return Search;
    if (lowerAction.includes("sow") || lowerAction.includes("seed")) return Sprout;
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
    ? // Group by location, then by task type within each location
      filteredTasks.reduce((acc, task) => {
        if (!acc[task.location]) {
          acc[task.location] = {};
        }
        if (!acc[task.location][task.action]) {
          acc[task.location][task.action] = [];
        }
        acc[task.location][task.action].push(task);
        return acc;
      }, {} as Record<string, Record<string, typeof tasks>>)
    : // Group by task type only
      filteredTasks.reduce((acc, task) => {
        if (!acc[task.action]) {
          acc[task.action] = [];
        }
        acc[task.action].push(task);
        return acc;
      }, {} as Record<string, typeof tasks>);

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="max-w-[500px] mx-auto bg-[#F8FAF9] min-h-screen pb-20">
        <DevBar />
      <WorkerPageHeader 
        title="Home" 
        backTo="/workers"
      />

      <div className="container mx-auto px-4 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[#37474F]">Tasks</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-[#37474F]">
                {filter === "all" && "All"}
                {filter === "overdue" && "Overdue"}
                {filter === "todo" && "Todo"}
                {filter === "complete-this-week" && "Complete this week"}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white z-50">
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
        <div className="flex items-center gap-2 mb-6 bg-white rounded-lg p-1 border-2 border-[#37474F]/20 w-fit">
          <button
            onClick={() => setGroupBy("location")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              groupBy === "location"
                ? "bg-[#3B7A57] text-white"
                : "text-[#37474F] hover:bg-[#37474F]/5"
            }`}
          >
            Location
          </button>
          <button
            onClick={() => setGroupBy("task")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              groupBy === "task"
                ? "bg-[#3B7A57] text-white"
                : "text-[#37474F] hover:bg-[#37474F]/5"
            }`}
          >
            Task
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {groupBy === "location" ? (
            // Location view: group by location, then by task type
            Object.entries(groupedTasks as Record<string, Record<string, typeof tasks>>).map(([location, tasksByType]) => {
              const locationId = getLocationId(location);
              const totalTasks = Object.values(tasksByType).flat().length;
              
              return (
                <div key={location} className="space-y-3 mb-8">
                  {locationId ? (
                    <Link to={`/workers/locations/${locationId}`} className="flex items-center gap-2 mb-3 hover:opacity-70 transition-opacity">
                      <MapPin className="w-5 h-5 text-[#3B7A57]" />
                      <h2 className="text-xl font-semibold text-[#37474F]">{location}</h2>
                      <span className="text-sm text-[#37474F]/60">({totalTasks})</span>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-[#3B7A57]" />
                      <h2 className="text-xl font-semibold text-[#37474F]">{location}</h2>
                      <span className="text-sm text-[#37474F]/60">({totalTasks})</span>
                    </div>
                  )}
                  
                  {Object.entries(tasksByType).map(([action, actionTasks]) => (
                    <div key={`${location}-${action}`} className="space-y-2">
                      {actionTasks.length > 1 && (
                        <h3 className="text-lg font-medium text-[#37474F] ml-2">{action} ({actionTasks.length})</h3>
                      )}
                      <div className="space-y-3">
                        {actionTasks.map((task) => {
                          const TaskIcon = getTaskIcon(task.action);
                          return (
                          <Link key={task.id} to={`/workers/tasks/${task.id}`}>
                            <Card className="p-4 bg-white border-2 border-[#37474F]/20 shadow-sm hover:shadow-md hover:border-[#37474F]/30 transition-all">
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                  <TaskIcon className="w-8 h-8 text-[#3B7A57]" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl font-bold text-[#37474F]">
                                      {task.action}
                                    </span>
                                    <span className={`px-4 py-1 text-base rounded-full font-medium ${
                                      task.status === "overdue" 
                                        ? "bg-orange-100 text-orange-700"
                                        : task.status === "completed"
                                        ? "bg-gray-100 text-gray-700"
                                        : "bg-blue-100 text-blue-700"
                                    }`}>
                                      {task.status === "overdue" ? "Overdue" : task.status === "completed" ? "Complete" : "To-Do"}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-base text-[#37474F] mb-2">
                                    <Leaf className="w-4 h-4" />
                                    <span>{task.species}</span>
                                  </div>
                                  <div className="text-sm text-[#37474F]/70">
                                    {task.batch || "Multiple batches"}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </Link>
                        );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })
          ) : (
            // Task view: group by task type only
            Object.entries(groupedTasks as Record<string, typeof tasks>).map(([action, actionTasks]) => (
              <div key={action} className="space-y-3 mb-6">
                {actionTasks.length > 1 && (
                  <h2 className="text-xl font-semibold text-[#37474F]">{action} ({actionTasks.length})</h2>
                )}
                <div className="space-y-3">
                {actionTasks.map((task) => {
                  const TaskIcon = getTaskIcon(task.action);
                  return (
                  <Link key={task.id} to={`/workers/tasks/${task.id}`}>
                    <Card className="p-4 bg-white border-2 border-[#37474F]/20 shadow-sm hover:shadow-md hover:border-[#37474F]/30 transition-all">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <TaskIcon className="w-8 h-8 text-[#3B7A57]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl font-bold text-[#37474F]">
                              {task.action}
                            </span>
                              <span className={`px-4 py-1 text-base rounded-full font-medium ${
                                task.status === "overdue" 
                                  ? "bg-orange-100 text-orange-700"
                                  : task.status === "completed"
                                  ? "bg-gray-100 text-gray-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}>
                                {task.status === "overdue" ? "Overdue" : task.status === "completed" ? "Complete" : "To-Do"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-base text-[#37474F] mb-2">
                              <Leaf className="w-4 h-4" />
                              <span>{task.species}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#37474F]/70">
                              <MapPin className="w-4 h-4" />
                              <span>{task.location}</span>
                            </div>
                            <div className="text-sm text-[#37474F]/70 mt-1">
                              {task.batch || "Multiple batches"}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
                })}
                </div>
              </div>
            ))
          )}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-base text-[#37474F]/60">No tasks found</p>
          </div>
        )}
      </main>

      <WorkerBottomNav />
      </div>
    </div>
  );
}
