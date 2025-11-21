/**
 * Sales calculation utilities
 * @ai-context - Business logic for sales calculations including totals, taxes, and margins
 */

import { NZ_GST_RATE } from "./constants";

/**
 * Line item interface for calculation functions
 */
export interface LineItem {
  total: number;
}

/**
 * Calculates order/quote totals including subtotal, tax, and grand total
 * @param lineItems - Array of line items with total property
 * @returns Object containing subtotal, tax (GST), and total
 */
export function calculateTotals(lineItems: LineItem[]): {
  subtotal: number;
  tax: number;
  total: number;
} {
  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * NZ_GST_RATE;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

/**
 * Calculates margin percentage from price and cost
 * @param price - Selling price per unit
 * @param cost - Cost per unit
 * @returns Margin percentage (0-100)
 */
export function calculateMarginPercent(price: number, cost: number): number {
  if (!cost || price <= 0) return 0;
  return ((price - cost) / price) * 100;
}

