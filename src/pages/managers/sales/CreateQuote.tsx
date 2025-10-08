import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { SalesSidebar } from "@/components/SalesSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, Trash2, Save, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { clients } from "@/data";

interface LineItem {
  id: string;
  species: string;
  potSize: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
  batchId?: string;
}

export default function CreateQuote() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedClient, setSelectedClient] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [reserveStock, setReserveStock] = useState(false);
  const [clientNotes, setClientNotes] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
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

  const calculateTotals = () => {
    const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.15; // NZ GST 15%
    const total = subtotal + tax;
    return { subtotal, tax, total };
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

  const { subtotal, tax, total } = calculateTotals();

  return (
    <>
      <DevBar />
      <Navigation />
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <div className="hidden md:block">
            <SalesSidebar />
          </div>
          <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl pb-20">
            <div className="mb-4">
              <SidebarTrigger className="md:hidden" />
            </div>
        <div className="flex items-center gap-3 mb-6">
          <Link to="/managers/sales/quotes">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quotes
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Create New Quote</h1>
          <p className="text-muted-foreground">Generate a quote for a client</p>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Client Details</h2>
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

        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Line Items</h2>
            <Button onClick={addLineItem} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Species *</TableHead>
                  <TableHead className="w-[120px]">Pot Size *</TableHead>
                  <TableHead className="w-[100px]">Quantity *</TableHead>
                  <TableHead className="w-[120px]">Unit Price *</TableHead>
                  <TableHead className="w-[100px]">Discount %</TableHead>
                  <TableHead className="w-[120px]">Total</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lineItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Input
                        placeholder="e.g. Mānuka"
                        value={item.species}
                        onChange={(e) => updateLineItem(item.id, 'species', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="e.g. 1L"
                        value={item.potSize}
                        onChange={(e) => updateLineItem(item.id, 'potSize', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={item.quantity || ''}
                        onChange={(e) => updateLineItem(item.id, 'quantity', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={item.unitPrice || ''}
                        onChange={(e) => updateLineItem(item.id, 'unitPrice', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={item.discount || ''}
                        onChange={(e) => updateLineItem(item.id, 'discount', e.target.value)}
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
                          <Trash2 className="w-4 h-4 text-destructive" />
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
          <h2 className="text-lg font-semibold mb-4">Additional Options</h2>
          
          <div className="flex items-center gap-2 mb-6">
            <Switch
              id="reserve-stock"
              checked={reserveStock}
              onCheckedChange={setReserveStock}
            />
            <Label htmlFor="reserve-stock" className="cursor-pointer">
              Reserve Stock (lock inventory quantities for this quote)
            </Label>
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
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleSendQuote}>
            <Send className="w-4 h-4 mr-2" />
            Send to Client
          </Button>
        </div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
