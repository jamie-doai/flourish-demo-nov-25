import { Card } from "@/components/ui/card";
import { Sprout, LucideIcon } from "lucide-react";

interface SpeciesData {
  species: string;
  scientificName: string;
  totalPlants: number;
  batchCount: number;
  health: string;
}

interface SpeciesCardProps {
  species: SpeciesData;
  onClick: () => void;
}

export function SpeciesCard({ species, onClick }: SpeciesCardProps) {
  return (
    <Card
      className="hover:shadow-card transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <Sprout className="w-3 h-3 text-forest-green" />
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
  );
}

