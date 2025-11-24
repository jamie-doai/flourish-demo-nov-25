import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface WorkerPageHeaderProps {
  title: string;
  backTo?: string;
  actions?: ReactNode;
  headerClassName?: string;
  metadata?: ReactNode;
}

// Helper function to get section name from backTo path
function getSectionName(backTo: string): string {
  const pathParts = backTo.split("/").filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1];
  
  // Capitalize first letter and handle special cases
  if (lastPart === "workers" || lastPart === "") {
    return "Home";
  }
  
  // Capitalize first letter
  return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
}

export function WorkerPageHeader({ title, backTo, actions, headerClassName = "bg-white border-b border-[#3B7A57]/10", metadata }: WorkerPageHeaderProps) {
  // Determine button styling based on header className
  const isDarkHeader = headerClassName.includes("bg-[#37474F]") || headerClassName.includes("text-white");
  const buttonClassName = isDarkHeader 
    ? "text-white dark:border-white/20" 
    : "text-[#37474F] dark:text-white dark:border-white/20";
  
  // Extract base classes without border-b for up a level button area
  const baseHeaderClasses = headerClassName.replace(/\s*border-b[^\s]*/g, '').trim();
  
  return (
    <>
      {/* Up a level button area - no border-b */}
      {backTo && (
        <div className={`px-2 py-2 ${baseHeaderClasses}`}>
          <Link to={backTo} className="inline-block">
            <Button variant="outline" className={`${buttonClassName} text-sm px-2 py-2`}>
              <ArrowLeft className="w-3 h-3 mr-2 flex-shrink-0" />
              Back to {getSectionName(backTo)}
            </Button>
          </Link>
        </div>
      )}
      
      {/* Header section with title and actions - vertical layout */}
      <header className={headerClassName}>
        <div className="px-2 py-2">
          {/* Title row */}
          <div className="mb-3">
            <h1 className={`text-heading-4 font-semibold truncate min-w-0 ${isDarkHeader ? 'text-white' : 'text-[#37474F] dark:text-white'}`}>{title}</h1>
          </div>
          {/* Metadata row - below title */}
          {metadata && (
            <div className="mb-3">
              {metadata}
            </div>
          )}
          {/* Actions row - below title/metadata with reduced button padding */}
          {actions && (
            <div className="flex items-center gap-2 flex-wrap [&_button]:px-2 [&_button]:py-2">
              {actions}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
