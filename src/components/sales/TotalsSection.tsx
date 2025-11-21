import { Separator } from "@/components/ui/separator";

interface TotalsSectionProps {
  subtotal: number;
  tax: number;
  total: number;
  taxRate?: number;
}

export function TotalsSection({ subtotal, tax, total, taxRate = 15 }: TotalsSectionProps) {
  return (
    <div className="flex justify-end mt-6">
      <div className="w-64 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal:</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">GST ({taxRate}%):</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

