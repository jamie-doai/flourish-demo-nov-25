import { Navigation } from "@/components/Navigation";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DevBar } from "@/components/DevBar";
import { ArrowLeft, MapPin, Thermometer, Droplet, Calendar, Leaf, Clock, User, CheckSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLocationById, getBatchesByLocation, getTasksByLocation } from "@/data";

export default function ManagerLocationDetail() {
  const { locationId } = useParams();
  const mockLocation = getLocationById(locationId || "");
  const batchesInLocation = getBatchesByLocation(locationId || "");
  const tasksForLocation = getTasksByLocation(mockLocation?.name || "");

  if (!mockLocation) {
    return <div>Location not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <Link to="/managers/inventory">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Inventory
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{mockLocation.name}</h1>
              <p className="text-muted-foreground">{mockLocation.type}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Location Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">Batches</div>
                </div>
                <div className="text-2xl font-bold">{mockLocation.batches}</div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-4 h-4 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">Total Plants</div>
                </div>
                <div className="text-2xl font-bold">{mockLocation.totalPlants.toLocaleString()}</div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-4 h-4 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">Temperature</div>
                </div>
                <div className="text-2xl font-bold">{mockLocation.temperature}</div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplet className="w-4 h-4 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">Humidity</div>
                </div>
                <div className="text-2xl font-bold">{mockLocation.humidity}</div>
              </Card>
            </div>

            {/* Capacity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Capacity Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Capacity</span>
                  <span className="text-2xl font-bold">{mockLocation.capacity}%</span>
                </div>
                <Progress value={mockLocation.capacity} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {mockLocation.capacity >= 80 ? "Near capacity - consider redistribution" : 
                   mockLocation.capacity >= 60 ? "Moderate utilization" : 
                   "Good availability"}
                </p>
              </div>
            </Card>

            {/* Maintenance Schedule */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Maintenance Schedule</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last Maintenance</p>
                    <p className="font-medium">{mockLocation.lastMaintenance}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Next Scheduled</p>
                    <p className="font-medium text-primary">{mockLocation.nextMaintenance}</p>
                  </div>
                </div>
              </div>
            </Card>

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
                              <User className="w-4 h-4" />
                              <span>{task.assignee || "Unassigned"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{task.dueDate || task.due}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckSquare className="w-4 h-4" />
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
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">No tasks scheduled for this location</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
