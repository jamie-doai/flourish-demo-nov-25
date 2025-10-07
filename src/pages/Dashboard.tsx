import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { StatsCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageSearch, CheckSquare, TrendingUp, AlertCircle, Plus, Droplets, Package, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const recentBatches = [
    { id: "MAN-2024-156", name: "Mānuka", stage: "Hardening", quantity: 450, location: "ShadeHouse A", daysInStage: 12, urgent: false },
    { id: "TOT-2024-089", name: "Tōtara", stage: "Potting", quantity: 320, location: "Bay 05", daysInStage: 8, urgent: true },
    { id: "HAR-2025-012", name: "Harakeke (Flax)", stage: "Ready", quantity: 180, location: "Dispatch Pad C", daysInStage: 3, urgent: false },
    { id: "KOW-2024-234", name: "Kōwhai", stage: "Propagation", quantity: 680, location: "PropHouse 1", daysInStage: 15, urgent: false },
  ];

  const todayTasks = [
    { id: 1, task: "Water ShadeHouse A - Mānuka hardening", assignee: "Mereana", priority: "High", location: "ShadeHouse A" },
    { id: 2, task: "Pot up Batch TOT-2024-089", assignee: "Liam", priority: "High", location: "Potting Shed" },
    { id: 3, task: "Quality check - Harakeke ready for dispatch", assignee: "Sofia", priority: "Medium", location: "Dispatch Pad C" },
    { id: 4, task: "Move hardened Rimu to ready zone", assignee: "Mereana", priority: "Low", location: "Bay 12" },
    { id: 5, task: "Treatment - Fertilize Kōwhai propagation", assignee: "Sofia", priority: "Medium", location: "PropHouse 1" },
  ];

  const alerts = [
    { id: 1, message: "Tōtara batch TOT-2024-089 requires urgent potting", type: "urgent", location: "Bay 05" },
    { id: 2, message: "ShadeHouse A at 92% capacity", type: "warning", location: "ShadeHouse A" },
    { id: 3, message: "3 batches ready for dispatch this week", type: "info", location: "Dispatch Pad C" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            New Batch
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Batches"
            value="34"
            icon={PackageSearch}
            trend={{ value: "4 ready for dispatch", positive: true }}
          />
          <StatsCard
            title="Tasks Today"
            value={todayTasks.length.toString()}
            icon={CheckSquare}
            trend={{ value: "2 urgent", positive: false }}
          />
          <StatsCard
            title="Total Plants"
            value="18.2K"
            icon={TrendingUp}
            trend={{ value: "12% vs last month", positive: true }}
          />
          <StatsCard
            title="Locations Active"
            value="12"
            icon={MapPin}
            trend={{ value: "2 near capacity", positive: false }}
          />
        </div>

        {/* Alerts Banner */}
        {alerts.length > 0 && (
          <Card className="p-4 mb-6 border-l-4 border-l-primary">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1 space-y-2">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-muted-foreground">Location: {alert.location}</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Batches */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Active Batches</h2>
              <Link to="/managers/inventory">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentBatches.map((batch) => (
                <div
                  key={batch.id}
                  className={`p-4 rounded-lg border transition-[var(--transition-smooth)] cursor-pointer ${
                    batch.urgent ? "border-destructive bg-destructive/5" : "hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-semibold">{batch.name}</div>
                        {batch.urgent && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/20 text-destructive font-medium">
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {batch.id} · {batch.quantity} plants
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          {batch.stage}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {batch.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-muted-foreground">{batch.daysInStage} days</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Today's Tasks */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Today's Tasks</h2>
              <Link to="/managers/operations">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 rounded-lg border hover:bg-secondary/50 transition-[var(--transition-smooth)] cursor-pointer"
                >
                  <div className="mt-0.5">
                    <CheckSquare className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{task.task}</div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>👤 {task.assignee}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {task.location}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
                      task.priority === "High"
                        ? "bg-destructive/10 text-destructive"
                        : task.priority === "Medium"
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {task.priority}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
