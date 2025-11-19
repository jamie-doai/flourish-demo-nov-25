import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, CheckCircle, Clock } from "lucide-react";
import { getStocktakeSessions, getStocktakeCounts } from "@/data/stocktakes";
import { StocktakeStatus } from "@/types/stocktake";
import { calculateVariancePercent } from "@/lib/bulkActionUtils";

export function StocktakeManager() {
  const [sessions] = useState(getStocktakeSessions());
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const getStatusBadge = (status: StocktakeStatus) => {
    const variants = {
      draft: "outline",
      in_progress: "secondary",
      completed: "default",
      posted: "default",
    } as const;

    return (
      <Badge variant={variants[status]}>
        {status === "in_progress" && <Clock className="w-3 h-3 mr-1" />}
        {status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
        {status === "posted" && <CheckCircle className="w-3 h-3 mr-1" />}
        {status.replace("_", " ")}
      </Badge>
    );
  };

  const counts = selectedSession ? getStocktakeCounts(selectedSession) : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Stocktake Management</h2>
          <p className="text-muted-foreground">Create and manage inventory counts</p>
        </div>
        <Button>
          <Plus className="w-6 h-6 mr-2" />
          New Stocktake
        </Button>
      </div>

      <Tabs defaultValue="sessions">
        <TabsList>
          <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">
                      Stocktake: {session.scopeDetails || session.scope}
                    </h3>
                    {getStatusBadge(session.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Created {new Date(session.createdAt).toLocaleDateString()} by {session.createdBy}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-2xl font-bold">
                    {session.countedBatches}/{session.totalBatches}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-3 border rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Scope</p>
                  <p className="font-medium capitalize">{session.scope}</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Variances Found</p>
                  <p className="font-medium">{session.varianceCount}</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">As Of Date</p>
                  <p className="font-medium">
                    {new Date(session.asOf).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSession(session.id)}
                >
                  View Details
                </Button>
                {session.status === "completed" && (
                  <>
                    <Button variant="outline" size="sm">
                      <Download className="w-6 h-6 mr-2" />
                      Export Report
                    </Button>
                    <Button size="sm">Post Adjustments</Button>
                  </>
                )}
              </div>

              {selectedSession === session.id && counts.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold mb-3">Count Details</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {counts.map((count) => (
                      <div
                        key={count.id}
                        className="p-3 border rounded-lg flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <p className="font-medium font-mono">{count.batchCode}</p>
                          <p className="text-sm text-muted-foreground">
                            Location: {count.locationId}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">System</p>
                            <p className="font-medium">{count.systemQuantity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Counted</p>
                            <p className="font-medium">{count.countedQuantity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Variance</p>
                            <p
                              className={`font-semibold ${
                                count.variance < 0
                                  ? "text-destructive"
                                  : count.variance > 0
                                  ? "text-green-600"
                                  : ""
                              }`}
                            >
                              {count.variance > 0 ? "+" : ""}
                              {count.variance} ({count.variancePercent.toFixed(1)}%)
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}

          {sessions.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No active stocktake sessions</p>
              <Button className="mt-4">Create First Stocktake</Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Historical stocktakes will appear here</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
