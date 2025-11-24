import { useState, useEffect } from "react";
import { BatchFormData, BatchStatus } from "@/types/batch";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locations } from "@/data";
import { lifecycleStages } from "@/data/stages";
import { Plus, Trash2 } from "lucide-react";
import { generateBatchId, getNextAvailableSuffix } from "@/lib/batchIdUtils";
import { batches } from "@/data/batches";
import { mockSpecies } from "@/types/batch";

interface BatchQuantitiesStepProps {
  formData: Partial<BatchFormData>;
  updateFormData: (data: Partial<BatchFormData>) => void;
}

interface BatchConfig {
  batchId: string;
  quantity: number;
  initialLocation: string;
  currentStatus: BatchStatus;
}

export function BatchQuantitiesStep({ formData, updateFormData }: BatchQuantitiesStepProps) {
  const [createMultiple, setCreateMultiple] = useState(formData.createMultiple || false);
  const [batchConfigs, setBatchConfigs] = useState<BatchConfig[]>(
    formData.batchConfigs || []
  );

  useEffect(() => {
    if (createMultiple && batchConfigs.length === 0) {
      // Initialize with 2 batches
      initializeBatches(2);
    }
  }, [createMultiple]);

  const initializeBatches = (count: number) => {
    const species = mockSpecies.find(s => s.scientificName === formData.species);
    const speciesCode = species?.code || "UNK";
    const locationCode = (formData.initialLocation || "GH1").substring(0, 3).toUpperCase().replace(/\s/g, '');
    const baseId = generateBatchId(speciesCode, locationCode, new Date());
    
    const configs: BatchConfig[] = [];
    for (let i = 1; i <= count; i++) {
      const suffix = getNextAvailableSuffix(baseId, [...batches, ...configs.map(c => ({ id: c.batchId }))]);
      configs.push({
        batchId: `${baseId}-${suffix}`,
        quantity: formData.quantity || 100,
        initialLocation: formData.initialLocation || "",
        currentStatus: formData.currentStatus || "propagation",
      });
    }
    
    setBatchConfigs(configs);
  };

  const handleToggle = (checked: boolean) => {
    setCreateMultiple(checked);
    updateFormData({ createMultiple: checked });
    
    if (checked && batchConfigs.length === 0) {
      initializeBatches(2);
    } else if (!checked) {
      setBatchConfigs([]);
      updateFormData({ batchConfigs: [] });
    }
  };

  const addBatch = () => {
    const species = mockSpecies.find(s => s.scientificName === formData.species);
    const speciesCode = species?.code || "UNK";
    const locationCode = (formData.initialLocation || "GH1").substring(0, 3).toUpperCase().replace(/\s/g, '');
    const baseId = generateBatchId(speciesCode, locationCode, new Date());
    const suffix = getNextAvailableSuffix(baseId, [...batches, ...batchConfigs.map(c => ({ id: c.batchId }))]);
    
    const newConfig: BatchConfig = {
      batchId: `${baseId}-${suffix}`,
      quantity: batchConfigs[0]?.quantity || formData.quantity || 100,
      initialLocation: batchConfigs[0]?.initialLocation || formData.initialLocation || "",
      currentStatus: batchConfigs[0]?.currentStatus || formData.currentStatus || "propagation",
    };
    
    const updated = [...batchConfigs, newConfig];
    setBatchConfigs(updated);
    updateFormData({ batchConfigs: updated, numberOfBatches: updated.length });
  };

  const removeBatch = (index: number) => {
    const updated = batchConfigs.filter((_, i) => i !== index);
    setBatchConfigs(updated);
    updateFormData({ batchConfigs: updated, numberOfBatches: updated.length });
  };

  const updateBatchConfig = (index: number, field: keyof BatchConfig, value: BatchConfig[keyof BatchConfig]) => {
    const updated = [...batchConfigs];
    updated[index] = { ...updated[index], [field]: value };
    setBatchConfigs(updated);
    updateFormData({ batchConfigs: updated });
  };

  const totalQuantity = batchConfigs.reduce((sum, config) => sum + config.quantity, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Batch Quantities</h2>
        <p className="text-muted-foreground">
          Create multiple similar batches at once, or continue with a single batch
        </p>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="createMultiple" className="text-base font-semibold">
              Create Multiple Batches
            </Label>
            <p className="text-sm text-muted-foreground">
              Generate multiple batches with similar properties but different batch numbers
            </p>
          </div>
          <Switch
            id="createMultiple"
            checked={createMultiple}
            onCheckedChange={handleToggle}
          />
        </div>
      </Card>

      {createMultiple && batchConfigs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Total quantity across all batches: <span className="font-semibold text-foreground">{totalQuantity}</span>
            </p>
          </div>

          {batchConfigs.map((config, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold">Batch {index + 1}</h3>
                {batchConfigs.length > 1 && (
                  <Button
                    onClick={() => removeBatch(index)}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`batchId-${index}`}>Batch ID</Label>
                  <Input
                    id={`batchId-${index}`}
                    value={config.batchId}
                    onChange={(e) => updateBatchConfig(index, 'batchId', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                  <Input
                    id={`quantity-${index}`}
                    type="number"
                    value={config.quantity}
                    onChange={(e) => updateBatchConfig(index, 'quantity', Number(e.target.value))}
                    min={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`location-${index}`}>Location</Label>
                  <Select
                    value={config.initialLocation}
                    onValueChange={(value) => updateBatchConfig(index, 'initialLocation', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc.id} value={loc.name}>
                          {loc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`status-${index}`}>Status</Label>
                  <Select
                    value={config.currentStatus}
                    onValueChange={(value) => updateBatchConfig(index, 'currentStatus', value as BatchStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {lifecycleStages.map((stage) => (
                        <SelectItem key={stage.id} value={stage.id}>
                          {stage.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          ))}

          <Button onClick={addBatch} variant="outline" className="w-full">
            <Plus className="w-3 h-3 mr-2" />
            Add Another Batch
          </Button>
        </div>
      )}

      {!createMultiple && (
        <Card className="text-center text-muted-foreground">
          <p>Single batch mode - continue to configure one batch</p>
        </Card>
      )}
    </div>
  );
}
