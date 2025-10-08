import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, FileText, Download, Send, Check, Package } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getQuoteById } from "@/data";
import { useToast } from "@/hooks/use-toast";

export default function QuoteDetail() {
  const { quoteId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const quote = getQuoteById(quoteId!);

  if (!quote) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6">
          <p className="text-muted-foreground">Quote not found</p>
          <Link to="/managers/sales/quotes">
            <Button variant="outline" className="mt-4">Back to Quotes</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "sent": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "accepted": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "declined": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "converted": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleSendQuote = () => {
    toast({
      title: "Quote Sent",
      description: `Quote ${quote.quoteNumber} has been sent to ${quote.clientName}`,
    });
  };

  const handleConvertToOrder = () => {
    toast({
      title: "Converting to Order",
      description: "Creating order from quote...",
    });
    setTimeout(() => {
      navigate(`/managers/sales/orders/${quote.convertedToOrder || "O-2025-00125"}`);
    }, 1000);
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Downloading PDF",
      description: "Quote PDF is being generated...",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <DevBar />
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/managers/sales/quotes">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quotes
            </Button>
          </Link>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{quote.quoteNumber}</h1>
                <p className="text-muted-foreground">{quote.clientName}</p>
              </div>
            </div>
            <Badge className={getStatusColor(quote.status)}>
              {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
            </Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Date Created</div>
              <div className="font-medium">{quote.dateCreated}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Expiry Date</div>
              <div className="font-medium">{quote.expiryDate}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Status</div>
              <div className="font-medium capitalize">{quote.status}</div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Line Items</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Species</TableHead>
                  <TableHead>Pot Size</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Discount %</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quote.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.species}</TableCell>
                    <TableCell>{item.potSize}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{item.discount}%</TableCell>
                    <TableCell className="text-right font-medium">${item.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">${quote.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (15%):</span>
                <span className="font-medium">${quote.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${quote.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch id="reserve-stock" checked={quote.reserveStock} />
                <Label htmlFor="reserve-stock" className="cursor-pointer">Reserve Stock</Label>
              </div>
              {quote.reserveStock && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Package className="w-3 h-3 mr-1" />
                  Stock Reserved
                </Badge>
              )}
            </div>

            {quote.clientNotes && (
              <div>
                <Label className="text-sm font-medium">Client Notes</Label>
                <Textarea value={quote.clientNotes} readOnly className="mt-2" rows={2} />
              </div>
            )}

            {quote.internalNotes && (
              <div>
                <Label className="text-sm font-medium">Internal Notes</Label>
                <Textarea value={quote.internalNotes} readOnly className="mt-2 bg-muted" rows={2} />
              </div>
            )}
          </div>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={handleDownloadPDF}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          
          {quote.status === "draft" && (
            <Button onClick={handleSendQuote}>
              <Send className="w-4 h-4 mr-2" />
              Send to Client
            </Button>
          )}

          {(quote.status === "sent" || quote.status === "accepted") && (
            <Button onClick={handleConvertToOrder}>
              <Check className="w-4 h-4 mr-2" />
              Convert to Order
            </Button>
          )}

          {quote.convertedToOrder && (
            <Link to={`/managers/sales/orders/${quote.convertedToOrder}`}>
              <Button variant="outline">View Order</Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
