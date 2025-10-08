import { DevBar } from "@/components/DevBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, TrendingUp, Calendar, Target, BarChart3, 
  Sprout, Package, MapPin, Users
} from "lucide-react";

export default function ManagerPlanning() {
  const productionPlans = [
    {
      id: "PLAN-2025-Q1",
      name: "Q1 2025 Native Species Production",
      targetQuantity: 15000,
      currentQuantity: 8420,
      species: ["Mānuka", "Tōtara", "Harakeke", "Kōwhai"],
      startDate: "2025-01-01",
      endDate: "2025-03-31",
      status: "Active",
      progress: 56
    },
    {
      id: "PLAN-2025-Q2",
      name: "Q2 2025 Restoration Project",
      targetQuantity: 22000,
      currentQuantity: 3200,
      species: ["Rimu", "Kahikatea", "Kauri", "Pōhutukawa"],
      startDate: "2025-04-01",
      endDate: "2025-06-30",
      status: "Planning",
      progress: 15
    },
  ];

  const forecasts = [
    {
      species: "Mānuka",
      projected: 4500,
      actual: 3890,
      variance: -610,
      successRate: 86,
      timeline: "On track"
    },
    {
      species: "Tōtara",
      projected: 3200,
      actual: 2980,
      variance: -220,
      successRate: 93,
      timeline: "On track"
    },
    {
      species: "Harakeke",
      projected: 2800,
      actual: 1550,
      variance: -1250,
      successRate: 55,
      timeline: "Behind"
    },
    {
      species: "Kōwhai",
      projected: 4500,
      actual: 5420,
      variance: +920,
      successRate: 120,
      timeline: "Ahead"
    },
  ];

  const capacityData = [
    { location: "PropHouse 1", capacity: 5000, current: 4200, percentage: 84 },
    { location: "ShadeHouse A", capacity: 3500, current: 3220, percentage: 92 },
    { location: "Bay 01", capacity: 2000, current: 1450, percentage: 73 },
    { location: "Bay 05", capacity: 2000, current: 1820, percentage: 91 },
    { location: "Bay 12", capacity: 1500, current: 890, percentage: 59 },
    { location: "Dispatch Pad C", capacity: 1000, current: 340, percentage: 34 },
  ];

  const resourcePlanning = [
    { week: "Week 1", staff: 12, hours: 480, tasksPlanned: 34 },
    { week: "Week 2", staff: 14, hours: 560, tasksPlanned: 42 },
    { week: "Week 3", staff: 12, hours: 480, tasksPlanned: 38 },
    { week: "Week 4", staff: 15, hours: 600, tasksPlanned: 45 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <DevBar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Planning & Forecasting</h1>
            <p className="text-muted-foreground">Production plans, capacity management, and resource allocation</p>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            New Production Plan
          </Button>
        </div>

        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList>
            <TabsTrigger value="plans">Production Plans</TabsTrigger>
            <TabsTrigger value="forecast">Forecasting</TabsTrigger>
            <TabsTrigger value="capacity">Capacity</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-6">
            {productionPlans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {plan.startDate} to {plan.endDate}
                        </div>
                        <Badge className={
                          plan.status === "Active" 
                            ? "bg-primary/10 text-primary" 
                            : "bg-muted text-muted-foreground"
                        }>
                          {plan.status}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Target Quantity</div>
                      <div className="text-2xl font-bold">{plan.targetQuantity.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Current Production</div>
                      <div className="text-2xl font-bold text-primary">{plan.currentQuantity.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Progress</div>
                      <div className="text-2xl font-bold">{plan.progress}%</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {plan.currentQuantity.toLocaleString()} / {plan.targetQuantity.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={plan.progress} className="h-3" />
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-3">Species Breakdown</div>
                    <div className="flex flex-wrap gap-2">
                      {plan.species.map((species) => (
                        <Badge key={species} variant="secondary" className="px-3 py-1">
                          <Sprout className="w-3 h-3 mr-1" />
                          {species}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Species Production Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forecasts.map((item) => (
                    <div key={item.species} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Sprout className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.species}</h3>
                            <Badge className={
                              item.timeline === "Ahead" 
                                ? "bg-primary/10 text-primary"
                                : item.timeline === "On track"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-destructive/10 text-destructive"
                            } variant="outline">
                              {item.timeline}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Success Rate</div>
                          <div className={`text-xl font-bold ${
                            item.successRate >= 90 ? "text-primary" :
                            item.successRate >= 70 ? "text-accent" :
                            "text-destructive"
                          }`}>
                            {item.successRate}%
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Projected</div>
                          <div className="font-semibold">{item.projected.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Actual</div>
                          <div className="font-semibold">{item.actual.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Variance</div>
                          <div className={`font-semibold ${
                            item.variance >= 0 ? "text-primary" : "text-destructive"
                          }`}>
                            {item.variance > 0 ? "+" : ""}{item.variance.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Growth Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <span className="font-medium">Overall Growth Rate</span>
                      <span className="text-lg font-bold text-primary">+12.4%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <span className="font-medium">Best Performing</span>
                      <span className="text-lg font-bold">Kōwhai (+20%)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <span className="font-medium">Needs Attention</span>
                      <span className="text-lg font-bold text-destructive">Harakeke (-45%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Next Quarter Targets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Production Target</span>
                      <span className="font-semibold">22,000 plants</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New Species Introduction</span>
                      <span className="font-semibold">4 species</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Expected Revenue</span>
                      <span className="font-semibold text-primary">$180,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Success Rate Goal</span>
                      <span className="font-semibold">85%+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="capacity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location Capacity Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {capacityData.map((location) => (
                    <div key={location.location} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{location.location}</h4>
                          <p className="text-sm text-muted-foreground">
                            {location.current.toLocaleString()} / {location.capacity.toLocaleString()} plants
                          </p>
                        </div>
                        <Badge className={
                          location.percentage >= 90 
                            ? "bg-destructive/10 text-destructive"
                            : location.percentage >= 75
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-primary/10 text-primary"
                        }>
                          {location.percentage}% Full
                        </Badge>
                      </div>
                      <Progress value={location.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Total Capacity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">15,000</div>
                  <p className="text-sm text-muted-foreground mt-1">plants across all locations</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Current Occupancy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">11,920</div>
                  <p className="text-sm text-muted-foreground mt-1">79% of total capacity</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Available Space</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent">3,080</div>
                  <p className="text-sm text-muted-foreground mt-1">plants capacity remaining</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Staff & Resource Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourcePlanning.map((week) => (
                    <div key={week.week} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{week.week}</h4>
                        <Badge variant="secondary">{week.tasksPlanned} tasks planned</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground mb-1">Staff Assigned</div>
                          <div className="font-semibold">{week.staff} workers</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Total Hours</div>
                          <div className="font-semibold">{week.hours} hours</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Avg per Person</div>
                          <div className="font-semibold">{(week.hours / week.staff).toFixed(1)} hrs</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Equipment Utilization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Potting Equipment</span>
                    <span className="font-semibold">92% utilization</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Irrigation Systems</span>
                    <span className="font-semibold">87% utilization</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Transport Vehicles</span>
                    <span className="font-semibold">76% utilization</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Material Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Potting Mix</span>
                    <span className="font-semibold">2,400 L</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Seed Trays</span>
                    <span className="font-semibold">450 units</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Individual Pots</span>
                    <span className="font-semibold">8,200 units</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
