import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { BatchListItem } from "./BatchListItem";

interface StageStats {
  batches: number;
  plants: number;
  species: number;
  avgAge: number;
  batchList: Array<{
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

interface StageDetailViewProps {
  stageName: string;
  stageIcon: LucideIcon;
  stats: StageStats;
  onBack: () => void;
}

export function StageDetailView({ stageName, stageIcon: Icon, stats, onBack }: StageDetailViewProps) {
  return (
    <>
      <div className="mb-6">
        <Button
          variant="primary-ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-3 h-3 mr-2" />
          Back to Stages
        </Button>

        <div className="flex items-center gap-4 mb-4">
          <Icon className="w-8 h-8 text-forest-green" />
          <div>
            <h1 className="text-heading-1 font-heading font-bold">{stageName} Stage</h1>
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
        <h2 className="text-heading-3 font-heading font-bold mb-4">Batches in {stageName}</h2>
        <div className="flex flex-col gap-2">
          {stats.batchList.map((batch) => (
            <BatchListItem
              key={batch.id}
              batch={batch}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </>
  );
}

