import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Users, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ManagerSalesClients() {
  const navigate = useNavigate();
  const clients = [
    { name: "Green Gardens Ltd", orders: 24, revenue: "$45,600", status: "Active", lastOrder: "2025-01-21" },
    { name: "Urban Landscapes", orders: 18, revenue: "$38,200", status: "Active", lastOrder: "2025-01-19" },
    { name: "Fresh Herbs Co", orders: 31, revenue: "$52,400", status: "Active", lastOrder: "2025-01-18" },
    { name: "City Botanicals", orders: 12, revenue: "$22,800", status: "Active", lastOrder: "2025-01-20" },
  ];

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
              <h1 className="text-3xl font-bold mb-2">Clients</h1>
              <p className="text-muted-foreground">Manage client relationships</p>
            </div>
            <Select value="clients" onValueChange={(value) => navigate(`/managers/sales/${value}`)}>
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
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search clients..." className="pl-10" />
          </div>
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
      </main>
    </div>
  );
}
