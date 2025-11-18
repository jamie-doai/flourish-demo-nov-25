import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Sprout, Plus } from "lucide-react";

export default function ManagerSpeciesSettings() {
  return (
    <ManagerLayout>
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          asChild
          className="mb-4"
        >
          <Link to="/managers/settings">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Settings
          </Link>
        </Button>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Sprout className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Species Catalog</h1>
              <p className="text-muted-foreground">Configure plant species and growing requirements</p>
            </div>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4 mr-2" />
            Add Species
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Species</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Species catalog functionality coming soon...</p>
          </CardContent>
        </Card>
      </main>
    </ManagerLayout>
  );
}
