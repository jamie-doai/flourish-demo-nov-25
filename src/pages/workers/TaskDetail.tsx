import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WorkerPageLayout } from "@/components/layouts/WorkerPageLayout";
import { Camera, CheckCircle2, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getTaskById } from "@/data/tasks";
import { Badge } from "@/components/ui/badge";
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

  const task = getTaskById(taskId || "");

  if (!task) {
    return (
      <WorkerPageLayout title="Task Not Found" backTo="/workers/tasks">
        <div className="py-6">
          <Card className="p-6 text-center bg-white">
            <AlertCircle className="w-12 h-12 mx-auto text-[#37474F]/60 mb-4" />
            <h2 className="text-xl font-semibold text-[#37474F] mb-2">Task Not Found</h2>
            <p className="text-[#37474F]/60 mb-4">The task you're looking for doesn't exist.</p>
          </Card>
        </div>
      </WorkerPageLayout>
    );
  }

  const handleComplete = () => {
    toast({
      title: "Nice work 🌿",
      description: "Task completed successfully",
    });
    setTimeout(() => navigate("/workers/tasks"), 1500);
  };

  return (
    <WorkerPageLayout 
      title={task.action}
      backTo="/workers/tasks"
      mainClassName="py-6"
    >
        {/* Task Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#37474F] mb-2">{task.action}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base text-[#37474F]">🌿 {task.species}</span>
            {task.priority && (
              <Badge 
                variant="outline" 
                className={
                  task.priority === "High" 
                    ? "bg-orange-100 text-orange-700 border-orange-300" 
                    : task.priority === "Medium"
                    ? "bg-blue-100 text-blue-700 border-blue-300"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }
              >
                {task.priority} Priority
              </Badge>
            )}
          </div>
        </div>

        {/* Task Info Card */}
        <Card className="p-5 bg-white border border-[#37474F]/20 shadow-sm mb-4">
          <h3 className="text-base font-semibold text-[#37474F] mb-3">Task Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#37474F]/60">Location</span>
              <span className="text-[#37474F] font-medium">📍 {task.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#37474F]/60">Batch</span>
              <span className="text-[#37474F] font-medium">{task.batch}</span>
            </div>
            {task.quantity && (
              <div className="flex justify-between">
                <span className="text-[#37474F]/60">Quantity</span>
                <span className="text-[#37474F] font-medium">{task.quantity}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#37474F]/60">Assigned to</span>
              <span className="text-[#37474F] font-medium">{task.assignee}</span>
            </div>
            {task.dueDate && (
              <div className="flex justify-between">
                <span className="text-[#37474F]/60">Due Date</span>
                <span className="text-[#37474F] font-medium">{task.dueDate}</span>
              </div>
            )}
          </div>
        </Card>

        {/* Instructions */}
        {task.instructions && task.instructions.length > 0 && (
          <Card className="p-5 bg-white border border-[#37474F]/20 shadow-sm mb-4">
            <h3 className="text-base font-semibold text-[#37474F] mb-4">Instructions</h3>
            <ul className="space-y-3">
              {task.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-[#37474F] font-medium">•</span>
                  <span className="text-base text-[#37474F] leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}


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
            className={`relative w-full h-14 rounded-full border transition-all cursor-pointer ${
              isComplete 
                ? "bg-[#3B7A57] border-[#3B7A57]" 
                : "bg-white border-[#37474F]/30 hover:border-[#3B7A57]"
            }`}
          >
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
              isComplete ? "opacity-100" : "opacity-0"
            }`}>
              <CheckCircle2 className="w-3 h-3 text-white mr-2" />
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
              <Button variant="outline" className="w-full h-12 border border-[#37474F]/30 hover:border-[#3B7A57] text-[#37474F]">
                <FileText className="w-3 h-3 mr-2" />
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
                  <Camera className="w-3 h-3 mr-2" />
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
    </WorkerPageLayout>
  );
}
