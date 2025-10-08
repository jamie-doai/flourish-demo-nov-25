import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { SalesSidebar } from "@/components/SalesSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowLeft, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { orders } from "@/data";

export default function ManagerSalesOrders() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "confirmed": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "dispatched": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "completed": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getDeliveryTypeLabel = (type: string) => {
    switch (type) {
      case "pickup": return "Pickup";
      case "courier": return "Courier";
      case "in-house": return "In-house";
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      <SidebarProvider>
        <div className="flex w-full">
          <div className="hidden md:block">
            <SalesSidebar />
          </div>
          <main className="flex-1 container mx-auto px-4 py-8">
            <div className="mb-4">
              <SidebarTrigger className="md:hidden" />
            </div>
        <div className="flex items-center gap-3 mb-6">
          <Link to="/managers/sales">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sales
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
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
                  <SelectItem value="invoices">Invoices</SelectItem>
                  <SelectItem value="clients">Clients</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search orders by client, ID..." className="pl-10" />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Orders</div>
            <div className="text-2xl font-bold">{orders.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Pending</div>
            <div className="text-2xl font-bold">{orders.filter(o => o.status === "pending").length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Dispatched</div>
            <div className="text-2xl font-bold">{orders.filter(o => o.status === "dispatched").length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Value</div>
            <div className="text-2xl font-bold">${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}</div>
          </Card>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <Package className="w-5 h-5 text-primary" />
                    <div className="font-semibold text-lg">{order.orderNumber}</div>
                    <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
                    {order.linkedQuote && (
                      <Badge variant="outline" className="text-xs">
                        From {order.linkedQuote}
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-5 gap-6 mt-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Client: </span>
                      <span className="font-medium">{order.clientName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Items: </span>
                      <span className="font-medium">{order.items.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Delivery: </span>
                      <span className="font-medium">{getDeliveryTypeLabel(order.deliveryType)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total: </span>
                      <span className="font-medium text-primary">${order.total.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due: </span>
                      <span>{order.deliveryDate || "TBC"}</span>
                    </div>
                  </div>
                </div>
                <Link to={`/managers/sales/orders/${order.id}`}>
                  <Button variant="ghost" size="sm">View Details</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
