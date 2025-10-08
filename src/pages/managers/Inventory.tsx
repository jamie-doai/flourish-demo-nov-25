import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Package, MapPin, Layers, Plus, Search, Sprout, Leaf, FlowerIcon, TreePine, DollarSign, ArrowLeft, Thermometer } from "lucide-react";
import { useState } from "react";

const stages = [
  { id: "seed", name: "Seed", icon: Sprout, color: "bg-amber-100 text-amber-700", borderColor: "border-amber-500" },
  { id: "propagation", name: "Propagation", icon: Leaf, color: "bg-green-100 text-green-700", borderColor: "border-green-500" },
  { id: "potting", name: "Potting", icon: FlowerIcon, color: "bg-blue-100 text-blue-700", borderColor: "border-blue-500" },
  { id: "hardening", name: "Hardening", icon: TreePine, color: "bg-purple-100 text-purple-700", borderColor: "border-purple-500" },
  { id: "ready", name: "Ready", icon: Package, color: "bg-teal-100 text-teal-700", borderColor: "border-teal-500" },
  { id: "sold", name: "Sold", icon: DollarSign, color: "bg-gray-100 text-gray-700", borderColor: "border-gray-500" },
];

const mockBatches = [
  { id: "MAN-2024-156", species: "Mānuka", scientificName: "Leptospermum scoparium", location: "Propagation House 1", stage: "propagation", quantity: 120, health: "Excellent", urgent: false, started: "2024-08-15" },
  { id: "TOT-2024-089", species: "Tōtara", scientificName: "Podocarpus totara", location: "Shadehouse A", stage: "hardening", quantity: 200, health: "Good", urgent: false, started: "2024-07-20" },
  { id: "HAR-2024-142", species: "Harakeke", scientificName: "Phormium tenax", location: "Propagation House 2", stage: "propagation", quantity: 85, health: "Excellent", urgent: false, started: "2024-08-10" },
  { id: "KOW-2024-201", species: "Kōwhai", scientificName: "Sophora microphylla", location: "Potting Shed", stage: "potting", quantity: 150, health: "Good", urgent: false, started: "2024-09-01" },
  { id: "POH-2024-178", species: "Pōhutukawa", scientificName: "Metrosideros excelsa", location: "Shadehouse B", stage: "ready", quantity: 95, health: "Excellent", urgent: false, started: "2024-06-15" },
  { id: "KAR-2024-123", species: "Karamū", scientificName: "Coprosma robusta", location: "Propagation House 1", stage: "propagation", quantity: 60, health: "Fair", urgent: true, started: "2024-08-25" },
  { id: "RIM-2024-067", species: "Rimu", scientificName: "Dacrydium cupressinum", location: "Seed Store", stage: "seed", quantity: 300, health: "Good", urgent: false, started: "2024-09-10" },
  { id: "KAH-2024-134", species: "Kahikatea", scientificName: "Dacrycarpus dacrydioides", location: "Propagation House 2", stage: "propagation", quantity: 110, health: "Good", urgent: false, started: "2024-08-18" },
  { id: "PUR-2024-098", species: "Puriri", scientificName: "Vitex lucens", location: "Shadehouse A", stage: "hardening", quantity: 75, health: "Good", urgent: false, started: "2024-07-25" },
  { id: "KAU-2024-045", species: "Kauri", scientificName: "Agathis australis", location: "Seed Store", stage: "seed", quantity: 250, health: "Good", urgent: false, started: "2024-09-15" },
  { id: "NGA-2024-187", species: "Ngaio", scientificName: "Myoporum laetum", location: "Potting Shed", stage: "potting", quantity: 130, health: "Good", urgent: false, started: "2024-09-05" },
];

const locations = [
  { id: "prop-house-1", name: "Propagation House 1", batches: 4, capacity: 67, plants: 470, type: "Climate Controlled", temperature: "18°C" },
  { id: "prop-house-2", name: "Propagation House 2", batches: 3, capacity: 50, plants: 295, type: "Climate Controlled", temperature: "19°C" },
  { id: "shadehouse-a", name: "Shadehouse A", batches: 5, capacity: 83, plants: 575, type: "Ambient", temperature: "21°C" },
  { id: "shadehouse-b", name: "Shadehouse B", batches: 2, capacity: 33, plants: 195, type: "Ambient", temperature: "20°C" },
  { id: "potting-shed", name: "Potting Shed", batches: 2, capacity: 50, plants: 280, type: "Work Area", temperature: "17°C" },
  { id: "seed-store", name: "Seed Store", batches: 2, capacity: 67, plants: 550, type: "Cold Storage", temperature: "12°C" },
];

export default function ManagerInventory() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const getStageStats = (stageId: string) => {
    const stageBatches = mockBatches.filter(b => b.stage === stageId);
    const totalPlants = stageBatches.reduce((sum, b) => sum + b.quantity, 0);
    const species = new Set(stageBatches.map(b => b.species)).size;
    const avgAge = Math.floor(stageBatches.reduce((sum, b) => {
      const days = Math.floor((new Date().getTime() - new Date(b.started).getTime()) / (1000 * 60 * 60 * 24));
      return sum + days;
    }, 0) / stageBatches.length || 0);
    return { 
      batches: stageBatches.length, 
      plants: totalPlants,
      species,
      avgAge,
      batchList: stageBatches
    };
  };

  if (selectedStage) {
    const stage = stages.find(s => s.id === selectedStage);
    const stats = getStageStats(selectedStage);
    const Icon = stage?.icon || Sprout;

    return (
      <div className="min-h-screen bg-background">
        <DevBar />
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedStage(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Stages
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-xl ${stage?.color} flex items-center justify-center`}>
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{stage?.name} Stage</h1>
                <p className="text-muted-foreground">Detailed view and management</p>
              </div>
            </div>
          </div>

          {/* Stage Overview Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Total Plants</div>
              <div className="text-2xl font-bold">{stats.plants.toLocaleString()}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Active Batches</div>
              <div className="text-2xl font-bold">{stats.batches}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Species Types</div>
              <div className="text-2xl font-bold">{stats.species}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Average Age</div>
              <div className="text-2xl font-bold">{stats.avgAge} days</div>
            </Card>
          </div>

          {/* Batches in Stage */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Batches in {stage?.name}</h2>
            <div className="space-y-3">
              {stats.batchList.map((batch) => (
                <Card 
                  key={batch.id} 
                  className={`p-4 hover:shadow-md transition-shadow ${batch.urgent ? `border-l-4 ${stage?.borderColor}` : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">🌿 {batch.species}</h3>
                        {batch.urgent && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                            Urgent
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          batch.health === "Excellent" ? "bg-green-100 text-green-700" :
                          batch.health === "Good" ? "bg-blue-100 text-blue-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {batch.health}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{batch.scientificName}</p>
                      <p className="text-xs text-muted-foreground mb-3">{batch.id}</p>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Location: </span>
                          <span className="font-medium">📍 {batch.location}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Quantity: </span>
                          <span className="font-medium">{batch.quantity} plants</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Started: </span>
                          <span className="font-medium">{batch.started}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Age: </span>
                          <span className="font-medium">
                            {Math.floor((new Date().getTime() - new Date(batch.started).getTime()) / (1000 * 60 * 60 * 24))} days
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
            <p className="text-muted-foreground">Track batches across stages and locations</p>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            New Batch
          </Button>
        </div>

        <Tabs defaultValue="stages" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="stages">
              <Layers className="w-4 h-4 mr-2" />
              Stages
            </TabsTrigger>
            <TabsTrigger value="batches">
              <Package className="w-4 h-4 mr-2" />
              All Batches
            </TabsTrigger>
            <TabsTrigger value="locations">
              <MapPin className="w-4 h-4 mr-2" />
              Locations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stages" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stages.map((stage) => {
                const stats = getStageStats(stage.id);
                const Icon = stage.icon;
                return (
                  <Card 
                    key={stage.id} 
                    className="p-6 hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => setSelectedStage(stage.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${stage.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{stats.batches}</div>
                        <div className="text-xs text-muted-foreground">Batches</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{stage.name}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>{stats.plants.toLocaleString()} plants</p>
                      <p>{stats.species} species</p>
                    </div>
                    <div className="mt-4 text-sm text-primary font-medium group-hover:translate-x-1 transition-transform inline-block">
                      View details →
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="batches" className="space-y-4">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search batches by species or ID..." className="pl-10" />
              </div>
            </div>

            <div className="space-y-3">
              {mockBatches.map((batch) => (
                <Card key={batch.id} className={`p-4 hover:shadow-md transition-shadow ${batch.urgent ? 'border-l-4 border-l-orange-500' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">🌿 {batch.species}</h3>
                        {batch.urgent && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                            Urgent
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          batch.health === "Excellent" ? "bg-green-100 text-green-700" :
                          batch.health === "Good" ? "bg-blue-100 text-blue-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {batch.health}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{batch.scientificName}</p>
                      <p className="text-xs text-muted-foreground mb-3">{batch.id}</p>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Stage: </span>
                          <span className="font-medium capitalize">{batch.stage}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Location: </span>
                          <span className="font-medium">📍 {batch.location}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Quantity: </span>
                          <span className="font-medium">{batch.quantity} plants</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Started: </span>
                          <span className="font-medium">{batch.started}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {locations.map((location) => (
                <Link key={location.id} to={`/managers/locations/${location.id}`}>
                  <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-5 h-5 text-primary" />
                          <h3 className="text-xl font-semibold">{location.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{location.type}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">{location.batches} batches</span>
                          <div className="flex items-center gap-1">
                            <Thermometer className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{location.temperature}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Capacity</span>
                        <span className="font-medium">{location.capacity}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Plants</span>
                        <span className="font-medium">{location.plants.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-primary font-medium group-hover:translate-x-1 transition-transform inline-block">
                      View details →
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
