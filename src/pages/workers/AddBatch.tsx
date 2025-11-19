import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DevBar } from "@/components/DevBar";
import { WorkerBottomNav } from "@/components/WorkerBottomNav";
import { WorkerPageHeader } from "@/components/WorkerPageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDateNZ } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BatchFormData, BatchType, mockSpecies } from "@/types/batch";
import { useToast } from "@/hooks/use-toast";
import { Sprout, Scissors, Package, Camera } from "lucide-react";
import { locations } from "@/data";

const BATCH_TYPES: { type: BatchType; label: string; icon: any }[] = [
  { type: "seed-collection", label: "Seed", icon: Sprout },
  { type: "cuttings", label: "Cutting", icon: Scissors },
  { type: "bought-in", label: "Bought-In", icon: Package },
];

export default function WorkerAddBatch() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BatchFormData>>({
    collectedBy: "Current User",
    dateCollected: new Date(),
  });

  const updateFormData = (data: Partial<BatchFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSave = (addAnother: boolean = false) => {
    // Generate batch ID if not set
    const species = mockSpecies.find(s => s.scientificName === formData.species);
    const batchId = `${species?.code || "UNK"}-${formData.initialLocation?.substring(0, 3).toUpperCase()}-${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;
    
    toast({
      title: "🌱 Batch added successfully!",
      description: `Batch ${batchId} has been created.`,
    });

    if (addAnother) {
      setFormData({ collectedBy: "Current User", dateCollected: new Date() });
      setStep(1);
    } else {
      navigate("/workers/inventory");
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.batchType && formData.species;
    if (step === 2) {
      if (formData.batchType === "seed-collection" || formData.batchType === "cuttings") {
        return formData.quantity;
      }
      return formData.supplierName && formData.quantity;
    }
    if (step === 3) return formData.initialLocation;
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="max-w-[500px] mx-auto bg-[#F8FAF9] min-h-screen pb-20">
        <DevBar />
      <WorkerPageHeader title="Add Batch" backTo="/workers/inventory" />

      <main className="container mx-auto px-4 py-6">
        {/* Progress Indicator */}
        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full mx-1 ${
                s <= step ? "bg-[#3B7A57]" : "bg-[#37474F]/20"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Batch Type & Species */}
        {step === 1 && (
          <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm mb-4">
            <h2 className="text-xl font-bold text-[#37474F] mb-4">Type & Species</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-base text-[#37474F]">Batch Type *</Label>
                <div className="grid grid-cols-3 gap-3">
                  {BATCH_TYPES.map(({ type, label, icon: Icon }) => (
                    <button
                      key={type}
                      onClick={() => updateFormData({ batchType: type })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.batchType === type
                          ? "border-[#3B7A57] bg-[#3B7A57]/10"
                          : "border-[#37474F]/20"
                      }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${
                        formData.batchType === type ? "text-[#3B7A57]" : "text-[#37474F]"
                      }`} />
                      <span className="text-sm font-medium text-[#37474F]">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="species" className="text-base text-[#37474F]">Species *</Label>
                <Select
                  value={formData.species || ""}
                  onValueChange={(value) => {
                    const species = mockSpecies.find(s => s.scientificName === value);
                    updateFormData({
                      species: value,
                      commonName: species?.commonName || "",
                    });
                  }}
                >
                  <SelectTrigger id="species" className="h-12 text-base">
                    <SelectValue placeholder="Select species..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {mockSpecies.map(species => (
                      <SelectItem key={species.id} value={species.scientificName}>
                        {species.commonName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.commonName && (
                  <p className="text-sm text-[#37474F]/60">{formData.species}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="variety" className="text-base text-[#37474F]">Variety (Optional)</Label>
                <Input
                  id="variety"
                  className="h-12 text-base"
                  placeholder="e.g., Coastal variant"
                  value={formData.variety || ""}
                  onChange={(e) => updateFormData({ variety: e.target.value })}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Source/Supplier */}
        {step === 2 && (
          <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm mb-4">
            <h2 className="text-xl font-bold text-[#37474F] mb-4">Source Info</h2>

            <div className="space-y-6">
              {(formData.batchType === "seed-collection" || formData.batchType === "cuttings") && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="sourceLocation" className="text-base text-[#37474F]">
                      {formData.batchType === "seed-collection" ? "Source Location *" : "Parent Plant *"}
                    </Label>
                    <Input
                      id="sourceLocation"
                      className="h-12 text-base"
                      placeholder={
                        formData.batchType === "seed-collection"
                          ? "e.g., Silverdale"
                          : "e.g., Block 12 - Plant 5"
                      }
                      value={formData.batchType === "seed-collection" ? formData.sourceLocation || "" : formData.parentPlant || ""}
                      onChange={(e) => updateFormData(
                        formData.batchType === "seed-collection"
                          ? { sourceLocation: e.target.value }
                          : { parentPlant: e.target.value }
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-base text-[#37474F]">
                      Quantity ({formData.batchType === "seed-collection" ? "grams" : "cuttings"}) *
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      className="h-12 text-base"
                      placeholder="0"
                      value={formData.quantity || ""}
                      onChange={(e) => updateFormData({
                        quantity: parseFloat(e.target.value),
                        quantityUnit: formData.batchType === "seed-collection" ? "grams" : "cuttings"
                      })}
                    />
                  </div>
                </>
              )}

              {formData.batchType === "bought-in" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="supplierName" className="text-base text-[#37474F]">Supplier Name *</Label>
                    <Input
                      id="supplierName"
                      className="h-12 text-base"
                      placeholder="e.g., Native Plants Ltd"
                      value={formData.supplierName || ""}
                      onChange={(e) => updateFormData({ supplierName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-base text-[#37474F]">Quantity (trays/pots) *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      className="h-12 text-base"
                      placeholder="0"
                      value={formData.quantity || ""}
                      onChange={(e) => updateFormData({
                        quantity: parseFloat(e.target.value),
                        quantityUnit: "trays"
                      })}
                    />
                  </div>

                  <Button variant="outline" className="w-full h-12">
                    <Camera className="w-6 h-6 mr-2" />
                    Add Photo
                  </Button>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base text-[#37474F]">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  className="text-base"
                  placeholder="Any observations..."
                  value={formData.notes || ""}
                  onChange={(e) => updateFormData({ notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Location & Quantity */}
        {step === 3 && (
          <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm mb-4">
            <h2 className="text-xl font-bold text-[#37474F] mb-4">Location</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="initialLocation" className="text-base text-[#37474F]">Initial Location *</Label>
                <Select
                  value={formData.initialLocation || ""}
                  onValueChange={(value) => updateFormData({ initialLocation: value })}
                >
                  <SelectTrigger id="initialLocation" className="h-12 text-base">
                    <SelectValue placeholder="Select location..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.name}>
                        {location.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="Propagation Tunnel 1">Propagation Tunnel 1</SelectItem>
                    <SelectItem value="Propagation Tunnel 2">Propagation Tunnel 2</SelectItem>
                    <SelectItem value="Seed Store">Seed Store</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-base text-[#37474F]">Responsible Person</Label>
                <Input
                  className="h-12 text-base bg-muted"
                  value={formData.collectedBy || "Current User"}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base text-[#37474F]">Quantity Confirmation</Label>
                <Input
                  className="h-12 text-base bg-muted"
                  value={`${formData.quantity} ${formData.quantityUnit}`}
                  disabled
                />
              </div>
            </div>
          </Card>
        )}

        {/* Step 4: Confirm & Save */}
        {step === 4 && (
          <div className="space-y-4">
            <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm">
              <h2 className="text-xl font-bold text-[#37474F] mb-4">Confirm Details</h2>

              <div className="space-y-3 text-base">
                <div className="flex justify-between py-2 border-b border-[#37474F]/10">
                  <span className="text-[#37474F]/60">Type:</span>
                  <span className="font-medium text-[#37474F]">
                    {BATCH_TYPES.find(t => t.type === formData.batchType)?.label}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#37474F]/10">
                  <span className="text-[#37474F]/60">Species:</span>
                  <span className="font-medium text-[#37474F]">{formData.commonName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#37474F]/10">
                  <span className="text-[#37474F]/60">Location:</span>
                  <span className="font-medium text-[#37474F]">{formData.initialLocation}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#37474F]/10">
                  <span className="text-[#37474F]/60">Quantity:</span>
                  <span className="font-medium text-[#37474F]">
                    {formData.quantity} {formData.quantityUnit}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#37474F]/10">
                  <span className="text-[#37474F]/60">By:</span>
                  <span className="font-medium text-[#37474F]">{formData.collectedBy}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#37474F]/60">Date:</span>
                  <span className="font-medium text-[#37474F]">
                    {formatDateNZ(formData.dateCollected)}
                  </span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={() => handleSave(false)}
                className="w-full h-14 bg-[#3B7A57] hover:bg-[#3B7A57]/90 text-white font-semibold text-base"
              >
                Save & Exit
              </Button>

              <Button
                onClick={() => handleSave(true)}
                variant="outline"
                className="w-full h-14 border-2 border-[#37474F]/30 text-base font-semibold"
              >
                Save & Add Another
              </Button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(s => s - 1)}
                className="flex-1 h-14 border-2 text-base"
              >
                Back
              </Button>
            )}
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
              className="flex-1 h-14 bg-[#3B7A57] hover:bg-[#3B7A57]/90 text-white text-base"
            >
              {step === 3 ? "Review" : "Next"}
            </Button>
          </div>
        )}
      </main>

      <WorkerBottomNav />
      </div>
    </div>
  );
}
