import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkerNav } from "@/components/WorkerNav";
import { DevBar } from "@/components/DevBar";
import { Search, Scan, Sprout, Leaf, FlowerIcon, TreePine, Package, DollarSign } from "lucide-react";

const stages = [
  { id: "seed", name: "Seed", icon: Sprout, color: "bg-amber-100 text-amber-700" },
  { id: "propagation", name: "Propagation", icon: Leaf, color: "bg-green-100 text-green-700" },
  { id: "potting", name: "Potting", icon: FlowerIcon, color: "bg-blue-100 text-blue-700" },
  { id: "hardening", name: "Hardening", icon: TreePine, color: "bg-purple-100 text-purple-700" },
  { id: "ready", name: "Ready", icon: Package, color: "bg-teal-100 text-teal-700" },
  { id: "sold", name: "Sold", icon: DollarSign, color: "bg-gray-100 text-gray-700" },
];

const mockBatches = [
  { id: "MAN-2024-156", species: "Mānuka", scientificName: "Leptospermum scoparium", location: "Propagation House 1", stage: "propagation", quantity: 120, health: "Excellent", urgent: false, lastWatered: "2025-10-06", container: "Propagation trays" },
  { id: "TOT-2024-089", species: "Tōtara", scientificName: "Podocarpus totara", location: "Shadehouse A", stage: "hardening", quantity: 200, health: "Good", urgent: false, lastWatered: "2025-10-05", container: "Individual pots" },
  { id: "HAR-2024-142", species: "Harakeke", scientificName: "Phormium tenax", location: "Propagation House 2", stage: "propagation", quantity: 85, health: "Excellent", urgent: false, lastWatered: "2025-10-06", container: "Propagation trays" },
  { id: "KOW-2024-201", species: "Kōwhai", scientificName: "Sophora microphylla", location: "Potting Shed", stage: "potting", quantity: 150, health: "Good", urgent: false, lastWatered: "2025-10-06", container: "Individual pots" },
  { id: "POH-2024-178", species: "Pōhutukawa", scientificName: "Metrosideros excelsa", location: "Shadehouse B", stage: "ready", quantity: 95, health: "Excellent", urgent: false, lastWatered: "2025-10-05", container: "Individual pots" },
  { id: "KAR-2024-123", species: "Karamū", scientificName: "Coprosma robusta", location: "Propagation House 1", stage: "propagation", quantity: 60, health: "Fair", urgent: true, lastWatered: "2025-10-04", container: "Propagation trays" },
  { id: "RIM-2024-067", species: "Rimu", scientificName: "Dacrydium cupressinum", location: "Seed Store", stage: "seed", quantity: 300, health: "Good", urgent: false, lastWatered: "N/A", container: "Seed trays" },
  { id: "KAH-2024-134", species: "Kahikatea", scientificName: "Dacrycarpus dacrydioides", location: "Propagation House 2", stage: "propagation", quantity: 110, health: "Good", urgent: false, lastWatered: "2025-10-06", container: "Propagation trays" },
  { id: "PUR-2024-098", species: "Puriri", scientificName: "Vitex lucens", location: "Shadehouse A", stage: "hardening", quantity: 75, health: "Good", urgent: false, lastWatered: "2025-10-05", container: "Individual pots" },
  { id: "KAU-2024-045", species: "Kauri", scientificName: "Agathis australis", location: "Seed Store", stage: "seed", quantity: 250, health: "Good", urgent: false, lastWatered: "N/A", container: "Seed trays" },
  { id: "NGA-2024-187", species: "Ngaio", scientificName: "Myoporum laetum", location: "Potting Shed", stage: "potting", quantity: 130, health: "Good", urgent: false, lastWatered: "2025-10-06", container: "Individual pots" },
];

export default function WorkerInventory() {
  const [search, setSearch] = useState("");
  const [selectedStage, setSelectedStage] = useState("all");

  const filteredBatches = mockBatches.filter(batch => {
    const matchesSearch = batch.species.toLowerCase().includes(search.toLowerCase()) ||
      batch.id.toLowerCase().includes(search.toLowerCase()) ||
      batch.scientificName.toLowerCase().includes(search.toLowerCase()) ||
      batch.location.toLowerCase().includes(search.toLowerCase());
    
    const matchesStage = selectedStage === "all" || batch.stage === selectedStage;
    
    return matchesSearch && matchesStage;
  });

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Excellent": return "bg-green-100 text-green-700";
      case "Good": return "bg-blue-100 text-blue-700";
      case "Fair": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStageStats = (stageId: string) => {
    const stageBatches = mockBatches.filter(b => b.stage === stageId);
    const totalPlants = stageBatches.reduce((sum, b) => sum + b.quantity, 0);
    return { batches: stageBatches.length, plants: totalPlants };
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] pb-20">
      <DevBar />
      <header className="bg-white border-b border-[#3B7A57]/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-[#37474F] mb-4">Inventory</h1>
          
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#37474F]/40" />
              <Input
                type="search"
                placeholder="Search by species or batch ID..."
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

          {/* Stage Tabs */}
          <Tabs value={selectedStage} onValueChange={setSelectedStage} className="w-full">
            <TabsList className="w-full grid grid-cols-7 h-auto gap-1 bg-transparent p-0">
              <TabsTrigger value="all" className="text-xs py-2 data-[state=active]:bg-[#3B7A57] data-[state=active]:text-white">
                All
              </TabsTrigger>
              {stages.map((stage) => {
                const stats = getStageStats(stage.id);
                const Icon = stage.icon;
                return (
                  <TabsTrigger 
                    key={stage.id} 
                    value={stage.id}
                    className="text-xs py-2 flex flex-col gap-1 h-auto data-[state=active]:bg-[#3B7A57] data-[state=active]:text-white"
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{stage.name}</span>
                    <span className="text-[10px] opacity-70">{stats.plants}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stage Summary */}
        {selectedStage !== "all" && (
          <Card className="p-4 bg-white border-none shadow-sm mb-4">
            <div className="flex items-center gap-3 mb-3">
              {(() => {
                const stage = stages.find(s => s.id === selectedStage);
                const Icon = stage?.icon || Sprout;
                return (
                  <>
                    <div className={`w-10 h-10 rounded-full ${stage?.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-[#37474F]">{stage?.name} Stage</h2>
                      <p className="text-sm text-[#37474F]/60">
                        {getStageStats(selectedStage).batches} batches • {getStageStats(selectedStage).plants} plants
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </Card>
        )}

        {/* Batches List */}
        <div className="space-y-3">
          {filteredBatches.map((batch) => (
            <Link key={batch.id} to={`/workers/batch/${batch.id}`}>
              <Card className={`p-4 bg-white border-none shadow-sm hover:shadow-md transition-shadow ${batch.urgent ? 'border-l-4 border-l-orange-500' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-[#37474F]">🌿 {batch.species}</h3>
                      {batch.urgent && (
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#37474F]/60 mb-1">{batch.scientificName}</p>
                    <p className="text-xs text-[#37474F]/40">{batch.id}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getHealthColor(batch.health)}`}>
                    {batch.health}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <p className="text-[#37474F]/60 text-xs mb-1">Location</p>
                    <p className="text-[#37474F] font-medium text-sm">📍 {batch.location}</p>
                  </div>
                  <div>
                    <p className="text-[#37474F]/60 text-xs mb-1">Stage</p>
                    <div className="flex items-center gap-1">
                      {(() => {
                        const stage = stages.find(s => s.id === batch.stage);
                        const Icon = stage?.icon || Sprout;
                        return (
                          <>
                            <Icon className="w-3 h-3 text-[#37474F]" />
                            <p className="text-[#37474F] font-medium text-sm">{stage?.name}</p>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  <div>
                    <p className="text-[#37474F]/60 text-xs mb-1">Quantity</p>
                    <p className="text-[#37474F] font-medium text-sm">{batch.quantity} plants</p>
                  </div>
                  <div>
                    <p className="text-[#37474F]/60 text-xs mb-1">Container</p>
                    <p className="text-[#37474F] font-medium text-sm">{batch.container}</p>
                  </div>
                </div>

                <div className="text-xs text-[#37474F]/50">
                  Last watered: {batch.lastWatered}
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
