import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";

export default function ManagerSettings() {
  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage users, locations, species, and integrations</p>
        </div>
        <div className="text-center py-20 text-muted-foreground">
          <p>Settings interface coming soon</p>
        </div>
      </main>
    </div>
  );
}
