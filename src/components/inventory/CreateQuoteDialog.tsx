import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Batch } from "@/data/batches";
import { clients } from "@/data/clients";
import { quotes, Quote, QuoteLineItem } from "@/data/quotes";
import { calculateTotals } from "@/lib/salesCalculations";
import { NZ_GST_RATE } from "@/lib/constants";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batches: Batch[];
  onConfirm: (quoteId: string) => void;
}

interface BatchSelection {
  batchId: string;
  quantity: number;
}

/**
 * Generate a quote number in format Q-YYYY-NNNNN
 */
function generateQuoteNumber(): string {
  const year = new Date().getFullYear();
  const existingQuotes = quotes.filter(q => q.quoteNumber.startsWith(`Q-${year}-`));
  
  // Extract the numeric part from existing quote numbers and find the highest
  let maxNumber = 0;
  existingQuotes.forEach(quote => {
    const match = quote.quoteNumber.match(/Q-\d{4}-(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNumber) {
        maxNumber = num;
      }
    }
  });
  
  // Increment and format
  const nextNumber = String(maxNumber + 1).padStart(5, '0');
  return `Q-${year}-${nextNumber}`;
}

/**
 * Calculate default unit price for a batch (mock pricing)
 * In production, this would use customer pricing tiers
 */
function getDefaultUnitPrice(batch: Batch): number {
  // Simple mock pricing based on container size
  const basePrice = 3.0;
  const containerMultipliers: Record<string, number> = {
    "Propagation trays": 1.0,
    "T28": 1.2,
    "T50": 1.5,
    "1L": 2.0,
    "2L": 2.5,
    "3L": 3.0,
    "PB5": 3.5,
    "Individual pots": 2.0,
  };
  const multiplier = containerMultipliers[batch.container || "Individual pots"] || 2.0;
  return basePrice * multiplier;
}

export function CreateQuoteDialog({ open, onOpenChange, batches, onConfirm }: CreateQuoteDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedClient, setSelectedClient] = useState("");
  const [reserveStock, setReserveStock] = useState(true);
  const [clientNotes, setClientNotes] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [batchSelections, setBatchSelections] = useState<Record<string, number>>({});

  // Initialize batch selections with full quantities
  useEffect(() => {
    if (open && batches.length > 0) {
      const initialSelections: Record<string, number> = {};
      batches.forEach(batch => {
        initialSelections[batch.id] = batch.quantity;
      });
      setBatchSelections(initialSelections);
    }
  }, [open, batches]);

  const handleQuantityChange = (batchId: string, value: string) => {
    const batch = batches.find(b => b.id === batchId);
    if (!batch) return;
    
    const newQty = Math.max(0, Math.min(batch.quantity, parseInt(value) || 0));
    setBatchSelections(prev => ({ ...prev, [batchId]: newQty }));
  };

  const handleRemoveBatch = (batchId: string) => {
    setBatchSelections(prev => {
      const newSelections = { ...prev };
      delete newSelections[batchId];
      return newSelections;
    });
  };

  const getSelectedBatches = () => {
    return batches.filter(b => batchSelections[b.id] !== undefined && batchSelections[b.id] > 0);
  };

  const getTotalPlants = () => {
    return Object.values(batchSelections).reduce((sum, qty) => sum + qty, 0);
  };

  const handleConfirm = () => {
    if (!selectedClient) {
      toast({
        title: "Validation Error",
        description: "Please select a client",
        variant: "destructive",
      });
      return;
    }

    const selectedBatches = getSelectedBatches();
    if (selectedBatches.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one batch with quantity > 0",
        variant: "destructive",
      });
      return;
    }

    const client = clients.find(c => c.id === selectedClient);
    if (!client) return;

    // Generate quote number and ID
    const quoteNumber = generateQuoteNumber();
    const quoteId = quoteNumber;

    // Create line items from selected batches
    const lineItems: QuoteLineItem[] = selectedBatches.map((batch, index) => {
      const quantity = batchSelections[batch.id];
      const unitPrice = getDefaultUnitPrice(batch);
      const discount = 0;
      const subtotal = unitPrice * quantity;
      const total = subtotal * (1 - discount / 100);

      return {
        id: `QL-${String(index + 1).padStart(3, '0')}`,
        species: batch.species,
        potSize: batch.container || "-",
        quantity,
        unitPrice,
        discount,
        total,
        batchId: batch.id,
        batchCOP: batch.perUnitCost,
        margin: batch.perUnitCost ? ((unitPrice - batch.perUnitCost) / unitPrice) * 100 : undefined,
        marginDollar: batch.perUnitCost ? unitPrice - batch.perUnitCost : undefined,
      };
    });

    // Calculate totals
    const { subtotal, tax, total } = calculateTotals(lineItems);

    // Create quote object
    const newQuote: Quote = {
      id: quoteId,
      quoteNumber,
      clientId: selectedClient,
      clientName: client.name,
      dateCreated: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
      status: "draft",
      items: lineItems,
      subtotal,
      tax,
      total,
      reserveStock,
      clientNotes: clientNotes || undefined,
      internalNotes: internalNotes || undefined,
    };

    // Add to quotes array (mock data - in production this would be an API call)
    quotes.push(newQuote);

    toast({
      title: "Quote Created",
      description: `Quote ${quoteNumber} has been created successfully`,
    });

    onConfirm(quoteId);
    onOpenChange(false);
    
    // Navigate to quote detail page
    setTimeout(() => {
      navigate(`/managers/sales/quotes/${quoteId}`);
    }, 500);
  };

  const selectedBatches = getSelectedBatches();
  const totalPlants = getTotalPlants();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Quote from Inventory</DialogTitle>
          <DialogDescription>
            Create a new quote from {batches.length} selected batch(es). Review and adjust quantities as needed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Client Selection */}
          <div className="space-y-2">
            <Label htmlFor="client">Client *</Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger id="client">
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients
                  .filter(c => c.status === "active")
                  .map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Batch Selection List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Selected Batches ({selectedBatches.length})</Label>
              <div className="text-sm text-muted-foreground">
                Total: <span className="font-semibold">{totalPlants.toLocaleString()}</span> plants
              </div>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {batches.map((batch) => {
                const quantity = batchSelections[batch.id] ?? 0;
                if (quantity === 0) return null;

                return (
                  <div key={batch.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium font-mono">{batch.id}</p>
                          <span className="text-xs text-muted-foreground">({batch.quantity} available)</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{batch.species}</p>
                        <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                          <span>Location: {batch.location}</span>
                          <span>Stage: {batch.stage}</span>
                          <span>Container: {batch.container || "N/A"}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveBatch(batch.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Quantity</Label>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(e) => handleQuantityChange(batch.id, e.target.value)}
                          min="1"
                          max={batch.quantity}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Unit Price (estimated)</Label>
                        <Input
                          value={`$${getDefaultUnitPrice(batch).toFixed(2)}`}
                          disabled
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reserve Stock */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reserve-stock"
              checked={reserveStock}
              onCheckedChange={(checked) => setReserveStock(checked === true)}
            />
            <Label htmlFor="reserve-stock" className="cursor-pointer">
              Reserve stock for this quote
            </Label>
          </div>

          {/* Notes */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client-notes">Client Notes</Label>
              <Textarea
                id="client-notes"
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                placeholder="Notes visible to client..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="internal-notes">Internal Notes</Label>
              <Textarea
                id="internal-notes"
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Internal notes (not visible to client)..."
                rows={3}
              />
            </div>
          </div>

          {/* Summary */}
          {selectedBatches.length > 0 && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <Label className="mb-3">Quote Summary</Label>
              <div className="grid grid-cols-3 gap-4 text-sm mt-2">
                <div>
                  <span className="text-muted-foreground">Batches:</span>
                  <p className="font-semibold">{selectedBatches.length}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Plants:</span>
                  <p className="font-semibold">{totalPlants.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <p className="font-semibold">Draft</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedClient || selectedBatches.length === 0}
          >
            Create Quote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
