import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkerNav } from "@/components/WorkerNav";
import { DevBar } from "@/components/DevBar";
import { WorkerPageHeader } from "@/components/WorkerPageHeader";
import { Leaf, MapPin, Clock, ChevronDown } from "lucide-react";
import { tasks } from "@/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WorkerTasks() {
  const [timeFilter, setTimeFilter] = useState<"today" | "this-week" | "past-week">("today");

  // Filter tasks based on time period (including completed tasks from that period)
  const filteredTasks = tasks.filter(task => {
    // For demo purposes, showing all tasks for the selected time period
    // In a real app, you would filter by actual dates
    return true;
  });

  // Group tasks by location
  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.location]) {
      acc[task.location] = [];
    }
    acc[task.location].push(task);
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#37474F]">Tasks</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-[#37474F]">
                {timeFilter === "today" && "Today"}
                {timeFilter === "this-week" && "This Week"}
                {timeFilter === "past-week" && "Past Week"}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white z-50">
              <DropdownMenuItem onClick={() => setTimeFilter("today")}>
                Today
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("this-week")}>
                This Week
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("past-week")}>
                Past Week
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {Object.entries(groupedTasks).map(([location, locationTasks]) => (
            <div key={location} className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-[#3B7A57]" />
                <h2 className="text-xl font-semibold text-[#37474F]">{location}</h2>
                <span className="text-sm text-[#37474F]/60">({locationTasks.length})</span>
              </div>
              
              <div className="space-y-4">
                {locationTasks.map((task) => (
                  <Link key={task.id} to={`/workers/tasks/${task.id}`}>
                    <Card className="p-4 bg-white border-2 border-[#37474F]/20 shadow-sm hover:shadow-md hover:border-[#37474F]/30 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl font-semibold text-[#37474F]">
                              {task.action} {task.batch}
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
                          <div className="flex items-center gap-3 text-base text-[#37474F] mb-2">
                            <div className="flex items-center gap-1">
                              <Leaf className="w-4 h-4" />
                              <span>{task.species}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{task.due}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-base text-[#37474F]/60">No tasks found</p>
          </div>
        )}
      </main>

      <WorkerNav />
      </div>
    </div>
  );
}
