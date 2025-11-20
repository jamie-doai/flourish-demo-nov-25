import { SettingsLayout } from "@/components/layouts/SettingsLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

export default function ManagerUsersSettings() {
  return (
    <SettingsLayout>
      <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-muted-foreground">Manage users, roles, and permissions</p>
            </div>
          </div>
          <Button variant="hero">
            <Plus className="w-6 h-6 mr-2" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">User management functionality coming soon...</p>
          </CardContent>
        </Card>
    </SettingsLayout>
  );
}
