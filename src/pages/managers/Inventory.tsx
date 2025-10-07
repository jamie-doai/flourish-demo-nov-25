import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Package, MapPin, Layers, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ManagerInventory() {
  const batches = [
    { id: "B2025-001", species: "Lavender 'Hidcote'", stage: "Potting", location: "Bay 3", quantity: 500, started: "2025-01-15" },
    { id: "B2025-002", species: "Rosemary", stage: "Hardening", location: "Bay 5", quantity: 350, started: "2025-01-10" },
    { id: "B2025-003", species: "Basil 'Genovese'", stage: "Germination", location: "Greenhouse 1", quantity: 800, started: "2025-01-20" },
    { id: "B2025-004", species: "Tomato 'Roma'", stage: "Potting", location: "Greenhouse 2", quantity: 600, started: "2025-01-18" },
  ];

  const stages = [
    { name: "Seed", count: 3, batches: 2400 },
    { name: "Germination", count: 5, batches: 4200 },
    { name: "Propagation", count: 8, batches: 6800 },
    { name: "Potting", count: 12, batches: 8500 },
    { name: "Hardening", count: 6, batches: 3200 },
    { name: "Ready", count: 4, batches: 2100 },
  ];

  const locations = [
    { name: "Greenhouse 1", batches: 8, capacity: "80%", plants: 3200 },
    { name: "Greenhouse 2", batches: 6, capacity: "65%", plants: 2400 },
    { name: "Bay 3", batches: 5, capacity: "70%", plants: 1800 },
    { name: "Bay 5", batches: 4, capacity: "55%", plants: 1200 },
    { name: "Outdoor Area", batches: 3, capacity: "40%", plants: 800 },
  ];

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

        <Tabs defaultValue="batches" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="batches">
              <Package className="w-4 h-4 mr-2" />
              Batches
            </TabsTrigger>
            <TabsTrigger value="stages">
              <Layers className="w-4 h-4 mr-2" />
              Stages
            </TabsTrigger>
            <TabsTrigger value="locations">
              <MapPin className="w-4 h-4 mr-2" />
              Locations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="batches" className="space-y-4">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search batches..." className="pl-10" />
              </div>
            </div>

            <div className="space-y-3">
              {batches.map((batch) => (
                <Card key={batch.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="font-semibold text-lg">{batch.id}</div>
                        <div className="text-muted-foreground">{batch.species}</div>
                      </div>
                      <div className="flex gap-6 mt-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Stage: </span>
                          <span className="font-medium text-primary">{batch.stage}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Location: </span>
                          <span className="font-medium">{batch.location}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Quantity: </span>
                          <span className="font-medium">{batch.quantity}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Started: </span>
                          <span>{batch.started}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stages" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stages.map((stage) => (
                <Card key={stage.name} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <Layers className="w-8 h-8 text-primary" />
                    <div className="text-right">
                      <div className="text-2xl font-bold">{stage.count}</div>
                      <div className="text-xs text-muted-foreground">Active Batches</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{stage.name}</h3>
                  <p className="text-muted-foreground">{stage.batches.toLocaleString()} plants</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {locations.map((location) => (
                <Card key={location.name} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{location.name}</h3>
                      <div className="text-sm text-muted-foreground">{location.batches} active batches</div>
                    </div>
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="font-medium">{location.capacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Plants</span>
                      <span className="font-medium">{location.plants.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
