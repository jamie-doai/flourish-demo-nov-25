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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {backTo && (
              <Link to={backTo}>
                <Button variant="outline" className="text-[#37474F]">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {title}
                </Button>
              </Link>
            )}
            {!backTo && (
              <h1 className="text-xl font-semibold text-[#37474F]">{title}</h1>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    </header>
  );
}
