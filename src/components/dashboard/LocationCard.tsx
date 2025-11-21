import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Location } from "@/data/locations";

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Link to={`/managers/locations/${location.id}`}>
      <Card className="hover:shadow-card transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-forest-green" />
            <h3 className="font-heading font-bold text-heading-4">{location.name}</h3>
          </div>
          <Badge variant={location.percentage && location.percentage >= 90 ? "destructive" : "secondary"}>
            {location.percentage}%
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-2 text-body">
          <div>
            <p className="text-muted-foreground text-xs">Type</p>
            <p className="font-medium">{location.type}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Batches</p>
            <p className="font-medium">{location.batches}/{location.capacity}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Temp</p>
            <p className="font-medium">{location.temperature || "-"}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

