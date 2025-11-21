import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin, Thermometer, Layers, Package, ChevronRight, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Location } from "@/data/locations";

interface LocationTreeViewProps {
  buildings: Location[];
  getBaysByBuilding: (buildingId: string) => Location[];
  getTablesByBay: (bayId: string) => Location[];
  getBatchCountAtLocation: (locationId: string, includeChildren: boolean) => number;
  getTasksByLocation: (locationName: string) => Array<{ status: string }>;
  expandedBuildings: Set<string>;
  expandedBays: Set<string>;
  onToggleBuilding: (buildingId: string) => void;
  onToggleBay: (bayId: string) => void;
}

export function LocationTreeView({
  buildings,
  getBaysByBuilding,
  getTablesByBay,
  getBatchCountAtLocation,
  getTasksByLocation,
  expandedBuildings,
  expandedBays,
  onToggleBuilding,
  onToggleBay,
}: LocationTreeViewProps) {
  return (
    <div className="space-y-3">
      {buildings
        .filter(location => location.type === 'BUILDING')
        .map((building) => {
          const bays = getBaysByBuilding(building.id);
          const isExpanded = expandedBuildings.has(building.id);
          const buildingTasks = getTasksByLocation(building.name);
          const pendingTasks = buildingTasks.filter(t =>
            t.status === "Pending" || t.status === "today" || t.status === "overdue" || t.status === "In Progress"
          );

          return (
            <Card key={building.id} className="overflow-hidden">
              <Collapsible open={isExpanded} onOpenChange={() => onToggleBuilding(building.id)}>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          {isExpanded ? (
                            <ChevronDown className="h-6 w-6" />
                          ) : (
                            <ChevronRight className="h-6 w-6" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <MapPin className="w-3 h-3 text-primary" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{building.name}</h3>
                          <Badge variant="outline" className="text-xs">{building.code}</Badge>
                          {pendingTasks.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {pendingTasks.length} tasks
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{building.climateControl}</span>
                          <span>{bays.length} bays</span>
                          {building.temperature && (
                            <div className="flex items-center gap-1">
                              <Thermometer className="w-3 h-3" />
                              <span>{building.temperature}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Link to={`/managers/locations/${building.id}`}>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <CollapsibleContent>
                  <div className="p-4 flex flex-col gap-2 bg-white">
                    {bays.length === 0 ? (
                      <p className="text-sm text-muted-foreground italic px-4 py-2">No bays configured</p>
                    ) : (
                      bays.map((bay) => {
                        const tables = getTablesByBay(bay.id);
                        const isBayExpanded = expandedBays.has(bay.id);
                        const bayBatchCount = getBatchCountAtLocation(bay.id, true);

                        return (
                          <Card key={bay.id} className="ml-8">
                            <Collapsible open={isBayExpanded} onOpenChange={() => onToggleBay(bay.id)}>
                              <div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 flex-1">
                                    <CollapsibleTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                        {isBayExpanded ? (
                                          <ChevronDown className="h-3 w-3" />
                                        ) : (
                                          <ChevronRight className="h-3 w-3" />
                                        )}
                                      </Button>
                                    </CollapsibleTrigger>
                                    <Layers className="w-3 h-3 text-muted-foreground" />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm">{bay.name}</span>
                                        {bay.code && <Badge variant="outline" className="text-xs">{bay.code}</Badge>}
                                      </div>
                                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                                        <span>{tables.length} tables</span>
                                        <span>{bayBatchCount} batches</span>
                                        {bay.maxCapacity && (
                                          <span>{bay.maxCapacity} capacity</span>
                                        )}
                                      </div>
                                    </div>
                                    <Link to={`/managers/locations/${bay.id}`}>
                                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                                        View
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              </div>

                              <CollapsibleContent>
                                <div className="p-3 flex flex-col gap-2 bg-white">
                                  {tables.length === 0 ? (
                                    <p className="text-xs text-muted-foreground italic px-3 py-2">No tables configured</p>
                                  ) : (
                                    tables.map((table) => {
                                      const tableBatchCount = getBatchCountAtLocation(table.id, false);

                                      return (
                                        <Link key={table.id} to={`/managers/locations/${table.id}`}>
                                          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 transition-colors cursor-pointer ml-6">
                                            <Package className="w-3.5 h-3.5 text-muted-foreground" />
                                            <div className="flex-1">
                                              <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">{table.name}</span>
                                                {table.code && <Badge variant="secondary" className="text-xs">{table.code}</Badge>}
                                              </div>
                                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span>{tableBatchCount} batches</span>
                                                {table.maxCapacity && (
                                                  <span>Max: {table.maxCapacity}</span>
                                                )}
                                                {table.dimensions && (
                                                  <span>{table.dimensions}</span>
                                                )}
                                              </div>
                                            </div>
                                            <ChevronRight className="w-3 h-3 text-muted-foreground" />
                                          </div>
                                        </Link>
                                      );
                                    })
                                  )}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </Card>
                        );
                      })
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
    </div>
  );
}

