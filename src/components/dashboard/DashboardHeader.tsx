import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import { formatDateTimeNZ } from "@/lib/utils";

interface DashboardHeaderProps {
  dateString: string;
}

export function DashboardHeader({ dateString }: DashboardHeaderProps) {
  return (
    <header className="md:hidden sticky top-0 bg-white border-b-2 border-forest-green z-10">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="text-heading-3 sm:text-heading-2 font-heading font-bold truncate">Dashboard</h1>
            <p className="text-body-small text-muted-foreground truncate">{dateString}</p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <Button variant="tertiary" size="sm" className="hidden min-[375px]:inline-flex">
              <Filter className="w-3 h-3 mr-2" />
              Filter
            </Button>
            <Button variant="tertiary" size="sm" className="min-[375px]:hidden">
              <Filter className="w-3 h-3" />
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="w-3 h-3 sm:mr-2" />
              <span className="hidden min-[375px]:inline">New</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

