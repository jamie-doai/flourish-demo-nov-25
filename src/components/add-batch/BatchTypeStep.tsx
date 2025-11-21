import { Card } from "@/components/ui/card";
import { BatchFormData, BatchType } from "@/types/batch";
import { Sprout, Scissors, Package, LucideIcon } from "lucide-react";

interface BatchTypeStepProps {
  formData: Partial<BatchFormData>;
  updateFormData: (data: Partial<BatchFormData>) => void;
}

const batchTypes: { type: BatchType; label: string; icon: LucideIcon; description: string }[] = [
  {
    type: "seed-collection",
    label: "Seed Collection",
    icon: Sprout,
    description: "Seeds collected from source plants in the wild or on-site"
  },
  {
    type: "cuttings",
    label: "Cuttings",
    icon: Scissors,
    description: "Propagation material taken from parent plants"
  },
  {
    type: "bought-in",
    label: "Bought-In Stock",
    icon: Package,
    description: "Plants or material purchased from external suppliers"
  }
];

export function BatchTypeStep({ formData, updateFormData }: BatchTypeStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Choose Batch Type</h2>
      <p className="text-muted-foreground mb-6">
        Select the type of material this batch represents
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {batchTypes.map(({ type, label, icon: Icon, description }) => (
          <Card
            key={type}
            className={`p-3 cursor-pointer transition-all hover:shadow-lg ${
              formData.batchType === type
                ? "border-2 border-primary bg-primary/5"
                : "border-2 border-transparent"
            }`}
            onClick={() => updateFormData({ batchType: type })}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                formData.batchType === type ? "bg-primary/20" : "bg-muted"
              }`}>
                <Icon className={`w-8 h-8 ${
                  formData.batchType === type ? "text-primary" : "text-muted-foreground"
                }`} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{label}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
