export interface InvoiceLineItem {
  id: string;
  species: string;
  potSize: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  method: "bank-transfer" | "credit-card" | "cash" | "cheque";
  reference?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  linkedOrder?: string;
  clientId: string;
  clientName: string;
  dateIssued: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue" | "partial";
  items: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  payments: Payment[];
  balanceDue: number;
  xeroSync: boolean;
  taxType: "GST (15%)";
  paymentTerms?: string;
  notes?: string;
}

export const invoices: Invoice[] = [
  {
    id: "I-2025-00124",
    invoiceNumber: "I-2025-00124",
    linkedOrder: "O-2025-00124",
    clientId: "CLI-002",
    clientName: "Native Gardens NZ",
    dateIssued: "2025-10-11",
    dueDate: "2025-10-25",
    status: "partial",
    taxType: "GST (15%)",
    paymentTerms: "Net 14 days",
    items: [
      {
        id: "IL-001",
        species: "Tōtara",
        potSize: "PB5",
        quantity: 300,
        unitPrice: 4.20,
        total: 1134
      },
      {
        id: "IL-002",
        species: "Kōwhai",
        potSize: "2L",
        quantity: 200,
        unitPrice: 5.50,
        total: 1100
      }
    ],
    subtotal: 2234,
    tax: 335.10,
    total: 2569.10,
    payments: [
      {
        id: "PAY-001",
        date: "2025-10-12",
        amount: 1500,
        method: "bank-transfer",
        reference: "INV-124-PART1"
      }
    ],
    balanceDue: 1069.10,
    xeroSync: true
  },
  {
    id: "I-2025-00125",
    invoiceNumber: "I-2025-00125",
    linkedOrder: "O-2025-00125",
    clientId: "CLI-001",
    clientName: "GreenScape Landscapes Ltd",
    dateIssued: "2025-10-09",
    dueDate: "2025-10-23",
    status: "sent",
    taxType: "GST (15%)",
    paymentTerms: "Net 14 days",
    items: [
      {
        id: "IL-003",
        species: "Mānuka",
        potSize: "1L",
        quantity: 1000,
        unitPrice: 3.50,
        total: 3325
      },
      {
        id: "IL-004",
        species: "Harakeke",
        potSize: "T28",
        quantity: 500,
        unitPrice: 2.80,
        total: 1400
      },
      {
        id: "IL-005",
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
    payments: [],
    balanceDue: 5606.25,
    xeroSync: false,
    notes: "VIP Client - priority account"
  },
  {
    id: "I-2025-00122",
    invoiceNumber: "I-2025-00122",
    clientId: "CLI-005",
    clientName: "Green Gardens Ltd",
    dateIssued: "2025-09-28",
    dueDate: "2025-10-12",
    status: "paid",
    taxType: "GST (15%)",
    paymentTerms: "Net 14 days",
    items: [
      {
        id: "IL-006",
        species: "Pōhutukawa",
        potSize: "3L",
        quantity: 100,
        unitPrice: 8.50,
        total: 850
      }
    ],
    subtotal: 850,
    tax: 127.50,
    total: 977.50,
    payments: [
      {
        id: "PAY-002",
        date: "2025-10-05",
        amount: 977.50,
        method: "bank-transfer",
        reference: "PAID-FULL"
      }
    ],
    balanceDue: 0,
    xeroSync: true
  },
  {
    id: "I-2025-00120",
    invoiceNumber: "I-2025-00120",
    clientId: "CLI-006",
    clientName: "Coastal Greenery",
    dateIssued: "2025-09-20",
    dueDate: "2025-10-04",
    status: "overdue",
    taxType: "GST (15%)",
    paymentTerms: "Net 14 days",
    items: [
      {
        id: "IL-007",
        species: "Ngaio",
        potSize: "PB5",
        quantity: 250,
        unitPrice: 3.80,
        total: 950
      }
    ],
    subtotal: 950,
    tax: 142.50,
    total: 1092.50,
    payments: [],
    balanceDue: 1092.50,
    xeroSync: true,
    notes: "Payment overdue - follow up required"
  }
];

export const getInvoiceById = (id: string): Invoice | undefined => {
  return invoices.find(invoice => invoice.id === id);
};

export const getInvoicesByStatus = (status: Invoice["status"]): Invoice[] => {
  return invoices.filter(invoice => invoice.status === status);
};
