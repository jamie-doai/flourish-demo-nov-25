import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { SalesSidebar } from "@/components/SalesSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash2, Save, Package, Edit3 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { clients } from "@/data";
import { InventorySelectionSheet } from "@/components/sales/InventorySelectionSheet";
import { PendingLineItem } from "@/types/sales";
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

export default function CreateOrder() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedClient, setSelectedClient] = useState("");
  const [deliveryType, setDeliveryType] = useState<"pickup" | "courier" | "in-house">("courier");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [showInventorySheet, setShowInventorySheet] = useState(false);
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: "1",
      species: "",
      potSize: "",
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      total: 0
    }
  ]);

  const addLineItem = () => {
    const newId = (lineItems.length + 1).toString();
    setLineItems([
      ...lineItems,
      {
        id: newId,
        species: "",
        potSize: "",
        quantity: 0,
        unitPrice: 0,
        discount: 0,
        total: 0
      }
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Recalculate total when quantity, unit price, or discount changes
        if (field === 'quantity' || field === 'unitPrice' || field === 'discount') {
          const qty = field === 'quantity' ? parseFloat(value) || 0 : item.quantity;
          const price = field === 'unitPrice' ? parseFloat(value) || 0 : item.unitPrice;
          const disc = field === 'discount' ? parseFloat(value) || 0 : item.discount;
          
          const subtotal = qty * price;
          const discountAmount = subtotal * (disc / 100);
          updatedItem.total = subtotal - discountAmount;
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const handleAddFromInventory = (items: PendingLineItem[]) => {
    const newItems: LineItem[] = items.map(item => ({
      id: `${Date.now()}-${Math.random()}`,
      species: item.species,
      scientificName: item.scientificName,
      stage: item.stageName,
      potSize: item.containerType,
      quantity: item.quantity,
      unitPrice: 0,
      discount: 0,
      total: 0,
      batchIds: item.batchIds,
      costPerUnit: item.costPerUnit
    }));
    
    setLineItems([...lineItems, ...newItems]);
  };

  const calculateTotals = () => {
    const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.15; // NZ GST 15%
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const calculateMarginPercent = (price: number, cost: number): number => {
    if (!cost || price <= 0) return 0;
    const { marginPercent } = calculateMargin(price, cost);
    return marginPercent;
  };

  const validateForm = () => {
    if (!selectedClient) {
      toast({
        title: "Validation Error",
        description: "Please select a client",
        variant: "destructive"
      });
      return false;
    }

    if (lineItems.some(item => !item.species || item.quantity === 0)) {
      toast({
        title: "Validation Error",
        description: "Please complete all line items",
        variant: "destructive"
      });
      return false;
    }

    if (deliveryType === "courier" && !deliveryAddress) {
      toast({
        title: "Validation Error",
        description: "Please provide delivery address for courier delivery",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleCreateOrder = () => {
    if (!validateForm()) return;

    // Generate order number (format: O-YYYY-NNNNN)
    const orderNumber = `O-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0')}`;

    toast({
      title: "Order Created Successfully",
      description: `Order ${orderNumber} has been created and confirmed`,
    });
    
    setTimeout(() => {
      navigate("/managers/sales/orders");
    }, 1000);
  };

  const { subtotal, tax, total } = calculateTotals();

  return (
    <div className="min-h-screen bg-white">
      <DevBar />
      <Navigation />
      <div className="container mx-auto px-4 py-6 max-w-7xl bg-white">
        <SidebarProvider>
          <div className="flex gap-4">
            <div className="hidden md:block">
              <SalesSidebar />
            </div>
            <main className="flex-1 pb-20">
              <div className="mb-4">
                <SidebarTrigger className="md:hidden" />
              </div>
        <div className="flex items-center gap-1.5 mb-6">
          <Link to="/managers/sales/orders">
            <Button variant="primary-outline" size="sm">
              <ArrowLeft className="w-6 h-6 mr-2" />
              Back to Orders
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-heading-1 font-heading font-bold mb-2">Create New Order</h1>
          <p className="text-body text-muted-foreground">Create a direct order (pre-approved quote)</p>
        </div>

        <Card className="mb-6">
          <h2 className="text-heading-4 font-heading font-bold mb-4">Client Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client">Client *</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger id="client" className="mt-2">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="text-heading-4 font-heading font-bold mb-4">Delivery Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="delivery-type">Delivery Type *</Label>
              <Select value={deliveryType} onValueChange={(value: any) => setDeliveryType(value)}>
                <SelectTrigger id="delivery-type" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pickup">Pickup</SelectItem>
                  <SelectItem value="courier">Courier</SelectItem>
                  <SelectItem value="in-house">In-house Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="delivery-date">Delivery Date</Label>
              <Input
                id="delivery-date"
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          
          {deliveryType === "courier" && (
            <div className="mt-4">
              <Label htmlFor="delivery-address">Delivery Address *</Label>
              <Textarea
                id="delivery-address"
                placeholder="Full delivery address..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>
          )}
        </Card>

        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-heading-4 font-heading font-bold">Line Items</h2>
            <div className="flex gap-2">
              <Button onClick={() => setShowInventorySheet(true)} size="sm">
                <Package className="w-6 h-6 mr-2" />
                Add from Inventory
              </Button>
              <Button onClick={addLineItem} variant="tertiary" size="sm">
                <Edit3 className="w-6 h-6 mr-2" />
                Add Custom Item
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Species</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Container</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Cost/Unit</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Margin %</TableHead>
                  <TableHead>Discount %</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lineItems.map((item) => (
                  <TableRow key={item.id}>
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
                          onChange={(e) => updateLineItem(item.id, 'species', e.target.value)}
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
                          onChange={(e) => updateLineItem(item.id, 'potSize', e.target.value)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={item.quantity || ''}
                        onChange={(e) => updateLineItem(item.id, 'quantity', e.target.value)}
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
                        onChange={(e) => updateLineItem(item.id, 'unitPrice', e.target.value)}
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
                        onChange={(e) => updateLineItem(item.id, 'discount', e.target.value)}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      ${item.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {lineItems.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLineItem(item.id)}
                        >
                          <Trash2 className="w-6 h-6 text-destructive" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end mt-6">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (15%):</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="special-instructions">Special Instructions</Label>
              <Textarea
                id="special-instructions"
                placeholder="Delivery notes, handling requirements..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="internal-notes">Internal Notes</Label>
              <Textarea
                id="internal-notes"
                placeholder="Private notes for internal use only..."
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                className="mt-2 bg-muted"
                rows={3}
              />
            </div>
          </div>
        </Card>

        <div className="flex gap-3 justify-end">
          <Link to="/managers/sales/orders">
            <Button variant="tertiary">Cancel</Button>
          </Link>
          <Button onClick={handleCreateOrder}>
            <Package className="w-6 h-6 mr-2" />
            Create Order
          </Button>
        </div>
            </main>
          </div>

        <InventorySelectionSheet
          open={showInventorySheet}
          onOpenChange={setShowInventorySheet}
          onAddItems={handleAddFromInventory}
        />
        </SidebarProvider>
      </div>
    </div>
  );
}
