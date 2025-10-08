import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Package, Download, Truck, Receipt, FileText, MapPin } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "@/data";
import { useToast } from "@/hooks/use-toast";

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const order = getOrderById(orderId!);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6">
          <p className="text-muted-foreground">Order not found</p>
          <Link to="/managers/sales/orders">
            <Button variant="outline" className="mt-4">Back to Orders</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "confirmed": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "dispatched": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "completed": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleMarkDispatched = () => {
    toast({
      title: "Order Dispatched",
      description: `Order ${order.orderNumber} marked as dispatched`,
    });
  };

  const handleGenerateInvoice = () => {
    toast({
      title: "Generating Invoice",
      description: "Creating invoice from order...",
    });
    setTimeout(() => {
      navigate(`/managers/sales/invoices/${order.convertedToInvoice || "I-2025-00125"}`);
    }, 1000);
  };

  const handleDownloadPackingSlip = () => {
    toast({
      title: "Downloading Packing Slip",
      description: "Packing slip is being generated...",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <DevBar />
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/managers/sales/orders">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
                <p className="text-muted-foreground">{order.clientName}</p>
                {order.linkedQuote && (
                  <Link to={`/managers/sales/quotes/${order.linkedQuote}`} className="text-sm text-primary hover:underline">
                    From Quote: {order.linkedQuote}
                  </Link>
                )}
              </div>
            </div>
            <Badge className={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Date Created</div>
              <div className="font-medium">{order.dateCreated}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Delivery Date</div>
              <div className="font-medium">{order.deliveryDate || "TBC"}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Dispatched</div>
              <div className="font-medium">{order.dispatchedDate || "Not yet"}</div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Delivery Details
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Delivery Type</Label>
                <Select value={order.deliveryType}>
                  <SelectTrigger className="mt-2">
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
                <Label>Delivery Date</Label>
                <Input type="date" value={order.deliveryDate} className="mt-2" />
              </div>
            </div>
            {order.deliveryAddress && (
              <div className="mt-4">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Delivery Address
                </Label>
                <Input value={order.deliveryAddress} className="mt-2" />
              </div>
            )}
            {order.specialInstructions && (
              <div className="mt-4">
                <Label>Special Instructions</Label>
                <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                  {order.specialInstructions}
                </div>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Species</TableHead>
                  <TableHead>Pot Size</TableHead>
                  <TableHead>Batch ID</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.species}</TableCell>
                    <TableCell>{item.potSize}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.batchId || "-"}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
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
                <span className="font-medium">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (15%):</span>
                <span className="font-medium">${order.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={handleDownloadPackingSlip}>
            <Download className="w-4 h-4 mr-2" />
            Packing Slip
          </Button>

          {order.status !== "dispatched" && order.status !== "completed" && (
            <Button variant="outline" onClick={handleMarkDispatched}>
              <Truck className="w-4 h-4 mr-2" />
              Mark Dispatched
            </Button>
          )}

          {(order.status === "dispatched" || order.status === "completed") && !order.convertedToInvoice && (
            <Button onClick={handleGenerateInvoice}>
              <Receipt className="w-4 h-4 mr-2" />
              Generate Invoice
            </Button>
          )}

          {order.convertedToInvoice && (
            <Link to={`/managers/sales/invoices/${order.convertedToInvoice}`}>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                View Invoice
              </Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
