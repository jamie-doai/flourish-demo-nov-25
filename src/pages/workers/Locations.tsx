import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { WorkerBottomNav } from "@/components/WorkerBottomNav";
import { DevBar } from "@/components/DevBar";
import { WorkerPageHeader } from "@/components/WorkerPageHeader";
import { MapPin, ChevronDown, ChevronRight, AlertCircle } from "lucide-react";
import { locations, getTasksByLocation, batches } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

export default function WorkerLocations() {
  const [openLocations, setOpenLocations] = useState<Set<string>>(new Set());

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

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="max-w-[500px] mx-auto bg-[#F8FAF9] min-h-screen pb-20">
        <DevBar />
        <WorkerPageHeader title="Locations" backTo="/workers" />

        <main className="container mx-auto px-4 py-6">
          <div className="space-y-2">
            {topLevelLocations.map((location) => {
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
                  <Card className="bg-white border-2 border-[#37474F]/20 shadow-sm">
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="w-full p-4 h-auto flex items-center justify-between hover:bg-[#3B7A57]/5"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-[#3B7A57]" />
                          <div className="text-left">
                            <h3 className="text-lg font-semibold text-[#37474F]">{location.name}</h3>
                            <div className="flex items-center gap-3 mt-1 text-sm text-[#37474F]">
                              <span>{batchCount} batches</span>
                              <span>{totalTasks} tasks</span>
                              {urgentTasks.length > 0 && (
                                <Badge variant="destructive" className="flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {urgentTasks.length} urgent
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {childLocations.length > 0 && (
                          isOpen ? <ChevronDown className="w-5 h-5 text-[#37474F]" /> : <ChevronRight className="w-5 h-5 text-[#37474F]" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    
                    {childLocations.length > 0 && (
                      <CollapsibleContent className="px-4 pb-4">
                        <div className="space-y-2 mt-2 pl-8">
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
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="text-base font-medium text-[#37474F]">{child.name}</h4>
                                      <div className="flex items-center gap-2 mt-1 text-sm text-[#37474F]">
                                        <span>{childBatches} batches</span>
                                        <span>{childTotal} tasks</span>
                                        {childUrgent.length > 0 && (
                                          <Badge variant="destructive" className="flex items-center gap-1 text-xs">
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
