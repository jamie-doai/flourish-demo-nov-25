/**
 * Custom hook for line item management in orders and quotes
 * @ai-context - Encapsulates line item state and operations for sales forms
 */

import { useState, useCallback } from "react";

export interface LineItem {
  id: string;
  species: string;
  scientificName?: string;
  stage?: string;
  potSize: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
  batchIds?: string[];
  costPerUnit?: number;
}

/**
 * Hook for managing line items in orders/quotes
 * @param initialItems - Initial line items array
 * @returns Line items state and management functions
 */
export function useLineItems(initialItems: LineItem[] = []) {
  const [lineItems, setLineItems] = useState<LineItem[]>(
    initialItems.length > 0
      ? initialItems
      : [
          {
            id: "1",
            species: "",
            potSize: "",
            quantity: 0,
            unitPrice: 0,
            discount: 0,
            total: 0,
          },
        ]
  );

  const addLineItem = useCallback(() => {
    const newId = (lineItems.length + 1).toString();
    setLineItems([
      ...lineItems,
      {
        id: newId,
        species: "",
        potSize: "",
        quantity: 0,
        unitPrice: 0,
        discount: 0,
        total: 0,
      },
    ]);
  }, [lineItems]);

  const removeLineItem = useCallback(
    (id: string) => {
      if (lineItems.length > 1) {
        setLineItems(lineItems.filter((item) => item.id !== id));
      }
    },
    [lineItems]
  );

  const updateLineItem = useCallback(
    (id: string, field: keyof LineItem, value: unknown) => {
      setLineItems(
        lineItems.map((item) => {
          if (item.id === id) {
            const updatedItem = { ...item, [field]: value };

            // Recalculate total when quantity, unit price, or discount changes
            if (
              field === "quantity" ||
              field === "unitPrice" ||
              field === "discount"
            ) {
              const qty =
                field === "quantity"
                  ? parseFloat(value as string) || 0
                  : item.quantity;
              const price =
                field === "unitPrice"
                  ? parseFloat(value as string) || 0
                  : item.unitPrice;
              const disc =
                field === "discount"
                  ? parseFloat(value as string) || 0
                  : item.discount;

              const subtotal = qty * price;
              const discountAmount = subtotal * (disc / 100);
              updatedItem.total = subtotal - discountAmount;
            }

            return updatedItem;
          }
          return item;
        })
      );
    },
    [lineItems]
  );

  const addItemsFromInventory = useCallback(
    (items: Array<{
      species: string;
      scientificName?: string;
      stageName?: string;
      containerType: string;
      quantity: number;
      batchIds?: string[];
      costPerUnit?: number;
    }>) => {
      const newItems: LineItem[] = items.map((item) => ({
        id: `${Date.now()}-${Math.random()}`,
        species: item.species,
        scientificName: item.scientificName,
        stage: item.stageName,
        potSize: item.containerType,
        quantity: item.quantity,
        unitPrice: 0,
        discount: 0,
        total: 0,
        batchIds: item.batchIds,
        costPerUnit: item.costPerUnit,
      }));

      setLineItems([...lineItems, ...newItems]);
    },
    [lineItems]
  );

  return {
    lineItems,
    addLineItem,
    removeLineItem,
    updateLineItem,
    addItemsFromInventory,
  };
}

