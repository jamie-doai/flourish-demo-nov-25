import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WorkerNav } from "@/components/WorkerNav";
import { DevBar } from "@/components/DevBar";
import { ArrowLeft, Droplets, Sprout, Move, History, Thermometer, Wind, Camera, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const lifecycleStages = [
  { id: "seed", name: "Seed", icon: "🌱", completed: true },
  { id: "propagation", name: "Propagation", icon: "🌿", completed: true },
  { id: "potting", name: "Potting", icon: "🪴", completed: true },
  { id: "hardening", name: "Hardening", icon: "🌳", completed: false },
  { id: "ready", name: "Ready", icon: "📦", completed: false },
  { id: "sold", name: "Sold", icon: "💰", completed: false },
];

export default function WorkerBatchDetail() {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showMoveDialog, setShowMoveDialog] = useState(false);

  const mockBatch = {
    id: batchId,
    species: "Mānuka",
    scientificName: "Leptospermum scoparium",
    location: "Propagation House 1",
    stage: "potting",
    quantity: 120,
    health: "Good",
    plantedDate: "2024-08-15",
    sourceLocation: "Coromandel Peninsula",
    lastWatered: "2025-10-06 08:30 AM",
    lastFertilized: "2025-10-01",
    lastTreatment: "2025-09-28",
    container: "Individual pots",
    expectedReadyDate: "2025-11-15",
    ageInDays: 52,
  };

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

  const locations = [
    "Propagation House 1",
    "Propagation House 2", 
    "Shadehouse A",
    "Shadehouse B",
    "Potting Shed",
    "Seed Store"
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
    <div className="min-h-screen bg-[#F8FAF9] pb-20">
      <DevBar />
      <header className="bg-white border-b border-[#3B7A57]/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/workers/inventory">
              <Button variant="outline" className="text-[#37474F]">
                <ArrowLeft className="w-5 h-5 mr-2" />
                {batchId}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Lifecycle Timeline */}
        <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm mb-4">
          <h3 className="text-sm font-semibold text-[#37474F] mb-4">Lifecycle Progress</h3>
          
          <div className="mb-4">
            <Progress value={progressPercentage} className="h-2 mb-2" />
            <p className="text-xs text-[#37474F]/60 text-right">{Math.round(progressPercentage)}% Complete</p>
          </div>

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
        <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm mb-4">
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
        <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm mb-4">
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

        {/* Quick Actions */}
        <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm mb-4">
          <h3 className="text-sm font-semibold text-[#37474F] mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              className="h-auto flex flex-col items-center gap-2 p-4"
              onClick={() => handleAction("Watering")}
            >
              <Droplets className="w-6 h-6 text-[#3B7A57]" />
              <span className="text-sm">Record Watering</span>
            </Button>

            <Button 
              variant="outline"
              className="h-auto flex flex-col items-center gap-2 p-4"
              onClick={() => handleAction("Treatment")}
            >
              <Sprout className="w-6 h-6 text-[#3B7A57]" />
              <span className="text-sm">Add Treatment</span>
            </Button>

            <Button 
              variant="outline"
              className="h-auto flex flex-col items-center gap-2 p-4"
              onClick={() => handleAction("Photo")}
            >
              <Camera className="w-6 h-6 text-[#3B7A57]" />
              <span className="text-sm">Add Photo</span>
            </Button>

            <Dialog open={showMoveDialog} onOpenChange={setShowMoveDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline"
                  className="h-auto flex flex-col items-center gap-2 p-4"
                >
                  <Move className="w-6 h-6 text-[#3B7A57]" />
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
      </main>

      <WorkerNav />
    </div>
  );
}
