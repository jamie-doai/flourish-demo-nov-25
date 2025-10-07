import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { WorkerNav } from "@/components/WorkerNav";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockLocations = [
  { id: "bay-01", name: "Bay 01", batches: 3, capacity: 5, percentage: 60 },
  { id: "bay-05", name: "Bay 05", batches: 4, capacity: 5, percentage: 80 },
  { id: "shadehouse-a", name: "ShadeHouse A", batches: 2, capacity: 4, percentage: 50 },
  { id: "potting-shed", name: "Potting Shed", batches: 1, capacity: 3, percentage: 33 },
  { id: "block-12", name: "Block 12", batches: 5, capacity: 6, percentage: 83 },
  { id: "dispatch-c", name: "Dispatch Pad C", batches: 0, capacity: 2, percentage: 0 },
];

export default function WorkerLocations() {
  const getCapacityColor = (percentage: number) => {
    if (percentage >= 80) return "text-orange-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] pb-20">
      <header className="bg-white border-b border-[#3B7A57]/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/workers">
              <Button variant="ghost" size="icon" className="text-[#37474F]">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-[#37474F]">Locations</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-3">
          {mockLocations.map((location) => (
            <Link key={location.id} to={`/workers/locations/${location.id}`}>
              <Card className="p-4 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#37474F] mb-1">📍 {location.name}</h3>
                    <p className="text-sm text-[#37474F]/60">
                      {location.batches} of {location.capacity} batches
                    </p>
                  </div>
                  <span className={`text-sm font-semibold ${getCapacityColor(location.percentage)}`}>
                    {location.percentage}%
                  </span>
                </div>

                <div className="space-y-2">
                  <Progress value={location.percentage} className="h-2" />
                  <p className="text-xs text-[#37474F]/50">
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
