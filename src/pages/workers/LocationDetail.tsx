import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WorkerNav } from "@/components/WorkerNav";
import { ArrowLeft } from "lucide-react";

export default function WorkerLocationDetail() {
  const { locationId } = useParams();

  const mockLocation = {
    id: locationId,
    name: "Bay 01",
    batches: 3,
    capacity: 5,
    percentage: 60,
    totalPlants: 365,
  };

  const batchesInLocation = [
    { id: "BATCH_MAN_WAI_01", species: "Mānuka", quantity: 120, stage: "Propagation" },
    { id: "BATCH_KAN_SHA_02", species: "Kānuka", quantity: 150, stage: "Seedling" },
    { id: "BATCH_PIT_POT_01", species: "Pittosporum", quantity: 95, stage: "Potting" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] pb-20">
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
        <Card className="p-5 bg-white border-none shadow-sm mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Batches</p>
              <p className="text-2xl text-[#37474F] font-semibold">{mockLocation.batches}/{mockLocation.capacity}</p>
            </div>
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Total Plants</p>
              <p className="text-2xl text-[#37474F] font-semibold">{mockLocation.totalPlants}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#37474F]/60">Capacity</span>
              <span className="text-[#37474F] font-semibold">{mockLocation.percentage}%</span>
            </div>
            <Progress value={mockLocation.percentage} className="h-2" />
          </div>
        </Card>

        {/* Batches in Location */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#37474F] mb-3">Batches in this Location</h2>
          <div className="space-y-3">
            {batchesInLocation.map((batch) => (
              <Link key={batch.id} to={`/workers/batch/${batch.id}`}>
                <Card className="p-4 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-[#37474F] mb-1">🌿 {batch.species}</h3>
                      <p className="text-xs text-[#37474F]/40 mb-2">{batch.id}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-[#37474F]/60">
                          <span className="font-medium text-[#37474F]">{batch.quantity}</span> trays
                        </span>
                        <span className="text-[#37474F]/60">
                          Stage: <span className="font-medium text-[#37474F]">{batch.stage}</span>
                        </span>
                      </div>
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
