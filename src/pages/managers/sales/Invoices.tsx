import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { SidebarPageLayout } from "@/components/layouts/SidebarPageLayout";
import { SalesSidebar } from "@/components/SalesSidebar";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Receipt } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { invoices } from "@/data";

export default function ManagerSalesInvoices() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "sent": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "paid": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "overdue": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "partial": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
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
          title="Invoices"
          description="Generate and manage invoices from approved orders"
          backTo="/managers/sales"
          backLabel="Back to Sales"
          sectionSwitcher={{
            value: "invoices",
            onValueChange: (value) => navigate(`/managers/sales/${value}`),
            options: [
              { value: "quotes", label: "Quotes" },
              { value: "orders", label: "Orders" },
              { value: "invoices", label: "Invoices" },
              { value: "clients", label: "Clients" },
            ],
          }}
        />

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input placeholder="Search invoices by client, ID..." className="pl-10" />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-5 gap-4 mb-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Invoices</div>
            <div className="text-2xl font-bold">{invoices.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Paid</div>
            <div className="text-2xl font-bold text-green-600">{invoices.filter(i => i.status === "paid").length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Overdue</div>
            <div className="text-2xl font-bold text-red-600">{invoices.filter(i => i.status === "overdue").length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Invoiced</div>
            <div className="text-2xl font-bold">${invoices.reduce((sum, i) => sum + i.total, 0).toLocaleString()}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Outstanding</div>
            <div className="text-2xl font-bold">${invoices.reduce((sum, i) => sum + i.balanceDue, 0).toLocaleString()}</div>
          </Card>
        </div>

        <div className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <Receipt className="w-3 h-3 text-primary" />
                    <div className="font-semibold text-lg">{invoice.invoiceNumber}</div>
                    <Badge className={getStatusColor(invoice.status)}>{getStatusLabel(invoice.status)}</Badge>
                    {invoice.linkedOrder && (
                      <Badge variant="outline" className="text-xs">
                        From {invoice.linkedOrder}
                      </Badge>
                    )}
                    {invoice.xeroSync && (
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                        Xero Synced
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-5 gap-6 mt-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Client: </span>
                      <span className="font-medium">{invoice.clientName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total: </span>
                      <span className="font-medium text-primary">${invoice.total.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Balance Due: </span>
                      <span className={`font-medium ${invoice.balanceDue > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                        ${invoice.balanceDue.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Issued: </span>
                      <span>{invoice.dateIssued}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due: </span>
                      <span className={invoice.status === "overdue" ? "text-red-600 font-medium" : ""}>
                        {invoice.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
                <Link to={`/managers/sales/invoices/${invoice.id}`}>
                  <Button size="sm">View Details</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </SidebarPageLayout>
    </ManagerLayout>
  );
}
