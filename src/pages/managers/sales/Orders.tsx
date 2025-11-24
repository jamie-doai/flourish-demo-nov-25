import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { SidebarPageLayout } from "@/components/layouts/SidebarPageLayout";
import { SalesSidebar } from "@/components/SalesSidebar";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { orders } from "@/data";
import { getStatusColor, getStatusLabel } from "@/lib/orderLifecycle";

export default function ManagerSalesOrders() {
  const navigate = useNavigate();

  const getDeliveryTypeLabel = (type: string) => {
    switch (type) {
      case "pickup": return "Pickup";
      case "courier": return "Courier";
      case "in-house": return "In-house";
      default: return type;
    }
  };

  return (
    <ManagerLayout>
      <SidebarPageLayout sidebar={<SalesSidebar />}>
        <PageHeader
          title="Orders"
          description="Track and manage customer orders"
          backTo="/managers/sales"
          backLabel="Back to Sales"
          actions={
            <Link to="/managers/sales/orders/create">
              <Button>
                <Plus className="w-3 h-3 mr-2" />
                Create Order
              </Button>
            </Link>
          }
        />

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input placeholder="Search orders by client, ID..." className="pl-10" />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-4">
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
            <Link key={order.id} to={`/managers/sales/orders/${order.id}`} className="block">
              <Card className="p-4 hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <Package className="w-3 h-3 text-primary" />
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
                  <Button size="sm" onClick={(e) => e.stopPropagation()}>View Details</Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </SidebarPageLayout>
    </ManagerLayout>
  );
}
