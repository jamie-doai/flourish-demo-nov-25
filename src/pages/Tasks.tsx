import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Calendar, User, MapPin, AlertCircle } from "lucide-react";
import { tasks } from "@/data/tasks";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = 
        task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
      const matchesType = typeFilter === "all" || task.type === typeFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });
  }, [searchQuery, statusFilter, priorityFilter, typeFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue": return "bg-destructive text-destructive-foreground";
      case "today": return "bg-warning text-warning-foreground";
      case "upcoming": return "bg-primary text-primary-foreground";
      case "completed": case "Completed": return "bg-success text-success-foreground";
      case "In Progress": return "bg-accent text-accent-foreground";
      case "Pending": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "High": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Medium": return "bg-warning/10 text-warning border-warning/20";
      case "Low": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tasks</h1>
            <p className="text-muted-foreground">Manage daily operations and workflows</p>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tasks, species, location, or assignee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
          </p>
          {(searchQuery || statusFilter !== "all" || priorityFilter !== "all") && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setPriorityFilter("all");
                setTypeFilter("all");
              }}
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card className="p-12 text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Link key={task.id} to={`/managers/tasks/${task.id}`}>
                <Card className="p-6 hover:shadow-lg hover:bg-gray-50 transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {task.title || task.action}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {task.species}
                          </p>
                        </div>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{task.location}</span>
                        </div>
                        
                        {task.assignee && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>{task.assignee}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{task.dueDate || task.due}</span>
                        </div>

                        {task.priority && (
                          <Badge variant="outline" className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        )}
                      </div>

                      {task.type && (
                        <div className="mt-3">
                          <Badge variant="secondary">{task.type}</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
