import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { SidebarPageLayout } from "@/components/layouts/SidebarPageLayout";
import { SalesSidebar } from "@/components/SalesSidebar";
import { PageHeader } from "@/components/PageHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, ShoppingCart, Users, Receipt, ArrowRight, LucideIcon } from "lucide-react";
import { quotes, orders, batches } from "@/data";
import { getAvailableForSaleBatches } from "@/lib/salesUtils";

interface SalesSection {
  title: string;
  icon: LucideIcon;
  description: string;
  path: string;
  color: string;
}

const SALES_SECTIONS: SalesSection[] = [
  {
    title: "Quotes",
    icon: FileText,
    description: "Create and manage sales quotes",
    path: "/managers/sales/quotes",
    color: "text-forest-green"
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    description: "Track and manage customer orders",
    path: "/managers/sales/orders",
    color: "text-forest-green"
  },
  {
    title: "Invoices",
    icon: Receipt,
    description: "Generate and manage invoices from orders",
    path: "/managers/sales/invoices",
    color: "text-forest-green"
  },
  {
    title: "Clients",
    icon: Users,
    description: "Manage client relationships",
    path: "/managers/sales/clients",
    color: "text-forest-green"
  },
];

export default function ManagerSales() {
  // Calculate dashboard metrics
  const openQuotes = quotes.filter(q => q.status === "draft" || q.status === "sent").length;
  const activeOrders = orders.filter(o => 
    o.status !== "completed" && o.status !== "cancelled"
  ).length;
  const availableStock = getAvailableForSaleBatches(batches).reduce(
    (sum, batch) => sum + batch.quantity,
    0
  );

  return (
    <ManagerLayout>
      <SidebarPageLayout sidebar={<SalesSidebar />}>
        <PageHeader
          title="Sales Management"
          description="Manage quotes, orders, and client relationships"
        />

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full">
          <KPICard
            value={openQuotes}
            label="Open Quotes"
            subtitle="Draft & Sent"
            subtitleColor="info"
          />
          <KPICard
            value={activeOrders}
            label="Active Orders"
            subtitle="In Progress"
            subtitleColor="info"
          />
          <KPICard
            value={availableStock.toLocaleString()}
            label="Available Stock"
            subtitle="Ready for Sale"
            subtitleColor="success"
          />
        </div>

        {/* Navigation Cards - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          {SALES_SECTIONS.map((section) => (
            <Link key={section.path} to={section.path}>
              <Card className="hover:shadow-card hover:bg-gray-50 transition-all cursor-pointer group p-4">
                <div className="flex items-start justify-between mb-2">
                  <section.icon className={`w-3 h-3 ${section.color || 'text-forest-green'}`} />
                  <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-heading-4 font-heading font-bold mb-1">{section.title}</h3>
                <p className="text-muted-foreground text-body-small">{section.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </SidebarPageLayout>
    </ManagerLayout>
  );
}
