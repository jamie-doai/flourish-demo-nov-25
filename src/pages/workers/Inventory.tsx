import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkerBottomNav } from "@/components/WorkerBottomNav";
import { Search, Scan, MapPin, Leaf, Sprout } from "lucide-react";
import { stages, batches } from "@/data";

export default function WorkerInventory() {
  const [search, setSearch] = useState("");
  const [selectedStage, setSelectedStage] = useState("all");

  const filteredBatches = batches.filter(batch => {
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
    const stageBatches = batches.filter(b => b.stage === stageId);
    const totalPlants = stageBatches.reduce((sum, b) => sum + b.quantity, 0);
    return { batches: stageBatches.length, plants: totalPlants };
  };

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="max-w-mobile mx-auto bg-[#F8FAF9] min-h-screen pb-20">
      <header className="bg-white border-b border-[#3B7A57]/10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-[#37474F] mb-4">Inventory</h1>
          
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#37474F]/40" />
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
                <Scan className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          {/* Stage Tabs */}
          <Tabs value={selectedStage} onValueChange={setSelectedStage} className="w-full">
            <TabsList className="grid grid-cols-7 h-auto gap-1 p-1">
              <TabsTrigger value="all" className="text-xs py-2">
                All
              </TabsTrigger>
              {stages.map((stage) => {
                const stats = getStageStats(stage.id);
                const Icon = stage.icon;
                return (
                  <TabsTrigger 
                    key={stage.id} 
                    value={stage.id}
                    className="text-xs py-2 flex flex-col gap-1 h-auto"
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
          <Card className="p-4 bg-white border border-[#37474F]/20 shadow-sm mb-4">
            <div className="flex items-center gap-3 mb-3">
              {(() => {
                const stage = stages.find(s => s.id === selectedStage);
                const Icon = stage?.icon || Sprout;
                return (
                  <>
                    <Icon className="w-3 h-3" />
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
        <div className="space-y-4">
          {filteredBatches.map((batch) => (
            <Link key={batch.id} to={`/workers/batch/${batch.id}`}>
              <Card className={`p-4 bg-white border shadow-sm hover:shadow-md hover:bg-gray-50 transition-all ${batch.urgent ? 'border-orange-500' : 'border-[#37474F]/20 hover:border-[#37474F]/30'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Leaf className="w-3 h-3 text-[#3B7A57]" />
                      <h3 className="text-base font-semibold text-[#37474F]">{batch.id}</h3>
                      {batch.urgent && (
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#37474F] mb-1">{batch.species}</p>
                    <p className="text-xs text-[#37474F]">{batch.scientificName}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getHealthColor(batch.health)}`}>
                    {batch.health}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <p className="text-[#37474F] text-xs mb-1">Location</p>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#37474F]" />
                      <p className="text-[#37474F] font-medium text-sm">{batch.location}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#37474F] text-xs mb-1">Stage</p>
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
                    <p className="text-[#37474F] text-xs mb-1">Quantity</p>
                    <p className="text-[#37474F] font-medium text-sm">{batch.quantity} plants</p>
                  </div>
                  <div>
                    <p className="text-[#37474F] text-xs mb-1">Container</p>
                    <p className="text-[#37474F] font-medium text-sm">{batch.container}</p>
                  </div>
                </div>

                <div className="text-xs text-[#37474F]">
                  Last watered: {batch.lastWatered}
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredBatches.length === 0 && (
          <div className="text-center py-20">
            <p className="text-base text-[#37474F]">No batches found</p>
          </div>
        )}
      </main>

      <WorkerBottomNav />
      </div>
    </div>
  );
}
