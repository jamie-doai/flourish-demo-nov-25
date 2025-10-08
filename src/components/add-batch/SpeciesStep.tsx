import { useState, useEffect } from "react";
import { BatchFormData, mockSpecies } from "@/types/batch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface SpeciesStepProps {
  formData: Partial<BatchFormData>;
  updateFormData: (data: Partial<BatchFormData>) => void;
}

export function SpeciesStep({ formData, updateFormData }: SpeciesStepProps) {
  const [selectedSpecies, setSelectedSpecies] = useState<string>(formData.species || "");

  useEffect(() => {
    const species = mockSpecies.find(s => s.scientificName === selectedSpecies);
    if (species) {
      updateFormData({
        species: species.scientificName,
        commonName: species.commonName,
      });
    }
  }, [selectedSpecies]);

  const currentSpeciesData = mockSpecies.find(s => s.scientificName === selectedSpecies);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Species Information</h2>
      <p className="text-muted-foreground mb-6">
        Select the species and add additional details
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="species">Species *</Label>
          <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
            <SelectTrigger id="species">
              <SelectValue placeholder="Search and select species..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {mockSpecies.map(species => (
                <SelectItem key={species.id} value={species.scientificName}>
                  {species.commonName} ({species.scientificName})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {currentSpeciesData && (
          <Card className="p-4 bg-muted/50">
            <h4 className="font-semibold mb-3">Species Details</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Common Name:</span>
                <p className="font-medium">{currentSpeciesData.commonName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Default Propagation:</span>
                <p className="font-medium">{currentSpeciesData.defaultPropagationTime} days</p>
              </div>
              <div>
                <span className="text-muted-foreground">Success Rate:</span>
                <p className="font-medium">{currentSpeciesData.successRate}%</p>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-2">
          <Label htmlFor="variety">Variety or Provenance</Label>
          <Input
            id="variety"
            placeholder="e.g., Coastal variant, Mt. Eden provenance"
            value={formData.variety || ""}
            onChange={(e) => updateFormData({ variety: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purpose">Intended Purpose</Label>
          <Select
            value={formData.intendedPurpose || ""}
            onValueChange={(value) => updateFormData({ intendedPurpose: value })}
          >
            <SelectTrigger id="purpose">
              <SelectValue placeholder="Select purpose..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="riparian">Riparian Restoration</SelectItem>
              <SelectItem value="coastal">Coastal Planting</SelectItem>
              <SelectItem value="contract">Contract Project</SelectItem>
              <SelectItem value="retail">Retail Stock</SelectItem>
              <SelectItem value="biodiversity">Biodiversity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
