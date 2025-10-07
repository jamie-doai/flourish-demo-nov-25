import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WorkerNav } from "@/components/WorkerNav";
import { DevBar } from "@/components/DevBar";
import { ArrowLeft, Camera, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WorkerTaskDetail() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [note, setNote] = useState("");
  const [started, setStarted] = useState(false);

  const mockTask = {
    id: taskId,
    species: "Mānuka",
    action: "Water Bay 01 batches",
    location: "Bay 01",
    batch: "BATCH_MAN_WAI_01",
    quantity: "120 trays",
    assignedTo: "Alex",
    priority: "High",
    instructions: "Use overhead spray system. Ensure even coverage across all trays. Check soil moisture before and after watering."
  };

  const handleComplete = () => {
    toast({
      title: "Nice work 🌿",
      description: "Task completed successfully",
    });
    setTimeout(() => navigate("/workers/tasks"), 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] pb-20">
      <DevBar />
      <header className="bg-white border-b border-[#3B7A57]/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/workers/tasks">
              <Button variant="ghost" size="icon" className="text-[#37474F]">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-[#37474F]">Task Details</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Task Info Card */}
        <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm mb-4">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-semibold text-[#37474F]">🌿 {mockTask.species}</span>
              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                High Priority
              </span>
            </div>
            <p className="text-base text-[#37474F] font-medium mb-3">{mockTask.action}</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#37474F]/60">Location</span>
              <span className="text-[#37474F] font-medium">📍 {mockTask.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#37474F]/60">Batch</span>
              <span className="text-[#37474F] font-medium">{mockTask.batch}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#37474F]/60">Quantity</span>
              <span className="text-[#37474F] font-medium">{mockTask.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#37474F]/60">Assigned to</span>
              <span className="text-[#37474F] font-medium">{mockTask.assignedTo}</span>
            </div>
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm mb-4">
          <h3 className="text-sm font-semibold text-[#37474F] mb-2">Instructions</h3>
          <p className="text-sm text-[#37474F]/70 leading-relaxed">{mockTask.instructions}</p>
        </Card>

        {/* Notes Section */}
        {started && (
          <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm mb-4">
            <h3 className="text-sm font-semibold text-[#37474F] mb-3">Add Notes (Optional)</h3>
            <Textarea
              placeholder="Any observations or issues to note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mb-3 min-h-[100px]"
            />
            <Button variant="outline" className="w-full">
              <Camera className="w-4 h-4 mr-2" />
              Add Photo
            </Button>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {!started ? (
            <Button 
              onClick={() => setStarted(true)}
              className="w-full h-12 bg-[#3B7A57] hover:bg-[#3B7A57]/90 text-white font-semibold"
            >
              Start Task
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              className="w-full h-12 bg-[#3B7A57] hover:bg-[#3B7A57]/90 text-white font-semibold"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Complete Task
            </Button>
          )}
        </div>
      </main>

      <WorkerNav />
    </div>
  );
}
