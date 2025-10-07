import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, ShoppingCart, Users, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ManagerSales() {
  const quotes = [
    { id: "Q-2025-012", client: "Green Gardens Ltd", total: "$2,450", status: "Pending", date: "2025-01-22" },
    { id: "Q-2025-011", client: "Urban Landscapes", total: "$3,200", status: "Approved", date: "2025-01-20" },
    { id: "Q-2025-010", client: "Fresh Herbs Co", total: "$1,850", status: "Sent", date: "2025-01-18" },
  ];

  const orders = [
    { id: "ORD-2025-045", client: "Green Gardens Ltd", items: 12, total: "$4,500", status: "Processing", date: "2025-01-21" },
    { id: "ORD-2025-044", client: "City Botanicals", items: 8, total: "$2,100", status: "Ready", date: "2025-01-20" },
    { id: "ORD-2025-043", client: "Urban Landscapes", items: 15, total: "$5,800", status: "Dispatched", date: "2025-01-19" },
    { id: "ORD-2025-042", client: "Fresh Herbs Co", items: 6, total: "$1,200", status: "Completed", date: "2025-01-18" },
  ];

  const clients = [
    { name: "Green Gardens Ltd", orders: 24, revenue: "$45,600", status: "Active", lastOrder: "2025-01-21" },
    { name: "Urban Landscapes", orders: 18, revenue: "$38,200", status: "Active", lastOrder: "2025-01-19" },
    { name: "Fresh Herbs Co", orders: 31, revenue: "$52,400", status: "Active", lastOrder: "2025-01-18" },
    { name: "City Botanicals", orders: 12, revenue: "$22,800", status: "Active", lastOrder: "2025-01-20" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": case "Processing": return "bg-yellow-500/10 text-yellow-500";
      case "Approved": case "Ready": return "bg-green-500/10 text-green-500";
      case "Sent": case "Dispatched": return "bg-blue-500/10 text-blue-500";
      case "Completed": return "bg-primary/10 text-primary";
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
            <h1 className="text-3xl font-bold mb-2">Sales Management</h1>
            <p className="text-muted-foreground">Manage quotes, orders, and client relationships</p>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            New Quote
          </Button>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="quotes">
              <FileText className="w-4 h-4 mr-2" />
              Quotes
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="clients">
              <Users className="w-4 h-4 mr-2" />
              Clients
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quotes" className="space-y-4">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search quotes..." className="pl-10" />
              </div>
            </div>

            <div className="space-y-3">
              {quotes.map((quote) => (
                <Card key={quote.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="font-semibold text-lg">{quote.id}</div>
                        <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                      </div>
                      <div className="flex gap-6 mt-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Client: </span>
                          <span className="font-medium">{quote.client}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total: </span>
                          <span className="font-medium text-primary">{quote.total}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date: </span>
                          <span>{quote.date}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-10" />
              </div>
            </div>

            <div className="space-y-3">
              {orders.map((order) => (
                <Card key={order.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="font-semibold text-lg">{order.id}</div>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                      <div className="flex gap-6 mt-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Client: </span>
                          <span className="font-medium">{order.client}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Items: </span>
                          <span className="font-medium">{order.items}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total: </span>
                          <span className="font-medium text-primary">{order.total}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date: </span>
                          <span>{order.date}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search clients..." className="pl-10" />
              </div>
              <Button>
                <Plus className="w-4 h-4" />
                Add Client
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {clients.map((client) => (
                <Card key={client.name} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{client.name}</h3>
                      <Badge className="bg-green-500/10 text-green-500">{client.status}</Badge>
                    </div>
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Orders</span>
                      <span className="font-medium">{client.orders}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Revenue</span>
                      <span className="font-medium text-primary">{client.revenue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Order</span>
                      <span>{client.lastOrder}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
