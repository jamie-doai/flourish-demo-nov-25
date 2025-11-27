import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { PageHeader } from "@/components/PageHeader";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Thermometer, Droplet, Leaf, Clock, User, CheckSquare, ChevronRight, ChevronDown, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getLocationById, getBatchesByLocation, getTasksByLocation, getTotalQuantityAtLocation, getUniqueBatchesAtLocation } from "@/data";
import { getChildLocations, getCapacityPercentage } from "@/lib/locationUtils";
import { useState } from "react";

export default function ManagerLocationDetail() {
  const { locationId } = useParams();
  const mockLocation = getLocationById(locationId || "");
  const batchesInLocation = getBatchesByLocation(locationId || "");
  const tasksForLocation = getTasksByLocation(mockLocation?.name || "");
  const [expandedLocations, setExpandedLocations] = useState<string[]>([]);
  
  const childLocations = getChildLocations(locationId || "");
  const capacityPercentage = locationId ? getCapacityPercentage(locationId) : (mockLocation?.capacity || mockLocation?.percentage || 0);

  const toggleLocation = (locId: string) => {
    setExpandedLocations(prev => 
      prev.includes(locId) ? prev.filter(id => id !== locId) : [...prev, locId]
    );
  };

  if (!mockLocation) {
    return <div>Location not found</div>;
  }

  return (
    <ManagerLayout>
      <main className="container mx-auto px-12 py-8 max-w-[1920px]">
        <PageHeader
          title={mockLocation.name}
          description={mockLocation.type}
          backTo="/managers/inventory"
          backLabel="Back to Inventory"
        />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-2 gap-2 border border-forest-green h-auto px-1 !py-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs sm:text-sm">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Location Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">Batches</div>
                </div>
                <div className="text-2xl font-bold">{mockLocation.batches || batchesInLocation.length}</div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-3 h-3 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">Total Plants</div>
                </div>
                <div className="text-2xl font-bold">{(mockLocation.totalPlants || mockLocation.plants || 0).toLocaleString()}</div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-3 h-3 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">Capacity</div>
                </div>
                <div className="text-2xl font-bold">{capacityPercentage}%</div>
              </Card>

              {mockLocation.temperature && (
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-3 h-3 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">Temperature</div>
                  </div>
                  <div className="text-2xl font-bold">{mockLocation.temperature}</div>
                </Card>
              )}

              {mockLocation.humidity && (
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplet className="w-3 h-3 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">Humidity</div>
                  </div>
                  <div className="text-2xl font-bold">{mockLocation.humidity}</div>
                </Card>
              )}
            </div>

            {/* Child Locations */}
            {childLocations.length > 0 && (
              <Card>
                <h3 className="text-lg font-semibold mb-4">
                  {mockLocation.type === 'BUILDING' ? 'Bays' : mockLocation.type === 'BAY' ? 'Tables' : 'Child Locations'}
                </h3>
                <div className="space-y-2">
                  {childLocations.map((child) => {
                    const childTables = getChildLocations(child.id);
                    // Build list of location IDs to aggregate (child tables plus the location itself)
                    const locationIds = childTables.length > 0 
                      ? [child.id, ...childTables.map(t => t.id)] 
                      : [child.id];

                    // Aggregate plants and unique batches across all relevant locations
                    const totalPlantCount = locationIds.reduce((sum, id) => sum + getTotalQuantityAtLocation(id), 0);
                    const uniqueBatchIds = new Set<string>();
                    locationIds.forEach(id => {
                      getUniqueBatchesAtLocation(id).forEach(b => uniqueBatchIds.add(b));
                    });
                    const totalBatchCount = uniqueBatchIds.size;
                    
                    const isExpanded = expandedLocations.includes(child.id);

                    return (
                      <Collapsible key={child.id} open={isExpanded} onOpenChange={() => toggleLocation(child.id)}>
                        <div className="border rounded-lg">
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-between p-4 h-auto hover:bg-accent"
                            >
                              <div className="flex items-center gap-3">
                                {childTables.length > 0 ? (
                                  isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />
                                ) : (
                                  <div className="w-4" />
                                )}
                                <MapPin className="w-5 h-5 text-primary" />
                                <div className="text-left">
                                  <div className="font-medium">{child.name}</div>
                                  <div className="text-sm text-muted-foreground">{child.type}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-sm text-muted-foreground">
                                  {totalPlantCount.toLocaleString()} plants
                                </div>
                                <Badge variant="secondary">{totalBatchCount} batches</Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Link to={`/managers/locations/${child.id}`}>View</Link>
                                </Button>
                              </div>
                            </Button>
                          </CollapsibleTrigger>
                          
                          {childTables.length > 0 && (
                            <CollapsibleContent>
                              <div className="px-4 pb-4 pl-11 space-y-2">
                                {childTables.map((table) => {
                                  const tableBatchCount = getUniqueBatchesAtLocation(table.id).length;
                                  return (
                                    <Link
                                      key={table.id}
                                      to={`/managers/locations/${table.id}`}
                                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent border"
                                    >
                                      <div className="flex items-center gap-3">
                                        <MapPin className="w-3 h-3 text-muted-foreground" />
                                        <div>
                                          <div className="font-medium text-sm">{table.name}</div>
                                          <div className="text-xs text-muted-foreground">{table.type}</div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        {table.capacity && (
                                          <div className="text-xs text-muted-foreground">
                                            {table.currentCapacity || 0}/{table.capacity}
                                          </div>
                                        )}
                                        <Badge variant="outline" className="text-xs">{tableBatchCount} batches</Badge>
                                      </div>
                                    </Link>
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
              </Card>
            )}

            {/* Batches in Location */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Batches in this Location</h2>
              <div className="space-y-3">
                {batchesInLocation.map((batch) => (
                  <Link key={batch.id} to={`/managers/batch/${batch.id}`}>
                    <Card className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Leaf className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-semibold">{batch.id}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              batch.health === "Excellent" ? "bg-green-100 text-green-700" :
                              batch.health === "Good" ? "bg-blue-100 text-blue-700" :
                              "bg-yellow-100 text-yellow-700"
                            }`}>
                              {batch.health}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{batch.species}</p>
                          <p className="text-xs text-muted-foreground mb-3">{batch.scientificName}</p>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Quantity: </span>
                              <span className="font-medium">{batch.quantity} plants</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Stage: </span>
                              <span className="font-medium">{batch.stage}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Tasks for this Location ({tasksForLocation.length})
              </h2>
            </div>
            
            {tasksForLocation.length > 0 ? (
              <div className="space-y-3">
                {tasksForLocation.map((task) => (
                  <Link key={task.id} to={`/managers/tasks/${task.id}`}>
                    <Card className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{task.title || task.action}</h3>
                            <Badge variant="outline" className={
                              task.priority === "High" ? "bg-destructive/10 text-destructive" :
                              task.priority === "Medium" ? "bg-accent/10 text-accent" :
                              "bg-muted text-muted-foreground"
                            }>
                              {task.priority}
                            </Badge>
                            <Badge variant="outline" className={
                              task.status === "Completed" || task.status === "completed" ? "bg-primary/10 text-primary" :
                              task.status === "In Progress" ? "bg-blue-500/10 text-blue-500" :
                              task.status === "Pending" || task.status === "today" ? "bg-yellow-500/10 text-yellow-500" :
                              "bg-purple-500/10 text-purple-500"
                            }>
                              {task.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{task.assignee || "Unassigned"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{task.dueDate || task.due}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckSquare className="w-3 h-3" />
                              <span>Batch: {task.batch}</span>
                            </div>
                          </div>
                          {task.type && (
                            <p className="text-xs text-muted-foreground mt-2">Type: {task.type}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="text-center">
                <p className="text-muted-foreground">No tasks scheduled for this location</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </ManagerLayout>
  );
}
