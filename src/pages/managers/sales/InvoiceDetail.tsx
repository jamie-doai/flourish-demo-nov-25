import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Send, DollarSign } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function InvoiceDetail() {
  const { invoiceId } = useParams();

  const invoice = {
    id: invoiceId || "INV-2025-028",
    orderId: "ORD-2025-042",
    client: "Fresh Herbs Co",
    contactPerson: "Michael Chen",
    email: "michael@freshherbs.co.nz",
    phone: "+64 21 987 6543",
    status: "Paid",
    issueDate: "2025-01-19",
    dueDate: "2025-02-02",
    paidDate: "2025-01-25",
    billingAddress: "456 Herb Lane, Wellington Central, Wellington 6011",
    items: [
      { id: 1, species: "Rosemary", size: "2L", quantity: 30, price: 10.00, total: 300 },
      { id: 2, species: "Thyme", size: "1.5L", quantity: 40, price: 8.50, total: 340 },
      { id: 3, species: "Basil", size: "1.5L", quantity: 50, price: 7.00, total: 350 },
    ],
    subtotal: 990,
    gst: 148.50,
    total: 1138.50,
    paymentMethod: "Bank Transfer",
    notes: "Thank you for your business!"
  };

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <div className="hidden md:block">
        <Navigation />
      </div>
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/managers/sales/invoices">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Invoices
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{invoice.id}</h1>
            <Badge variant={invoice.status === "Paid" ? "default" : "secondary"}>{invoice.status}</Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            {invoice.status !== "Paid" && (
              <>
                <Button variant="outline">
                  <Send className="w-4 h-4 mr-2" />
                  Send to Client
                </Button>
                <Button variant="default">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Record Payment
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <div className="font-semibold">{invoice.client}</div>
                <div className="text-muted-foreground">{invoice.contactPerson}</div>
              </div>
              <div className="text-muted-foreground">{invoice.email}</div>
              <div className="text-muted-foreground">{invoice.phone}</div>
              <div className="mt-2">
                <div className="text-muted-foreground text-xs mb-1">Billing Address:</div>
                <div className="text-sm">{invoice.billingAddress}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <Link to={`/managers/sales/orders/${invoice.orderId}`} className="font-medium hover:underline">
                  {invoice.orderId}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issue Date:</span>
                <span className="font-medium">{invoice.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-medium">{invoice.dueDate}</span>
              </div>
              {invoice.paidDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Paid Date:</span>
                  <span className="font-medium text-green-600">{invoice.paidDate}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method:</span>
                <span className="font-medium">{invoice.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total (incl GST):</span>
                <span className="font-bold text-primary">${invoice.total.toFixed(2)}</span>
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
                {invoice.items.map((item) => (
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
                  <span className="font-medium">${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (15%):</span>
                  <span className="font-medium">${invoice.gst.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-primary">${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {invoice.notes && (
              <>
                <Separator className="my-4" />
                <div>
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <p className="text-sm text-muted-foreground">{invoice.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
