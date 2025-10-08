export interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  status: "active" | "inactive";
  totalOrders: number;
  totalRevenue: number;
  dateAdded: string;
  notes?: string;
}

export const clients: Client[] = [
  {
    id: "CLI-001",
    name: "GreenScape Landscapes Ltd",
    contactPerson: "Sarah Mitchell",
    email: "sarah@greenscape.co.nz",
    phone: "09 555 1234",
    address: "123 Beach Road",
    city: "Auckland",
    postalCode: "1010",
    status: "active",
    totalOrders: 12,
    totalRevenue: 45230.50,
    dateAdded: "2024-01-15",
    notes: "VIP client - priority service"
  },
  {
    id: "CLI-002",
    name: "Native Gardens NZ",
    contactPerson: "James Tawhiri",
    email: "james@nativegardens.nz",
    phone: "04 555 5678",
    address: "45 Fernhill Road",
    city: "Wellington",
    postalCode: "6012",
    status: "active",
    totalOrders: 8,
    totalRevenue: 28450.00,
    dateAdded: "2024-03-20"
  },
  {
    id: "CLI-003",
    name: "Urban Landscapes",
    contactPerson: "Emma Chen",
    email: "emma@urbanlandscapes.co.nz",
    phone: "03 555 9012",
    address: "67 Garden Place",
    city: "Christchurch",
    postalCode: "8011",
    status: "active",
    totalOrders: 15,
    totalRevenue: 62100.25,
    dateAdded: "2023-11-10"
  },
  {
    id: "CLI-004",
    name: "Eco Plantings Ltd",
    contactPerson: "Michael Brown",
    email: "michael@ecoplantings.co.nz",
    phone: "07 555 3456",
    address: "89 Eco Lane",
    city: "Hamilton",
    postalCode: "3204",
    status: "active",
    totalOrders: 5,
    totalRevenue: 18900.00,
    dateAdded: "2024-06-01"
  },
  {
    id: "CLI-005",
    name: "Green Gardens Ltd",
    contactPerson: "Lisa Anderson",
    email: "lisa@greengardens.co.nz",
    phone: "09 555 7890",
    address: "34 Park Avenue",
    city: "Auckland",
    postalCode: "1023",
    status: "active",
    totalOrders: 20,
    totalRevenue: 78550.75,
    dateAdded: "2023-08-15"
  },
  {
    id: "CLI-006",
    name: "Coastal Greenery",
    contactPerson: "David Wilson",
    email: "david@coastalgreenery.co.nz",
    phone: "06 555 2345",
    address: "12 Seaside Drive",
    city: "Napier",
    postalCode: "4110",
    status: "active",
    totalOrders: 6,
    totalRevenue: 22340.00,
    dateAdded: "2024-04-12"
  }
];

export const getClientById = (id: string): Client | undefined => {
  return clients.find(client => client.id === id);
};

export const getActiveClients = (): Client[] => {
  return clients.filter(client => client.status === "active");
};
