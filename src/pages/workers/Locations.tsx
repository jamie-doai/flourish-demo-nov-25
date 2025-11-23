import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { WorkerBottomNav } from "@/components/WorkerBottomNav";
import { WorkerPageHeader } from "@/components/WorkerPageHeader";
import { MapPin, ChevronDown, ChevronRight, AlertCircle } from "lucide-react";
import { locations, getTasksByLocation, batches } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function WorkerLocations() {
  const [openLocations, setOpenLocations] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"tasks-most" | "tasks-least" | "name-asc" | "name-desc">("tasks-most");

  const toggleLocation = (locationId: string) => {
    setOpenLocations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(locationId)) {
        newSet.delete(locationId);
      } else {
        newSet.add(locationId);
      }
      return newSet;
    });
  };

  const getBatchCount = (locationName: string) => {
    return batches.filter(b => b.location === locationName).length;
  };

  const getChildLocations = (parentId: string) => {
    return locations.filter(loc => loc.parentLocationId === parentId);
  };

  const topLevelLocations = locations.filter(loc => !loc.parentLocationId);

  // Sort locations
  const sortedLocations = [...topLevelLocations].sort((a, b) => {
    const aTaskCount = getTasksByLocation(a.name).filter(t => 
      t.status === "overdue" || t.status === "today" || t.status === "upcoming"
    ).length;
    const bTaskCount = getTasksByLocation(b.name).filter(t => 
      t.status === "overdue" || t.status === "today" || t.status === "upcoming"
    ).length;

    switch (sortBy) {
      case "tasks-most":
        return bTaskCount - aTaskCount;
      case "tasks-least":
        return aTaskCount - bTaskCount;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="max-w-mobile mx-auto bg-[#F8FAF9] min-h-screen pb-20">
        <WorkerPageHeader title="Locations" backTo="/workers" />

        <div className="container mx-auto px-4 pt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-[#37474F]">
                Sort by: {sortBy === "tasks-most" && "Tasks (Most)"}
                {sortBy === "tasks-least" && "Tasks (Least)"}
                {sortBy === "name-asc" && "Name (A-Z)"}
                {sortBy === "name-desc" && "Name (Z-A)"}
                <ChevronDown className="w-3 h-3 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white z-50">
              <DropdownMenuItem onClick={() => setSortBy("tasks-most")}>
                Tasks (Most)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("tasks-least")}>
                Tasks (Least)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name-asc")}>
                Name (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name-desc")}>
                Name (Z-A)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <main className="container mx-auto px-4 py-4">
          <div className="space-y-2">
            {sortedLocations.map((location) => {
              const locationTasks = getTasksByLocation(location.name);
              const urgentTasks = locationTasks.filter(t => t.status === "overdue");
              const totalTasks = locationTasks.filter(t => 
                t.status === "overdue" || t.status === "today" || t.status === "upcoming"
              ).length;
              const batchCount = getBatchCount(location.name);
              const childLocations = getChildLocations(location.id);
              const isOpen = openLocations.has(location.id);

              return (
                <Collapsible key={location.id} open={isOpen} onOpenChange={() => toggleLocation(location.id)}>
                  <Card className="bg-white border border-[#37474F]/20 shadow-sm overflow-hidden p-3">
                    <Link 
                      to={`/workers/locations/${location.id}`}
                      className="block hover:bg-[#3B7A57]/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-[#3B7A57] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-[#37474F]">{location.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5 text-sm text-[#37474F]">
                            <span>{batchCount} batches</span>
                            <span>{totalTasks} tasks</span>
                            {urgentTasks.length > 0 && (
                              <Badge variant="destructive" className="flex items-center gap-1 text-xs py-0">
                                <AlertCircle className="w-3 h-3" />
                                {urgentTasks.length}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                    
                    {childLocations.length > 0 && (
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="w-full py-1.5 px-3 rounded-none hover:bg-[#3B7A57]/10 flex items-center justify-center gap-2 border-t border-[#37474F]/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="text-sm text-[#37474F]">Show Tables/Bays</span>
                          <ChevronDown className={`w-3 h-3 text-[#37474F] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </Button>
                      </CollapsibleTrigger>
                    )}
                    
                    {childLocations.length > 0 && (
                      <CollapsibleContent className="px-3 pb-2">
                        <div className="space-y-1 mt-1 pl-6 border-l-2 border-[#3B7A57]/20">
                          {childLocations.map((child) => {
                            const childTasks = getTasksByLocation(child.name);
                            const childUrgent = childTasks.filter(t => t.status === "overdue");
                            const childTotal = childTasks.filter(t => 
                              t.status === "overdue" || t.status === "today" || t.status === "upcoming"
                            ).length;
                            const childBatches = getBatchCount(child.name);

                            return (
                              <Link key={child.id} to={`/workers/locations/${child.id}`}>
                                <Card className="p-3 bg-[#F8FAF9] border border-[#37474F]/10 hover:border-[#37474F]/30 hover:bg-white transition-all">
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-sm font-medium text-[#37474F]">{child.name}</h4>
                                      <div className="flex items-center gap-2 mt-0.5 text-xs text-[#37474F]">
                                        <span>{childBatches} batches</span>
                                        <span>{childTotal} tasks</span>
                                        {childUrgent.length > 0 && (
                                          <Badge variant="destructive" className="flex items-center gap-1 text-xs py-0 px-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {childUrgent.length}
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              </Link>
                            );
                          })}
                        </div>
                      </CollapsibleContent>
                    )}
                  </Card>
                </Collapsible>
              );
            })}
          </div>
        </main>

        <WorkerBottomNav />
      </div>
    </div>
  );
}
