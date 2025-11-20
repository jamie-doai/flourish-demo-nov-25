import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";

interface SidebarPageLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function SidebarPageLayout({ sidebar, children }: SidebarPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex">
          <aside className="hidden md:block border-r border-forest-green">
            <div className="p-3">
              {sidebar}
            </div>
          </aside>
          <main className="flex-1">
            <div className="p-3">
              <SidebarTrigger className="md:hidden mb-4" />
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

