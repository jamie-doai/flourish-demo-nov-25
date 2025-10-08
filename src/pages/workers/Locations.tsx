import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { WorkerNav } from "@/components/WorkerNav";
import { DevBar } from "@/components/DevBar";
import { WorkerPageHeader } from "@/components/WorkerPageHeader";

const mockLocations = [
  { id: "prop-house-1", name: "Propagation House 1", batches: 4, capacity: 6, percentage: 67, type: "Climate Controlled", temperature: "18°C" },
  { id: "prop-house-2", name: "Propagation House 2", batches: 3, capacity: 6, percentage: 50, type: "Climate Controlled", temperature: "19°C" },
  { id: "shadehouse-a", name: "Shadehouse A", batches: 5, capacity: 6, percentage: 83, type: "Ambient", temperature: "21°C" },
  { id: "shadehouse-b", name: "Shadehouse B", batches: 2, capacity: 6, percentage: 33, type: "Ambient", temperature: "20°C" },
  { id: "potting-shed", name: "Potting Shed", batches: 2, capacity: 4, percentage: 50, type: "Work Area", temperature: "17°C" },
  { id: "seed-store", name: "Seed Store", batches: 2, capacity: 3, percentage: 67, type: "Cold Storage", temperature: "12°C" },
];

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
          {mockLocations.map((location) => (
            <Link key={location.id} to={`/workers/locations/${location.id}`}>
              <Card className="p-4 bg-white border-2 border-[#37474F]/20 shadow-sm hover:shadow-md hover:border-[#37474F]/30 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#37474F] mb-1">📍 {location.name}</h3>
                    <p className="text-base text-[#37474F]/60 mb-2">{location.type}</p>
                    <div className="flex items-center gap-3 text-base text-[#37474F]/70">
                      <span>{location.batches} of {location.capacity} batches</span>
                      <span>🌡️ {location.temperature}</span>
                    </div>
                  </div>
                  <span className={`text-base font-semibold ${getCapacityColor(location.percentage)}`}>
                    {location.percentage}%
                  </span>
                </div>

                <div className="space-y-2">
                  <Progress value={location.percentage} className="h-2" />
                  <p className="text-base text-[#37474F]/50">
                    {location.percentage >= 80 ? "Near capacity" : location.percentage >= 60 ? "Moderate use" : "Available space"}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <WorkerNav />
    </div>
  );
}
