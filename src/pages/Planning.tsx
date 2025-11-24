import { Navigation } from "@/components/Navigation";

export default function Planning() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Planning & Analytics</h1>
          <p className="text-muted-foreground">Track yield, success rates, and forecasting</p>
        </div>
        <div className="text-center py-20 text-muted-foreground">
          <p>Planning and analytics interface coming soon</p>
          <p className="text-sm mt-2">Connect to Supabase to enable full functionality</p>
        </div>
      </main>
    </div>
  );
}
