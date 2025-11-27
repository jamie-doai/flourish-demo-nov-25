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
import { cn } from "@/lib/utils";

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
  tabs?: ReactNode;
  className?: string;
  backgroundClassName?: string;
}

/**
 * Standardized page header component for manager app.
 * Provides consistent structure for titles, descriptions, actions, and tabs.
 * Supports optional background color via backgroundClassName prop.
 */
export function PageHeader({
  title,
  description,
  backTo,
  backLabel = "Back",
  actions,
  sectionSwitcher,
  tabs,
  className,
  backgroundClassName,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-6", backgroundClassName)}>
      <div className={cn("flex flex-col gap-4", className)}>
        {/* Back button - always on top */}
        {backTo && (
          <div>
            <Link to={backTo} className="inline-block">
              <Button variant="tertiary" size="sm">
                <ArrowLeft className="w-3 h-3 mr-2" />
                {backLabel}
              </Button>
            </Link>
          </div>
        )}
        
        {/* Main content area */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Title and description section */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <h1 className="text-heading-3 sm:text-heading-2 md:text-heading-1 font-heading font-bold mb-1 sm:mb-2">{title}</h1>
                {description && (
                  <p className="text-body-small sm:text-body text-muted-foreground">{description}</p>
                )}
              </div>
              {sectionSwitcher && (
                <div className="flex-shrink-0 w-full sm:w-auto">
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
          
          {/* Actions section */}
          {actions && (
            <div className="flex items-start sm:items-center justify-start sm:justify-end gap-2 flex-wrap flex-shrink-0 md:ml-auto">
              {actions}
            </div>
          )}
        </div>
        
        {/* Tabs section - below main content */}
        {tabs && (
          <div className="mt-2">
            {tabs}
          </div>
        )}
      </div>
    </div>
  );
}

