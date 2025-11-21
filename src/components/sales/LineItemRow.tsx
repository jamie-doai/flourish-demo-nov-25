import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { calculateMargin, getMarginColor } from "@/lib/salesUtils";

interface LineItem {
  id: string;
  species: string;
  scientificName?: string;
  stage?: string;
  potSize: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
  batchIds?: string[];
  costPerUnit?: number;
}

interface LineItemRowProps {
  item: LineItem;
  canRemove: boolean;
  onUpdate: (id: string, field: keyof LineItem, value: unknown) => void;
  onRemove: (id: string) => void;
}

export function LineItemRow({ item, canRemove, onUpdate, onRemove }: LineItemRowProps) {
  const calculateMarginPercent = (price: number, cost: number): number => {
    if (!cost || price <= 0) return 0;
    const { marginPercent } = calculateMargin(price, cost);
    return marginPercent;
  };

  const handleUpdate = (field: keyof LineItem, value: string | number) => {
    onUpdate(item.id, field, value);
  };

  return (
    <TableRow>
      <TableCell>
        {item.scientificName ? (
          <div>
            <div className="font-medium">{item.species}</div>
            <div className="text-xs text-muted-foreground italic">
              {item.scientificName}
            </div>
          </div>
        ) : (
          <Input
            placeholder="e.g. Mānuka"
            value={item.species}
            onChange={(e) => handleUpdate('species', e.target.value)}
          />
        )}
      </TableCell>
      <TableCell>
        {item.stage ? (
          <Badge variant="secondary">{item.stage}</Badge>
        ) : (
          <span className="text-muted-foreground text-sm">-</span>
        )}
      </TableCell>
      <TableCell>
        {item.batchIds ? (
          <span className="text-sm">{item.potSize}</span>
        ) : (
          <Input
            placeholder="e.g. 1L"
            value={item.potSize}
            onChange={(e) => handleUpdate('potSize', e.target.value)}
          />
        )}
      </TableCell>
      <TableCell>
        <Input
          type="number"
          min="0"
          value={item.quantity || ''}
          onChange={(e) => handleUpdate('quantity', e.target.value)}
          className="w-20"
        />
      </TableCell>
      <TableCell className="text-muted-foreground text-sm">
        {item.costPerUnit ? `$${item.costPerUnit.toFixed(2)}` : '-'}
      </TableCell>
      <TableCell>
        <Input
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={item.unitPrice || ''}
          onChange={(e) => handleUpdate('unitPrice', e.target.value)}
          className="w-24"
        />
      </TableCell>
      <TableCell>
        {item.unitPrice > 0 && item.costPerUnit ? (
          <span className={getMarginColor(calculateMarginPercent(item.unitPrice, item.costPerUnit))}>
            {calculateMarginPercent(item.unitPrice, item.costPerUnit).toFixed(1)}%
          </span>
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </TableCell>
      <TableCell>
        <Input
          type="number"
          min="0"
          max="100"
          value={item.discount || ''}
          onChange={(e) => handleUpdate('discount', e.target.value)}
          className="w-16"
        />
      </TableCell>
      <TableCell className="font-medium">
        ${item.total.toFixed(2)}
      </TableCell>
      <TableCell>
        {canRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="w-3 h-3 text-destructive" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

