import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Search, TrendingUp, BarChart3, FileCheck, Shield } from "lucide-react";

export default function ManagerReporting() {
  const traceabilityReports = [
    { id: "MAN-2024-156", species: "Mānuka", source: "Waikanae Beach", collected: "2024-03-15", status: "Ready", plants: 450 },
    { id: "TOT-2024-089", species: "Tōtara", source: "Silverstream Reserve", collected: "2024-02-20", status: "Hardening", plants: 320 },
    { id: "HAR-2025-012", species: "Harakeke", source: "Auckland Regional", collected: "2025-01-05", status: "Ready", plants: 180 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <div className="hidden md:block">
        <Navigation />
      </div>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reporting & Analytics</h1>
            <p className="text-muted-foreground">Traceability, compliance, and performance insights</p>
          </div>
          <Button variant="hero">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        <Tabs defaultValue="traceability" className="space-y-6">
          <TabsList>
            <TabsTrigger value="traceability"><FileCheck className="w-4 h-4 mr-2" />Traceability</TabsTrigger>
            <TabsTrigger value="analytics"><BarChart3 className="w-4 h-4 mr-2" />Analytics</TabsTrigger>
            <TabsTrigger value="biosecurity"><Shield className="w-4 h-4 mr-2" />Biosecurity</TabsTrigger>
          </TabsList>

          <TabsContent value="traceability" className="space-y-4">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by batch ID or species..." className="pl-10" />
              </div>
            </div>

            <div className="space-y-3">
              {traceabilityReports.map((batch) => (
                <Card key={batch.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{batch.species}</h3>
                        <Badge variant="secondary">{batch.id}</Badge>
                        <Badge className="bg-primary/10 text-primary">{batch.status}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Source: </span>{batch.source}
                        </div>
                        <div>
                          <span className="font-medium">Collected: </span>{batch.collected}
                        </div>
                        <div>
                          <span className="font-medium">Quantity: </span>{batch.plants} plants
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Full Report
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">87.2%</div>
                  <p className="text-sm text-muted-foreground mt-1">Seed to saleable</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Stock Turnover</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.2x</div>
                  <p className="text-sm text-muted-foreground mt-1">Per year</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Avg. Growth Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">142</div>
                  <p className="text-sm text-muted-foreground mt-1">Days to ready</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="biosecurity">
            <Card className="p-6">
              <div className="text-center py-12">
                <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Biosecurity Compliance</h3>
                <p className="text-muted-foreground">Treatment logs and compliance reports</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
