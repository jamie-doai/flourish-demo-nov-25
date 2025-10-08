import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Truck, FileText } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = {
    id: orderId || "ORD-2025-045",
    client: "Green Gardens Ltd",
    contactPerson: "Sarah Johnson",
    email: "sarah@greengardens.co.nz",
    phone: "+64 21 123 4567",
    status: "Processing",
    date: "2025-01-21",
    deliveryDate: "2025-01-28",
    deliveryAddress: "123 Green Street, Auckland Central, Auckland 1010",
    items: [
      { id: 1, species: "Harakeke", size: "2L", quantity: 50, price: 12.50, total: 625, status: "Ready" },
      { id: 2, species: "Mānuka", size: "3L", quantity: 30, price: 18.00, total: 540, status: "Processing" },
      { id: 3, species: "Pittosporum", size: "2L", quantity: 40, price: 15.00, total: 600, status: "Ready" },
    ],
    subtotal: 1765,
    gst: 264.75,
    total: 2029.75,
    notes: "Handle with care. Client requires delivery before 10 AM."
  };

  const handleGenerateInvoice = () => {
    navigate(`/managers/sales/invoices/${order.id.replace('ORD', 'INV')}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/managers/sales/orders">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{order.id}</h1>
            <Badge variant="secondary">{order.status}</Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline">
              <Truck className="w-4 h-4 mr-2" />
              Update Delivery
            </Button>
            <Button variant="default" onClick={handleGenerateInvoice}>
              <FileText className="w-4 h-4 mr-2" />
              Generate Invoice
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
                <div className="font-semibold">{order.client}</div>
                <div className="text-muted-foreground">{order.contactPerson}</div>
              </div>
              <div className="text-muted-foreground">{order.email}</div>
              <div className="text-muted-foreground">{order.phone}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date:</span>
                <span className="font-medium">{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Date:</span>
                <span className="font-medium">{order.deliveryDate}</span>
              </div>
              <div className="mt-2">
                <div className="text-muted-foreground text-xs mb-1">Address:</div>
                <div className="text-sm">{order.deliveryAddress}</div>
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
                <span className="font-medium">{order.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total (incl GST):</span>
                <span className="font-bold text-primary">${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
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
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.species}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === "Ready" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Separator className="my-4" />

            <div className="flex justify-end">
              <div className="w-64 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (15%):</span>
                  <span className="font-medium">${order.gst.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-primary">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {order.notes && (
              <>
                <Separator className="my-4" />
                <div>
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <p className="text-sm text-muted-foreground">{order.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
