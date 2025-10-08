import { BatchFormData } from "@/types/batch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Printer, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ReviewStepProps {
  formData: Partial<BatchFormData>;
  onSave: (addAnother: boolean) => void;
}

export function ReviewStep({ formData, onSave }: ReviewStepProps) {
  const batchTypeLabels = {
    "seed-collection": "Seed Collection",
    "cuttings": "Cuttings",
    "bought-in": "Bought-In Stock",
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Review & Confirm</h2>
      <p className="text-muted-foreground mb-6">
        Check all details before saving the batch
      </p>

      <div className="space-y-6">
        {/* Batch Type & Species */}
        <Card className="p-4">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3">
            Type & Species
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Batch Type:</span>
              <span className="font-medium">
                {formData.batchType ? batchTypeLabels[formData.batchType] : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Species:</span>
              <span className="font-medium">{formData.species || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Common Name:</span>
              <span className="font-medium">{formData.commonName || "-"}</span>
            </div>
            {formData.variety && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Variety:</span>
                <span className="font-medium">{formData.variety}</span>
              </div>
            )}
            {formData.intendedPurpose && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purpose:</span>
                <span className="font-medium capitalize">{formData.intendedPurpose}</span>
              </div>
            )}
          </div>
        </Card>

        {/* Source/Origin */}
        <Card className="p-4">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3">
            Source & Origin
          </h3>
          <div className="space-y-2 text-sm">
            {formData.batchType === "seed-collection" && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Source Location:</span>
                  <span className="font-medium">{formData.sourceLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Collected:</span>
                  <span className="font-medium">
                    {formData.dateCollected?.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Collected By:</span>
                  <span className="font-medium">{formData.collectedBy || "Not specified"}</span>
                </div>
                {formData.storageCondition && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span className="font-medium capitalize">{formData.storageCondition}</span>
                  </div>
                )}
              </>
            )}
            {formData.batchType === "cuttings" && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Parent Plant:</span>
                  <span className="font-medium">{formData.parentPlant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Taken:</span>
                  <span className="font-medium">
                    {formData.dateTaken?.toLocaleDateString()}
                  </span>
                </div>
              </>
            )}
            {formData.batchType === "bought-in" && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Supplier:</span>
                  <span className="font-medium">{formData.supplierName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Received:</span>
                  <span className="font-medium">
                    {formData.dateReceived?.toLocaleDateString()}
                  </span>
                </div>
                {formData.invoiceReference && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Invoice:</span>
                    <span className="font-medium">{formData.invoiceReference}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>

        {/* Quantity & Location */}
        <Card className="p-4">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3">
            Quantity & Location
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity:</span>
              <span className="font-medium">
                {formData.quantity} {formData.quantityUnit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Initial Location:</span>
              <span className="font-medium">{formData.initialLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Responsible Person:</span>
              <span className="font-medium">{formData.responsiblePerson || "Not assigned"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Track Movements:</span>
              <span className="font-medium">{formData.trackMovements ? "Yes" : "No"}</span>
            </div>
          </div>
        </Card>

        {/* Batch Details */}
        <Card className="p-4">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3">
            Batch Information
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Batch ID:</span>
              <span className="font-mono font-medium">{formData.batchId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Status:</span>
              <span className="font-medium capitalize">{formData.currentStatus}</span>
            </div>
            {formData.expectedGerminationDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected Ready:</span>
                <span className="font-medium">
                  {formData.expectedGerminationDate.toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* Notes */}
        {formData.notes && (
          <Card className="p-4">
            <h3 className="font-semibold text-sm text-muted-foreground mb-3">Notes</h3>
            <p className="text-sm">{formData.notes}</p>
          </Card>
        )}

        <Separator />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => onSave(false)}
            className="flex-1"
            size="lg"
          >
            <Check className="w-4 h-4 mr-2" />
            Save & Exit
          </Button>
          
          <Button
            onClick={() => onSave(true)}
            variant="outline"
            className="flex-1"
            size="lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Save & Add Another
          </Button>
          
          <Button
            variant="outline"
            size="lg"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Label
          </Button>
        </div>
      </div>
    </div>
  );
}
