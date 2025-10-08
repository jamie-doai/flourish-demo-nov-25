import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import { 
  Package, 
  Clipboard, 
  ShoppingCart, 
  Filter,
  Plus,
  ChevronDown,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Droplets,
  MapPin,
  Leaf
} from "lucide-react";
import { batches, locations, tasks, alerts, activityLogs, salesData } from "@/data";

export default function ManagerDashboard() {
  const [forecastOpen, setForecastOpen] = useState(false);

  // Calculate KPIs
  const totalPlants = batches.reduce((sum, batch) => sum + batch.quantity, 0);
  const tasksDueToday = tasks.filter(t => t.status === "today" || t.status === "overdue").length;
  const overdueTasksCount = tasks.filter(t => t.status === "overdue").length;
  const batchesReadyToMove = batches.filter(b => b.stage === "hardening").length;
  const averageCapacity = Math.round(
    locations.reduce((sum, loc) => sum + loc.percentage, 0) / locations.length
  );

  // Get today's date
  const today = new Date();
  const dateString = today.toLocaleDateString('en-NZ', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-background pb-6">
      <DevBar />
      <Navigation />

      {/* 1. HEADER */}
      <header className="sticky top-0 bg-background border-b z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">{dateString}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* 2. SUMMARY KPIs */}
        <section>
          <div className="overflow-x-auto -mx-4 px-4 pb-4">
            <div className="flex gap-3 min-w-max">
              <Link to="/managers/inventory" className="flex-shrink-0">
                <Card className="p-4 w-40 hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-foreground">{totalPlants.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">Total Plants</div>
                  <div className="text-xs text-green-600 mt-1">Active</div>
                </Card>
              </Link>

              <Link to="/managers/operations" className="flex-shrink-0">
                <Card className="p-4 w-40 hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-foreground">{tasksDueToday}</div>
                  <div className="text-xs text-muted-foreground mt-1">Tasks Due Today</div>
                  {overdueTasksCount > 0 && (
                    <div className="text-xs text-orange-600 mt-1">{overdueTasksCount} Overdue</div>
                  )}
                </Card>
              </Link>

              <Card className="p-4 w-40 flex-shrink-0">
                <div className="text-2xl font-bold text-foreground">{batchesReadyToMove}</div>
                <div className="text-xs text-muted-foreground mt-1">Batches Ready</div>
                <div className="text-xs text-blue-600 mt-1">To Move</div>
              </Card>

              <Link to="/managers/sales" className="flex-shrink-0">
                <Card className="p-4 w-40 hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-foreground">${(salesData.monthlyTotal / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-muted-foreground mt-1">Sales This Month</div>
                  <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {salesData.monthlyChange}%
                  </div>
                </Card>
              </Link>

              <Link to="/managers/inventory" className="flex-shrink-0">
                <Card className="p-4 w-40 hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-foreground">{averageCapacity}%</div>
                  <div className="text-xs text-muted-foreground mt-1">Space Used</div>
                  <div className="text-xs text-yellow-600 mt-1">Capacity</div>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. ALERTS */}
        {alerts.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3">Alerts</h2>
            <div className="space-y-2">
              {alerts.map((alert) => (
                <Card 
                  key={alert.id}
                  className={`p-3 border-l-4 ${
                    alert.type === "error" 
                      ? "border-l-red-500 bg-red-50 dark:bg-red-950/20" 
                      : alert.type === "warning"
                      ? "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20"
                      : "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{alert.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* 4. NURSERY OVERVIEW */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Nursery Overview</h2>
          <div className="space-y-3">
            {locations.map((location) => (
              <Link key={location.id} to={`/managers/locations/${location.id}`}>
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">{location.name}</h3>
                    </div>
                    <Badge variant={location.percentage >= 90 ? "destructive" : "secondary"}>
                      {location.percentage}% Capacity
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Type</p>
                      <p className="font-medium">{location.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Batches</p>
                      <p className="font-medium">{location.batches} of {location.capacity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Temp</p>
                      <p className="font-medium">{location.temperature}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. TASK FEED */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Task Feed</h2>
            <Link to="/managers/operations">
              <Button variant="link" size="sm">View all</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <Card key={task.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    task.action.includes("Potting") ? "bg-blue-100 dark:bg-blue-950" :
                    task.action.includes("Watering") ? "bg-cyan-100 dark:bg-cyan-950" :
                    "bg-purple-100 dark:bg-purple-950"
                  }`}>
                    {task.action.includes("Potting") ? <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" /> :
                     task.action.includes("Watering") ? <Droplets className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> :
                     <Clipboard className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{task.action}</p>
                        <p className="text-sm text-muted-foreground">{task.species} — {task.location}</p>
                      </div>
                      <Badge variant={
                        task.status === "overdue" ? "destructive" :
                        task.status === "today" ? "default" :
                        "secondary"
                      }>
                        {task.status === "overdue" ? "Overdue" : task.status === "today" ? "Today" : "Upcoming"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{task.due}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 6. SALES SNAPSHOT */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Sales Snapshot</h2>
            <Link to="/managers/sales">
              <Button variant="link" size="sm">View all</Button>
            </Link>
          </div>
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Orders: {salesData.orders.total} total</p>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="font-semibold">{salesData.orders.pending.count}</p>
                    <p className="text-xs text-muted-foreground">${(salesData.orders.pending.value / 1000).toFixed(1)}k</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Confirmed</p>
                    <p className="font-semibold">{salesData.orders.confirmed.count}</p>
                    <p className="text-xs text-muted-foreground">${(salesData.orders.confirmed.value / 1000).toFixed(1)}k</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Delivered</p>
                    <p className="font-semibold">{salesData.orders.delivered.count}</p>
                    <p className="text-xs text-muted-foreground">${(salesData.orders.delivered.value / 1000).toFixed(1)}k</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm font-medium mb-2">Top Species</p>
                <ol className="space-y-1 text-sm">
                  {salesData.topSpecies.map((species, index) => (
                    <li key={species.name} className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-muted-foreground">{index + 1}.</span>
                        <Leaf className="w-3 h-3 text-primary" />
                        <span>{species.name}</span>
                      </span>
                      <span className="font-medium">${species.value.toLocaleString()}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  View Orders
                </Button>
                <Button size="sm" className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  New Quote
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* 7. ACTIVITY LOG */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Activity Log</h2>
          <Card className="p-4">
            <div className="space-y-3">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 pb-3 border-b last:border-b-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-primary">{log.user.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{log.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                      <div className="flex gap-1">
                        {log.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* 8. FORECAST & PLANNING */}
        <section>
          <Collapsible open={forecastOpen} onOpenChange={setForecastOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="font-semibold">Forecast & Planning</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${forecastOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <Card className="p-4">
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong>Next week:</strong> 3 batches ready for potting
                  </p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Propagation Target</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Forecasted Space Utilization</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-green-600" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                  </div>
                  <Link to="/managers/planning">
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      View Full Plan
                    </Button>
                  </Link>
                </div>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </section>
      </main>
    </div>
  );
}
