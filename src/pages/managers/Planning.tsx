import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { SidebarPageLayout } from "@/components/layouts/SidebarPageLayout";
import { PlanningSidebar } from "@/components/PlanningSidebar";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
      </SidebarPageLayout>
    </ManagerLayout>
  );
}
