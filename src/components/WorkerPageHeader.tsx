import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface WorkerPageHeaderProps {
  title: string;
  backTo?: string;
  actions?: ReactNode;
}

export function WorkerPageHeader({ title, backTo, actions }: WorkerPageHeaderProps) {
  return (
    <header className="bg-white border-b border-[#3B7A57]/10">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {backTo && (
              <Link to={backTo} className="flex-shrink-0">
                <Button variant="outline" className="text-[#37474F] text-xs sm:text-sm">
                  <ArrowLeft className="w-3 h-3 sm:mr-2" />
                  <span className="hidden sm:inline">{title}</span>
                  <span className="sm:hidden truncate max-w-[120px]">{title}</span>
                </Button>
              </Link>
            )}
            {!backTo && (
              <h1 className="text-heading-4 sm:text-xl font-semibold text-[#37474F] truncate">{title}</h1>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
