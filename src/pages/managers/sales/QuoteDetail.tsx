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
import { MetadataCard } from "@/components/sales/MetadataCard";

export default function QuoteDetail() {
  const { quoteId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const quote = getQuoteById(quoteId!);

  if (!quote) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <p className="text-muted-foreground">Quote not found</p>
          <Link to="/managers/sales/quotes">
            <Button variant="tertiary" className="mt-4">Back to Quotes</Button>
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
      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/managers/sales/quotes">
            <Button variant="tertiary" size="sm">
              <ArrowLeft className="w-3 h-3 mr-2" />
              Back to Quotes
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <FileText className="w-3 h-3 text-primary flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-heading-3 sm:text-heading-2 md:text-heading-1 font-heading font-bold">{quote.quoteNumber}</h1>
                <p className="text-muted-foreground">{quote.clientName}</p>
              </div>
            </div>
            <Badge className={getStatusColor(quote.status)}>
              {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
            </Badge>
          </div>

          <MetadataCard
            items={[
              { label: "Date Created", value: quote.dateCreated },
              { label: "Expiry Date", value: quote.expiryDate },
              { label: "Status", value: quote.status.charAt(0).toUpperCase() + quote.status.slice(1) },
            ]}
            className="mb-4"
          />

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
                  <TableHead className="text-right">COP</TableHead>
                  <TableHead className="text-right">Margin</TableHead>
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
                    <TableCell className="text-right">
                      {item.batchCOP ? (
                        <span className="text-muted-foreground">${item.batchCOP.toFixed(2)}</span>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.margin !== undefined ? (
                        <div className="flex flex-col items-end">
                          <span className={`font-medium ${
                            item.margin >= 40 ? 'text-green-600 dark:text-green-400' :
                            item.margin >= 20 ? 'text-blue-600 dark:text-blue-400' :
                            item.margin > 0 ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {item.margin.toFixed(1)}%
                          </span>
                          {item.marginDollar !== undefined && (
                            <span className="text-xs text-muted-foreground">
                              ${item.marginDollar.toFixed(2)}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
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
          <Button variant="secondary" onClick={handleDownloadPDF}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          
          {quote.status === "draft" && (
            <Button onClick={handleSendQuote}>
              <Send className="w-3 h-3 mr-2" />
              Send to Client
            </Button>
          )}

          {(quote.status === "sent" || quote.status === "accepted") && (
            <Button onClick={handleConvertToOrder}>
              <Check className="w-3 h-3 mr-2" />
              Convert to Order
            </Button>
          )}

          {quote.convertedToOrder && (
            <Link to={`/managers/sales/orders/${quote.convertedToOrder}`}>
              <Button variant="secondary">View Order</Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
