import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StageStats {
  batches: number;
  plants: number;
  species: number;
  avgAge: number;
}

interface StageCardProps {
  stageName: string;
  stageIcon: LucideIcon;
  stats: StageStats;
  onClick: () => void;
}

export function StageCard({ stageName, stageIcon: Icon, stats, onClick }: StageCardProps) {
  return (
    <Card
      className="hover:shadow-card transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <Icon className="w-3 h-3 text-forest-green" />
        <div className="text-right">
          <div className="text-heading-2 font-heading font-bold">{stats.batches}</div>
          <div className="text-body-small text-muted-foreground">Batches</div>
        </div>
      </div>
      <h3 className="text-heading-3 font-heading font-bold mb-2">{stageName}</h3>
      <div className="space-y-1 text-body-small text-muted-foreground">
        <p>{stats.plants.toLocaleString()} plants</p>
        <p>{stats.species} species</p>
      </div>
      <div className="mt-4 text-body text-forest-green font-heading font-bold group-hover:translate-x-1 transition-transform inline-block">
        View details →
      </div>
    </Card>
  );
}

