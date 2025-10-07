import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkerNav } from "@/components/WorkerNav";
import { ArrowLeft, Droplets, Sprout, Move, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function WorkerBatchDetail() {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showMoveDialog, setShowMoveDialog] = useState(false);

  const mockBatch = {
    id: batchId,
    species: "Mānuka",
    location: "Bay 01",
    stage: "Propagation",
    quantity: 120,
    health: "Good",
    plantedDate: "2025-01-15",
    lastWatered: "2025-10-06",
    lastFertilized: "2025-10-01",
  };

  const activityLog = [
    { date: "2025-10-06", action: "Watering completed", user: "Alex", time: "08:30 AM" },
    { date: "2025-10-05", action: "Health check", user: "Jordan", time: "02:15 PM" },
    { date: "2025-10-01", action: "Fertilizer applied", user: "Alex", time: "10:00 AM" },
  ];

  const locations = ["Bay 01", "Bay 05", "ShadeHouse A", "Potting Shed", "Block 12", "Dispatch Pad C"];

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

  return (
    <div className="min-h-screen bg-[#F8FAF9] pb-20">
      <header className="bg-white border-b border-[#3B7A57]/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/workers/inventory">
              <Button variant="ghost" size="icon" className="text-[#37474F]">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-[#37474F]">🌿 {mockBatch.species}</h1>
              <p className="text-xs text-[#37474F]/40">{mockBatch.id}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Batch Info */}
        <Card className="p-5 bg-white border-none shadow-sm mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Location</p>
              <p className="text-sm text-[#37474F] font-semibold">📍 {mockBatch.location}</p>
            </div>
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Stage</p>
              <p className="text-sm text-[#37474F] font-semibold">{mockBatch.stage}</p>
            </div>
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Quantity</p>
              <p className="text-sm text-[#37474F] font-semibold">{mockBatch.quantity} trays</p>
            </div>
            <div>
              <p className="text-xs text-[#37474F]/60 mb-1">Health</p>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                {mockBatch.health}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#3B7A57]/10 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#37474F]/60">Planted Date</span>
              <span className="text-[#37474F]">{mockBatch.plantedDate}</span>
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

        {/* Quick Actions */}
        <Card className="p-5 bg-white border-none shadow-sm mb-4">
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

            <Dialog open={showMoveDialog} onOpenChange={setShowMoveDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline"
                  className="h-auto flex flex-col items-center gap-2 p-4 col-span-2"
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
        <Card className="p-5 bg-white border-none shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-4 h-4 text-[#37474F]/60" />
            <h3 className="text-sm font-semibold text-[#37474F]">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {activityLog.map((log, index) => (
              <div key={index} className="flex gap-3 pb-3 border-b border-[#3B7A57]/5 last:border-0 last:pb-0">
                <div className="flex-1">
                  <p className="text-sm text-[#37474F] font-medium">{log.action}</p>
                  <p className="text-xs text-[#37474F]/60 mt-1">
                    {log.user} • {log.date} at {log.time}
                  </p>
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
