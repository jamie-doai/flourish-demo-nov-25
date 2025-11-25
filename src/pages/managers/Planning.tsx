import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { SidebarPageLayout } from "@/components/layouts/SidebarPageLayout";
import { PlanningSidebar } from "@/components/PlanningSidebar";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, TrendingUp, BarChart3, Target, ArrowRight, LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";

interface PlanningSection {
  title: string;
  icon: LucideIcon;
  description: string;
  path: string;
  color: string;
}

const PLANNING_SECTIONS: PlanningSection[] = [
  {
    title: "Production Plans",
    icon: Calendar,
    description: "Create and manage production schedules",
    path: "/managers/planning/production",
    color: "text-forest-green"
  },
  {
    title: "Forecasting",
    icon: TrendingUp,
    description: "Sales and demand forecasting",
    path: "/managers/planning/forecasting",
    color: "text-forest-green"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    description: "View performance metrics and reports",
    path: "/managers/planning/analytics",
    color: "text-forest-green"
  },
  {
    title: "Capacity Planning",
    icon: Target,
    description: "Manage space and resource allocation",
    path: "/managers/planning/capacity",
    color: "text-forest-green"
  },
];

export default function ManagerPlanning() {
  return (
    <ManagerLayout>
      <SidebarPageLayout sidebar={<PlanningSidebar />}>
        <PageHeader
          title="Planning & Forecasting"
          description="Production plans, capacity management, and resource allocation"
          actions={
            <Button>
              <Plus className="w-3 h-3 mr-2" />
              New Production Plan
            </Button>
          }
        />

        {/* Navigation Cards - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {PLANNING_SECTIONS.map((section) => (
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
