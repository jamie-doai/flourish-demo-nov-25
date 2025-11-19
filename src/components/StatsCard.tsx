import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card className="hover:shadow-card transition-[var(--transition-smooth)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-body-small text-muted-foreground font-medium">{title}</p>
          <p className="text-heading-1 font-heading font-bold mt-2">{value}</p>
          {trend && (
            <p
              className={`text-body mt-2 font-heading font-bold ${
                trend.positive ? "text-forest-green" : "text-destructive"
              }`}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-lime-green/20 border-2 border-forest-green flex items-center justify-center">
          <Icon className="w-6 h-6 text-forest-green" />
        </div>
      </div>
    </Card>
  );
}
