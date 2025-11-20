import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { SectionLandingPage } from "@/components/SectionLandingPage";
import { FileText, ShoppingCart, Users, Receipt } from "lucide-react";

export default function ManagerSales() {
  const sections = [
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

  return (
    <ManagerLayout>
      <SectionLandingPage
        title="Sales Management"
        description="Manage quotes, orders, and client relationships"
        sections={sections}
      />
    </ManagerLayout>
  );
}
