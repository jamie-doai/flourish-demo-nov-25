import { Navigation } from "@/components/Navigation";
import { StatsCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageSearch, CheckSquare, TrendingUp, AlertCircle, Plus } from "lucide-react";

export default function Dashboard() {
  const recentBatches = [
    { id: "B2025-001", name: "Lavender 'Hidcote'", stage: "Potting", quantity: 500, daysInStage: 12 },
    { id: "B2025-002", name: "Rosemary", stage: "Hardening", quantity: 350, daysInStage: 8 },
    { id: "B2025-003", name: "Basil 'Genovese'", stage: "Germination", quantity: 800, daysInStage: 5 },
  ];

  const todayTasks = [
    { id: 1, task: "Water Bay 3 - Herbs", assignee: "Team A", priority: "High" },
    { id: 2, task: "Pot up Batch B2025-001", assignee: "Team B", priority: "Medium" },
    { id: 3, task: "Quality check - Tomatoes", assignee: "Sarah", priority: "High" },
    { id: 4, task: "Move hardened plants to Bay 5", assignee: "Team A", priority: "Low" },
  ];

  return (
    <div className="min-h-screen bg-background">
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
            value="23"
            icon={PackageSearch}
            trend={{ value: "12% vs last month", positive: true }}
          />
          <StatsCard
            title="Tasks Today"
            value="8"
            icon={CheckSquare}
            trend={{ value: "3 overdue", positive: false }}
          />
          <StatsCard
            title="Total Plants"
            value="12.4K"
            icon={TrendingUp}
            trend={{ value: "8% growth", positive: true }}
          />
          <StatsCard
            title="Alerts"
            value="2"
            icon={AlertCircle}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Batches */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Active Batches</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {recentBatches.map((batch) => (
                <div
                  key={batch.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/50 transition-[var(--transition-smooth)] cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="font-medium">{batch.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {batch.id} · {batch.quantity} plants
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">{batch.stage}</div>
                    <div className="text-xs text-muted-foreground">{batch.daysInStage} days</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Today's Tasks */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Today's Tasks</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-4 rounded-lg border hover:bg-secondary/50 transition-[var(--transition-smooth)] cursor-pointer"
                >
                  <div className="mt-0.5">
                    <CheckSquare className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{task.task}</div>
                    <div className="text-sm text-muted-foreground mt-1">{task.assignee}</div>
                  </div>
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
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
