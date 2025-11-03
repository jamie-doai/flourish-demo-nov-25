import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { WorkerNav } from "@/components/WorkerNav";
import { DevBar } from "@/components/DevBar";
import { WorkerPageHeader } from "@/components/WorkerPageHeader";
import { MapPin, Thermometer } from "lucide-react";
import { locations, getTasksByLocation } from "@/data";
import { Badge } from "@/components/ui/badge";

export default function WorkerLocations() {
  const getCapacityColor = (percentage: number) => {
    if (percentage >= 80) return "text-orange-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] pb-20">
      <DevBar />
      <WorkerPageHeader title="Locations" backTo="/workers" />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-4">
          {locations.map((location) => {
            const locationTasks = getTasksByLocation(location.name);
            const pendingTasks = locationTasks.filter(t => 
              t.status === "overdue" || t.status === "today" || t.status === "upcoming"
            );
            return (
              <Link key={location.id} to={`/workers/locations/${location.id}`}>
                <Card className="p-4 bg-white border-2 border-[#37474F]/20 shadow-sm hover:shadow-md hover:border-[#37474F]/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-5 h-5 text-[#3B7A57]" />
                        <h3 className="text-xl font-semibold text-[#37474F]">{location.name}</h3>
                        {pendingTasks.length > 0 && (
                          <Badge variant="secondary" className="bg-[#3B7A57]/10 text-[#3B7A57]">
                            {pendingTasks.length} {pendingTasks.length === 1 ? 'task' : 'tasks'}
                          </Badge>
                        )}
                      </div>
                      <p className="text-base text-[#37474F] mb-2">{location.type}</p>
                      <div className="flex items-center gap-3 text-base text-[#37474F]">
                        <span>{location.batches} of {location.capacity} batches</span>
                        <div className="flex items-center gap-1">
                          <Thermometer className="w-4 h-4" />
                          <span>{location.temperature}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-base font-semibold ${getCapacityColor(location.percentage)}`}>
                      {location.percentage}%
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Progress value={location.percentage} className="h-2" />
                    <p className="text-base text-[#37474F]">
                      {location.percentage >= 80 ? "Near capacity" : location.percentage >= 60 ? "Moderate use" : "Available space"}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>

      <WorkerNav />
    </div>
  );
}
