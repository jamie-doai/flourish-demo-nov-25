import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, Search, Calendar as CalendarIcon, CheckSquare, 
  Clock, AlertCircle, User, MapPin, Droplets, Package, 
  Sprout, ChevronRight
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { tasks as unifiedTasks } from "@/data";

export default function ManagerOperations() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Use unified tasks from data
  const tasks = unifiedTasks.map(task => ({
    id: task.id,
    title: task.title || task.action,
    batch: task.batch,
    assignee: task.assignee || "Unassigned",
    dueDate: task.dueDate || "TBD",
    priority: task.priority || "Medium",
    status: task.status === "overdue" ? "Pending" : 
            task.status === "today" ? "In Progress" :
            task.status === "upcoming" ? "Scheduled" :
            task.status === "completed" ? "Completed" : task.status,
    location: task.location,
    type: task.type || "Quality Check",
    estimatedHours: task.estimatedHours || 1
  }));

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Watering": return Droplets;
      case "Potting": return Package;
      case "Sowing": return Sprout;
      case "Movement": return MapPin;
      case "Quality Check": return CheckSquare;
      case "Treatment": return AlertCircle;
      default: return Clock;
    }
  };

  const filteredTasks = selectedStatus === "all" 
    ? tasks 
    : tasks.filter(task => task.status === selectedStatus);

  const tasksByStatus = {
    pending: tasks.filter(t => t.status === "Pending"),
    inProgress: tasks.filter(t => t.status === "In Progress"),
    scheduled: tasks.filter(t => t.status === "Scheduled"),
    completed: tasks.filter(t => t.status === "Completed"),
  };

  return (
    <ManagerLayout>
      <main className="container mx-auto px-6 py-8">
        <PageHeader
          title="Operations"
          description="Task management, scheduling, and workflow coordination"
          actions={
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-3 h-3 mr-2" />
                    Create Task
                  </Button>
                </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Task Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="watering">Watering</SelectItem>
                        <SelectItem value="potting">Potting</SelectItem>
                        <SelectItem value="sowing">Sowing</SelectItem>
                        <SelectItem value="movement">Movement</SelectItem>
                        <SelectItem value="quality">Quality Check</SelectItem>
                        <SelectItem value="treatment">Treatment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input placeholder="Task title..." />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Task details..." rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Assign To</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select worker" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mereana">Mereana (Manager)</SelectItem>
                        <SelectItem value="liam">Liam (Dispatch)</SelectItem>
                        <SelectItem value="sofia">Sofia (Grower)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bay01">Bay 01</SelectItem>
                        <SelectItem value="bay05">Bay 05</SelectItem>
                        <SelectItem value="shadehouse">ShadeHouse A</SelectItem>
                        <SelectItem value="prophouse">PropHouse 1</SelectItem>
                        <SelectItem value="dispatch">Dispatch Pad C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Hours</Label>
                    <Input type="number" placeholder="0" step="0.5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Batch ID (optional)</Label>
                  <Input placeholder="MAN-2024-156" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost">Cancel</Button>
                <Button>Create Task</Button>
              </div>
            </DialogContent>
          </Dialog>
            </>
          }
        />

        <Tabs defaultValue="board" className="space-y-6">
          <TabsList className="grid grid-cols-3 gap-2 border border-forest-green">
            <TabsTrigger value="board">Task Board</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="board" className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Pending Column */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <h3 className="font-semibold">Pending</h3>
                  <Badge variant="secondary">{tasksByStatus.pending.length}</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  {tasksByStatus.pending.map((task) => {
                    const Icon = getTypeIcon(task.type);
                    return (
                      <Link key={task.id} to={`/managers/tasks/${task.id}`}>
                        <Card className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Icon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">{task.type}</span>
                              </div>
                              <Badge className={getPriorityColor(task.priority)} variant="outline">
                                {task.priority}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {task.assignee}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {task.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.dueDate}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <h3 className="font-semibold">In Progress</h3>
                  <Badge variant="secondary">{tasksByStatus.inProgress.length}</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  {tasksByStatus.inProgress.map((task) => {
                    const Icon = getTypeIcon(task.type);
                    return (
                      <Link key={task.id} to={`/managers/tasks/${task.id}`}>
                        <Card className="p-3 cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Icon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">{task.type}</span>
                              </div>
                              <Badge className={getPriorityColor(task.priority)} variant="outline">
                                {task.priority}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {task.assignee}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {task.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.dueDate}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Scheduled Column */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <h3 className="font-semibold">Scheduled</h3>
                  <Badge variant="secondary">{tasksByStatus.scheduled.length}</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  {tasksByStatus.scheduled.map((task) => {
                    const Icon = getTypeIcon(task.type);
                    return (
                      <Link key={task.id} to={`/managers/tasks/${task.id}`}>
                        <Card className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Icon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">{task.type}</span>
                              </div>
                              <Badge className={getPriorityColor(task.priority)} variant="outline">
                                {task.priority}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {task.assignee}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {task.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.dueDate}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Completed Column */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <h3 className="font-semibold">Completed</h3>
                  <Badge variant="secondary">{tasksByStatus.completed.length}</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  {tasksByStatus.completed.map((task) => {
                    const Icon = getTypeIcon(task.type);
                    return (
                      <Link key={task.id} to={`/managers/tasks/${task.id}`}>
                        <Card className="p-3 cursor-pointer hover:shadow-md transition-shadow opacity-75">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Icon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">{task.type}</span>
                              </div>
                              <CheckSquare className="w-3 h-3 text-primary" />
                            </div>
                            <h4 className="font-medium text-sm leading-tight line-through">{task.title}</h4>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {task.assignee}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {task.location}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                <Input placeholder="Search tasks..." className="pl-10" />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              {filteredTasks.map((task) => {
                const Icon = getTypeIcon(task.type);
                return (
                  <Link key={task.id} to={`/managers/tasks/${task.id}`}>
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <Icon className="w-3 h-3 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold">{task.title}</h3>
                            <Badge className={getStatusColor(task.status)} variant="outline">
                              {task.status}
                            </Badge>
                            <Badge className={getPriorityColor(task.priority)} variant="outline">
                              {task.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <span className="text-xs">{task.id}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {task.assignee}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {task.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Due: {task.dueDate}
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              {task.batch}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <div className="text-center py-12">
                <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
                <p className="text-muted-foreground">Visual schedule and timeline view coming soon</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </ManagerLayout>
  );
}
