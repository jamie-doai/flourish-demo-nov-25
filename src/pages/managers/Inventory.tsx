import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Package, MapPin, Layers, Plus, Search, ArrowLeft, Thermometer, Leaf, Sprout, Edit3, ClipboardList } from "lucide-react";
import { useState } from "react";
import { stages, batches, locations, getTasksByLocation } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { BulkActionToolbar } from "@/components/inventory/BulkActionToolbar";
import { SplitBatchDialog } from "@/components/inventory/SplitBatchDialog";
import { MergeBatchDialog } from "@/components/inventory/MergeBatchDialog";
import { DirectEditDialog } from "@/components/inventory/DirectEditDialog";
import { StocktakeManager } from "@/components/inventory/StocktakeManager";
import { LossAdjustmentDialog } from "@/components/inventory/LossAdjustmentDialog";
import { useToast } from "@/hooks/use-toast";
import { Batch } from "@/data/batches";

interface SpeciesData {
  species: string;
  scientificName: string;
  totalPlants: number;
  batchCount: number;
  health: string;
  batches: typeof batches;
}

export default function ManagerInventory() {
  const { toast } = useToast();
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [selectedBatches, setSelectedBatches] = useState<Set<string>>(new Set());
  const [splitDialogOpen, setSplitDialogOpen] = useState(false);
  const [mergeDialogOpen, setMergeDialogOpen] = useState(false);
  const [directEditDialogOpen, setDirectEditDialogOpen] = useState(false);
  const [lossAdjustmentDialogOpen, setLossAdjustmentDialogOpen] = useState(false);
  const [activeView, setActiveView] = useState<"inventory" | "stocktake">("inventory");

  const handleBatchSelect = (batchId: string, checked: boolean) => {
    setSelectedBatches(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(batchId);
      } else {
        newSet.delete(batchId);
      }
      return newSet;
    });
  };

  const getSelectedBatchData = () => {
    return batches.filter(b => selectedBatches.has(b.id));
  };

  const totalSelectedPlants = getSelectedBatchData().reduce((sum, b) => sum + b.quantity, 0);

  const handleSplitConfirm = (splits: number[]) => {
    toast({
      title: "Batch split successful",
      description: `Created ${splits.length} new batches`,
    });
  };

  const handleMergeConfirm = (newBatchCode: string) => {
    toast({
      title: "Batches merged",
      description: `Created new batch: ${newBatchCode}`,
    });
    setSelectedBatches(new Set());
  };

  const handleDirectEditConfirm = (updates: Partial<Batch>) => {
    toast({
      title: "Batch updated",
      description: "Changes saved successfully",
    });
  };

  const handleLossAdjustmentConfirm = (adjustments: any[]) => {
    toast({
      title: "Quantities adjusted",
      description: `Updated ${adjustments.length} batch(es)`,
    });
    setSelectedBatches(new Set());
  };

  const getSpeciesData = (): SpeciesData[] => {
    const speciesMap = new Map<string, SpeciesData>();
    
    batches.forEach(batch => {
      if (!speciesMap.has(batch.species)) {
        speciesMap.set(batch.species, {
          species: batch.species,
          scientificName: batch.scientificName,
          totalPlants: 0,
          batchCount: 0,
          health: batch.health,
          batches: []
        });
      }
      
      const speciesData = speciesMap.get(batch.species)!;
      speciesData.totalPlants += batch.quantity;
      speciesData.batchCount += 1;
      speciesData.batches.push(batch);
    });
    
    return Array.from(speciesMap.values()).sort((a, b) => a.species.localeCompare(b.species));
  };

  const getStageStats = (stageId: string) => {
    const stageBatches = batches.filter(b => b.stage === stageId);
    const totalPlants = stageBatches.reduce((sum, b) => sum + b.quantity, 0);
    const species = new Set(stageBatches.map(b => b.species)).size;
    const avgAge = Math.floor(stageBatches.reduce((sum, b) => {
      const days = Math.floor((new Date().getTime() - new Date(b.started!).getTime()) / (1000 * 60 * 60 * 24));
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

  if (selectedSpecies) {
    const speciesData = getSpeciesData().find(s => s.species === selectedSpecies);
    
  return (
    <ManagerLayout>
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedSpecies(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Species
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sprout className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{speciesData?.species}</h1>
                <p className="text-muted-foreground">{speciesData?.scientificName}</p>
              </div>
            </div>
          </div>

          {/* Species Overview Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Total Plants</div>
              <div className="text-2xl font-bold">{speciesData?.totalPlants.toLocaleString()}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Active Batches</div>
              <div className="text-2xl font-bold">{speciesData?.batchCount}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Overall Health</div>
              <div className="text-2xl font-bold">{speciesData?.health}</div>
            </Card>
          </div>

          {/* Batches for this Species */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Batches of {speciesData?.species}</h2>
            <div className="space-y-4">
              {speciesData?.batches.map((batch) => (
                <Link to={`/managers/batch/${batch.id}`} key={batch.id}>
                  <Card 
                    className={`p-4 hover:shadow-md transition-shadow cursor-pointer ${batch.urgent ? 'border-l-4 border-l-orange-500' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Leaf className="w-5 h-5 text-primary" />
                          <h3 className="text-lg font-semibold">{batch.id}</h3>
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
                </Link>
              ))}
            </div>
          </div>
        </main>
      </ManagerLayout>
    );
  }

  if (selectedStage) {
    const stage = stages.find(s => s.id === selectedStage);
    const stats = getStageStats(selectedStage);
    const Icon = stage?.icon;

    return (
      <ManagerLayout>
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
        <div className="space-y-4">
              {stats.batchList.map((batch) => (
                <Link to={`/managers/batch/${batch.id}`} key={batch.id}>
                  <Card 
                    className={`p-4 hover:shadow-md transition-shadow cursor-pointer ${batch.urgent ? `border-l-4 ${stage?.borderColor}` : ''}`}
                  >
                    <div className="flex items-start justify-between">
                       <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Leaf className="w-5 h-5 text-primary" />
                          <h3 className="text-lg font-semibold">{batch.id}</h3>
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
                        <p className="text-sm text-muted-foreground mb-1">{batch.species}</p>
                        <p className="text-xs text-muted-foreground mb-3">{batch.scientificName}</p>
                        
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
                               {Math.floor((new Date().getTime() - new Date(batch.started!).getTime()) / (1000 * 60 * 60 * 24))} days
                             </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </ManagerLayout>
    );
  }

  return (
    <ManagerLayout>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
            <p className="text-muted-foreground">Track batches across stages and locations</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeView === "stocktake" ? "default" : "outline"}
              onClick={() => setActiveView("stocktake")}
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              Stocktake
            </Button>
            <Button variant="hero" asChild>
              <Link to="/managers/batches/add">
                <Plus className="w-4 h-4" />
                New Batch
              </Link>
            </Button>
          </div>
        </div>

        {activeView === "stocktake" ? (
          <>
            <Button
              variant="ghost"
              onClick={() => setActiveView("inventory")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Inventory
            </Button>
            <StocktakeManager />
          </>
        ) : (
          <Tabs defaultValue="batches" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="stages">
              <Layers className="w-4 h-4 mr-2" />
              Stages
            </TabsTrigger>
            <TabsTrigger value="species">
              <Sprout className="w-4 h-4 mr-2" />
              Species
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

          <TabsContent value="species" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getSpeciesData().map((species) => (
                <Card 
                  key={species.species} 
                  className="p-6 hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => setSelectedSpecies(species.species)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sprout className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{species.batchCount}</div>
                      <div className="text-xs text-muted-foreground">Batches</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{species.species}</h3>
                  <p className="text-sm text-muted-foreground mb-3 italic">{species.scientificName}</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{species.totalPlants.toLocaleString()} plants</p>
                    <p className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                      species.health === "Excellent" ? "bg-green-100 text-green-700" :
                      species.health === "Good" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {species.health}
                    </p>
                  </div>
                  <div className="mt-4 text-sm text-primary font-medium group-hover:translate-x-1 transition-transform inline-block">
                    View details →
                  </div>
                </Card>
              ))}
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
              {batches.map((batch) => (
                <div key={batch.id} className="relative">
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="pt-1">
                        <Checkbox
                          checked={selectedBatches.has(batch.id)}
                          onCheckedChange={(checked) => handleBatchSelect(batch.id, checked as boolean)}
                        />
                      </div>
                      <Link to={`/managers/batch/${batch.id}`} className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Leaf className="w-5 h-5 text-primary" />
                              <h3 className="text-lg font-semibold">{batch.id}</h3>
                              {batch.urgent && (
                                <Badge variant="destructive">Urgent</Badge>
                              )}
                              <Badge variant={
                                batch.health === "Excellent" ? "default" :
                                batch.health === "Good" ? "secondary" :
                                "outline"
                              }>
                                {batch.health}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-1">{batch.species}</p>
                            <p className="text-xs text-muted-foreground mb-3">{batch.scientificName}</p>
                            
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
                        </div>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedBatches(new Set([batch.id]));
                          setDirectEditDialogOpen(true);
                        }}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {locations
                .filter(location => location.type === 'BUILDING')
                .map((location) => {
                const locationTasks = getTasksByLocation(location.name);
                const pendingTasks = locationTasks.filter(t => 
                  t.status === "Pending" || t.status === "today" || t.status === "overdue" || t.status === "In Progress"
                );
                return (
                  <Link key={location.id} to={`/managers/locations/${location.id}`}>
                    <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-semibold">{location.name}</h3>
                            {pendingTasks.length > 0 && (
                              <Badge variant="secondary" className="ml-2">
                                {pendingTasks.length} {pendingTasks.length === 1 ? 'task' : 'tasks'}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{location.climateControl || location.type}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">{location.batches || 0} batches</span>
                            {location.temperature && (
                              <div className="flex items-center gap-1">
                                <Thermometer className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{location.temperature}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {location.capacity !== undefined && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Capacity</span>
                            <span className="font-medium">{location.capacity}%</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Plants</span>
                          <span className="font-medium">{(location.plants || location.totalPlants || 0).toLocaleString()}</span>
                        </div>
                        {locationTasks.length > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tasks</span>
                            <span className="font-medium">{locationTasks.length} total</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 text-sm text-primary font-medium group-hover:translate-x-1 transition-transform inline-block">
                        View details →
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
        )}

        {/* Bulk Action Toolbar */}
        <BulkActionToolbar
          selectedCount={selectedBatches.size}
          totalPlants={totalSelectedPlants}
          onClearSelection={() => setSelectedBatches(new Set())}
          onMoveLocation={() => toast({ title: "Move location", description: "Feature coming soon" })}
          onChangeStatus={() => toast({ title: "Change status", description: "Feature coming soon" })}
          onSplit={() => setSplitDialogOpen(true)}
          onMerge={() => setMergeDialogOpen(true)}
          onAdjustQuantity={() => setLossAdjustmentDialogOpen(true)}
          onPrintLabels={() => toast({ title: "Print labels", description: "Feature coming soon" })}
          onApplyHold={() => toast({ title: "Apply hold", description: "Feature coming soon" })}
        />

        {/* Dialogs */}
        <SplitBatchDialog
          open={splitDialogOpen}
          onOpenChange={setSplitDialogOpen}
          batch={getSelectedBatchData()[0] || null}
          onConfirm={handleSplitConfirm}
        />

        <MergeBatchDialog
          open={mergeDialogOpen}
          onOpenChange={setMergeDialogOpen}
          batches={getSelectedBatchData()}
          onConfirm={handleMergeConfirm}
        />

        <DirectEditDialog
          open={directEditDialogOpen}
          onOpenChange={setDirectEditDialogOpen}
          batch={getSelectedBatchData()[0] || null}
          onConfirm={handleDirectEditConfirm}
        />

        <LossAdjustmentDialog
          open={lossAdjustmentDialogOpen}
          onOpenChange={setLossAdjustmentDialogOpen}
          batches={getSelectedBatchData()}
          onConfirm={handleLossAdjustmentConfirm}
        />
      </main>
    </ManagerLayout>
  );
}
