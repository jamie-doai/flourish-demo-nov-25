import { BatchFormData } from "@/types/batch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Upload, QrCode } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AttachmentsStepProps {
  formData: Partial<BatchFormData>;
  updateFormData: (data: Partial<BatchFormData>) => void;
}

export function AttachmentsStep({ formData, updateFormData }: AttachmentsStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Attachments</h2>
      <p className="text-muted-foreground mb-6">
        Add photos, documents, or generate a label for this batch (optional)
      </p>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Photos</Label>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 border-2 border-dashed cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
              <div className="flex flex-col items-center gap-3 text-center">
                <Camera className="w-8 h-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Take Photo</p>
                  <p className="text-xs text-muted-foreground">Use camera</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-dashed cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
              <div className="flex flex-col items-center gap-3 text-center">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Upload Photos</p>
                  <p className="text-xs text-muted-foreground">From device</p>
                </div>
              </div>
            </Card>
          </div>
          <p className="text-xs text-muted-foreground">
            Add photos of seed pods, cuttings, or received stock
          </p>
        </div>

        <div className="space-y-4">
          <Label>Documents</Label>
          <Card className="p-6 border-2 border-dashed cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
            <div className="flex flex-col items-center gap-3 text-center">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-medium">Upload Documents</p>
                <p className="text-xs text-muted-foreground">
                  Certification, supplier documents, or invoices (PDF, JPG)
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <Label>Batch Label</Label>
          <Card className="p-6 bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded border-2 border-primary/20 flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{formData.batchId || "Batch Label"}</p>
                  <p className="text-sm text-muted-foreground">
                    {formData.species || "Species name"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formData.quantity} {formData.quantityUnit}
                  </p>
                </div>
              </div>
              <Button variant="outline">
                Generate Label
              </Button>
            </div>
          </Card>
          <p className="text-xs text-muted-foreground">
            Generate a QR code or barcode label for this batch
          </p>
        </div>
      </div>
    </div>
  );
}
