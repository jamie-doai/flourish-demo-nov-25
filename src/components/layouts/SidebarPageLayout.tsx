import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface SidebarPageLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function SidebarPageLayout({ sidebar, children }: SidebarPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex">
          <aside className="hidden md:block border-r border-forest-green w-[240px] lg:w-[270px] xl:w-[300px] max-w-[300px] shrink-0">
            <div className="px-2 sm:px-2.5 md:px-3 py-3 sm:py-4 md:py-5">
              {sidebar}
            </div>
          </aside>
          <main className="flex-1 min-w-0 overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-[1920px]">
              <SidebarTrigger className="md:hidden mb-4" />
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

