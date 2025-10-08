export interface OrderLineItem {
  id: string;
  species: string;
  potSize: string;
  quantity: number;
  unitPrice: number;
  total: number;
  batchId?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  linkedQuote?: string;
  clientId: string;
  clientName: string;
  dateCreated: string;
  status: "pending" | "confirmed" | "dispatched" | "completed";
  deliveryType: "pickup" | "courier" | "in-house";
  deliveryAddress?: string;
  deliveryDate?: string;
  specialInstructions?: string;
  items: OrderLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  dispatchedDate?: string;
  convertedToInvoice?: string;
}

export const orders: Order[] = [
  {
    id: "O-2025-00124",
    orderNumber: "O-2025-00124",
    linkedQuote: "Q-2025-00124",
    clientId: "CLI-002",
    clientName: "Native Gardens NZ",
    dateCreated: "2025-10-06",
    status: "dispatched",
    deliveryType: "courier",
    deliveryAddress: "45 Fernhill Road, Wellington 6012",
    deliveryDate: "2025-10-12",
    dispatchedDate: "2025-10-11",
    convertedToInvoice: "I-2025-00124",
    items: [
      {
        id: "OL-001",
        species: "Tōtara",
        potSize: "PB5",
        quantity: 300,
        unitPrice: 4.20,
        total: 1134,
        batchId: "TOT-2024-089"
      },
      {
        id: "OL-002",
        species: "Kōwhai",
        potSize: "2L",
        quantity: 200,
        unitPrice: 5.50,
        total: 1100,
        batchId: "KOW-2024-201"
      }
    ],
    subtotal: 2234,
    tax: 335.10,
    total: 2569.10,
    specialInstructions: "Handle with care - native species"
  },
  {
    id: "O-2025-00125",
    orderNumber: "O-2025-00125",
    linkedQuote: "Q-2025-00123",
    clientId: "CLI-001",
    clientName: "GreenScape Landscapes Ltd",
    dateCreated: "2025-10-09",
    status: "pending",
    deliveryType: "courier",
    deliveryAddress: "123 Beach Road, Auckland 1010",
    deliveryDate: "2025-10-15",
    items: [
      {
        id: "OL-003",
        species: "Mānuka",
        potSize: "1L",
        quantity: 1000,
        unitPrice: 3.50,
        total: 3325,
        batchId: "MAN-2024-156"
      },
      {
        id: "OL-004",
        species: "Harakeke",
        potSize: "T28",
        quantity: 500,
        unitPrice: 2.80,
        total: 1400,
        batchId: "HAR-2024-142"
      },
      {
        id: "OL-005",
        species: "Freight (Auckland)",
        potSize: "-",
        quantity: 1,
        unitPrice: 150,
        total: 150
      }
    ],
    subtotal: 4875,
    tax: 731.25,
    total: 5606.25,
    specialInstructions: "VIP client - priority delivery. Call before delivery."
  },
  {
    id: "O-2025-00126",
    orderNumber: "O-2025-00126",
    clientId: "CLI-004",
    clientName: "Eco Plantings Ltd",
    dateCreated: "2025-10-03",
    status: "confirmed",
    deliveryType: "pickup",
    deliveryDate: "2025-10-10",
    items: [
      {
        id: "OL-006",
        species: "Karamū",
        potSize: "PB3",
        quantity: 400,
        unitPrice: 2.50,
        total: 1000
      }
    ],
    subtotal: 1000,
    tax: 150,
    total: 1150,
    specialInstructions: "Customer will collect"
  }
];

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const getOrdersByStatus = (status: Order["status"]): Order[] => {
  return orders.filter(order => order.status === status);
};
