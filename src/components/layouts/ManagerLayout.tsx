import { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Navigation } from '@/components/Navigation';
import { DevBar } from '@/components/DevBar';
import { SearchSidebar } from '@/components/search/SearchSidebar';

interface ManagerLayoutProps {
  children: ReactNode;
}

export function ManagerLayout({ children }: ManagerLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex flex-col w-full">
        <DevBar />
        <Navigation />
        
        <div className="flex flex-1 w-full">
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          
          <SearchSidebar />
        </div>
      </div>
    </SidebarProvider>
  );
}
