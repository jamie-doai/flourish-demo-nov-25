import { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';
import { DevBar } from '@/components/DevBar';

interface ManagerLayoutProps {
  children: ReactNode;
}

export function ManagerLayout({ children }: ManagerLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <DevBar />
      <Navigation />
      
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
