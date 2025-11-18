import { ReactNode } from 'react';
import { ManagerLayout } from '@/components/layouts/ManagerLayout';
import { SettingsSidebar } from '@/components/SettingsSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface SettingsLayoutProps {
  children: ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <ManagerLayout>
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <SettingsSidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </ManagerLayout>
  );
}
