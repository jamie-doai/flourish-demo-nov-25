import { DevBar } from "@/components/DevBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ManagerSalesQuotes() {
  const navigate = useNavigate();
  const quotes = [
    { id: "Q-2025-012", client: "Green Gardens Ltd", total: "$2,450", status: "Pending", date: "2025-01-22" },
    { id: "Q-2025-011", client: "Urban Landscapes", total: "$3,200", status: "Approved", date: "2025-01-20" },
    { id: "Q-2025-010", client: "Fresh Herbs Co", total: "$1,850", status: "Sent", date: "2025-01-18" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-500/10 text-yellow-500";
      case "Approved": return "bg-green-500/10 text-green-500";
      case "Sent": return "bg-blue-500/10 text-blue-500";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/managers/sales">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sales
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Quotes</h1>
              <p className="text-muted-foreground">Manage and track sales quotes</p>
            </div>
            <Select value="quotes" onValueChange={(value) => navigate(`/managers/sales/${value}`)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quotes">Quotes</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
                <SelectItem value="clients">Clients</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Quote
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search quotes..." className="pl-10" />
          </div>
        </div>

        <div className="space-y-4">
          {quotes.map((quote) => (
            <Card key={quote.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="font-semibold text-lg">{quote.id}</div>
                    <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                  </div>
                  <div className="flex gap-6 mt-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Client: </span>
                      <span className="font-medium">{quote.client}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total: </span>
                      <span className="font-medium text-primary">{quote.total}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date: </span>
                      <span>{quote.date}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
