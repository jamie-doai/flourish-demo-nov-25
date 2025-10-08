import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Send, Check, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function QuoteDetail() {
  const { quoteId } = useParams();

  const quote = {
    id: quoteId || "Q-2025-012",
    client: "Green Gardens Ltd",
    contactPerson: "Sarah Johnson",
    email: "sarah@greengardens.co.nz",
    phone: "+64 21 123 4567",
    status: "Pending",
    date: "2025-01-22",
    validUntil: "2025-02-21",
    items: [
      { id: 1, species: "Harakeke", size: "2L", quantity: 50, price: 12.50, total: 625 },
      { id: 2, species: "Mānuka", size: "3L", quantity: 30, price: 18.00, total: 540 },
      { id: 3, species: "Pittosporum", size: "2L", quantity: 40, price: 15.00, total: 600 },
    ],
    subtotal: 1765,
    gst: 264.75,
    total: 2029.75,
    notes: "Delivery to Auckland Central. Plants must be healthy and ready for planting."
  };

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/managers/sales/quotes">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quotes
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{quote.id}</h1>
            <Badge variant="secondary">{quote.status}</Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline">
              <Send className="w-4 h-4 mr-2" />
              Send to Client
            </Button>
            <Button variant="default">
              <Check className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button variant="destructive">
              <X className="w-4 h-4 mr-2" />
              Decline
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <div className="font-semibold">{quote.client}</div>
                <div className="text-muted-foreground">{quote.contactPerson}</div>
              </div>
              <div className="text-muted-foreground">{quote.email}</div>
              <div className="text-muted-foreground">{quote.phone}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quote Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{quote.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valid Until:</span>
                <span className="font-medium">{quote.validUntil}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items:</span>
                <span className="font-medium">{quote.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total (incl GST):</span>
                <span className="font-bold text-primary">${quote.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Line Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Species</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quote.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.species}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Separator className="my-4" />

            <div className="flex justify-end">
              <div className="w-64 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">${quote.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (15%):</span>
                  <span className="font-medium">${quote.gst.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-primary">${quote.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {quote.notes && (
              <>
                <Separator className="my-4" />
                <div>
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <p className="text-sm text-muted-foreground">{quote.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
