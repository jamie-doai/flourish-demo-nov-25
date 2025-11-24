import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Save, Send, Edit3, Package } from "lucide-react";
import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { SidebarPageLayout } from "@/components/layouts/SidebarPageLayout";
import { SalesSidebar } from "@/components/SalesSidebar";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InventorySelectionSheet } from "@/components/sales/InventorySelectionSheet";
import { LineItemRow } from "@/components/sales/LineItemRow";
import { TotalsSection } from "@/components/sales/TotalsSection";
import { useToast } from "@/hooks/use-toast";
import { useLineItems } from "@/hooks/useLineItems";
import { clients } from "@/data";
import { PendingLineItem } from "@/types/sales";
import { calculateTotals } from "@/lib/salesCalculations";

export default function CreateQuote() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedClient, setSelectedClient] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [reserveStock, setReserveStock] = useState("dont-reserve");
  const [clientNotes, setClientNotes] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [showInventorySheet, setShowInventorySheet] = useState(false);

  const {
    lineItems,
    addLineItem,
    removeLineItem,
    updateLineItem,
    addItemsFromInventory,
  } = useLineItems();

  const handleAddFromInventory = (items: PendingLineItem[]) => {
    addItemsFromInventory(items);
  };


  const handleSaveDraft = () => {
    if (!selectedClient) {
      toast({
        title: "Validation Error",
        description: "Please select a client",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Quote Saved",
      description: "Quote has been saved as draft",
    });
    
    setTimeout(() => {
      navigate("/managers/sales/quotes");
    }, 1000);
  };

  const handleSendQuote = () => {
    if (!selectedClient) {
      toast({
        title: "Validation Error",
        description: "Please select a client",
        variant: "destructive"
      });
      return;
    }

    if (lineItems.some(item => !item.species || item.quantity === 0)) {
      toast({
        title: "Validation Error",
        description: "Please complete all line items",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Quote Sent",
      description: "Quote has been sent to client",
    });
    
    setTimeout(() => {
      navigate("/managers/sales/quotes");
    }, 1000);
  };

  const { subtotal, tax, total } = calculateTotals(lineItems);

  return (
    <ManagerLayout>
      <SidebarPageLayout sidebar={<SalesSidebar />}>
        <PageHeader
          title="Create New Quote"
          description="Generate a quote for a client"
          backTo="/managers/sales/quotes"
          backLabel="Back to Quotes"
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
            <div>
              <Label htmlFor="expiry">Quote Expiry Date</Label>
              <Input
                id="expiry"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
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
          <h2 className="text-lg font-semibold mb-4">Additional Options</h2>
          
          <div className="space-y-2 mb-6">
            <Label className="text-sm font-medium">Reserve Stock</Label>
            <RadioGroup 
              value={reserveStock} 
              onValueChange={setReserveStock}
              className="flex flex-row gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reserve" id="reserve-yes" />
                <Label htmlFor="reserve-yes" className="cursor-pointer">Reserve Stock</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dont-reserve" id="reserve-no" />
                <Label htmlFor="reserve-no" className="cursor-pointer">Don't Reserve Stock</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="client-notes">Client Notes</Label>
              <Textarea
                id="client-notes"
                placeholder="Notes visible to the client on the quote..."
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
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
          <Link to="/managers/sales/quotes">
            <Button variant="tertiary">Cancel</Button>
          </Link>
          <Button variant="secondary" onClick={handleSaveDraft}>
            <Save className="w-3 h-3 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleSendQuote}>
            <Send className="w-3 h-3 mr-2" />
            Send to Client
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
