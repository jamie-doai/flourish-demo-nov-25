import { useState } from "react";
import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatDateTimeNZ } from "@/lib/utils";
import { 
  Filter,
  Plus,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Leaf
} from "lucide-react";
import { batches, locations, tasks, alerts, activityLogs, salesData } from "@/data";
import { KPICard } from "@/components/dashboard/KPICard";
import { LocationCard } from "@/components/dashboard/LocationCard";
import { TaskCard } from "@/components/dashboard/TaskCard";
import { ActivityLogItem } from "@/components/dashboard/ActivityLogItem";

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
          <div className="md:col-span-2 lg:col-span-2 animate-fade-in">
            <KPICard
              value={totalPlants}
              label="Total Plants"
              subtitle="Active"
              subtitleColor="success"
              href="/managers/inventory"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-2 animate-fade-in">
            <KPICard
              value={tasksDueToday}
              label="Tasks Due"
              subtitle={overdueTasksCount > 0 ? `${overdueTasksCount} Overdue` : undefined}
              subtitleColor={overdueTasksCount > 0 ? "caution" : undefined}
              href="/managers/operations"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-2 animate-fade-in">
            <KPICard
              value={batchesReadyToMove}
              label="Ready to Move"
              subtitle="Batches"
              subtitleColor="info"
            />
          </div>

          <div className="md:col-span-3 lg:col-span-3 animate-fade-in">
            <Card className="h-full">
              <div className="text-heading-2 font-heading font-bold">${(salesData.monthlyTotal / 1000).toFixed(1)}k</div>
              <div className="text-body-small text-muted-foreground mt-0.5">Sales This Month</div>
              <div className="text-body-small text-success mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {salesData.monthlyChange}%
              </div>
            </Card>
          </div>

          <div className="md:col-span-3 lg:col-span-3 animate-fade-in">
            <KPICard
              value={`${averageCapacity}%`}
              label="Space Used"
              subtitle="Avg Capacity"
              subtitleColor="warning"
              href="/managers/inventory"
            />
          </div>

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
                <LocationCard key={location.id} location={location} />
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
                <TaskCard key={task.id} task={task} href={`/managers/tasks/${task.id}`} />
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
                  <ActivityLogItem key={log.id} {...log} />
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
                <div className="flex-shrink-0">
                  <KPICard
                    value={totalPlants}
                    label="Total Plants"
                    subtitle="Active"
                    subtitleColor="success"
                    href="/managers/inventory"
                    className="w-40"
                  />
                </div>

                <div className="flex-shrink-0">
                  <KPICard
                    value={tasksDueToday}
                    label="Tasks Due"
                    subtitle={overdueTasksCount > 0 ? `${overdueTasksCount} Overdue` : undefined}
                    subtitleColor={overdueTasksCount > 0 ? "caution" : undefined}
                    href="/managers/operations"
                    className="w-40"
                  />
                </div>

                <KPICard
                  value={batchesReadyToMove}
                  label="Batches Ready"
                  subtitle="To Move"
                  subtitleColor="info"
                  className="w-40 flex-shrink-0"
                />

                <div className="flex-shrink-0">
                  <Card className="w-40">
                    <div className="text-heading-2 font-heading font-bold">${(salesData.monthlyTotal / 1000).toFixed(1)}k</div>
                    <div className="text-body-small text-muted-foreground mt-0.5">Sales This Month</div>
                    <div className="text-body-small text-success mt-0.5 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {salesData.monthlyChange}%
                    </div>
                  </Card>
                </div>

                <div className="flex-shrink-0">
                  <KPICard
                    value={`${averageCapacity}%`}
                    label="Space Used"
                    subtitle="Capacity"
                    subtitleColor="warning"
                    href="/managers/inventory"
                    className="w-40"
                  />
                </div>
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
                <LocationCard key={location.id} location={location} />
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
                <TaskCard key={task.id} task={task} />
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
