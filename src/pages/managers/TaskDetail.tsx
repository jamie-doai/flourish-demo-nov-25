import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { ArrowLeft, Camera, CheckCircle2, FileText, User, MapPin, Clock, Package, Calendar, AlertCircle } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ManagerTaskDetail() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [note, setNote] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [showReassignDialog, setShowReassignDialog] = useState(false);

  const task = getTaskById(taskId || "");

  if (!task) {
    return (
      <div className="min-h-screen bg-background">
        <DevBar />
        <Navigation />
        <main className="container mx-auto px-6 py-8">
          <Card className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Task Not Found</h2>
            <p className="text-muted-foreground mb-4">The task you're looking for doesn't exist.</p>
            <Link to="/managers/operations">
              <Button>Back to Operations</Button>
            </Link>
          </Card>
        </main>
      </div>
    );
  }

  const handleComplete = () => {
    toast({
      title: "Task Completed",
      description: "Task marked as completed successfully",
    });
    setTimeout(() => navigate("/managers/operations"), 1500);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive/10 text-destructive";
      case "Medium": return "bg-accent/10 text-accent";
      case "Low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-primary/10 text-primary";
      case "In Progress": return "bg-blue-500/10 text-blue-500";
      case "Pending": return "bg-yellow-500/10 text-yellow-500";
      case "Scheduled": return "bg-purple-500/10 text-purple-500";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <Link to="/managers/operations" className="self-start">
            <Button variant="tertiary" size="sm">
              <ArrowLeft className="w-3 h-3 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-heading-2 sm:text-heading-1 font-heading font-bold mb-2 break-words">{task.title || task.action}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={getStatusColor(task.status)} variant="outline">
                {task.status}
              </Badge>
              <Badge className={getPriorityColor(task.priority)} variant="outline">
                {task.priority} Priority
              </Badge>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap flex-shrink-0">
            <Dialog open={showReassignDialog} onOpenChange={setShowReassignDialog}>
              <DialogTrigger asChild>
                <Button variant="tertiary">
                  <User className="w-3 h-3 mr-2" />
                  Reassign
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reassign Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Assign To</label>
                    <Select defaultValue={task.assignee}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mereana">Mereana (Manager)</SelectItem>
                        <SelectItem value="Liam">Liam (Dispatch)</SelectItem>
                        <SelectItem value="Sofia">Sofia (Grower)</SelectItem>
                        <SelectItem value="Alex">Alex (Worker)</SelectItem>
                        <SelectItem value="Jordan">Jordan (Worker)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Task Reassigned",
                        description: "Task has been reassigned successfully",
                      });
                      setShowReassignDialog(false);
                    }}
                    className="w-full"
                  >
                    Reassign Task
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            {task.status !== "Completed" && (
              <Button 
                onClick={() => {
                  setIsComplete(true);
                  handleComplete();
                }}
                disabled={isComplete}
              >
                <CheckCircle2 className="w-3 h-3 mr-2" />
                {isComplete ? "Completed" : "Mark Complete"}
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Details */}
            <Card>
              <h2 className="text-xl font-semibold mb-4">Task Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-3 h-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned To</p>
                      <p className="font-medium">{task.assignee}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-3 h-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{task.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="w-3 h-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Batch</p>
                      <p className="font-medium">{task.batch}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-3 h-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-medium">{task.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-3 h-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Hours</p>
                      <p className="font-medium">{task.estimatedHours}h</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-muted-foreground mt-0.5">🌿</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Species</p>
                      <p className="font-medium">{task.species}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Instructions */}
            {task.instructions && task.instructions.length > 0 && (
              <Card>
                <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                <ul className="space-y-3">
                  {task.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-primary font-medium">{index + 1}.</span>
                      <span className="text-muted-foreground">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Notes Section */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Notes & Attachments</h2>
                <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
                  <DialogTrigger asChild>
                    <Button variant="tertiary" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Add Note
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Note</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Textarea
                        placeholder="Enter your notes..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="min-h-[120px]"
                      />
                      <Button variant="tertiary" className="w-full">
                        <Camera className="w-4 h-4 mr-2" />
                        Add Photo
                      </Button>
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Note Saved",
                            description: "Your note has been recorded",
                          });
                          setShowNotesDialog(false);
                          setNote("");
                        }}
                        className="w-full"
                      >
                        Save Note
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-muted-foreground text-sm">No notes or attachments yet</p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="tertiary" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Update Status
                </Button>
                <Button variant="tertiary" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Change Due Date
                </Button>
                <Button variant="tertiary" className="w-full justify-start">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Change Priority
                </Button>
              </div>
            </Card>

            {/* Activity Log */}
            <Card>
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
                  <div>
                    <p className="font-medium">Task created</p>
                    <p className="text-muted-foreground text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <div>
                    <p className="font-medium">Assigned to {task.assignee}</p>
                    <p className="text-muted-foreground text-xs">2 hours ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
