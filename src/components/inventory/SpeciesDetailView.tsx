import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Sprout } from "lucide-react";
import { BatchListItem } from "./BatchListItem";
import { Label } from "@/components/ui/label";

interface SpeciesData {
  species: string;
  scientificName: string;
  totalPlants: number;
  batchCount: number;
  health: string;
  batches: Array<{
    id: string;
    species: string;
    scientificName: string;
    location: string;
    stage: string;
    quantity: number;
    health: string;
    urgent?: boolean;
    started?: string;
  }>;
}

interface SpeciesDetailViewProps {
  speciesData: SpeciesData;
  onBack: () => void;
  selectedBatches: Set<string>;
  onBatchSelect: (batchId: string, checked: boolean) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export function SpeciesDetailView({ 
  speciesData, 
  onBack, 
  selectedBatches, 
  onBatchSelect, 
  onSelectAll, 
  onDeselectAll 
}: SpeciesDetailViewProps) {
  const selectedCount = speciesData.batches.filter(b => selectedBatches.has(b.id)).length;
  const totalBatches = speciesData.batches.length;
  const allSelected = selectedCount === totalBatches && totalBatches > 0;

  return (
    <>
      <div className="mb-6">
        <Button
          variant="primary-ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-3 h-3 mr-2" />
          Back to Species
        </Button>

        <div className="flex items-center gap-4 mb-4">
          <Sprout className="w-8 h-8 text-forest-green" />
          <div>
            <h1 className="text-heading-1 font-heading font-bold">{speciesData.species}</h1>
            <p className="text-body text-muted-foreground">{speciesData.scientificName}</p>
          </div>
        </div>
      </div>

      {/* Species Overview Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="text-body-small text-muted-foreground mb-1">Total Plants</div>
          <div className="text-heading-2 font-heading font-bold">{speciesData.totalPlants.toLocaleString()}</div>
        </Card>
        <Card>
          <div className="text-body-small text-muted-foreground mb-1">Active Batches</div>
          <div className="text-heading-2 font-heading font-bold">{speciesData.batchCount}</div>
        </Card>
        <Card>
          <div className="text-body-small text-muted-foreground mb-1">Overall Health</div>
          <div className="text-heading-2 font-heading font-bold">{speciesData.health}</div>
        </Card>
      </div>

      {/* Batches for this Species */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading-3 font-heading font-bold">Batches of {speciesData.species}</h2>
          <div className="flex items-center gap-3">
            <Label className="text-sm text-muted-foreground">
              {selectedCount} of {totalBatches} selected
            </Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onSelectAll}
                disabled={allSelected}
                className="border-forest-green"
              >
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onDeselectAll}
                disabled={selectedCount === 0}
                className="border-forest-green"
              >
                Deselect All
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {speciesData.batches.map((batch) => (
            <BatchListItem
              key={batch.id}
              batch={batch}
              variant="compact"
              showCheckbox
              isChecked={selectedBatches.has(batch.id)}
              onCheckChange={onBatchSelect}
            />
          ))}
        </div>
      </div>
    </>
  );
}

