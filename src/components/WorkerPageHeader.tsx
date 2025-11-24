import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface WorkerPageHeaderProps {
  title: string;
  backTo?: string;
  actions?: ReactNode;
  headerClassName?: string;
}

export function WorkerPageHeader({ title, backTo, actions, headerClassName = "bg-white border-b border-[#3B7A57]/10" }: WorkerPageHeaderProps) {
  return (
    <header className={headerClassName}>
      <div className="px-4 py-4">
        <div className="flex items-center justify-between gap-4 min-w-0 max-w-full">
          <div className="flex items-center gap-4 min-w-0 flex-1 overflow-hidden">
            {backTo && (
              <Link to={backTo} className="flex-shrink-0">
                <Button variant="outline" className="text-[#37474F] dark:text-white dark:border-white/20 text-sm px-4 max-w-full overflow-hidden">
                  <ArrowLeft className="w-3 h-3 mr-2 flex-shrink-0" />
                  <span className="truncate">{title}</span>
                </Button>
              </Link>
            )}
            {!backTo && (
              <h1 className="text-heading-4 font-semibold text-[#37474F] dark:text-white truncate min-w-0">{title}</h1>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0 min-w-0 overflow-hidden">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
