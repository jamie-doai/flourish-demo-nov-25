import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import { formatDateTimeNZ } from "@/lib/utils";

interface DashboardHeaderProps {
  dateString: string;
}

export function DashboardHeader({ dateString }: DashboardHeaderProps) {
  return (
    <header className="md:hidden sticky top-0 bg-white border-b-2 border-forest-green z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-1.5">
          <div>
            <h1 className="text-heading-2 font-heading font-bold">Dashboard</h1>
            <p className="text-body-small text-muted-foreground">{dateString}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="tertiary" size="sm">
              <Filter className="w-3 h-3 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="w-3 h-3 mr-2" />
              New
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

