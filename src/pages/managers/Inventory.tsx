import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Package, MapPin, Layers, Plus, Search, ArrowLeft, Thermometer, Leaf, Sprout, Edit3, ClipboardList, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { stages, batches, locations, getTasksByLocation } from "@/data";
import { getBaysByBuilding, getTablesByBay } from "@/data/locations";
import { getBatchesAtLocation, getBatchCountAtLocation } from "@/lib/locationUtils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  const [expandedBuildings, setExpandedBuildings] = useState<Set<string>>(new Set());
  const [expandedBays, setExpandedBays] = useState<Set<string>>(new Set());

  const toggleBuilding = (buildingId: string) => {
    setExpandedBuildings(prev => {
      const newSet = new Set(prev);
      if (newSet.has(buildingId)) {
        newSet.delete(buildingId);
      } else {
        newSet.add(buildingId);
      }
      return newSet;
    });
  };

  const toggleBay = (bayId: string) => {
    setExpandedBays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bayId)) {
        newSet.delete(bayId);
      } else {
        newSet.add(bayId);
      }
      return newSet;
    });
  };

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
        <main className="container mx-auto px-4 py-6 bg-white">
          <div className="mb-6">
            <Button 
              variant="primary-ghost" 
              onClick={() => setSelectedSpecies(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              Back to Species
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-lg bg-lime-green/20 border-2 border-forest-green flex items-center justify-center">
                <Sprout className="w-8 h-8 text-forest-green" />
              </div>
              <div>
                <h1 className="text-heading-1 font-heading font-bold">{speciesData?.species}</h1>
                <p className="text-body text-muted-foreground">{speciesData?.scientificName}</p>
              </div>
            </div>
          </div>

          {/* Species Overview Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <div className="text-body-small text-muted-foreground mb-1">Total Plants</div>
              <div className="text-heading-2 font-heading font-bold">{speciesData?.totalPlants.toLocaleString()}</div>
            </Card>
            <Card>
              <div className="text-body-small text-muted-foreground mb-1">Active Batches</div>
              <div className="text-heading-2 font-heading font-bold">{speciesData?.batchCount}</div>
            </Card>
            <Card>
              <div className="text-body-small text-muted-foreground mb-1">Overall Health</div>
              <div className="text-heading-2 font-heading font-bold">{speciesData?.health}</div>
            </Card>
          </div>

          {/* Batches for this Species */}
          <div>
            <h2 className="text-heading-3 font-heading font-bold mb-4">Batches of {speciesData?.species}</h2>
            <div className="space-y-2">
              {speciesData?.batches.map((batch) => (
                <Link to={`/managers/batch/${batch.id}`} key={batch.id}>
                  <Card 
                    className={`hover:shadow-card transition-shadow cursor-pointer ${batch.urgent ? 'border-l-4 border-l-caution' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-2">
                          <h3 className="text-heading-4 font-heading font-bold">{batch.id}</h3>
                          {batch.urgent && (
                            <span className="px-2 py-1 bg-caution/20 text-caution text-body-small rounded-full font-heading font-bold">
                              Urgent
                            </span>
                          )}
                          <span className={`px-2 py-1 text-body-small rounded-full font-heading font-bold ${
                            batch.health === "Excellent" ? "bg-success/20 text-success" :
                            batch.health === "Good" ? "bg-info/20 text-info" :
                            "bg-warning/20 text-warning"
                          }`}>
                            {batch.health}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-body">
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
        <main className="container mx-auto px-4 py-6 bg-white">
          <div className="mb-6">
            <Button 
              variant="primary-ghost" 
              onClick={() => setSelectedStage(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              Back to Stages
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-lg bg-lime-green/20 border-2 border-forest-green flex items-center justify-center`}>
                <Icon className="w-8 h-8 text-forest-green" />
              </div>
              <div>
                <h1 className="text-heading-1 font-heading font-bold">{stage?.name} Stage</h1>
                <p className="text-body text-muted-foreground">Detailed view and management</p>
              </div>
            </div>
          </div>

          {/* Stage Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <div className="text-body-small text-muted-foreground mb-1">Total Plants</div>
              <div className="text-heading-2 font-heading font-bold">{stats.plants.toLocaleString()}</div>
            </Card>
            <Card>
              <div className="text-body-small text-muted-foreground mb-1">Active Batches</div>
              <div className="text-heading-2 font-heading font-bold">{stats.batches}</div>
            </Card>
            <Card>
              <div className="text-body-small text-muted-foreground mb-1">Species Types</div>
              <div className="text-heading-2 font-heading font-bold">{stats.species}</div>
            </Card>
            <Card>
              <div className="text-body-small text-muted-foreground mb-1">Average Age</div>
              <div className="text-heading-2 font-heading font-bold">{stats.avgAge} days</div>
            </Card>
          </div>

          {/* Batches in Stage */}
          <div>
            <h2 className="text-heading-3 font-heading font-bold mb-4">Batches in {stage?.name}</h2>
            <div className="space-y-2">
              {stats.batchList.map((batch) => (
                <Link to={`/managers/batch/${batch.id}`} key={batch.id}>
                  <Card 
                    className={`hover:shadow-card transition-shadow cursor-pointer ${batch.urgent ? `border-l-4 border-l-caution` : ''}`}
                  >
                    <div className="flex items-start justify-between">
                       <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-2">
                          <h3 className="text-heading-4 font-heading font-bold">{batch.id}</h3>
                          {batch.urgent && (
                            <span className="px-2 py-1 bg-caution/20 text-caution text-body-small rounded-full font-heading font-bold">
                              Urgent
                            </span>
                          )}
                          <span className={`px-2 py-1 text-body-small rounded-full font-heading font-bold ${
                            batch.health === "Excellent" ? "bg-success/20 text-success" :
                            batch.health === "Good" ? "bg-info/20 text-info" :
                            "bg-warning/20 text-warning"
                          }`}>
                            {batch.health}
                          </span>
                        </div>
                        <p className="text-body text-muted-foreground mb-1">{batch.species}</p>
                        <p className="text-body-small text-muted-foreground mb-3">{batch.scientificName}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-body">
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
                      <Button variant="primary-ghost" size="sm">View Details</Button>
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
      <main className="container mx-auto px-4 py-6 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-heading-1 font-heading font-bold mb-2">Inventory Management</h1>
            <p className="text-body text-muted-foreground">Track batches across stages and locations</p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button
              variant={activeView === "stocktake" ? "default" : "primary-outline"}
              onClick={() => setActiveView("stocktake")}
              className="flex-1 sm:flex-none"
            >
              <ClipboardList className="w-6 h-6 mr-2" />
              Stocktake
            </Button>
            <Button variant="default" asChild className="flex-1 sm:flex-none">
              <Link to="/managers/batches/add">
                <Plus className="w-6 h-6" />
                New Batch
              </Link>
            </Button>
          </div>
        </div>

        {activeView === "stocktake" ? (
          <>
            <Button
              variant="primary-ghost"
              onClick={() => setActiveView("inventory")}
              className="mb-4"
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              Back to Inventory
            </Button>
            <StocktakeManager />
          </>
        ) : (
          <Tabs defaultValue="batches" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 border-2 border-forest-green">
            <TabsTrigger value="stages" className="text-xs sm:text-sm">
              <Layers className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Stages</span>
              <span className="sm:hidden">Stages</span>
            </TabsTrigger>
            <TabsTrigger value="species" className="text-xs sm:text-sm">
              <Sprout className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Species</span>
              <span className="sm:hidden">Species</span>
            </TabsTrigger>
            <TabsTrigger value="batches" className="text-xs sm:text-sm">
              <Package className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">All Batches</span>
              <span className="sm:hidden">Batches</span>
            </TabsTrigger>
            <TabsTrigger value="locations" className="text-xs sm:text-sm">
              <MapPin className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Locations</span>
              <span className="sm:hidden">Locations</span>
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
                    className="hover:shadow-card transition-all cursor-pointer group"
                    onClick={() => setSelectedStage(stage.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-lime-green/20 border-2 border-forest-green flex items-center justify-center">
                        <Icon className="w-6 h-6 text-forest-green" />
                      </div>
                      <div className="text-right">
                        <div className="text-heading-2 font-heading font-bold">{stats.batches}</div>
                        <div className="text-body-small text-muted-foreground">Batches</div>
                      </div>
                    </div>
                    <h3 className="text-heading-3 font-heading font-bold mb-2">{stage.name}</h3>
                    <div className="space-y-1 text-body-small text-muted-foreground">
                      <p>{stats.plants.toLocaleString()} plants</p>
                      <p>{stats.species} species</p>
                    </div>
                    <div className="mt-4 text-body text-forest-green font-heading font-bold group-hover:translate-x-1 transition-transform inline-block">
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
                  className="hover:shadow-card transition-all cursor-pointer group"
                  onClick={() => setSelectedSpecies(species.species)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-lime-green/20 border-2 border-forest-green flex items-center justify-center">
                      <Sprout className="w-6 h-6 text-forest-green" />
                    </div>
                    <div className="text-right">
                      <div className="text-heading-2 font-heading font-bold">{species.batchCount}</div>
                      <div className="text-body-small text-muted-foreground">Batches</div>
                    </div>
                  </div>
                  <h3 className="text-heading-3 font-heading font-bold mb-1">{species.species}</h3>
                  <p className="text-body-small text-muted-foreground mb-3 italic">{species.scientificName}</p>
                  <div className="space-y-1 text-body-small text-muted-foreground">
                    <p>{species.totalPlants.toLocaleString()} plants</p>
                    <p className={`inline-block px-2 py-1 text-body-small rounded-full font-heading font-bold ${
                      species.health === "Excellent" ? "bg-success/20 text-success" :
                      species.health === "Good" ? "bg-info/20 text-info" :
                      "bg-warning/20 text-warning"
                    }`}>
                      {species.health}
                    </p>
                  </div>
                  <div className="mt-4 text-body text-forest-green font-heading font-bold group-hover:translate-x-1 transition-transform inline-block">
                    View details →
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="batches" className="space-y-2">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                <Input placeholder="Search batches by species or ID..." className="pl-10 border-2 border-forest-green" />
              </div>
            </div>

            <div className="space-y-3">
              {batches.map((batch) => (
                <div key={batch.id} className="relative">
                  <Card className="hover:shadow-card transition-shadow">
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
                            <div className="flex items-center gap-1.5 mb-2">
                              <h3 className="text-heading-4 font-heading font-bold">{batch.id}</h3>
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
                            
                            <p className="text-body text-muted-foreground mb-1">{batch.species}</p>
                            <p className="text-body-small text-muted-foreground mb-3">{batch.scientificName}</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-body">
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
                        <Edit3 className="w-6 h-6" />
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <div className="space-y-3">
              {locations
                .filter(location => location.type === 'BUILDING')
                .map((building) => {
                const bays = getBaysByBuilding(building.id);
                const isExpanded = expandedBuildings.has(building.id);
                const buildingTasks = getTasksByLocation(building.name);
                const pendingTasks = buildingTasks.filter(t => 
                  t.status === "Pending" || t.status === "today" || t.status === "overdue" || t.status === "In Progress"
                );
                
                return (
                  <Card key={building.id} className="overflow-hidden">
                    <Collapsible open={isExpanded} onOpenChange={() => toggleBuilding(building.id)}>
                      <div className="p-4 bg-muted/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                {isExpanded ? (
                                  <ChevronDown className="h-6 w-6" />
                                ) : (
                                  <ChevronRight className="h-6 w-6" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                            <MapPin className="w-6 h-6 text-primary" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold">{building.name}</h3>
                                <Badge variant="outline" className="text-xs">{building.code}</Badge>
                                {pendingTasks.length > 0 && (
                                  <Badge variant="secondary" className="text-xs">
                                    {pendingTasks.length} tasks
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span>{building.climateControl}</span>
                                <span>{bays.length} bays</span>
                                {building.temperature && (
                                  <div className="flex items-center gap-1">
                                    <Thermometer className="w-3 h-3" />
                                    <span>{building.temperature}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <Link to={`/managers/locations/${building.id}`}>
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <CollapsibleContent>
                        <div className="p-4 space-y-2 bg-white">
                          {bays.length === 0 ? (
                            <p className="text-sm text-muted-foreground italic px-4 py-2">No bays configured</p>
                          ) : (
                            bays.map((bay) => {
                              const tables = getTablesByBay(bay.id);
                              const isBayExpanded = expandedBays.has(bay.id);
                              const bayBatchCount = getBatchCountAtLocation(bay.id, true);
                              
                              return (
                                <Card key={bay.id} className="ml-8">
                                  <Collapsible open={isBayExpanded} onOpenChange={() => toggleBay(bay.id)}>
                                    <div className="p-3 bg-muted/20">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 flex-1">
                                          <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                              {isBayExpanded ? (
                                                <ChevronDown className="h-3 w-3" />
                                              ) : (
                                                <ChevronRight className="h-3 w-3" />
                                              )}
                                            </Button>
                                          </CollapsibleTrigger>
                                          <Layers className="w-6 h-6 text-muted-foreground" />
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                              <span className="font-medium text-sm">{bay.name}</span>
                                              <Badge variant="outline" className="text-xs">{bay.code}</Badge>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                                              <span>{tables.length} tables</span>
                                              <span>{bayBatchCount} batches</span>
                                              {bay.maxCapacity && (
                                                <span>{bay.maxCapacity} capacity</span>
                                              )}
                                            </div>
                                          </div>
                                          <Link to={`/managers/locations/${bay.id}`}>
                                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                                              View
                                            </Button>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>

                                    <CollapsibleContent>
                                      <div className="p-3 space-y-1.5 bg-white">
                                        {tables.length === 0 ? (
                                          <p className="text-xs text-muted-foreground italic px-3 py-2">No tables configured</p>
                                        ) : (
                                          tables.map((table) => {
                                            const tableBatchCount = getBatchCountAtLocation(table.id, false);
                                            
                                            return (
                                              <Link key={table.id} to={`/managers/locations/${table.id}`}>
                                                <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 transition-colors cursor-pointer ml-6">
                                                  <Package className="w-3.5 h-3.5 text-muted-foreground" />
                                                  <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                      <span className="text-sm font-medium">{table.name}</span>
                                                      <Badge variant="secondary" className="text-xs">{table.code}</Badge>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                      <span>{tableBatchCount} batches</span>
                                                      {table.maxCapacity && (
                                                        <span>Max: {table.maxCapacity}</span>
                                                      )}
                                                      {table.dimensions && (
                                                        <span>{table.dimensions}</span>
                                                      )}
                                                    </div>
                                                  </div>
                                                  <ChevronRight className="w-6 h-6 text-muted-foreground" />
                                                </div>
                                              </Link>
                                            );
                                          })
                                        )}
                                      </div>
                                    </CollapsibleContent>
                                  </Collapsible>
                                </Card>
                              );
                            })
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
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
