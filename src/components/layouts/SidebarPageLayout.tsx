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
          <aside className="hidden md:block border-r border-forest-green min-w-[10rem] w-48 md:w-56 lg:w-60">
            <div className="px-2 sm:px-2.5 md:px-3 py-3 sm:py-4 md:py-5">
              {sidebar}
            </div>
          </aside>
          <main className="flex-1">
            <div className="px-4 sm:px-6 py-6 sm:py-8">
              <SidebarTrigger className="md:hidden mb-4" />
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

