import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DevBar } from "@/components/DevBar";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { BatchFormData } from "@/types/batch";
import { BatchTypeStep } from "@/components/add-batch/BatchTypeStep";
import { SpeciesStep } from "@/components/add-batch/SpeciesStep";
import { SourceOriginStep } from "@/components/add-batch/SourceOriginStep";
import { LocationStep } from "@/components/add-batch/LocationStep";
import { BatchDetailsStep } from "@/components/add-batch/BatchDetailsStep";
import { CostConfigurationStep } from "@/components/add-batch/CostConfigurationStep";
import { AttachmentsStep } from "@/components/add-batch/AttachmentsStep";
import { ReviewStep } from "@/components/add-batch/ReviewStep";
import { useToast } from "@/hooks/use-toast";

const STEPS = [
  "Batch Type",
  "Species Info",
  "Source/Origin",
  "Location",
  "Batch Details",
  "Cost Config",
  "Attachments",
  "Review"
];

export default function AddBatch() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<BatchFormData>>({
    trackMovements: true,
  });
  const [selectedCosts, setSelectedCosts] = useState<string[]>([]);
  const [costOverrides, setCostOverrides] = useState<Record<string, number>>({});

  const updateFormData = (data: Partial<BatchFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSave = (addAnother: boolean = false) => {
    toast({
      title: "🌿 Batch added successfully!",
      description: `Batch ${formData.batchId} has been created.`,
    });
    
    if (addAnother) {
      setFormData({ trackMovements: true });
      setCurrentStep(0);
    } else {
      navigate("/managers/inventory");
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!formData.batchType;
      case 1:
        return !!formData.species;
      case 2:
        return formData.batchType === "seed-collection" 
          ? !!formData.sourceLocation && !!formData.quantity
          : formData.batchType === "cuttings"
          ? !!formData.parentPlant && !!formData.quantity
          : !!formData.supplierName && !!formData.quantity;
      case 3:
        return !!formData.initialLocation;
      case 4:
        return !!formData.batchId && !!formData.currentStatus;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/managers/inventory")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Inventory
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">Add New Batch</h1>
            <p className="text-muted-foreground">
              Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={((currentStep + 1) / STEPS.length) * 100} className="h-2" />
            <div className="flex justify-between mt-2">
              {STEPS.map((step, index) => (
                <span
                  key={step}
                  className={`text-xs ${
                    index <= currentStep ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card className="p-6 mb-6">
            {currentStep === 0 && (
              <BatchTypeStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 1 && (
              <SpeciesStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 2 && (
              <SourceOriginStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 3 && (
              <LocationStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 4 && (
              <BatchDetailsStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 5 && (
              <CostConfigurationStep 
                selectedCosts={selectedCosts}
                onCostsChange={setSelectedCosts}
                costOverrides={costOverrides}
                onCostOverrideChange={(costId, value) => 
                  setCostOverrides(prev => ({ ...prev, [costId]: value }))
                }
              />
            )}
            {currentStep === 6 && (
              <AttachmentsStep formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 7 && (
              <ReviewStep formData={formData} onSave={handleSave} />
            )}
          </Card>

          {/* Navigation Buttons */}
          {currentStep < 7 && (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {currentStep === STEPS.length - 2 ? "Review" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
