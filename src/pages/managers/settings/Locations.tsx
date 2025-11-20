import { SettingsLayout } from "@/components/layouts/SettingsLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";

export default function ManagerLocationsSettings() {
  return (
    <SettingsLayout>
      <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
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
    </SettingsLayout>
  );
}
