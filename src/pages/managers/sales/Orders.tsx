import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ManagerSalesOrders() {
  const navigate = useNavigate();
  const orders = [
    { id: "ORD-2025-045", client: "Green Gardens Ltd", items: 12, total: "$4,500", status: "Processing", date: "2025-01-21" },
    { id: "ORD-2025-044", client: "City Botanicals", items: 8, total: "$2,100", status: "Ready", date: "2025-01-20" },
    { id: "ORD-2025-043", client: "Urban Landscapes", items: 15, total: "$5,800", status: "Dispatched", date: "2025-01-19" },
    { id: "ORD-2025-042", client: "Fresh Herbs Co", items: 6, total: "$1,200", status: "Completed", date: "2025-01-18" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing": return "bg-yellow-500/10 text-yellow-500";
      case "Ready": return "bg-green-500/10 text-green-500";
      case "Dispatched": return "bg-blue-500/10 text-blue-500";
      case "Completed": return "bg-primary/10 text-primary";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/managers/sales">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sales
            </Button>
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Orders</h1>
              <p className="text-muted-foreground">Track and manage customer orders</p>
            </div>
            <Select value="orders" onValueChange={(value) => navigate(`/managers/sales/${value}`)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quotes">Quotes</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
                <SelectItem value="clients">Clients</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-10" />
          </div>
        </div>

        <div className="space-y-4">
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
      </main>
    </div>
  );
}
