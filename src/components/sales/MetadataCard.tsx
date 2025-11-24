import { Card } from "@/components/ui/card";

interface MetadataItem {
  label: string;
  value: string | React.ReactNode;
}

interface MetadataCardProps {
  items: MetadataItem[];
  className?: string;
}

export function MetadataCard({ items, className }: MetadataCardProps) {
  return (
    <Card className={`p-3 ${className || ""}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((item, index) => (
          <div key={index} className="min-w-0">
            <div className="text-xs text-muted-foreground mb-0.5 truncate">
              {item.label}
            </div>
            <div className="text-sm font-medium truncate">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}


