import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ManagerSalesInvoices() {
  const navigate = useNavigate();
  const invoices = [
    { id: "INV-2025-028", orderId: "ORD-2025-042", client: "Fresh Herbs Co", total: "$1,200", status: "Paid", date: "2025-01-19", dueDate: "2025-02-02" },
    { id: "INV-2025-027", orderId: "ORD-2025-041", client: "Green Gardens Ltd", total: "$4,500", status: "Sent", date: "2025-01-18", dueDate: "2025-02-01" },
    { id: "INV-2025-026", orderId: "ORD-2025-040", client: "Urban Landscapes", total: "$5,800", status: "Overdue", date: "2025-01-10", dueDate: "2025-01-24" },
    { id: "INV-2025-025", orderId: "ORD-2025-039", client: "City Botanicals", total: "$2,100", status: "Draft", date: "2025-01-22", dueDate: "2025-02-05" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-500/10 text-green-500";
      case "Sent": return "bg-blue-500/10 text-blue-500";
      case "Overdue": return "bg-red-500/10 text-red-500";
      case "Draft": return "bg-yellow-500/10 text-yellow-500";
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
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sales
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Invoices</h1>
              <p className="text-muted-foreground">Generate and manage invoices from approved orders</p>
            </div>
            <Select value="invoices" onValueChange={(value) => navigate(`/managers/sales/${value}`)}>
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

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search invoices..." className="pl-10" />
          </div>
        </div>

        <div className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="font-semibold text-lg">{invoice.id}</div>
                    <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                  </div>
                  <div className="flex gap-6 mt-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Order: </span>
                      <span className="font-medium">{invoice.orderId}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Client: </span>
                      <span className="font-medium">{invoice.client}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total: </span>
                      <span className="font-medium text-primary">{invoice.total}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due: </span>
                      <span>{invoice.dueDate}</span>
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
