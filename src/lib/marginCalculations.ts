import { BatchCostSummary } from '@/types/cost';

export interface MarginCalculation {
  batchCOP: number;
  unitPrice: number;
  marginDollar: number;
  marginPercent: number;
  status: 'excellent' | 'good' | 'low' | 'negative';
}

export const calculateLineItemMargin = (
  unitPrice: number,
  batchCostSummary?: BatchCostSummary
): MarginCalculation => {
  if (!batchCostSummary) {
    return {
      batchCOP: 0,
      unitPrice,
      marginDollar: unitPrice,
      marginPercent: 100,
      status: 'excellent',
    };
  }
  
  const batchCOP = batchCostSummary.perUnitCost;
  const marginDollar = unitPrice - batchCOP;
  const marginPercent = (marginDollar / unitPrice) * 100;
  
  let status: MarginCalculation['status'];
  if (marginPercent < 0) status = 'negative';
  else if (marginPercent < 20) status = 'low';
  else if (marginPercent < 40) status = 'good';
  else status = 'excellent';
  
  return {
    batchCOP,
    unitPrice,
    marginDollar,
    marginPercent,
    status,
  };
};

export const calculateQuoteMarginSummary = (
  lineItems: Array<{
    quantity: number;
    unitPrice: number;
    batchCOP?: number;
  }>
) => {
  let totalRevenue = 0;
  let totalCOP = 0;
  
  lineItems.forEach(item => {
    totalRevenue += item.quantity * item.unitPrice;
    totalCOP += item.quantity * (item.batchCOP || 0);
  });
  
  const totalMarginDollar = totalRevenue - totalCOP;
  const avgMarginPercent = totalRevenue > 0 ? (totalMarginDollar / totalRevenue) * 100 : 0;
  
  return {
    totalRevenue,
    totalCOP,
    totalMarginDollar,
    avgMarginPercent,
  };
};

export const getMarginStatusColor = (status: MarginCalculation['status']) => {
  const colors = {
    excellent: 'text-green-600 dark:text-green-400',
    good: 'text-blue-600 dark:text-blue-400',
    low: 'text-yellow-600 dark:text-yellow-400',
    negative: 'text-red-600 dark:text-red-400',
  };
  return colors[status];
};

export const getMarginStatusBadge = (status: MarginCalculation['status']) => {
  const badges = {
    excellent: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800',
    good: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    low: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    negative: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800',
  };
  return badges[status];
};
