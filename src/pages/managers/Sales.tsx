import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { SectionLandingPage } from "@/components/SectionLandingPage";
import { FileText, ShoppingCart, Users, Receipt } from "lucide-react";

export default function ManagerSales() {
  const sections = [
    {
      title: "Quotes",
      icon: FileText,
      description: "Create and manage sales quotes",
      path: "/managers/sales/quotes",
      color: "text-purple-500"
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      description: "Track and manage customer orders",
      path: "/managers/sales/orders",
      color: "text-blue-500"
    },
    {
      title: "Invoices",
      icon: Receipt,
      description: "Generate and manage invoices from orders",
      path: "/managers/sales/invoices",
      color: "text-orange-500"
    },
    {
      title: "Clients",
      icon: Users,
      description: "Manage client relationships",
      path: "/managers/sales/clients",
      color: "text-green-500"
    },
  ];

  return (
    <SectionLandingPage
      title="Sales Management"
      description="Manage quotes, orders, and client relationships"
      sections={sections}
      header={
        <>
          <DevBar />
          <Navigation />
        </>
      }
    />
  );
}
