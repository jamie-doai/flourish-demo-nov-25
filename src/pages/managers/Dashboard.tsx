import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Package, 
  Clipboard, 
  ShoppingCart, 
  BarChart3, 
  FileText, 
  Settings,
  ArrowRight
} from "lucide-react";

export default function ManagerDashboard() {
  const sections = [
    { 
      title: "Inventory", 
      icon: Package, 
      description: "Manage batches, stages, and locations",
      path: "/managers/inventory",
      color: "text-blue-500"
    },
    { 
      title: "Operations", 
      icon: Clipboard, 
      description: "Task board, schedule, and staff management",
      path: "/managers/operations",
      color: "text-green-500"
    },
    { 
      title: "Sales", 
      icon: ShoppingCart, 
      description: "Quotes, orders, and client management",
      path: "/managers/sales",
      color: "text-purple-500"
    },
    { 
      title: "Planning", 
      icon: BarChart3, 
      description: "Production plans and forecasting",
      path: "/managers/planning",
      color: "text-orange-500"
    },
    { 
      title: "Reporting", 
      icon: FileText, 
      description: "Traceability, biosecurity, and analytics",
      path: "/managers/reporting",
      color: "text-red-500"
    },
    { 
      title: "Settings", 
      icon: Settings, 
      description: "Users, locations, species, and integrations",
      path: "/managers/settings",
      color: "text-gray-500"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manager Dashboard</h1>
          <p className="text-muted-foreground">Complete nursery management and oversight</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link key={section.path} to={section.path}>
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-card-foreground/5 flex items-center justify-center ${section.color}`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-muted-foreground text-sm">{section.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
