import { Navigation } from "@/components/Navigation";
import { DevBar } from "@/components/DevBar";
import { SettingsSidebar } from "@/components/SettingsSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Sprout, Settings as SettingsIcon, Moon, Sun, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

export default function ManagerSettings() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <SidebarProvider>
          <div className="flex gap-6">
            <div className="hidden md:block">
              <SettingsSidebar />
            </div>
            <main className="flex-1">
              <div className="mb-4">
                <SidebarTrigger className="md:hidden" />
              </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage users, locations, species catalog, and system preferences</p>
        </div>

        {/* Cost Library Quick Access */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Cost Library</h3>
                  <p className="text-sm text-muted-foreground">Manage cost items and pricing for batches</p>
                </div>
              </div>
              <Link to="/managers/settings/cost-library">
                <Button>
                  Open Cost Library
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users"><Users className="w-4 h-4 mr-2" />Users</TabsTrigger>
            <TabsTrigger value="locations"><MapPin className="w-4 h-4 mr-2" />Locations</TabsTrigger>
            <TabsTrigger value="species"><Sprout className="w-4 h-4 mr-2" />Species</TabsTrigger>
            <TabsTrigger value="system"><SettingsIcon className="w-4 h-4 mr-2" />System</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">User roles and permissions configuration</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations">
            <Card>
              <CardHeader>
                <CardTitle>Location Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Manage bays, houses, and facility settings</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="species">
            <Card>
              <CardHeader>
                <CardTitle>Species Catalog</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Configure plant species and growing requirements</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      <span className="font-medium">Dark Mode</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                  </div>
                  <Switch 
                    checked={isDark} 
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Additional system settings and integrations</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
            </main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
