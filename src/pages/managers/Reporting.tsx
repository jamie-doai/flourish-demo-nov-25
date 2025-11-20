import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Search, TrendingUp, BarChart3, FileCheck, Shield, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export default function ManagerReporting() {
  const traceabilityReports = [
    { id: "MAN-2024-156", species: "Mānuka", source: "Waikanae Beach", collected: "2024-03-15", status: "Ready", plants: 450 },
    { id: "TOT-2024-089", species: "Tōtara", source: "Silverstream Reserve", collected: "2024-02-20", status: "Hardening", plants: 320 },
    { id: "HAR-2025-012", species: "Harakeke", source: "Auckland Regional", collected: "2025-01-05", status: "Ready", plants: 180 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="min-w-0">
            <h1 className="text-heading-2 sm:text-heading-1 font-heading font-bold mb-2 break-words">Reporting & Analytics</h1>
            <p className="text-body-small sm:text-body text-muted-foreground">Traceability, compliance, and performance insights</p>
          </div>
          <Button variant="default" className="flex-shrink-0">
            <Download className="w-3 h-3 mr-2" />
            Export Report
          </Button>
        </div>

        <Tabs defaultValue="traceability" className="space-y-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 border border-forest-green">
            <TabsTrigger value="traceability"><FileCheck className="w-4 h-4 mr-2" />Traceability</TabsTrigger>
            <TabsTrigger value="analytics"><BarChart3 className="w-4 h-4 mr-2" />Analytics</TabsTrigger>
            <TabsTrigger value="costs"><DollarSign className="w-4 h-4 mr-2" />Cost Analysis</TabsTrigger>
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
                        <h3 className="font-semibold text-lg">{batch.id}</h3>
                        <Badge variant="secondary">{batch.species}</Badge>
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

          <TabsContent value="costs">
            <Card>
              <div className="text-center py-12">
                <DollarSign className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Cost Analysis & Margins</h3>
                <p className="text-muted-foreground mb-6">Production costs and profitability insights</p>
                <Link to="/managers/reporting/cost-analysis">
                  <Button>
                    View Cost Analysis
                    <BarChart3 className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="biosecurity">
            <Card>
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
