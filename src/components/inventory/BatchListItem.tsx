import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Batch } from "@/data/batches";
import { Edit3 } from "lucide-react";

interface BatchListItemProps {
  batch: Batch;
  showCheckbox?: boolean;
  isChecked?: boolean;
  onCheckChange?: (batchId: string, checked: boolean) => void;
  onEdit?: (batchId: string) => void;
  variant?: "default" | "compact";
}

export function BatchListItem({
  batch,
  showCheckbox = false,
  isChecked = false,
  onCheckChange,
  onEdit,
  variant = "default",
}: BatchListItemProps) {
  const healthBadgeVariant =
    batch.health === "Excellent" ? "default" :
    batch.health === "Good" ? "secondary" :
    "outline";

  const healthBadgeClass =
    batch.health === "Excellent" ? "bg-success/20 text-success" :
    batch.health === "Good" ? "bg-info/20 text-info" :
    "bg-warning/20 text-warning";

  if (variant === "compact") {
    return (
      <Link to={`/managers/batch/${batch.id}`}>
        <Card
          className={`hover:shadow-card hover:bg-gray-50 transition-shadow cursor-pointer ${batch.urgent ? 'border-l-4 border-l-caution' : ''}`}
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
                <span className={`px-2 py-1 text-body-small rounded-full font-heading font-bold ${healthBadgeClass}`}>
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
    );
  }

  return (
    <div className="relative">
      <Card className="hover:shadow-card hover:bg-gray-50 transition-shadow">
        <div className="flex items-start gap-4">
          {showCheckbox && (
            <div className="pt-1">
              <Checkbox
                checked={isChecked}
                onCheckedChange={(checked) => onCheckChange?.(batch.id, checked as boolean)}
              />
            </div>
          )}
          <Link to={`/managers/batch/${batch.id}`} className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-2">
                  <h3 className="text-heading-4 font-heading font-bold">{batch.id}</h3>
                  {batch.urgent && (
                    <Badge variant="destructive">Urgent</Badge>
                  )}
                  <Badge variant={healthBadgeVariant}>
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
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(batch.id)}
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

