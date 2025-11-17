import { Batch } from "@/data/batches";

export function reserveStock(
  batches: Batch[],
  batchIds: string[],
  quoteId: string,
  quantity: number
): Batch[] {
  return batches.map(batch => {
    if (batchIds.includes(batch.id)) {
      return {
        ...batch,
        saleStatus: "reserved" as const,
        orderNumber: quoteId
      };
    }
    return batch;
  });
}

export function releaseReservation(
  batches: Batch[],
  quoteId: string
): Batch[] {
  return batches.map(batch => {
    if (batch.orderNumber === quoteId) {
      return {
        ...batch,
        saleStatus: null,
        orderNumber: undefined
      };
    }
    return batch;
  });
}

export function getAvailableQuantity(batch: Batch): number {
  if (batch.saleStatus === "reserved" || batch.saleStatus === "on-order") {
    return 0;
  }
  return batch.quantity;
}

export function checkAvailability(
  batches: Batch[],
  batchId: string,
  requestedQty: number
): { available: boolean; maxQuantity: number } {
  const batch = batches.find(b => b.id === batchId);
  if (!batch) {
    return { available: false, maxQuantity: 0 };
  }
  
  const availableQty = getAvailableQuantity(batch);
  return {
    available: availableQty >= requestedQty,
    maxQuantity: availableQty
  };
}
