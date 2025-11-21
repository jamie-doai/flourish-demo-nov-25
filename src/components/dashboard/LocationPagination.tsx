import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LocationPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function LocationPagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: LocationPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="tertiary"
        size="sm"
        onClick={onPrevious}
        disabled={currentPage === 0}
      >
        <ChevronLeft className="w-3 h-3" />
      </Button>
      <span className="text-sm text-muted-foreground">
        {currentPage + 1} / {totalPages}
      </span>
      <Button
        variant="tertiary"
        size="sm"
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
      >
        <ChevronRight className="w-3 h-3" />
      </Button>
    </div>
  );
}

