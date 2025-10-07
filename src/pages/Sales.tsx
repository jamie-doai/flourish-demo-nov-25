import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Sales() {
  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Sales</h1>
            <p className="text-muted-foreground">Handle quotes, orders, and invoices</p>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            New Order
          </Button>
        </div>
        <div className="text-center py-20 text-muted-foreground">
          <p>Sales management interface coming soon</p>
          <p className="text-sm mt-2">Connect to Supabase to enable full functionality</p>
        </div>
      </main>
    </div>
  );
}
