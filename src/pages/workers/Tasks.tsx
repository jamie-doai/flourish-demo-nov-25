import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkerNav } from "@/components/WorkerNav";
import { DevBar } from "@/components/DevBar";
import { ArrowLeft, Filter } from "lucide-react";

const mockTasks = [
  { id: "1", species: "Mānuka", action: "Water Bay 01 batches", location: "Bay 01", due: "8:00 AM", status: "overdue", batch: "BATCH_MAN_WAI_01" },
  { id: "2", species: "Harakeke", action: "Move to Bay 05", location: "Potting Shed", due: "2:00 PM", status: "today", batch: "BATCH_HAR_AKL_03" },
  { id: "3", species: "Tōtara", action: "Apply fertilizer", location: "Block 12", due: "3:00 PM", status: "today", batch: "BATCH_TOT_FGR_04" },
  { id: "4", species: "Kānuka", action: "Pot up seedlings", location: "ShadeHouse A", due: "Tomorrow", status: "upcoming", batch: "BATCH_KAN_SHA_02" },
  { id: "5", species: "Karamū", action: "Check for pests", location: "Bay 05", due: "Tomorrow", status: "upcoming", batch: "BATCH_KAR_BAY_05" },
];

export default function WorkerTasks() {
  const [filter, setFilter] = useState<"all" | "today" | "completed">("all");

  const filteredTasks = mockTasks.filter(task => {
    if (filter === "all") return task.status !== "completed";
    if (filter === "today") return task.status === "today" || task.status === "overdue";
    return task.status === "completed";
  });

  return (
    <div className="min-h-screen bg-[#F8FAF9] pb-20">
      <DevBar />
      <header className="bg-white border-b border-[#3B7A57]/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/workers">
              <Button variant="outline" size="icon" className="text-[#37474F]">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-[#37474F]">Tasks</h1>
          </div>

          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-[#3B7A57] hover:bg-[#3B7A57]/90" : ""}
            >
              All
            </Button>
            <Button
              variant={filter === "today" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("today")}
              className={filter === "today" ? "bg-[#3B7A57] hover:bg-[#3B7A57]/90" : ""}
            >
              Today
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? "bg-[#3B7A57] hover:bg-[#3B7A57]/90" : ""}
            >
              Completed
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <Link key={task.id} to={`/workers/tasks/${task.id}`}>
              <Card className="p-4 bg-white border-2 border-[#37474F]/20 shadow-sm hover:shadow-md hover:border-[#37474F]/30 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-[#37474F]">🌿 {task.species}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        task.status === "overdue" 
                          ? "bg-orange-100 text-orange-700"
                          : task.status === "today"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {task.status === "overdue" ? "Overdue" : task.status === "today" ? "Today" : "Upcoming"}
                      </span>
                    </div>
                    <p className="text-sm text-[#37474F] mb-2 font-medium">{task.action}</p>
                    <div className="flex items-center gap-3 text-xs text-[#37474F]/60">
                      <span>📍 {task.location}</span>
                      <span>🕒 {task.due}</span>
                    </div>
                    <p className="text-xs text-[#37474F]/40 mt-1">{task.batch}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#37474F]/60">No tasks found</p>
          </div>
        )}
      </main>

      <WorkerNav />
    </div>
  );
}
