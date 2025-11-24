import { Batch } from "@/data/batches";

export function generateBatchId(
  speciesCode: string,
  locationCode: string,
  date: Date = new Date(),
  suffix?: string
): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  
  const baseId = `${speciesCode}-${locationCode}-${dateStr}`;
  return suffix ? `${baseId}-${suffix}` : baseId;
}

export function generateBatchIdWithSuffix(
  baseId: string,
  index: number
): string {
  const suffix = String(index).padStart(2, '0');
  return `${baseId}-${suffix}`;
}

type BatchLike = Pick<Batch, 'id'>;

export function validateBatchIdUnique(
  batchId: string,
  existingBatches: BatchLike[]
): boolean {
  return !existingBatches.some(batch => batch.id === batchId);
}

export function getNextAvailableSuffix(
  baseId: string,
  existingBatches: BatchLike[]
): string {
  let suffix = 1;
  while (!validateBatchIdUnique(`${baseId}-${String(suffix).padStart(2, '0')}`, existingBatches)) {
    suffix++;
  }
  return String(suffix).padStart(2, '0');
}
