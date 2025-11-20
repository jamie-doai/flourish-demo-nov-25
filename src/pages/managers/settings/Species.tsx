import { SettingsLayout } from "@/components/layouts/SettingsLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, Plus } from "lucide-react";

export default function ManagerSpeciesSettings() {
  return (
    <SettingsLayout>
      <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Sprout className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
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
    </SettingsLayout>
  );
}
