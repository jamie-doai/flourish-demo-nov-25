import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WorkerNav } from "@/components/WorkerNav";
import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { ArrowLeft, Droplets, Sprout, Move, History, Thermometer, Wind, Camera, CheckCircle2, Printer, Clock, Leaf, Split, Merge, Copy, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { lifecycleStages, getBatchById, getLocationNames, getTasksByBatch } from "@/data";
import { SplitBatchDialog } from "@/components/inventory/SplitBatchDialog";
import { MergeBatchDialog } from "@/components/inventory/MergeBatchDialog";
import { DuplicateBatchDialog } from "@/components/inventory/DuplicateBatchDialog";

export default function WorkerBatchDetail() {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [showSplitDialog, setShowSplitDialog] = useState(false);
  const [showMergeDialog, setShowMergeDialog] = useState(false);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);

  const mockBatch = getBatchById(batchId || "");
  const locations = getLocationNames();
  const relatedTasks = getTasksByBatch(batchId || "");

  if (!mockBatch) {
    return (
      <div className="min-h-screen bg-slate-800">
        <div className="max-w-[500px] mx-auto bg-[#F8FAF9] min-h-screen pb-20">
          <DevBar />
          <WorkerNav />
          <div className="container mx-auto px-4 py-8">
            <p>Batch not found</p>
          </div>
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

  // Calculate lifecycle progress
  const currentStageIndex = lifecycleStages.findIndex(s => s.id === mockBatch.stage);
  const progressPercentage = ((currentStageIndex + 1) / lifecycleStages.length) * 100;

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="max-w-[500px] mx-auto bg-[#F8FAF9] min-h-screen pb-20">
        <DevBar />
      <div className="hidden md:block">
        <Navigation />
      </div>
      <header className="bg-white border-b border-[#3B7A57]/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/managers/inventory">
              <Button variant="outline" className="text-[#37474F]">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Batches
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Batch Title */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-[#37474F]">{mockBatch.id}</h1>
            <Button variant="outline" onClick={() => toast({ title: "Label sent to printer 🖨️" })}>
              <Printer className="w-4 h-4 mr-2" />
              Print Label
            </Button>
          </div>
          <p className="text-sm text-[#37474F]/60">{mockBatch.species}</p>
        </div>

        {/* Quick Actions Dropdown */}
        <div className="mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <MoreVertical className="w-4 h-4 mr-2" />
                Quick Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background">
              <DropdownMenuItem onClick={() => handleAction("Watering")}>
                <Droplets className="w-4 h-4 mr-2 text-[#3B7A57]" />
                Record Watering
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("Treatment")}>
                <Sprout className="w-4 h-4 mr-2 text-[#3B7A57]" />
                Add Treatment
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("Photo")}>
                <Camera className="w-4 h-4 mr-2 text-[#3B7A57]" />
                Add Photo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowSplitDialog(true)}>
                <Split className="w-4 h-4 mr-2 text-[#3B7A57]" />
                Split Batch
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowMergeDialog(true)}>
                <Merge className="w-4 h-4 mr-2 text-[#3B7A57]" />
                Merge Batch
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDuplicateDialog(true)}>
                <Copy className="w-4 h-4 mr-2 text-[#3B7A57]" />
                Duplicate Batch
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowMoveDialog(true)}>
                <Move className="w-4 h-4 mr-2 text-[#3B7A57]" />
                Move Batch
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Move Dialog */}
        <Dialog open={showMoveDialog} onOpenChange={setShowMoveDialog}>
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
        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="tasks" className="flex-1">Tasks</TabsTrigger>
            <TabsTrigger value="activity" className="flex-1">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Sale Status Alert */}
            {mockBatch.saleStatus && (
              <Card className={`p-4 border-2 ${
                mockBatch.saleStatus === "ready-for-sale" 
                  ? "border-green-500 bg-green-50" 
                  : mockBatch.saleStatus === "on-order"
                  ? "border-blue-500 bg-blue-50"
                  : "border-orange-500 bg-orange-50"
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
                    <p className="font-semibold text-base text-[#37474F] mb-1">
                      {mockBatch.saleStatus === "ready-for-sale" && "Ready for Sale"}
                      {mockBatch.saleStatus === "on-order" && "On Order"}
                      {mockBatch.saleStatus === "reserved" && "Reserved for Customer"}
                    </p>
                    {mockBatch.customerName && (
                      <p className="text-sm text-[#37474F]">Customer: {mockBatch.customerName}</p>
                    )}
                    {mockBatch.orderNumber && (
                      <p className="text-sm text-[#37474F]">Order: {mockBatch.orderNumber}</p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Lifecycle Timeline */}
            <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm">
              <h3 className="text-sm font-semibold text-[#37474F] mb-4">Lifecycle Progress</h3>

              <div className="grid grid-cols-6 gap-2">
                {lifecycleStages.map((stage, index) => {
                  const isActive = stage.id === mockBatch.stage;
                  const isPast = index < currentStageIndex;
                  return (
                    <div key={stage.id} className="text-center">
                      <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-lg mb-1 ${
                        isActive 
                          ? 'bg-[#3B7A57] ring-2 ring-[#3B7A57] ring-offset-2' 
                          : isPast 
                          ? 'bg-green-100' 
                          : 'bg-gray-100'
                      }`}>
                        {isPast || isActive ? stage.icon : '○'}
                      </div>
                      <p className={`text-[10px] leading-tight ${
                        isActive ? 'text-[#3B7A57] font-semibold' : 'text-[#37474F]/60'
                      }`}>
                        {stage.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Batch Info */}
            <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm">
              <h3 className="text-sm font-semibold text-[#37474F] mb-3">Batch Information</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-[#37474F]/60 mb-1">Current Location</p>
                  <p className="text-sm text-[#37474F] font-semibold">📍 {mockBatch.location}</p>
                </div>
                <div>
                  <p className="text-xs text-[#37474F]/60 mb-1">Current Stage</p>
                  <p className="text-sm text-[#37474F] font-semibold">{mockBatch.stage.charAt(0).toUpperCase() + mockBatch.stage.slice(1)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#37474F]/60 mb-1">Quantity</p>
                  <p className="text-sm text-[#37474F] font-semibold">{mockBatch.quantity} plants</p>
                </div>
                <div>
                  <p className="text-xs text-[#37474F]/60 mb-1">Health Status</p>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                    {mockBatch.health}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-[#37474F]/60 mb-1">Container Type</p>
                  <p className="text-sm text-[#37474F] font-semibold">{mockBatch.container}</p>
                </div>
                <div>
                  <p className="text-xs text-[#37474F]/60 mb-1">Age</p>
                  <p className="text-sm text-[#37474F] font-semibold">{mockBatch.ageInDays} days</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#3B7A57]/10 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#37474F]/60">Planted Date</span>
                  <span className="text-[#37474F]">{mockBatch.plantedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#37474F]/60">Source Location</span>
                  <span className="text-[#37474F]">{mockBatch.sourceLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#37474F]/60">Expected Ready</span>
                  <span className="text-[#37474F]">{mockBatch.expectedReadyDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#37474F]/60">Last Watered</span>
                  <span className="text-[#37474F]">{mockBatch.lastWatered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#37474F]/60">Last Fertilized</span>
                  <span className="text-[#37474F]">{mockBatch.lastFertilized}</span>
                </div>
              </div>
            </Card>

            {/* Environmental Data */}
            <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm">
              <h3 className="text-sm font-semibold text-[#37474F] mb-3">Environmental Conditions</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Thermometer className="w-6 h-6 text-[#3B7A57] mx-auto mb-2" />
                  <p className="text-lg font-semibold text-[#37474F]">{environmentalData.temperature}</p>
                  <p className="text-xs text-[#37474F]/60">Temperature</p>
                </div>
                <div>
                  <Wind className="w-6 h-6 text-[#3B7A57] mx-auto mb-2" />
                  <p className="text-lg font-semibold text-[#37474F]">{environmentalData.humidity}</p>
                  <p className="text-xs text-[#37474F]/60">Humidity</p>
                </div>
                <div>
                  <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#37474F]">Optimal</p>
                  <p className="text-xs text-[#37474F]/60">Conditions</p>
                </div>
              </div>
              <p className="text-xs text-[#37474F]/50 text-center mt-3">
                Last measured: {environmentalData.lastMeasured}
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            {/* Related Tasks */}
            {relatedTasks.length > 0 ? (
              <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm">
                <h3 className="text-sm font-semibold text-[#37474F] mb-3">
                  Related Tasks ({relatedTasks.length})
                </h3>
                <div className="space-y-3">
                  {relatedTasks.map((task) => (
                    <Link key={task.id} to={`/workers/tasks/${task.id}`}>
                      <div className="p-3 bg-[#F8FAF9] rounded-lg hover:bg-[#3B7A57]/5 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-sm font-semibold text-[#37474F]">
                                {task.action}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                task.status === "overdue" 
                                  ? "bg-orange-100 text-orange-700"
                                  : task.status === "completed" || task.status === "Completed"
                                  ? "bg-gray-100 text-gray-700"
                                  : task.status === "In Progress"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-green-100 text-green-700"
                              }`}>
                                {task.status === "overdue" ? "Overdue" : 
                                 task.status === "completed" || task.status === "Completed" ? "Complete" :
                                 task.status === "In Progress" ? "In Progress" : 
                                 "To-Do"}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-[#37474F]/60">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{task.due}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Leaf className="w-3 h-3" />
                                <span>{task.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="p-8 bg-white border-2 border-[#37474F]/20 shadow-sm text-center">
                <p className="text-[#37474F]/60">No tasks assigned to this batch</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            {/* Activity Log */}
            <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-4 h-4 text-[#37474F]/60" />
                <h3 className="text-sm font-semibold text-[#37474F]">Activity Log</h3>
              </div>
              <div className="space-y-4">
                {activityLog.map((log, index) => (
                  <div key={index} className="flex gap-3 pb-4 border-b border-[#3B7A57]/5 last:border-0 last:pb-0">
                    <div className="w-8 h-8 bg-[#3B7A57]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-[#3B7A57] rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm text-[#37474F] font-semibold">{log.action}</p>
                        <span className="text-xs text-[#37474F]/40">{log.time}</span>
                      </div>
                      <p className="text-xs text-[#37474F]/60 mb-1">
                        {log.user} • {log.date}
                      </p>
                      {log.notes && (
                        <p className="text-xs text-[#37474F]/70 bg-[#F8FAF9] p-2 rounded mt-2">
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

      {/* Dialogs */}
      <SplitBatchDialog
        batch={mockBatch}
        open={showSplitDialog}
        onOpenChange={setShowSplitDialog}
        onConfirm={() => {
          setShowSplitDialog(false);
          toast({ title: "Batch split successfully", description: "The batch has been divided" });
        }}
      />

      <MergeBatchDialog
        batches={[mockBatch]}
        open={showMergeDialog}
        onOpenChange={setShowMergeDialog}
        onConfirm={() => {
          setShowMergeDialog(false);
          toast({ title: "Batch merged successfully", description: "Batches have been combined" });
        }}
      />

      <DuplicateBatchDialog
        batch={mockBatch}
        open={showDuplicateDialog}
        onOpenChange={setShowDuplicateDialog}
        onConfirm={(newBatch) => {
          setShowDuplicateDialog(false);
          toast({ 
            title: "Batch duplicated successfully", 
            description: `Created new batch ${newBatch.id}` 
          });
        }}
      />

      <div className="md:hidden">
        <WorkerNav />
      </div>
      </div>
    </div>
  );
}
