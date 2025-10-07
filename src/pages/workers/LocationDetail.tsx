import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WorkerNav } from "@/components/WorkerNav";
import { DevBar } from "@/components/DevBar";
import { ArrowLeft } from "lucide-react";

export default function WorkerLocationDetail() {
  const { locationId } = useParams();

  const mockLocation = {
    id: locationId,
    name: "Propagation House 1",
    type: "Climate Controlled",
    batches: 4,
    capacity: 6,
    percentage: 67,
    totalPlants: 470,
    temperature: "18°C",
    humidity: "65%",
    lastMaintenance: "2025-09-28",
    nextMaintenance: "2025-10-28",
  };

  const batchesInLocation = [
    { id: "MAN-2024-156", species: "Mānuka", scientificName: "Leptospermum scoparium", quantity: 120, stage: "Propagation", health: "Excellent" },
    { id: "HAR-2024-142", species: "Harakeke", scientificName: "Phormium tenax", quantity: 85, stage: "Propagation", health: "Excellent" },
    { id: "KAR-2024-123", species: "Karamū", scientificName: "Coprosma robusta", quantity: 60, stage: "Propagation", health: "Fair" },
    { id: "KAH-2024-134", species: "Kahikatea", scientificName: "Dacrycarpus dacrydioides", quantity: 110, stage: "Propagation", health: "Good" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] pb-20">
      <DevBar />
      <header className="bg-white border-b border-[#3B7A57]/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/workers/locations">
              <Button variant="ghost" size="icon" className="text-[#37474F]">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-[#37474F]">📍 {mockLocation.name}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Location Stats */}
        <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm mb-4">
          <h3 className="text-sm font-semibold text-[#37474F] mb-3">Facility Overview</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Type</p>
              <p className="text-sm text-[#37474F] font-semibold">{mockLocation.type}</p>
            </div>
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Batches</p>
              <p className="text-2xl text-[#37474F] font-semibold">{mockLocation.batches}/{mockLocation.capacity}</p>
            </div>
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Total Plants</p>
              <p className="text-2xl text-[#37474F] font-semibold">{mockLocation.totalPlants}</p>
            </div>
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Capacity</p>
              <p className="text-2xl text-[#37474F] font-semibold">{mockLocation.percentage}%</p>
            </div>
          </div>

          <Progress value={mockLocation.percentage} className="h-2 mb-4" />

          <div className="pt-4 border-t border-[#3B7A57]/10 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Temperature</p>
              <p className="text-sm text-[#37474F] font-semibold">🌡️ {mockLocation.temperature}</p>
            </div>
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Humidity</p>
              <p className="text-sm text-[#37474F] font-semibold">💧 {mockLocation.humidity}</p>
            </div>
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Last Maintenance</p>
              <p className="text-sm text-[#37474F]">{mockLocation.lastMaintenance}</p>
            </div>
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Next Maintenance</p>
              <p className="text-sm text-[#37474F]">{mockLocation.nextMaintenance}</p>
            </div>
          </div>
        </Card>

        {/* Batches in Location */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#37474F] mb-3">Batches in this Location</h2>
          <div className="space-y-3">
            {batchesInLocation.map((batch) => (
              <Link key={batch.id} to={`/workers/batch/${batch.id}`}>
                <Card className="p-4 bg-white border-2 border-[#37474F]/20 shadow-sm hover:shadow-md hover:border-[#37474F]/30 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-[#37474F] mb-1">🌿 {batch.species}</h3>
                      <p className="text-xs text-[#37474F]/60 mb-1">{batch.scientificName}</p>
                      <p className="text-xs text-[#37474F]/40">{batch.id}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      batch.health === "Excellent" ? "bg-green-100 text-green-700" :
                      batch.health === "Good" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {batch.health}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-[#37474F]/60 text-xs mb-1">Quantity</p>
                      <p className="text-[#37474F] font-medium">{batch.quantity} plants</p>
                    </div>
                    <div>
                      <p className="text-[#37474F]/60 text-xs mb-1">Stage</p>
                      <p className="text-[#37474F] font-medium">{batch.stage}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <WorkerNav />
    </div>
  );
}
