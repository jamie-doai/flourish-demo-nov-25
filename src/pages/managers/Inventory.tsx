import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Package, MapPin, Layers, Plus, Search, ArrowLeft, Sprout, ClipboardList } from "lucide-react";
import { useState } from "react";
import { stages, batches, locations, getTasksByLocation } from "@/data";
import { getBaysByBuilding, getTablesByBay } from "@/data/locations";
import { getBatchesAtLocation, getBatchCountAtLocation } from "@/lib/locationUtils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { BulkActionToolbar } from "@/components/inventory/BulkActionToolbar";
import { SplitBatchDialog } from "@/components/inventory/SplitBatchDialog";
import { MergeBatchDialog } from "@/components/inventory/MergeBatchDialog";
import { DirectEditDialog } from "@/components/inventory/DirectEditDialog";
import { LossAdjustmentDialog } from "@/components/inventory/LossAdjustmentDialog";
import { CreateQuoteDialog } from "@/components/inventory/CreateQuoteDialog";
import { BatchListItem } from "@/components/inventory/BatchListItem";
import { SpeciesCard } from "@/components/inventory/SpeciesCard";
import { StageCard } from "@/components/inventory/StageCard";
import { SpeciesDetailView } from "@/components/inventory/SpeciesDetailView";
import { StageDetailView } from "@/components/inventory/StageDetailView";
import { LocationTreeView } from "@/components/inventory/LocationTreeView";
import { useToast } from "@/hooks/use-toast";
import { Batch } from "@/data/batches";
import { Label } from "@/components/ui/label";

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
  const [createQuoteDialogOpen, setCreateQuoteDialogOpen] = useState(false);
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

  const handleLossAdjustmentConfirm = (adjustments: Array<{ batchId: string; newQuantity: number; reason: string; notes: string }>) => {
    toast({
      title: "Quantities adjusted",
      description: `Updated ${adjustments.length} batch(es)`,
    });
    setSelectedBatches(new Set());
  };

  const handleCreateQuoteConfirm = (quoteId: string) => {
    setSelectedBatches(new Set());
  };

  const handleSelectAllBatches = () => {
    setSelectedBatches(new Set(batches.map(b => b.id)));
  };

  const handleDeselectAllBatches = () => {
    setSelectedBatches(new Set());
  };

  const handleSelectAllSpecies = (speciesData: SpeciesData) => {
    setSelectedBatches(prev => {
      const newSet = new Set(prev);
      speciesData.batches.forEach(batch => newSet.add(batch.id));
      return newSet;
    });
  };

  const handleDeselectAllSpecies = (speciesData: SpeciesData) => {
    setSelectedBatches(prev => {
      const newSet = new Set(prev);
      speciesData.batches.forEach(batch => newSet.delete(batch.id));
      return newSet;
    });
  };

  const handleSelectAllStage = (stageId: string) => {
    const stageBatches = batches.filter(b => b.stage === stageId);
    setSelectedBatches(prev => {
      const newSet = new Set(prev);
      stageBatches.forEach(batch => newSet.add(batch.id));
      return newSet;
    });
  };

  const handleDeselectAllStage = (stageId: string) => {
    const stageBatches = batches.filter(b => b.stage === stageId);
    setSelectedBatches(prev => {
      const newSet = new Set(prev);
      stageBatches.forEach(batch => newSet.delete(batch.id));
      return newSet;
    });
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
    
    if (!speciesData) {
      return (
        <ManagerLayout>
          <main className="container mx-auto px-12 py-8 max-w-[1920px] bg-white">
            <Button variant="primary-ghost" onClick={() => setSelectedSpecies(null)} className="mb-4">
              <ArrowLeft className="w-3 h-3 mr-2" />
              Back to Species
            </Button>
            <p>Species not found</p>
          </main>
        </ManagerLayout>
      );
    }

    const handleSelectAllSpeciesBatches = () => {
      handleSelectAllSpecies(speciesData);
    };

    const handleDeselectAllSpeciesBatches = () => {
      handleDeselectAllSpecies(speciesData);
    };

    const selectedSpeciesBatches = speciesData.batches.filter(b => selectedBatches.has(b.id));
    const totalSelectedSpeciesPlants = selectedSpeciesBatches.reduce((sum, b) => sum + b.quantity, 0);

    return (
      <ManagerLayout>
        <main className="container mx-auto px-12 py-8 max-w-[1920px] bg-white">
          <SpeciesDetailView
            speciesData={speciesData}
            onBack={() => setSelectedSpecies(null)}
            selectedBatches={selectedBatches}
            onBatchSelect={handleBatchSelect}
            onSelectAll={handleSelectAllSpeciesBatches}
            onDeselectAll={handleDeselectAllSpeciesBatches}
          />

          {/* Bulk Action Toolbar */}
          {selectedBatches.size > 0 && (
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
              onCreateQuote={() => setCreateQuoteDialogOpen(true)}
            />
          )}

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

          <CreateQuoteDialog
            open={createQuoteDialogOpen}
            onOpenChange={setCreateQuoteDialogOpen}
            batches={getSelectedBatchData()}
            onConfirm={handleCreateQuoteConfirm}
          />
        </main>
      </ManagerLayout>
    );
  }

  if (selectedStage) {
    const stage = stages.find(s => s.id === selectedStage);
    const stats = getStageStats(selectedStage);

    if (!stage || !stats) {
      return (
        <ManagerLayout>
          <main className="container mx-auto px-12 py-8 max-w-[1920px] bg-white">
            <Button variant="primary-ghost" onClick={() => setSelectedStage(null)} className="mb-4">
              <ArrowLeft className="w-3 h-3 mr-2" />
              Back to Stages
            </Button>
            <p>Stage not found</p>
          </main>
        </ManagerLayout>
      );
    }

    const handleSelectAllStageBatches = () => {
      handleSelectAllStage(selectedStage);
    };

    const handleDeselectAllStageBatches = () => {
      handleDeselectAllStage(selectedStage);
    };

    const selectedStageBatches = stats.batchList.filter(b => selectedBatches.has(b.id));
    const totalSelectedStagePlants = selectedStageBatches.reduce((sum, b) => sum + b.quantity, 0);

    return (
      <ManagerLayout>
        <main className="container mx-auto px-12 py-8 max-w-[1920px] bg-white">
          <StageDetailView
            stageName={stage.name}
            stageIcon={stage.icon}
            stats={stats}
            onBack={() => setSelectedStage(null)}
            selectedBatches={selectedBatches}
            onBatchSelect={handleBatchSelect}
            onSelectAll={handleSelectAllStageBatches}
            onDeselectAll={handleDeselectAllStageBatches}
          />

          {/* Bulk Action Toolbar */}
          {selectedBatches.size > 0 && (
            <BulkActionToolbar
              selectedCount={selectedBatches.size}
              totalPlants={totalSelectedStagePlants}
              onClearSelection={() => setSelectedBatches(new Set())}
              onMoveLocation={() => toast({ title: "Move location", description: "Feature coming soon" })}
              onChangeStatus={() => toast({ title: "Change status", description: "Feature coming soon" })}
              onSplit={() => setSplitDialogOpen(true)}
              onMerge={() => setMergeDialogOpen(true)}
              onAdjustQuantity={() => setLossAdjustmentDialogOpen(true)}
              onPrintLabels={() => toast({ title: "Print labels", description: "Feature coming soon" })}
              onApplyHold={() => toast({ title: "Apply hold", description: "Feature coming soon" })}
              onCreateQuote={() => setCreateQuoteDialogOpen(true)}
            />
          )}

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

          <CreateQuoteDialog
            open={createQuoteDialogOpen}
            onOpenChange={setCreateQuoteDialogOpen}
            batches={getSelectedBatchData()}
            onConfirm={handleCreateQuoteConfirm}
          />
        </main>
      </ManagerLayout>
    );
  }

  return (
    <ManagerLayout>
      <main className="container mx-auto px-12 py-8 max-w-[1920px] bg-white">
        <PageHeader
          title="Inventory Management"
          description="Track batches across stages and locations"
          actions={
            <Button variant="default" asChild className="flex-1 sm:flex-none">
              <Link to="/managers/batches/add">
                <Plus className="w-3 h-3 mr-2" />
                New Batch
              </Link>
            </Button>
          }
        />

        <Tabs 
          defaultValue="batches" 
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 border border-forest-green h-auto px-1 !py-1">
            <TabsTrigger value="stages" className="text-xs sm:text-sm">
              <Layers className="w-3 h-3 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Stages</span>
              <span className="sm:hidden">Stages</span>
            </TabsTrigger>
            <TabsTrigger value="species" className="text-xs sm:text-sm">
              <Sprout className="w-3 h-3 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Species</span>
              <span className="sm:hidden">Species</span>
            </TabsTrigger>
            <TabsTrigger value="batches" className="text-xs sm:text-sm">
              <Package className="w-3 h-3 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">All Batches</span>
              <span className="sm:hidden">Batches</span>
            </TabsTrigger>
            <TabsTrigger value="locations" className="text-xs sm:text-sm">
              <MapPin className="w-3 h-3 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Locations</span>
              <span className="sm:hidden">Locations</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stages" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stages.map((stage) => {
                const stats = getStageStats(stage.id);
                return (
                  <StageCard
                    key={stage.id}
                    stageName={stage.name}
                    stageIcon={stage.icon}
                    stats={stats}
                    onClick={() => setSelectedStage(stage.id)}
                  />
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="species" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getSpeciesData().map((species) => (
                <SpeciesCard
                  key={species.species}
                  species={species}
                  onClick={() => setSelectedSpecies(species.species)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="batches" className="space-y-2">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                <Input placeholder="Search batches by species or ID..." className="pl-10 border-2 border-forest-green" />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-heading-3 font-heading font-bold">All Batches</h2>
              <div className="flex items-center gap-3">
                <Label className="text-sm text-muted-foreground">
                  {selectedBatches.size} of {batches.length} selected
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAllBatches}
                    disabled={selectedBatches.size === batches.length && batches.length > 0}
                    className="border-forest-green"
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeselectAllBatches}
                    disabled={selectedBatches.size === 0}
                    className="border-forest-green"
                  >
                    Deselect All
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {batches.map((batch) => (
                <BatchListItem
                  key={batch.id}
                  batch={batch}
                  showCheckbox
                  isChecked={selectedBatches.has(batch.id)}
                  onCheckChange={handleBatchSelect}
                  onEdit={(batchId) => {
                    setSelectedBatches(new Set([batchId]));
                    setDirectEditDialogOpen(true);
                  }}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <LocationTreeView
              buildings={locations}
              getBaysByBuilding={getBaysByBuilding}
              getTablesByBay={getTablesByBay}
              getBatchCountAtLocation={getBatchCountAtLocation}
              getTasksByLocation={getTasksByLocation}
              expandedBuildings={expandedBuildings}
              expandedBays={expandedBays}
              onToggleBuilding={toggleBuilding}
              onToggleBay={toggleBay}
            />
          </TabsContent>
        </Tabs>

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
          onCreateQuote={() => setCreateQuoteDialogOpen(true)}
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

        <CreateQuoteDialog
          open={createQuoteDialogOpen}
          onOpenChange={setCreateQuoteDialogOpen}
          batches={getSelectedBatchData()}
          onConfirm={handleCreateQuoteConfirm}
        />
      </main>
    </ManagerLayout>
  );
}
