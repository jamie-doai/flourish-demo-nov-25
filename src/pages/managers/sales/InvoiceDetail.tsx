import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { SidebarPageLayout } from "@/components/layouts/SidebarPageLayout";
import { SalesSidebar } from "@/components/SalesSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Receipt, Download, Send, DollarSign, FileText, Edit, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getInvoiceById } from "@/data";
import { useToast } from "@/hooks/use-toast";
import { MetadataCard } from "@/components/sales/MetadataCard";

export default function InvoiceDetail() {
  const { invoiceId } = useParams();
  const { toast } = useToast();
  const invoice = getInvoiceById(invoiceId!);

  if (!invoice) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <p className="text-muted-foreground">Invoice not found</p>
          <Link to="/managers/sales/invoices">
            <Button variant="tertiary" className="mt-4">Back to Invoices</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "sent": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "paid": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "overdue": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "partial": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleSendInvoice = () => {
    toast({ title: "Invoice Sent", description: `Invoice ${invoice.invoiceNumber} sent to ${invoice.clientName}` });
  };

  const handleDownloadPDF = () => {
    toast({ title: "Downloading PDF", description: "Invoice PDF is being generated..." });
  };

  const handleRecordPayment = () => {
    toast({ title: "Recording Payment", description: "Payment recorded successfully" });
  };

  const handleSyncXero = () => {
    toast({ title: "Syncing to Xero", description: "Invoice synced to Xero successfully" });
  };

  return (
    <ManagerLayout>
      <SidebarPageLayout sidebar={<SalesSidebar />}>
        {/* Back button */}
        <div className="mb-4">
          <Link to="/managers/sales/invoices" className="inline-block">
            <Button variant="tertiary" size="sm">
              <ArrowLeft className="w-3 h-3 mr-2" />
              Back to Invoices
            </Button>
          </Link>
        </div>

        {/* Title above buttons */}
        <div className="mb-6">
          <h1 className="text-heading-3 sm:text-heading-2 md:text-heading-1 font-heading font-bold mb-2">
            {invoice.invoiceNumber}
          </h1>
          <div className="mb-4">
            {invoice.clientName && (
              <p className="text-body text-muted-foreground">
                {invoice.clientName}
                {invoice.linkedOrder && (
                  <Link to={`/managers/sales/orders/${invoice.linkedOrder}`} className="text-sm text-primary hover:underline ml-2">
                    From Order: {invoice.linkedOrder}
                  </Link>
                )}
              </p>
            )}
          </div>
          {/* Action buttons row */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-2 items-center">
              <Badge className={getStatusColor(invoice.status)}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </Badge>
              {invoice.xeroSync && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Xero Synced</Badge>
              )}
            </div>
            <Link to={`/managers/sales/invoices/${invoiceId}/edit`}>
              <Button variant="outline" className="bg-white">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button variant="outline" className="bg-white" onClick={handleDownloadPDF}>
              <Download className="w-3 h-3 mr-2" />
              Download PDF
            </Button>
            {invoice.status === "draft" && (
              <Button variant="outline" className="bg-white" onClick={handleSendInvoice}>
                <Send className="w-3 h-3 mr-2" />
                Send to Client
              </Button>
            )}
            {invoice.balanceDue > 0 && (
              <Button variant="outline" className="bg-white" onClick={handleRecordPayment}>
                <DollarSign className="w-3 h-3 mr-2" />
                Record Payment
              </Button>
            )}
            {!invoice.xeroSync && (
              <Button variant="outline" className="bg-white" onClick={handleSyncXero}>
                <FileText className="w-3 h-3 mr-2" />
                Sync to Xero
              </Button>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
          <div className="mb-6">

          <MetadataCard
            items={[
              { label: "Date Issued", value: invoice.dateIssued },
              { label: "Due Date", value: invoice.dueDate },
              { label: "Payment Terms", value: invoice.paymentTerms || "Net 14 days" },
              { label: "Tax Type", value: invoice.taxType },
            ]}
            className="mb-4"
          />

          <Separator className="my-6" />

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Invoice Items</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Species</TableHead>
                  <TableHead>Pot Size</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.species}</TableCell>
                    <TableCell>{item.potSize}</TableCell>
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
                <span className="font-medium">${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (15%):</span>
                <span className="font-medium">${invoice.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${invoice.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-orange-600">
                <span>Balance Due:</span>
                <span className="font-bold">${invoice.balanceDue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {invoice.payments.length > 0 && (
            <>
              <Separator className="my-6" />
              <div>
                <h2 className="text-lg font-semibold mb-4">Payment History</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoice.payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="capitalize">{payment.method.replace('-', ' ')}</TableCell>
                        <TableCell className="text-muted-foreground">{payment.reference || "-"}</TableCell>
                        <TableCell className="text-right font-medium text-green-600">${payment.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              </>
            )}
          </div>
        </Card>
        </div>
      </SidebarPageLayout>
    </ManagerLayout>
  );
}
