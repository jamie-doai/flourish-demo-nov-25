import { useEffect } from "react";
import { BatchFormData, mockSpecies } from "@/types/batch";
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

interface BatchDetailsStepProps {
  formData: Partial<BatchFormData>;
  updateFormData: (data: Partial<BatchFormData>) => void;
}

export function BatchDetailsStep({ formData, updateFormData }: BatchDetailsStepProps) {
  // Auto-generate batch ID
  useEffect(() => {
    if (formData.species && formData.initialLocation && !formData.batchId) {
      const species = mockSpecies.find(s => s.scientificName === formData.species);
      const speciesCode = species?.code || "UNK";
      const locationCode = formData.initialLocation?.split(' ')[0]?.substring(0, 3).toUpperCase() || "LOC";
      const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const batchId = `${speciesCode}-${locationCode}-${date}`;
      updateFormData({ batchId });
    }
  }, [formData.species, formData.initialLocation]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Set Batch Details</h2>
      <p className="text-muted-foreground mb-6">
        Configure the batch identification and status
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="batchId">Batch ID *</Label>
          <Input
            id="batchId"
            value={formData.batchId || ""}
            onChange={(e) => updateFormData({ batchId: e.target.value })}
            placeholder="Auto-generated"
          />
          <p className="text-xs text-muted-foreground">
            Format: [SpeciesCode]-[LocationCode]-[Date]
          </p>
        </div>

        <div className="space-y-2">
          <Label>Created Date</Label>
          <Input
            type="date"
            value={today}
            disabled
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentStatus">Current Status *</Label>
          <Select
            value={formData.currentStatus || ""}
            onValueChange={(value: any) => updateFormData({ currentStatus: value })}
          >
            <SelectTrigger id="currentStatus">
              <SelectValue placeholder="Select status..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="seed">Seed</SelectItem>
              <SelectItem value="germinating">Germinating</SelectItem>
              <SelectItem value="propagation">Propagation</SelectItem>
              <SelectItem value="potted">Potted</SelectItem>
              <SelectItem value="hardening">Hardening</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectedGerminationDate">
            Expected Germination or Potting Date
          </Label>
          <Input
            id="expectedGerminationDate"
            type="date"
            value={formData.expectedGerminationDate?.toISOString().split('T')[0] || ""}
            onChange={(e) => updateFormData({ expectedGerminationDate: new Date(e.target.value) })}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity Confirmation</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity || ""}
              onChange={(e) => updateFormData({ quantity: parseFloat(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label>Unit</Label>
            <Input
              value={formData.quantityUnit || ""}
              disabled
              className="bg-muted"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any additional information about this batch..."
            value={formData.notes || ""}
            onChange={(e) => updateFormData({ notes: e.target.value })}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
