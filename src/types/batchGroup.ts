export interface BatchGroup {
  id: string;
  name: string;
  createdDate: string;
  createdBy: string;
  batchIds: string[];
  species: string;
  totalQuantity: number;
  purpose?: string;
}
