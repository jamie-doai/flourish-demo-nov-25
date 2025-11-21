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
import { ArrowLeft, Package, MapPin, Truck } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "@/data";
import { useToast } from "@/hooks/use-toast";
import { OrderLifecycleProgress } from "@/components/orders/OrderLifecycleProgress";
import { OrderStatusActions } from "@/components/orders/OrderStatusActions";
import { OrderStatus } from "@/lib/orderLifecycle";

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const order = getOrderById(orderId!);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <p className="text-muted-foreground">Order not found</p>
          <Link to="/managers/sales/orders">
            <Button variant="tertiary" className="mt-4">Back to Orders</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleStatusChange = (newStatus: OrderStatus, notes?: string) => {
    // In a real app, this would update the backend
    toast({
      title: "Order Status Updated",
      description: `Order ${order.orderNumber} status changed to ${newStatus}`,
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
      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/managers/sales/orders">
            <Button variant="tertiary" size="sm">
              <ArrowLeft className="w-3 h-3 mr-2" />
              Back to Orders
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 min-w-0">
              <Package className="w-3 h-3 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-heading-2 sm:text-heading-1 font-heading font-bold break-words">{order.orderNumber}</h1>
                <p className="text-muted-foreground">{order.clientName}</p>
                {order.linkedQuote && (
                  <Link to={`/managers/sales/quotes/${order.linkedQuote}`} className="text-sm text-primary hover:underline">
                    From Quote: {order.linkedQuote}
                  </Link>
                )}
              </div>
            </div>
            <OrderStatusActions
              order={order}
              onStatusChange={handleStatusChange}
              onDownloadPackingSlip={handleDownloadPackingSlip}
              onGenerateInvoice={handleGenerateInvoice}
            />
          </div>

          {/* Lifecycle Progress */}
          <OrderLifecycleProgress order={order} />

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
                  <MapPin className="w-3 h-3" />
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
      </main>
    </div>
  );
}
