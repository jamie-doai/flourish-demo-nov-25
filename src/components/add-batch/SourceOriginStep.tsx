import { BatchFormData } from "@/types/batch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SourceOriginStepProps {
  formData: Partial<BatchFormData>;
  updateFormData: (data: Partial<BatchFormData>) => void;
}

export function SourceOriginStep({ formData, updateFormData }: SourceOriginStepProps) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Source or Origin</h2>
      <p className="text-muted-foreground mb-6">
        Record where this batch came from
      </p>

      <div className="space-y-6">
        {formData.batchType === "seed-collection" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="sourceLocation">Source Location *</Label>
              <Input
                id="sourceLocation"
                placeholder="e.g., Silverdale, Auckland"
                value={formData.sourceLocation || ""}
                onChange={(e) => updateFormData({ sourceLocation: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpsCoordinates">GPS Coordinates (Optional)</Label>
              <Input
                id="gpsCoordinates"
                placeholder="e.g., -36.6185, 174.6739"
                value={formData.gpsCoordinates || ""}
                onChange={(e) => updateFormData({ gpsCoordinates: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateCollected">Date Collected *</Label>
                <Input
                  id="dateCollected"
                  type="date"
                  value={formData.dateCollected?.toISOString().split('T')[0] || today}
                  onChange={(e) => updateFormData({ dateCollected: new Date(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="collectedBy">Collected By</Label>
                <Input
                  id="collectedBy"
                  placeholder="Person name"
                  value={formData.collectedBy || ""}
                  onChange={(e) => updateFormData({ collectedBy: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="0"
                  value={formData.quantity || ""}
                  onChange={(e) => updateFormData({ quantity: parseFloat(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantityUnit">Unit</Label>
                <Select
                  value={formData.quantityUnit || "grams"}
                  onValueChange={(value: any) => updateFormData({ quantityUnit: value })}
                >
                  <SelectTrigger id="quantityUnit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="grams">Grams</SelectItem>
                    <SelectItem value="kg">Kilograms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="storageCondition">Storage Condition</Label>
              <Select
                value={formData.storageCondition || ""}
                onValueChange={(value: any) => updateFormData({ storageCondition: value })}
              >
                <SelectTrigger id="storageCondition">
                  <SelectValue placeholder="Select condition..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="dry">Dry</SelectItem>
                  <SelectItem value="chilled">Chilled</SelectItem>
                  <SelectItem value="frozen">Frozen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {formData.batchType === "cuttings" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="parentPlant">Parent Plant / Source Area *</Label>
              <Input
                id="parentPlant"
                placeholder="e.g., Block 12 - Mother Plant 5"
                value={formData.parentPlant || ""}
                onChange={(e) => updateFormData({ parentPlant: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateTaken">Date Taken *</Label>
                <Input
                  id="dateTaken"
                  type="date"
                  value={formData.dateTaken?.toISOString().split('T')[0] || today}
                  onChange={(e) => updateFormData({ dateTaken: new Date(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="collectedBy">Collected By</Label>
                <Input
                  id="collectedBy"
                  placeholder="Person name"
                  value={formData.collectedBy || ""}
                  onChange={(e) => updateFormData({ collectedBy: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (Number of Cuttings) *</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0"
                value={formData.quantity || ""}
                onChange={(e) => updateFormData({ quantity: parseFloat(e.target.value), quantityUnit: "cuttings" })}
              />
            </div>
          </>
        )}

        {formData.batchType === "bought-in" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="supplierName">Supplier Name *</Label>
              <Input
                id="supplierName"
                placeholder="e.g., Native Plants Ltd"
                value={formData.supplierName || ""}
                onChange={(e) => updateFormData({ supplierName: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoiceReference">Invoice Reference</Label>
                <Input
                  id="invoiceReference"
                  placeholder="INV-12345"
                  value={formData.invoiceReference || ""}
                  onChange={(e) => updateFormData({ invoiceReference: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateReceived">Date Received *</Label>
                <Input
                  id="dateReceived"
                  type="date"
                  value={formData.dateReceived?.toISOString().split('T')[0] || today}
                  onChange={(e) => updateFormData({ dateReceived: new Date(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="0"
                  value={formData.quantity || ""}
                  onChange={(e) => updateFormData({ quantity: parseFloat(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantityUnit">Unit</Label>
                <Select
                  value={formData.quantityUnit || "trays"}
                  onValueChange={(value: any) => updateFormData({ quantityUnit: value })}
                >
                  <SelectTrigger id="quantityUnit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="trays">Trays</SelectItem>
                    <SelectItem value="pots">Pots</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any additional observations or details..."
            value={formData.notes || ""}
            onChange={(e) => updateFormData({ notes: e.target.value })}
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
