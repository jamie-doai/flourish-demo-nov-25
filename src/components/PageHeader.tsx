import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PageHeaderProps {
  title: string;
  description?: string;
  backTo?: string;
  backLabel?: string;
  actions?: ReactNode;
  sectionSwitcher?: {
    value: string;
    onValueChange: (value: string) => void;
    options: { value: string; label: string }[];
  };
}

export function PageHeader({
  title,
  description,
  backTo,
  backLabel = "Back",
  actions,
  sectionSwitcher,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
      <div className="flex-1 min-w-0">
        {backTo && (
          <Link to={backTo} className="mb-2 inline-block">
            <Button variant="tertiary" size="sm">
              <ArrowLeft className="w-3 h-3 mr-2" />
              {backLabel}
            </Button>
          </Link>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-heading-2 sm:text-heading-1 font-heading font-bold mb-1 sm:mb-2 break-words">{title}</h1>
            {description && (
              <p className="text-body-small sm:text-body text-muted-foreground break-words">{description}</p>
            )}
          </div>
          {sectionSwitcher && (
            <div className="flex-shrink-0">
              <Select
                value={sectionSwitcher.value}
                onValueChange={sectionSwitcher.onValueChange}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {sectionSwitcher.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center justify-end gap-2 flex-wrap flex-shrink-0 ml-auto">
          {actions}
        </div>
      )}
    </div>
  );
}

