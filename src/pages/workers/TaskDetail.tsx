import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WorkerNav } from "@/components/WorkerNav";
import { DevBar } from "@/components/DevBar";
import { ArrowLeft, Camera, CheckCircle2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function WorkerTaskDetail() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [note, setNote] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showNotesDialog, setShowNotesDialog] = useState(false);

  const mockTask = {
    id: taskId,
    species: "Mānuka",
    action: "Water Bay 01 batches",
    location: "Bay 01",
    batch: "BATCH_MAN_WAI_01",
    quantity: "120 trays",
    assignedTo: "Alex",
    priority: "High",
    instructions: [
      "Use overhead spray system",
      "Ensure even coverage across all trays",
      "Check soil moisture before and after watering",
      "Monitor for any signs of overwatering or dry spots"
    ]
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
              <Button variant="outline" className="text-[#37474F]">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Task Details
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Task Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#37474F] mb-2">{mockTask.action}</h1>
          <div className="flex items-center gap-2">
            <span className="text-base text-[#37474F]">🌿 {mockTask.species}</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-medium">
              High Priority
            </span>
          </div>
        </div>

        {/* Task Info Card */}
        <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm mb-4">
          <h3 className="text-base font-semibold text-[#37474F] mb-3">Task Details</h3>
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
          <h3 className="text-base font-semibold text-[#37474F] mb-4">Instructions</h3>
          <ul className="space-y-3">
            {mockTask.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-[#37474F] font-medium">•</span>
                <span className="text-base text-[#37474F] leading-relaxed">{instruction}</span>
              </li>
            ))}
          </ul>
        </Card>


        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Task Complete Slider Button */}
          <div 
            onClick={() => {
              if (!isComplete) {
                setIsComplete(true);
                handleComplete();
              }
            }}
            className={`relative w-full h-14 rounded-full border-2 transition-all cursor-pointer ${
              isComplete 
                ? "bg-[#3B7A57] border-[#3B7A57]" 
                : "bg-white border-[#37474F]/30 hover:border-[#3B7A57]"
            }`}
          >
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
              isComplete ? "opacity-100" : "opacity-0"
            }`}>
              <CheckCircle2 className="w-5 h-5 text-white mr-2" />
              <span className="text-white font-semibold">Task Completed!</span>
            </div>
            <div className={`absolute inset-0 flex items-center transition-all ${
              isComplete ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
            }`}>
              <div className="absolute left-1 top-1 bottom-1 w-20 bg-[#3B7A57] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">Slide</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-[#37474F] font-semibold">Task Complete</span>
              </div>
            </div>
          </div>

          {/* Add Notes Button */}
          <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full h-12 border-2 border-[#37474F]/30 hover:border-[#3B7A57] text-[#37474F]">
                <FileText className="w-5 h-5 mr-2" />
                Add Notes
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Add Notes</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea
                  placeholder="Any observations or issues to note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[120px]"
                />
                <Button variant="outline" className="w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photo
                </Button>
                <Button 
                  onClick={() => {
                    toast({
                      title: "Notes saved 📝",
                      description: "Your notes have been recorded",
                    });
                    setShowNotesDialog(false);
                  }}
                  className="w-full bg-[#3B7A57] hover:bg-[#3B7A57]/90 text-white"
                >
                  Save Notes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <WorkerNav />
    </div>
  );
}
