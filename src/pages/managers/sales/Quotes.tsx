import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { SidebarPageLayout } from "@/components/layouts/SidebarPageLayout";
import { SalesSidebar } from "@/components/SalesSidebar";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { quotes } from "@/data";

export default function ManagerSalesQuotes() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "sent": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "accepted": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "declined": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "converted": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <ManagerLayout>
      <SidebarPageLayout sidebar={<SalesSidebar />}>
        <PageHeader
          title="Quotes"
          description="Manage and track sales quotes"
          backTo="/managers/sales"
          backLabel="Back to Sales"
          sectionSwitcher={{
            value: "quotes",
            onValueChange: (value) => navigate(`/managers/sales/${value}`),
            options: [
              { value: "quotes", label: "Quotes" },
              { value: "orders", label: "Orders" },
              { value: "invoices", label: "Invoices" },
              { value: "clients", label: "Clients" },
            ],
          }}
          actions={
            <Link to="/managers/sales/quotes/new">
              <Button>
                <Plus className="w-3 h-3 mr-2" />
                New Quote
              </Button>
            </Link>
          }
        />

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input placeholder="Search quotes by client, ID..." className="pl-10" />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Quotes</div>
            <div className="text-2xl font-bold">{quotes.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Sent</div>
            <div className="text-2xl font-bold">{quotes.filter(q => q.status === "sent").length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Converted</div>
            <div className="text-2xl font-bold">{quotes.filter(q => q.status === "converted").length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Value</div>
            <div className="text-2xl font-bold">${quotes.reduce((sum, q) => sum + q.total, 0).toLocaleString()}</div>
          </Card>
        </div>

        <div className="space-y-4">
          {quotes.map((quote) => (
            <Card key={quote.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <FileText className="w-3 h-3 text-primary" />
                    <div className="font-semibold text-lg">{quote.quoteNumber}</div>
                    <Badge className={getStatusColor(quote.status)}>{getStatusLabel(quote.status)}</Badge>
                    {quote.reserveStock && (
                      <Badge variant="outline" className="text-xs">Stock Reserved</Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-5 gap-6 mt-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Client: </span>
                      <span className="font-medium">{quote.clientName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Items: </span>
                      <span className="font-medium">{quote.items.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total: </span>
                      <span className="font-medium text-primary">${quote.total.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created: </span>
                      <span>{quote.dateCreated}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expires: </span>
                      <span>{quote.expiryDate}</span>
                    </div>
                  </div>
                </div>
                <Link to={`/managers/sales/quotes/${quote.id}`}>
                  <Button variant="ghost" size="sm">View Details</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </SidebarPageLayout>
    </ManagerLayout>
  );
}
