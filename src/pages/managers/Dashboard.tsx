import { useState } from "react";
import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { formatDateTimeNZ } from "@/lib/utils";
import { 
  Package, 
  Clipboard, 
  ShoppingCart, 
  Filter,
  Plus,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplets,
  MapPin,
  Leaf
} from "lucide-react";
import { batches, locations, tasks, alerts, activityLogs, salesData } from "@/data";

export default function ManagerDashboard() {
  const [currentLocationPage, setCurrentLocationPage] = useState(0);
  const locationsPerPage = 3;
  const totalLocationPages = Math.ceil(locations.length / locationsPerPage);
  
  const paginatedLocations = locations.slice(
    currentLocationPage * locationsPerPage,
    (currentLocationPage + 1) * locationsPerPage
  );

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
  const dateString = formatDateTimeNZ(today);

  return (
    <ManagerLayout>
      {/* Header - Mobile only */}
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

      <main className="container mx-auto px-6 py-8 bg-white">
        {/* Header - Desktop */}
        <div className="hidden md:block mb-6">
          <PageHeader
            title="Dashboard"
            description="Welcome back! Here's what's happening today."
            actions={
              <Button variant="default">
                <Plus className="w-3 h-3 mr-2" />
                New Batch
              </Button>
            }
          />
        </div>

        {/* Bento Grid - Tablet/Desktop */}
        <div className="hidden md:grid md:grid-cols-6 lg:grid-cols-12 gap-4">
          {/* KPIs Row */}
          <Link to="/managers/inventory" className="md:col-span-2 lg:col-span-2 animate-fade-in">
            <Card className="h-full">
              <div className="text-heading-2 font-heading font-bold">{totalPlants.toLocaleString()}</div>
              <div className="text-body-small text-muted-foreground mt-0.5">Total Plants</div>
              <div className="text-body-small text-success mt-0.5">Active</div>
            </Card>
          </Link>

          <Link to="/managers/operations" className="md:col-span-2 lg:col-span-2 animate-fade-in">
            <Card className="h-full">
              <div className="text-heading-2 font-heading font-bold">{tasksDueToday}</div>
              <div className="text-body-small text-muted-foreground mt-0.5">Tasks Due</div>
              {overdueTasksCount > 0 && (
                <div className="text-body-small text-caution mt-0.5">{overdueTasksCount} Overdue</div>
              )}
            </Card>
          </Link>

          <Card className="md:col-span-2 lg:col-span-2 animate-fade-in">
            <div className="text-heading-2 font-heading font-bold">{batchesReadyToMove}</div>
            <div className="text-body-small text-muted-foreground mt-0.5">Ready to Move</div>
            <div className="text-body-small text-info mt-0.5">Batches</div>
          </Card>

          <Link to="/managers/sales" className="md:col-span-3 lg:col-span-3 animate-fade-in">
            <Card className="h-full">
              <div className="text-heading-2 font-heading font-bold">${(salesData.monthlyTotal / 1000).toFixed(1)}k</div>
              <div className="text-body-small text-muted-foreground mt-0.5">Sales This Month</div>
              <div className="text-body-small text-success mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {salesData.monthlyChange}%
              </div>
            </Card>
          </Link>

          <Link to="/managers/inventory" className="md:col-span-3 lg:col-span-3 animate-fade-in">
            <Card className="h-full">
              <div className="text-heading-2 font-heading font-bold">{averageCapacity}%</div>
              <div className="text-body-small text-muted-foreground mt-0.5">Space Used</div>
              <div className="text-body-small text-warning mt-0.5">Avg Capacity</div>
            </Card>
          </Link>

          {/* Alerts - Full width */}
          {alerts.length > 0 && (
            <div className="md:col-span-6 lg:col-span-12 animate-fade-in">
              <h2 className="text-heading-4 font-heading font-bold mb-3">Alerts</h2>
              <div className="grid gap-2">
                {alerts.map((alert) => (
                  <Card 
                    key={alert.id}
                    className={`border-l-4 ${
                      alert.type === "error" 
                        ? "border-l-destructive bg-destructive/10" 
                        : alert.type === "warning"
                        ? "border-l-warning bg-warning/10"
                        : "border-l-info bg-info/10"
                    }`}
                  >
                    <div className="flex items-start gap-1.5">
                      <span className="text-heading-4">{alert.icon}</span>
                      <p className="text-body font-medium flex-1">{alert.message}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Nursery Overview - Large column with pagination */}
          <div className="md:col-span-6 lg:col-span-7 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-heading-4 font-heading font-bold">Nursery Overview</h2>
              {totalLocationPages > 1 && (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="tertiary" 
                    size="sm"
                    onClick={() => setCurrentLocationPage(p => Math.max(0, p - 1))}
                    disabled={currentLocationPage === 0}
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentLocationPage + 1} / {totalLocationPages}
                  </span>
                  <Button 
                    variant="tertiary" 
                    size="sm"
                    onClick={() => setCurrentLocationPage(p => Math.min(totalLocationPages - 1, p + 1))}
                    disabled={currentLocationPage === totalLocationPages - 1}
                  >
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-3">
              {paginatedLocations.map((location) => (
                <Link key={location.id} to={`/managers/locations/${location.id}`}>
                  <Card className="hover:shadow-card transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-forest-green" />
                        <h3 className="font-heading font-bold text-heading-4">{location.name}</h3>
                      </div>
                      <Badge variant={location.percentage >= 90 ? "destructive" : "secondary"}>
                        {location.percentage}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-body">
                      <div>
                        <p className="text-muted-foreground text-xs">Type</p>
                        <p className="font-medium">{location.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Batches</p>
                        <p className="font-medium">{location.batches}/{location.capacity}</p>
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
          </div>

          {/* Task Feed - Medium column */}
          <div className="md:col-span-6 lg:col-span-5 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-heading-4 font-heading font-bold">Task Feed</h2>
              <Link to="/managers/operations">
                <Button variant="link" size="sm">View all</Button>
              </Link>
            </div>
            <div className="space-y-3">
              {tasks.slice(0, 5).map((task) => (
                <Link key={task.id} to={`/managers/tasks/${task.id}`}>
                  <Card className="hover:shadow-card transition-all">
                    <div className="flex items-start gap-1.5">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      task.action.includes("Potting") ? "bg-blue-100 dark:bg-blue-950" :
                      task.action.includes("Watering") ? "bg-cyan-100 dark:bg-cyan-950" :
                      "bg-purple-100 dark:bg-purple-950"
                    }`}>
                      {task.action.includes("Potting") ? <Package className="w-3 h-3 text-blue-600 dark:text-blue-400" /> :
                       task.action.includes("Watering") ? <Droplets className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> :
                       <Clipboard className="w-3 h-3 text-purple-600 dark:text-purple-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold text-body">{task.action}</p>
                      <p className="text-body text-muted-foreground truncate">{task.species} — {task.location}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{task.due}</span>
                        <Badge variant={
                          task.status === "overdue" ? "destructive" :
                          task.status === "today" ? "default" :
                          "secondary"
                        } className="text-xs">
                          {task.status === "overdue" ? "Overdue" : task.status === "today" ? "Today" : "Upcoming"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Sales Snapshot */}
          <div className="md:col-span-6 lg:col-span-6 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-heading-4 font-heading font-bold">Sales Snapshot</h2>
              <Link to="/managers/sales">
                <Button variant="link" size="sm">View all</Button>
              </Link>
            </div>
            <Card>
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
                  <div className="space-y-1 text-sm">
                    {salesData.topSpecies.map((species, index) => (
                      <div key={species.name} className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="text-muted-foreground">{index + 1}.</span>
                          <Leaf className="w-3 h-3 text-primary" />
                          <span>{species.name}</span>
                        </span>
                        <span className="font-medium">${species.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Activity Log */}
          <div className="md:col-span-6 lg:col-span-6 animate-fade-in">
            <h2 className="text-heading-4 font-heading font-bold mb-3">Activity Log</h2>
            <Card>
              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-1.5 pb-3 border-b border-sage-gray last:border-b-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-primary">{log.user.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-body truncate">{log.action}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-body-small text-muted-foreground">{log.timestamp}</span>
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
          </div>
        </div>

        {/* Mobile - Vertical List */}
        <div className="md:hidden space-y-6">
          {/* Mobile KPIs - Scrollable */}
          <section>
            <div className="overflow-x-auto -mx-4 px-4 pb-4">
              <div className="flex gap-1.5 min-w-max">
                <Link to="/managers/inventory" className="flex-shrink-0">
                  <Card className="w-40">
                    <div className="text-heading-2 font-heading font-bold">{totalPlants.toLocaleString()}</div>
                    <div className="text-body-small text-muted-foreground mt-0.5">Total Plants</div>
                    <div className="text-body-small text-success mt-0.5">Active</div>
                  </Card>
                </Link>

                <Link to="/managers/operations" className="flex-shrink-0">
                  <Card className="w-40">
                    <div className="text-heading-2 font-heading font-bold">{tasksDueToday}</div>
                    <div className="text-body-small text-muted-foreground mt-0.5">Tasks Due</div>
                    {overdueTasksCount > 0 && (
                      <div className="text-body-small text-caution mt-0.5">{overdueTasksCount} Overdue</div>
                    )}
                  </Card>
                </Link>

                <Card className="w-40 flex-shrink-0">
                  <div className="text-heading-2 font-heading font-bold">{batchesReadyToMove}</div>
                  <div className="text-body-small text-muted-foreground mt-0.5">Batches Ready</div>
                  <div className="text-body-small text-info mt-0.5">To Move</div>
                </Card>

                <Link to="/managers/sales" className="flex-shrink-0">
                  <Card className="w-40">
                    <div className="text-heading-2 font-heading font-bold">${(salesData.monthlyTotal / 1000).toFixed(1)}k</div>
                    <div className="text-body-small text-muted-foreground mt-0.5">Sales This Month</div>
                    <div className="text-body-small text-success mt-0.5 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {salesData.monthlyChange}%
                    </div>
                  </Card>
                </Link>

                <Link to="/managers/inventory" className="flex-shrink-0">
                  <Card className="w-40">
                    <div className="text-heading-2 font-heading font-bold">{averageCapacity}%</div>
                    <div className="text-body-small text-muted-foreground mt-0.5">Space Used</div>
                    <div className="text-body-small text-warning mt-0.5">Capacity</div>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* Mobile Alerts */}
          {alerts.length > 0 && (
            <section>
              <h2 className="text-heading-4 font-heading font-bold mb-3">Alerts</h2>
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <Card 
                    key={alert.id}
                    className={`border-l-4 ${
                      alert.type === "error" 
                        ? "border-l-destructive bg-destructive/10" 
                        : alert.type === "warning"
                        ? "border-l-warning bg-warning/10"
                        : "border-l-info bg-info/10"
                    }`}
                  >
                    <div className="flex items-start gap-1.5">
                      <span className="text-heading-4">{alert.icon}</span>
                      <p className="text-body font-medium flex-1">{alert.message}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Mobile Nursery Overview */}
          <section>
            <h2 className="text-heading-4 font-heading font-bold mb-3">Nursery Overview</h2>
            <div className="space-y-3">
              {locations.map((location) => (
                <Link key={location.id} to={`/managers/locations/${location.id}`}>
                  <Card className="hover:shadow-card transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-forest-green" />
                        <h3 className="font-heading font-bold text-heading-4">{location.name}</h3>
                      </div>
                      <Badge variant={location.percentage >= 90 ? "destructive" : "secondary"}>
                        {location.percentage}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-body">
                      <div>
                        <p className="text-muted-foreground text-xs">Type</p>
                        <p className="font-medium">{location.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Batches</p>
                        <p className="font-medium">{location.batches}/{location.capacity}</p>
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

          {/* Mobile Task Feed */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-heading-4 font-heading font-bold">Task Feed</h2>
              <Link to="/managers/operations">
                <Button variant="link" size="sm">View all</Button>
              </Link>
            </div>
            <div className="space-y-3">
              {tasks.slice(0, 5).map((task) => (
                <Card key={task.id}>
                  <div className="flex items-start gap-1.5">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      task.action.includes("Potting") ? "bg-blue-100 dark:bg-blue-950" :
                      task.action.includes("Watering") ? "bg-cyan-100 dark:bg-cyan-950" :
                      "bg-purple-100 dark:bg-purple-950"
                    }`}>
                      {task.action.includes("Potting") ? <Package className="w-3 h-3 text-blue-600 dark:text-blue-400" /> :
                       task.action.includes("Watering") ? <Droplets className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> :
                       <Clipboard className="w-3 h-3 text-purple-600 dark:text-purple-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold text-body">{task.action}</p>
                      <p className="text-body text-muted-foreground">{task.species} — {task.location}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{task.due}</span>
                        <Badge variant={
                          task.status === "overdue" ? "destructive" :
                          task.status === "today" ? "default" :
                          "secondary"
                        } className="text-xs">
                          {task.status === "overdue" ? "Overdue" : task.status === "today" ? "Today" : "Upcoming"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Mobile Sales Snapshot */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-heading-4 font-heading font-bold">Sales Snapshot</h2>
              <Link to="/managers/sales">
                <Button variant="link" size="sm">View all</Button>
              </Link>
            </div>
            <Card>
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
              </div>
            </Card>
          </section>

          {/* Mobile Activity Log */}
          <section>
            <h2 className="text-heading-4 font-heading font-bold mb-3">Activity Log</h2>
            <Card>
              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-1.5 pb-3 border-b border-sage-gray last:border-b-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-primary">{log.user.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-body">{log.action}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-body-small text-muted-foreground">{log.timestamp}</span>
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
        </div>
      </main>
    </ManagerLayout>
  );
}
