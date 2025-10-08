export interface QuoteLineItem {
  id: string;
  species: string;
  potSize: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
  batchId?: string;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  clientId: string;
  clientName: string;
  dateCreated: string;
  expiryDate: string;
  status: "draft" | "sent" | "accepted" | "declined" | "converted";
  items: QuoteLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  reserveStock: boolean;
  internalNotes?: string;
  clientNotes?: string;
  convertedToOrder?: string;
}

export const quotes: Quote[] = [
  {
    id: "Q-2025-00123",
    quoteNumber: "Q-2025-00123",
    clientId: "CLI-001",
    clientName: "GreenScape Landscapes Ltd",
    dateCreated: "2025-10-08",
    expiryDate: "2025-10-22",
    status: "sent",
    reserveStock: true,
    items: [
      {
        id: "QL-001",
        species: "Mānuka",
        potSize: "1L",
        quantity: 1000,
        unitPrice: 3.50,
        discount: 5,
        total: 3325,
        batchId: "MAN-2024-156"
      },
      {
        id: "QL-002",
        species: "Harakeke",
        potSize: "T28",
        quantity: 500,
        unitPrice: 2.80,
        discount: 0,
        total: 1400,
        batchId: "HAR-2024-142"
      },
      {
        id: "QL-003",
        species: "Freight (Auckland)",
        potSize: "-",
        quantity: 1,
        unitPrice: 150,
        discount: 0,
        total: 150
      }
    ],
    subtotal: 4875,
    tax: 731.25,
    total: 5606.25,
    clientNotes: "Delivery required by mid-October for project timeline.",
    internalNotes: "VIP client - priority service"
  },
  {
    id: "Q-2025-00124",
    quoteNumber: "Q-2025-00124",
    clientId: "CLI-002",
    clientName: "Native Gardens NZ",
    dateCreated: "2025-10-05",
    expiryDate: "2025-10-19",
    status: "converted",
    reserveStock: true,
    convertedToOrder: "O-2025-00124",
    items: [
      {
        id: "QL-004",
        species: "Tōtara",
        potSize: "PB5",
        quantity: 300,
        unitPrice: 4.20,
        discount: 10,
        total: 1134
      },
      {
        id: "QL-005",
        species: "Kōwhai",
        potSize: "2L",
        quantity: 200,
        unitPrice: 5.50,
        discount: 0,
        total: 1100
      }
    ],
    subtotal: 2234,
    tax: 335.10,
    total: 2569.10,
    clientNotes: "Regular customer - repeat order"
  },
  {
    id: "Q-2025-00125",
    quoteNumber: "Q-2025-00125",
    clientId: "CLI-003",
    clientName: "Urban Landscapes",
    dateCreated: "2025-10-01",
    expiryDate: "2025-10-15",
    status: "draft",
    reserveStock: false,
    items: [
      {
        id: "QL-006",
        species: "Pōhutukawa",
        potSize: "3L",
        quantity: 150,
        unitPrice: 8.50,
        discount: 0,
        total: 1275
      }
    ],
    subtotal: 1275,
    tax: 191.25,
    total: 1466.25,
    internalNotes: "Awaiting final pricing confirmation"
  }
];

export const getQuoteById = (id: string): Quote | undefined => {
  return quotes.find(quote => quote.id === id);
};

export const getQuotesByStatus = (status: Quote["status"]): Quote[] => {
  return quotes.filter(quote => quote.status === status);
};
