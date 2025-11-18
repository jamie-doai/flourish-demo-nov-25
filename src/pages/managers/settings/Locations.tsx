import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Plus } from "lucide-react";

export default function ManagerLocationsSettings() {
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
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Location Configuration</h1>
              <p className="text-muted-foreground">Manage bays, houses, and facility settings</p>
            </div>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4 mr-2" />
            Add Location
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Location management functionality coming soon...</p>
          </CardContent>
        </Card>
      </main>
    </ManagerLayout>
  );
}
