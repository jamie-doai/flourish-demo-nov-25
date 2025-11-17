import { Batch } from "@/data/batches";
import { LucideIcon } from "lucide-react";

export interface PendingLineItem {
  id: string;
  species: string;
  scientificName: string;
  stage: string;
  stageName: string;
  quantity: number;
  availableQuantity: number;
  containerType: string;
  batchIds: string[];
  costPerUnit: number;
}

export interface StageInventoryData {
  stage: string;
  stageName: string;
  stageIcon: LucideIcon;
  totalQuantity: number;
  batchCount: number;
  batches: Batch[];
  containerType: string;
  avgCostPerUnit: number;
}

export interface SpeciesInventorySummary {
  species: string;
  scientificName: string;
  totalQuantity: number;
  batchCount: number;
  stages: StageInventoryData[];
}
