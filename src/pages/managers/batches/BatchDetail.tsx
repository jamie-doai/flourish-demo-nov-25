import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { ArrowLeft, Droplets, Sprout, Move, History, Thermometer, Wind, Camera, CheckCircle2, Printer, Clock, Leaf, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { lifecycleStages, getBatchById, getLocationNames, getTasksByBatch, Batch } from "@/data";
import { CostBreakdownCard } from "@/components/batch/CostBreakdownCard";
import { CostHistoryDrawer } from "@/components/batch/CostHistoryDrawer";
import { DirectEditDialog } from "@/components/inventory/DirectEditDialog";

export default function ManagerBatchDetail() {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [showCostHistory, setShowCostHistory] = useState(false);
  const [showAddCost, setShowAddCost] = useState(false);
  const [showDirectEdit, setShowDirectEdit] = useState(false);

  const mockBatch = getBatchById(batchId || "");
  const locations = getLocationNames();
  const relatedTasks = getTasksByBatch(batchId || "");

  if (!mockBatch) {
    return (
      <div className="min-h-screen bg-background">
        <DevBar />
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <p>Batch not found</p>
        </div>
      </div>
    );
  }

  const environmentalData = {
    temperature: "18°C",
    humidity: "65%",
    lastMeasured: "2 hours ago",
  };

  const activityLog = [
    { date: "2025-10-06", action: "Watering completed", user: "Alex Thompson", time: "08:30 AM", notes: "All plants showing good growth" },
    { date: "2025-10-05", action: "Health check performed", user: "Jordan Smith", time: "02:15 PM", notes: "No signs of disease or pests" },
    { date: "2025-10-03", action: "Stage progression", user: "System", time: "10:00 AM", notes: "Moved from Propagation to Potting stage" },
    { date: "2025-10-01", action: "Fertilizer application", user: "Alex Thompson", time: "09:15 AM", notes: "Applied slow-release fertilizer NPK 15-5-10" },
    { date: "2025-09-28", action: "Pest treatment", user: "Jordan Smith", time: "03:30 PM", notes: "Preventative neem oil spray" },
    { date: "2025-09-25", action: "Count update", user: "Alex Thompson", time: "11:00 AM", notes: "Updated quantity to 120 plants" },
  ];

  const handleAction = (action: string) => {
    toast({
      title: `${action} recorded 🌿`,
      description: `Successfully logged for ${mockBatch.id}`,
    });
  };

  const handleMove = (newLocation: string) => {
    toast({
      title: "Batch moved successfully 📦",
      description: `Moved to ${newLocation}`,
    });
    setShowMoveDialog(false);
  };

  const handleAddCost = () => {
    setShowAddCost(true);
  };

  const handleSaveCustomCost = () => {
    toast({
      title: "Cost added successfully",
      description: "Custom cost has been added to this batch",
    });
    setShowAddCost(false);
  };

  // Calculate lifecycle progress
  const currentStageIndex = lifecycleStages.findIndex(s => s.id === mockBatch.stage);
  const progressPercentage = ((currentStageIndex + 1) / lifecycleStages.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        {/* Header with back button */}
        <div className="mb-6">
          <Link to="/managers/inventory">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Inventory
            </Button>
          </Link>
          
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">{mockBatch.id}</h1>
            <Button variant="outline" onClick={() => setShowDirectEdit(true)}>
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Batch
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{mockBatch.species}</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="costs">Cost of Production</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-base font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button 
                  variant="outline"
                  className="h-auto flex flex-col items-center gap-2 p-4"
                  onClick={() => handleAction("Watering")}
                >
                  <Droplets className="w-6 h-6 text-primary" />
                  <span className="text-sm">Record Watering</span>
                </Button>

                <Button 
                  variant="outline"
                  className="h-auto flex flex-col items-center gap-2 p-4"
                  onClick={() => handleAction("Treatment")}
                >
                  <Sprout className="w-6 h-6 text-primary" />
                  <span className="text-sm">Add Treatment</span>
                </Button>

                <Button 
                  variant="outline"
                  className="h-auto flex flex-col items-center gap-2 p-4"
                  onClick={() => handleAction("Photo")}
                >
                  <Camera className="w-6 h-6 text-primary" />
                  <span className="text-sm">Add Photo</span>
                </Button>

                <Button 
                  variant="outline"
                  className="h-auto flex flex-col items-center gap-2 p-4"
                  onClick={() => toast({ title: "Label sent to printer 🖨️" })}
                >
                  <Printer className="w-6 h-6 text-primary" />
                  <span className="text-sm">Print Label</span>
                </Button>

                <Dialog open={showMoveDialog} onOpenChange={setShowMoveDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline"
                      className="h-auto flex flex-col items-center gap-2 p-4"
                    >
                      <Move className="w-6 h-6 text-primary" />
                      <span className="text-sm">Move Batch</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Move to Location</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 py-4">
                      {locations.filter(loc => loc !== mockBatch.location).map((location) => (
                        <Button
                          key={location}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => handleMove(location)}
                        >
                          📍 {location}
                        </Button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            {/* Sale Status Alert */}
            {mockBatch.saleStatus && (
              <Card className={`p-4 border-2 ${
                mockBatch.saleStatus === "ready-for-sale" 
                  ? "border-green-500 bg-green-50 dark:bg-green-950/20" 
                  : mockBatch.saleStatus === "on-order"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                  : "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
              }`}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={`w-5 h-5 mt-0.5 ${
                    mockBatch.saleStatus === "ready-for-sale" 
                      ? "text-green-600" 
                      : mockBatch.saleStatus === "on-order"
                      ? "text-blue-600"
                      : "text-orange-600"
                  }`} />
                  <div className="flex-1">
                    <p className="font-semibold text-base mb-1">
                      {mockBatch.saleStatus === "ready-for-sale" && "Ready for Sale"}
                      {mockBatch.saleStatus === "on-order" && "On Order"}
                      {mockBatch.saleStatus === "reserved" && "Reserved for Customer"}
                    </p>
                    {mockBatch.customerName && (
                      <p className="text-sm">Customer: {mockBatch.customerName}</p>
                    )}
                    {mockBatch.orderNumber && (
                      <p className="text-sm">Order: {mockBatch.orderNumber}</p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Lifecycle Timeline */}
            <Card className="p-6">
              <h3 className="text-base font-semibold mb-4">Lifecycle Progress</h3>
              <div className="grid grid-cols-6 gap-2">
                {lifecycleStages.map((stage, index) => {
                  const isActive = stage.id === mockBatch.stage;
                  const isPast = index < currentStageIndex;
                  return (
                    <div key={stage.id} className="text-center">
                      <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-lg mb-1 ${
                        isActive 
                          ? 'bg-primary ring-2 ring-primary ring-offset-2' 
                          : isPast 
                          ? 'bg-green-100 dark:bg-green-900' 
                          : 'bg-muted'
                      }`}>
                        {isPast || isActive ? stage.icon : '○'}
                      </div>
                      <p className={`text-[10px] leading-tight ${
                        isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                      }`}>
                        {stage.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Batch Info */}
            <Card className="p-6">
              <h3 className="text-base font-semibold mb-4">Batch Information</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Location</p>
                  <p className="text-sm font-semibold">📍 {mockBatch.location}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Stage</p>
                  <p className="text-sm font-semibold">{mockBatch.stage.charAt(0).toUpperCase() + mockBatch.stage.slice(1)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Quantity</p>
                  <p className="text-sm font-semibold">{mockBatch.quantity} plants</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Health Status</p>
                  <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
                    {mockBatch.health}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Container Type</p>
                  <p className="text-sm font-semibold">{mockBatch.container}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Age</p>
                  <p className="text-sm font-semibold">{mockBatch.ageInDays} days</p>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Planted Date</span>
                  <span>{mockBatch.plantedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Source Location</span>
                  <span>{mockBatch.sourceLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Ready</span>
                  <span>{mockBatch.expectedReadyDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Watered</span>
                  <span>{mockBatch.lastWatered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Fertilized</span>
                  <span>{mockBatch.lastFertilized}</span>
                </div>
                </div>
              </Card>

              {/* Environmental Data */}
              <Card className="p-6">
                <h3 className="text-base font-semibold mb-4">Environmental Conditions</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Thermometer className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-lg font-semibold">{environmentalData.temperature}</p>
                    <p className="text-xs text-muted-foreground">Temperature</p>
                  </div>
                  <div>
                    <Wind className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-lg font-semibold">{environmentalData.humidity}</p>
                    <p className="text-xs text-muted-foreground">Humidity</p>
                  </div>
                  <div>
                    <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold">Optimal</p>
                    <p className="text-xs text-muted-foreground">Conditions</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Last measured: {environmentalData.lastMeasured}
                </p>
              </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Related Tasks</h3>
                <Button size="sm">Add Task</Button>
              </div>
              {relatedTasks.length > 0 ? (
                <div className="space-y-3">
                  {relatedTasks.map((task) => (
                    <Link key={task.id} to={`/managers/tasks/${task.id}`}>
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold">{task.action}</h4>
                            <p className="text-sm text-muted-foreground">{task.location}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            task.status === "overdue" 
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
                              : task.status === "completed" || task.status === "Completed"
                              ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                              : task.status === "In Progress"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                              : "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                          }`}>
                            {task.status === "overdue" ? "Overdue" : 
                             task.status === "completed" || task.status === "Completed" ? "Complete" :
                             task.status === "In Progress" ? "In Progress" : 
                             "To-Do"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Due: {task.due}</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No tasks assigned to this batch</p>
              )}
            </Card>
          </TabsContent>

        {/* Cost of Production Tab */}
        <TabsContent value="costs" className="space-y-6">
          {mockBatch.totalCost ? (
            <CostBreakdownCard 
              batchId={mockBatch.id}
              onViewHistory={() => setShowCostHistory(true)}
              onAddCost={handleAddCost}
            />
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No cost data available for this batch</p>
              <Button onClick={handleAddCost}>Add Initial Costs</Button>
            </Card>
          )}
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-base font-semibold">Activity Log</h3>
            </div>
            <div className="space-y-4">
                {activityLog.map((log, index) => (
                  <div key={index} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-semibold">{log.action}</p>
                        <span className="text-xs text-muted-foreground">{log.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {log.user} • {log.date}
                      </p>
                      {log.notes && (
                        <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded mt-2">
                          {log.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Cost History Drawer */}
      <CostHistoryDrawer 
        batchId={mockBatch.id}
        isOpen={showCostHistory}
        onClose={() => setShowCostHistory(false)}
      />
      
      {/* Add Cost Dialog */}
      <Dialog open={showAddCost} onOpenChange={setShowAddCost}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Custom Cost</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cost Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="e.g., Special Treatment"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select className="w-full px-3 py-2 border rounded-md bg-background">
                <option value="">Select category</option>
                <option value="seed">Seeds & Seedlings</option>
                <option value="soil">Growing Media</option>
                <option value="pot">Containers</option>
                <option value="tray">Trays</option>
                <option value="labour">Labour</option>
                <option value="spray">Spraying</option>
                <option value="maintenance">Maintenance</option>
                <option value="freight">Freight</option>
                <option value="overhead">Overhead</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount ($)</label>
              <input 
                type="number" 
                step="0.01"
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason (Optional)</label>
              <textarea 
                className="w-full px-3 py-2 border rounded-md bg-background resize-none"
                rows={3}
                placeholder="Why is this cost being added?"
              />
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowAddCost(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveCustomCost}>
                Add Cost
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Direct Edit Dialog */}
      <DirectEditDialog
        open={showDirectEdit}
        onOpenChange={setShowDirectEdit}
        batch={mockBatch as Batch}
        onConfirm={(updates) => {
          toast({ title: "Batch updated", description: "Changes saved successfully" });
          setShowDirectEdit(false);
        }}
      />
    </div>
  );
}
