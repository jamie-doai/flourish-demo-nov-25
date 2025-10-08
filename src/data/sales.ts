export interface SalesData {
  orders: {
    total: number;
    pending: { count: number; value: number };
    confirmed: { count: number; value: number };
    delivered: { count: number; value: number };
  };
  topSpecies: {
    name: string;
    value: number;
  }[];
  monthlyTotal: number;
  monthlyChange: number;
}

export const salesData: SalesData = {
  orders: {
    total: 28,
    pending: { count: 8, value: 12400 },
    confirmed: { count: 14, value: 33200 },
    delivered: { count: 6, value: 18000 },
  },
  topSpecies: [
    { name: "Harakeke", value: 4200 },
    { name: "Mānuka", value: 3800 },
    { name: "Pittosporum", value: 2600 },
  ],
  monthlyTotal: 45200,
  monthlyChange: 12,
};
