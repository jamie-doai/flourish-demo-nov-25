import { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';

interface ManagerLayoutProps {
  children: ReactNode;
}

export function ManagerLayout({ children }: ManagerLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-white">
      <Navigation />
      
      <main className="flex-1 overflow-auto bg-white">
        {children}
      </main>
    </div>
  );
}
