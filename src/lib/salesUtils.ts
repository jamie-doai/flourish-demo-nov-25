import { Batch } from "@/data/batches";
import { stages } from "@/data/stages";
import { SpeciesInventorySummary, StageInventoryData } from "@/types/sales";

export function getAvailableForSaleBatches(batches: Batch[]): Batch[] {
  return batches.filter(batch => 
    batch.quantity > 0 && 
    batch.stage !== "seed" &&
    (!batch.saleStatus || batch.saleStatus === "ready-for-sale")
  );
}

export function getSpeciesInventorySummary(batches: Batch[]): SpeciesInventorySummary[] {
  const availableBatches = getAvailableForSaleBatches(batches);
  
  const grouped = availableBatches.reduce((acc, batch) => {
    const key = `${batch.species}|${batch.scientificName}`;
    if (!acc[key]) {
      acc[key] = {
        species: batch.species,
        scientificName: batch.scientificName,
        batches: []
      };
    }
    acc[key].batches.push(batch);
    return acc;
  }, {} as Record<string, { species: string; scientificName: string; batches: Batch[] }>);

  return Object.values(grouped).map(group => {
    const stageMap = new Map<string, Batch[]>();
    
    group.batches.forEach(batch => {
      const existing = stageMap.get(batch.stage) || [];
      stageMap.set(batch.stage, [...existing, batch]);
    });

    const stageData: StageInventoryData[] = Array.from(stageMap.entries()).map(([stageId, stageBatches]) => {
      const stageInfo = stages.find(s => s.id === stageId);
      const totalQty = stageBatches.reduce((sum, b) => sum + b.quantity, 0);
      const totalCost = stageBatches.reduce((sum, b) => sum + (b.totalCost || 0), 0);
      const avgCost = totalQty > 0 ? totalCost / totalQty : 0;
      
      const containers = stageBatches.map(b => b.container).filter(Boolean);
      const mostCommon = containers.length > 0 
        ? containers.sort((a, b) => 
            containers.filter(c => c === b).length - containers.filter(c => c === a).length
          )[0] 
        : "Unknown";

      return {
        stage: stageId,
        stageName: stageInfo?.name || stageId,
        stageIcon: stageInfo?.icon,
        totalQuantity: totalQty,
        batchCount: stageBatches.length,
        batches: stageBatches,
        containerType: mostCommon || "Unknown",
        avgCostPerUnit: avgCost
      };
    });

    return {
      species: group.species,
      scientificName: group.scientificName,
      totalQuantity: group.batches.reduce((sum, b) => sum + b.quantity, 0),
      batchCount: group.batches.length,
      stages: stageData
    };
  }).sort((a, b) => a.species.localeCompare(b.species));
}

export function searchSpecies(
  query: string,
  inventorySummary: SpeciesInventorySummary[]
): SpeciesInventorySummary[] {
  if (!query.trim()) return inventorySummary;
  
  const lowerQuery = query.toLowerCase();
  return inventorySummary.filter(item => 
    item.species.toLowerCase().includes(lowerQuery) ||
    item.scientificName.toLowerCase().includes(lowerQuery)
  );
}

export function calculateMargin(
  unitPrice: number,
  costPerUnit: number
): { marginDollar: number; marginPercent: number } {
  if (unitPrice <= 0) {
    return { marginDollar: 0, marginPercent: 0 };
  }
  
  const marginDollar = unitPrice - costPerUnit;
  const marginPercent = (marginDollar / unitPrice) * 100;
  
  return { marginDollar, marginPercent };
}

export function getMarginColor(marginPercent: number): string {
  if (marginPercent < 0) return "text-red-600 dark:text-red-400";
  if (marginPercent < 20) return "text-yellow-600 dark:text-yellow-400";
  if (marginPercent < 40) return "text-blue-600 dark:text-blue-400";
  return "text-green-600 dark:text-green-400";
}
