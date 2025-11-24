import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  getBuildingLocations,
  getBaysByBuilding,
  getTablesByBay,
  getLocationById,
  locations,
  Location,
} from "@/data/locations";
import { MapPin, Layers, Package, ChevronRight, ChevronDown, Search } from "lucide-react";

interface MoveLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLocation?: string;
  onSelect: (locationName: string) => void;
}

export function MoveLocationDialog({
  open,
  onOpenChange,
  currentLocation,
  onSelect,
}: MoveLocationDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedBuildings, setExpandedBuildings] = useState<Set<string>>(new Set());
  const [expandedBays, setExpandedBays] = useState<Set<string>>(new Set());

  // Get OTHER type locations (Unassigned, Offsite, In Transit, etc.)
  // Note: Matching original getLocationNames() behavior - showing all locations regardless of isActive
  const otherLocations = useMemo(() => {
    return locations.filter(loc => loc.type === "OTHER");
  }, []);

  const buildings = useMemo(() => getBuildingLocations(), []);

  // Build full location path string for search
  const getLocationPathString = (location: Location): string => {
    const path: string[] = [location.name];
    if (location.code) path.push(location.code);
    
    let current = location.parentLocationId ? getLocationById(location.parentLocationId) : null;
    while (current) {
      path.push(current.name);
      if (current.code) path.push(current.code);
      current = current.parentLocationId ? getLocationById(current.parentLocationId) : null;
    }
    
    return path.join(" ").toLowerCase();
  };

  // Check if location matches search query
  const matchesSearch = (location: Location): boolean => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const pathString = getLocationPathString(location);
    return pathString.includes(query);
  };

  // Check if building should be shown (if it or any child matches)
  const shouldShowBuilding = (building: Location): boolean => {
    if (!searchQuery.trim()) return true;
    if (matchesSearch(building)) return true;
    
    const bays = getBaysByBuilding(building.id);
    return bays.some(bay => {
      if (matchesSearch(bay)) return true;
      const tables = getTablesByBay(bay.id);
      return tables.some(table => matchesSearch(table));
    });
  };

  // Check if bay should be shown (if it or any child matches)
  const shouldShowBay = (bay: Location): boolean => {
    if (!searchQuery.trim()) return true;
    if (matchesSearch(bay)) return true;
    
    const tables = getTablesByBay(bay.id);
    return tables.some(table => matchesSearch(table));
  };

  const handleToggleBuilding = (buildingId: string) => {
    const newExpanded = new Set(expandedBuildings);
    if (newExpanded.has(buildingId)) {
      newExpanded.delete(buildingId);
    } else {
      newExpanded.add(buildingId);
    }
    setExpandedBuildings(newExpanded);
  };

  const handleToggleBay = (bayId: string) => {
    const newExpanded = new Set(expandedBays);
    if (newExpanded.has(bayId)) {
      newExpanded.delete(bayId);
    } else {
      newExpanded.add(bayId);
    }
    setExpandedBays(newExpanded);
  };

  const handleLocationSelect = (locationName: string) => {
    onSelect(locationName);
    onOpenChange(false);
    setSearchQuery("");
  };

  // Auto-expand buildings/bays when search matches their children
  const getExpandedBuildings = useMemo(() => {
    if (!searchQuery.trim()) return expandedBuildings;
    const newExpanded = new Set(expandedBuildings);
    buildings.forEach(building => {
      if (shouldShowBuilding(building) && !matchesSearch(building)) {
        const bays = getBaysByBuilding(building.id);
        const hasMatchingChild = bays.some(bay => {
          if (matchesSearch(bay)) return true;
          const tables = getTablesByBay(bay.id);
          return tables.some(table => matchesSearch(table));
        });
        if (hasMatchingChild) {
          newExpanded.add(building.id);
        }
      }
    });
    return newExpanded;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, expandedBuildings, buildings]);

  const getExpandedBays = useMemo(() => {
    if (!searchQuery.trim()) return expandedBays;
    const newExpanded = new Set(expandedBays);
    buildings.forEach(building => {
      const bays = getBaysByBuilding(building.id);
      bays.forEach(bay => {
        if (shouldShowBay(bay) && !matchesSearch(bay)) {
          const tables = getTablesByBay(bay.id);
          if (tables.some(table => matchesSearch(table))) {
            newExpanded.add(bay.id);
          }
        }
      });
    });
    return newExpanded;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, expandedBays, buildings]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Move to Location</DialogTitle>
        </DialogHeader>
        
        {/* Search Input */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14"
          />
        </div>

        {/* Location List */}
        <div className="flex-1 overflow-y-auto space-y-2 py-4">
          {/* Buildings with nested bays and tables */}
          {buildings
            .filter(building => shouldShowBuilding(building))
            .map((building) => {
              const bays = getBaysByBuilding(building.id);
              const isExpanded = getExpandedBuildings.has(building.id);
              const shouldExclude = currentLocation === building.name;

              if (shouldExclude) return null;

              return (
                <Collapsible
                  key={building.id}
                  open={isExpanded}
                  onOpenChange={() => handleToggleBuilding(building.id)}
                >
                  <div className="bg-white border rounded-md pr-4">
                    <div className="flex items-center gap-2 p-1">
                      {bays.length > 0 && (
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-2 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleBuilding(building.id);
                            }}
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      )}
                      {bays.length === 0 && <div className="w-10" />}
                      <Button
                        variant="ghost"
                        className="flex-1 justify-start h-auto py-2 px-3 hover:bg-muted/50"
                        onClick={() => handleLocationSelect(building.name)}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-medium">{building.name}</span>
                        </div>
                      </Button>
                    </div>

                    {bays.length > 0 && (
                      <CollapsibleContent>
                        <div className="pl-4 space-y-1 pb-2">
                          {bays
                            .filter(bay => shouldShowBay(bay))
                            .map((bay) => {
                              const tables = getTablesByBay(bay.id);
                              const isBayExpanded = getExpandedBays.has(bay.id);
                              const shouldExcludeBay = currentLocation === bay.name;

                              if (shouldExcludeBay) return null;

                              return (
                                <Collapsible
                                  key={bay.id}
                                  open={isBayExpanded}
                                  onOpenChange={() => handleToggleBay(bay.id)}
                                >
                                  <div className="bg-white border rounded-md pr-4">
                                    <div className="flex items-center gap-1.5 p-1">
                                      {tables.length > 0 && (
                                        <CollapsibleTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-auto p-1.5 flex-shrink-0"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleToggleBay(bay.id);
                                            }}
                                          >
                                            {isBayExpanded ? (
                                              <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                            ) : (
                                              <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                            )}
                                          </Button>
                                        </CollapsibleTrigger>
                                      )}
                                      {tables.length === 0 && <div className="w-7" />}
                                      <Button
                                        variant="ghost"
                                        className="flex-1 justify-start h-auto py-1.5 px-2 hover:bg-muted/50"
                                        onClick={() => handleLocationSelect(bay.name)}
                                      >
                                        <div className="flex items-center gap-2">
                                          <Layers className="h-4 w-4 text-primary" />
                                          <span className="text-sm">{bay.name}</span>
                                        </div>
                                      </Button>
                                    </div>

                                    {tables.length > 0 && (
                                      <CollapsibleContent>
                                        <div className="pl-6 space-y-1 pb-2">
                                          {tables
                                            .filter(table => matchesSearch(table))
                                            .map((table) => {
                                              const shouldExcludeTable = currentLocation === table.name;
                                              if (shouldExcludeTable) return null;

                                              return (
                                                <div key={table.id} className="bg-white border rounded-md pr-4 p-1">
                                                  <Button
                                                    variant="ghost"
                                                    className="w-full justify-start h-auto py-1.5 px-2 hover:bg-muted/50"
                                                    onClick={() => handleLocationSelect(table.name)}
                                                  >
                                                    <div className="flex items-center gap-2">
                                                      <Package className="h-4 w-4 text-primary" />
                                                      <span className="text-sm">{table.name}</span>
                                                    </div>
                                                  </Button>
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </CollapsibleContent>
                                    )}
                                  </div>
                                </Collapsible>
                              );
                            })}
                        </div>
                      </CollapsibleContent>
                    )}
                  </div>
                </Collapsible>
              );
            })}

          {/* Other locations (Unassigned, Offsite, In Transit) */}
          {otherLocations
            .filter(loc => matchesSearch(loc) && loc.name !== currentLocation)
            .map((location) => (
              <Button
                key={location.id}
                variant="ghost"
                className="w-full justify-start h-auto py-2 px-3 hover:bg-muted/50 bg-white border rounded-md"
                onClick={() => handleLocationSelect(location.name)}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">{location.name}</span>
                </div>
              </Button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
