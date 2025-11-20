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
    <div className="min-h-screen bg-white">
      <DevBar />
      <Navigation />

      <main className="container mx-auto px-4 py-6 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-heading-1 font-heading font-bold mb-2">Dashboard</h1>
            <p className="text-body text-muted-foreground">Welcome back! Here's what's happening today.</p>
          </div>
          <Button variant="default">
            <Plus className="w-6 h-6" />
            New Batch
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
          <Card className="mb-6 border-l-4 border-l-forest-green">
            <div className="flex items-start gap-1.5">
              <AlertCircle className="w-6 h-6 text-forest-green mt-0.5" />
              <div className="flex-1 space-y-2">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-heading font-bold text-body">{alert.message}</p>
                      <p className="text-body-small text-muted-foreground">Location: {alert.location}</p>
                    </div>
                    <Button variant="primary-ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Recent Batches */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-heading-3 font-heading font-bold">Active Batches</h2>
              <Link to="/managers/inventory">
                <Button variant="primary-ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {recentBatches.map((batch) => (
                <div
                  key={batch.id}
                  className={`p-4 rounded-lg border-2 transition-[var(--transition-smooth)] cursor-pointer ${
                    batch.urgent ? "border-destructive bg-destructive/10" : "border-sage-gray hover:bg-lime-green/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-heading font-bold text-body">{batch.name}</div>
                        {batch.urgent && (
                          <span className="text-body-small px-2 py-0.5 rounded-full bg-destructive/20 text-destructive font-heading font-bold">
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="text-body-small text-muted-foreground">
                        {batch.id} · {batch.quantity} plants
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-body-small text-muted-foreground">
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
                    <div className="text-right text-body-small">
                      <div className="text-muted-foreground">{batch.daysInStage} days</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Today's Tasks */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-heading-3 font-heading font-bold">Today's Tasks</h2>
              <Link to="/managers/operations">
                <Button variant="primary-ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-1.5 p-3 rounded-lg border-2 border-sage-gray hover:bg-lime-green/20 transition-[var(--transition-smooth)] cursor-pointer"
                >
                  <div className="mt-0.5">
                    <CheckSquare className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-bold text-body">{task.task}</div>
                    <div className="flex items-center gap-3 mt-0.5 text-body-small text-muted-foreground">
                      <span>👤 {task.assignee}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {task.location}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`text-body-small font-heading font-bold px-2 py-1 rounded-full whitespace-nowrap ${
                      task.priority === "High"
                        ? "bg-destructive/10 text-destructive"
                        : task.priority === "Medium"
                        ? "bg-lime-green/20 text-forest-green"
                        : "bg-sage-gray/20 text-muted-foreground"
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
