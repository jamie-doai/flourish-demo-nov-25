import { ReactNode } from "react";
import { WorkerPageHeader } from "@/components/WorkerPageHeader";
import { WorkerBottomNav } from "@/components/WorkerBottomNav";

interface WorkerPageLayoutProps {
  title: string;
  backTo?: string;
  headerActions?: ReactNode;
  headerMetadata?: ReactNode;
  children: ReactNode;
  backgroundClass?: string;
  mainClassName?: string;
  headerClassName?: string;
}

export function WorkerPageLayout({
  title,
  backTo,
  headerActions,
  headerMetadata,
  children,
  backgroundClass = "bg-[#F8FAF9]",
  mainClassName = "",
  headerClassName,
}: WorkerPageLayoutProps) {
  const hasHeaderContent = title || backTo || headerActions || headerMetadata;

  return (
    <div className="min-h-screen bg-slate-800">
      <div className={`max-w-mobile mx-auto ${backgroundClass} min-h-screen pb-20`}>
        {hasHeaderContent && (
          <WorkerPageHeader title={title} backTo={backTo} actions={headerActions} metadata={headerMetadata} headerClassName={headerClassName} />
        )}
        
        <main className={`px-[16px] py-4 ${mainClassName}`}>
          {children}
        </main>

        <WorkerBottomNav />
      </div>
    </div>
  );
}
