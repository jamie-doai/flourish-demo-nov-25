import { ReactNode } from 'react';
import { ManagerLayout } from '@/components/layouts/ManagerLayout';
import { SidebarPageLayout } from '@/components/layouts/SidebarPageLayout';
import { SettingsSidebar } from '@/components/SettingsSidebar';

interface SettingsLayoutProps {
  children: ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <ManagerLayout>
      <SidebarPageLayout sidebar={<SettingsSidebar />}>
        {children}
      </SidebarPageLayout>
    </ManagerLayout>
  );
}
