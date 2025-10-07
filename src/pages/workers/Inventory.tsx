import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WorkerNav } from "@/components/WorkerNav";
import { Search, Scan } from "lucide-react";

const mockBatches = [
  { id: "BATCH_MAN_WAI_01", species: "Mānuka", location: "Bay 01", stage: "Propagation", quantity: 120, health: "Good" },
  { id: "BATCH_HAR_AKL_03", species: "Harakeke", location: "Bay 05", stage: "Growing", quantity: 85, health: "Excellent" },
  { id: "BATCH_TOT_FGR_04", species: "Tōtara", location: "Block 12", stage: "Hardening", quantity: 200, health: "Good" },
  { id: "BATCH_KAN_SHA_02", species: "Kānuka", location: "ShadeHouse A", stage: "Seedling", quantity: 150, health: "Fair" },
  { id: "BATCH_KAR_BAY_05", species: "Karamū", location: "Bay 05", stage: "Growing", quantity: 95, health: "Good" },
  { id: "BATCH_PIT_POT_01", species: "Pittosporum", location: "Potting Shed", stage: "Potting", quantity: 60, health: "Excellent" },
];

export default function WorkerInventory() {
  const [search, setSearch] = useState("");

  const filteredBatches = mockBatches.filter(batch =>
    batch.species.toLowerCase().includes(search.toLowerCase()) ||
    batch.id.toLowerCase().includes(search.toLowerCase()) ||
    batch.location.toLowerCase().includes(search.toLowerCase())
  );

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Excellent": return "bg-green-100 text-green-700";
      case "Good": return "bg-blue-100 text-blue-700";
      case "Fair": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] pb-20">
      <header className="bg-white border-b border-[#3B7A57]/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-[#37474F] mb-4">Inventory</h1>
          
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#37474F]/40" />
              <Input
                type="search"
                placeholder="Search by species or batch code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Link to="/workers/scan">
              <Button className="bg-[#3B7A57] hover:bg-[#3B7A57]/90">
                <Scan className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-3">
          {filteredBatches.map((batch) => (
            <Link key={batch.id} to={`/workers/batch/${batch.id}`}>
              <Card className="p-4 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-[#37474F] mb-1">🌿 {batch.species}</h3>
                    <p className="text-xs text-[#37474F]/40">{batch.id}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getHealthColor(batch.health)}`}>
                    {batch.health}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-[#37474F]/60 text-xs mb-1">Location</p>
                    <p className="text-[#37474F] font-medium text-sm">📍 {batch.location}</p>
                  </div>
                  <div>
                    <p className="text-[#37474F]/60 text-xs mb-1">Stage</p>
                    <p className="text-[#37474F] font-medium text-sm">{batch.stage}</p>
                  </div>
                  <div>
                    <p className="text-[#37474F]/60 text-xs mb-1">Quantity</p>
                    <p className="text-[#37474F] font-medium text-sm">{batch.quantity} trays</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredBatches.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#37474F]/60">No batches found</p>
          </div>
        )}
      </main>

      <WorkerNav />
    </div>
  );
}
