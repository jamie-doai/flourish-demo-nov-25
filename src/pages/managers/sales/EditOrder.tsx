import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Package, Edit3 } from "lucide-react";
import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { SidebarPageLayout } from "@/components/layouts/SidebarPageLayout";
import { SalesSidebar } from "@/components/SalesSidebar";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InventorySelectionSheet } from "@/components/sales/InventorySelectionSheet";
import { LineItemRow } from "@/components/sales/LineItemRow";
import { TotalsSection } from "@/components/sales/TotalsSection";
import { useToast } from "@/hooks/use-toast";
import { useLineItems, LineItem } from "@/hooks/useLineItems";
import { clients, getOrderById } from "@/data";
import { PendingLineItem } from "@/types/sales";
import { calculateTotals } from "@/lib/salesCalculations";

export default function EditOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const order = getOrderById(orderId!);

  const [selectedClient, setSelectedClient] = useState("");
  const [deliveryType, setDeliveryType] = useState<"pickup" | "courier" | "in-house">("courier");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [showInventorySheet, setShowInventorySheet] = useState(false);

  // Convert order items to LineItem format
  const initialLineItems: LineItem[] = order
    ? order.items.map((item) => ({
        id: item.id,
        species: item.species,
        potSize: item.potSize,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: 0,
        total: item.total,
        batchIds: item.batchId ? [item.batchId] : undefined,
      }))
    : [];

  const {
    lineItems,
    addLineItem,
    removeLineItem,
    updateLineItem,
    addItemsFromInventory,
  } = useLineItems(initialLineItems);

  // Load order data on mount
  useEffect(() => {
    if (order) {
      setSelectedClient(order.clientId);
      setDeliveryType(order.deliveryType);
      setDeliveryDate(order.deliveryDate || "");
      setDeliveryAddress(order.deliveryAddress || "");
      setSpecialInstructions(order.specialInstructions || "");
    }
  }, [order]);

  if (!order) {
    return (
      <ManagerLayout>
        <SidebarPageLayout sidebar={<SalesSidebar />}>
          <div className="flex items-center justify-center min-h-screen">
            <Card>
              <p className="text-muted-foreground">Order not found</p>
              <Link to="/managers/sales/orders">
                <Button variant="tertiary" className="mt-4">Back to Orders</Button>
              </Link>
            </Card>
          </div>
        </SidebarPageLayout>
      </ManagerLayout>
    );
  }

  const handleAddFromInventory = (items: PendingLineItem[]) => {
    addItemsFromInventory(items);
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

  const handleUpdateOrder = () => {
    if (!validateForm()) return;

    toast({
      title: "Order Updated Successfully",
      description: `Order ${order.orderNumber} has been updated`,
    });
    
    setTimeout(() => {
      navigate(`/managers/sales/orders/${orderId}`);
    }, 1000);
  };

  const { subtotal, tax, total } = calculateTotals(lineItems);

  return (
    <ManagerLayout>
      <SidebarPageLayout sidebar={<SalesSidebar />}>
        <PageHeader
          title="Edit Order"
          description={`Editing order ${order.orderNumber}`}
          backTo={`/managers/sales/orders/${orderId}`}
          backLabel="Back to Order"
        />

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
              <Select value={deliveryType} onValueChange={(value: string) => setDeliveryType(value as "pickup" | "courier" | "in-house")}>
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
                <Package className="w-3 h-3 mr-2" />
                Add from Inventory
              </Button>
              <Button onClick={addLineItem} variant="tertiary" size="sm">
                <Edit3 className="w-3 h-3 mr-2" />
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
                  <LineItemRow
                    key={item.id}
                    item={item}
                    canRemove={lineItems.length > 1}
                    onUpdate={updateLineItem}
                    onRemove={removeLineItem}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          <TotalsSection subtotal={subtotal} tax={tax} total={total} />
        </Card>

        <Card className="mb-6">
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
          <Link to={`/managers/sales/orders/${orderId}`}>
            <Button variant="tertiary">Cancel</Button>
          </Link>
          <Button onClick={handleUpdateOrder}>
            <Package className="w-3 h-3 mr-2" />
            Update Order
          </Button>
        </div>

        <InventorySelectionSheet
          open={showInventorySheet}
          onOpenChange={setShowInventorySheet}
          onAddItems={handleAddFromInventory}
        />
      </SidebarPageLayout>
    </ManagerLayout>
  );
}
