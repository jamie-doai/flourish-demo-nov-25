import { ReactNode } from 'react';
import { ManagerLayout } from '@/components/layouts/ManagerLayout';
import { SettingsSidebar } from '@/components/SettingsSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

interface SettingsLayoutProps {
  children: ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <ManagerLayout>
      <div className="container mx-auto px-4 py-8">
        <SidebarProvider>
          <div className="flex gap-6">
            <div className="hidden md:block">
              <SettingsSidebar />
            </div>
            <main className="flex-1">
              <div className="mb-4">
                <SidebarTrigger className="md:hidden" />
              </div>
              {children}
            </main>
          </div>
        </SidebarProvider>
      </div>
    </ManagerLayout>
  );
}
