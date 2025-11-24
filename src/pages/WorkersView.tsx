import { Navigation } from "@/components/Navigation";

export default function WorkersView() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Workers View</h1>
          <p className="text-muted-foreground">Task-focused interface for greenhouse workers</p>
        </div>
        <div className="text-center py-20 text-muted-foreground">
          <p>Worker interface coming soon</p>
        </div>
      </main>
    </div>
  );
}
