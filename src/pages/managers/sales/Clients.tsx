import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { SidebarPageLayout } from "@/components/layouts/SidebarPageLayout";
import { SalesSidebar } from "@/components/SalesSidebar";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Users, Mail, Phone, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { clients } from "@/data";

export default function ManagerSalesClients() {
  const navigate = useNavigate();

  return (
    <ManagerLayout>
      <SidebarPageLayout sidebar={<SalesSidebar />}>
        <PageHeader
          title="Clients"
          description="Manage client relationships"
          backTo="/managers/sales"
          backLabel="Back to Sales"
          sectionSwitcher={{
            value: "clients",
            onValueChange: (value) => navigate(`/managers/sales/${value}`),
            options: [
              { value: "quotes", label: "Quotes" },
              { value: "orders", label: "Orders" },
              { value: "invoices", label: "Invoices" },
              { value: "clients", label: "Clients" },
            ],
          }}
          actions={
            <Button>
              <Plus className="w-3 h-3 mr-2" />
              New Client
            </Button>
          }
        />

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input placeholder="Search clients by name, email..." className="pl-10" />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Clients</div>
            <div className="text-2xl font-bold">{clients.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Active Clients</div>
            <div className="text-2xl font-bold">{clients.filter(c => c.status === "active").length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Orders</div>
            <div className="text-2xl font-bold">{clients.reduce((sum, c) => sum + c.totalOrders, 0)}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Revenue</div>
            <div className="text-2xl font-bold">${clients.reduce((sum, c) => sum + c.totalRevenue, 0).toLocaleString()}</div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {clients.map((client) => (
            <Card key={client.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Users className="w-3 h-3 text-forest-green" />
                  <div>
                    <h3 className="font-semibold text-lg">{client.name}</h3>
                    <p className="text-sm text-muted-foreground">{client.contactPerson}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {client.status}
                </Badge>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{client.address}, {client.city}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                  <div className="text-xl font-bold">{client.totalOrders}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                  <div className="text-xl font-bold text-primary">${client.totalRevenue.toLocaleString()}</div>
                </div>
              </div>

              <Button variant="tertiary" className="w-full mt-4" size="sm">
                View Details
              </Button>
            </Card>
          ))}
        </div>
      </SidebarPageLayout>
    </ManagerLayout>
  );
}
