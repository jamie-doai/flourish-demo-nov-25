import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Settings, HelpCircle, LogOut, CheckCircle2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ManagerProfile() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ManagerLayout>
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-xl mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">Sarah Johnson</h1>
              <p className="text-primary-foreground/90">Operations Manager</p>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4">This Month</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-semibold text-primary">142</p>
              <p className="text-sm text-muted-foreground mt-1">Tasks Managed</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-primary">38</p>
              <p className="text-sm text-muted-foreground mt-1">Batches Created</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-primary">$45.2K</p>
              <p className="text-sm text-muted-foreground mt-1">Sales Generated</p>
            </div>
          </div>
        </Card>

        {/* Sync Status */}
        <Card className="p-5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <div>
                <p className="font-medium">All synced</p>
                <p className="text-sm text-muted-foreground">Last sync: 1 minute ago</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <div className="space-y-3 mb-6">
          <h3 className="font-semibold px-1">Settings</h3>
          
          <Card className="divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDark ? <Moon className="w-5 h-5 text-muted-foreground" /> : <Sun className="w-5 h-5 text-muted-foreground" />}
                <span className="font-medium">Dark Mode</span>
              </div>
              <Switch 
                checked={isDark} 
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Email Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Push Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <h3 className="font-semibold px-1">Account</h3>
          
          <Card className="divide-y divide-border">
            <Button variant="ghost" className="w-full justify-start p-4 h-auto">
              <Settings className="w-5 h-5 mr-3 text-muted-foreground" />
              <span className="font-medium">Account Settings</span>
            </Button>

            <Button variant="ghost" className="w-full justify-start p-4 h-auto">
              <HelpCircle className="w-5 h-5 mr-3 text-muted-foreground" />
              <span className="font-medium">Help & Support</span>
            </Button>

            <Button variant="ghost" className="w-full justify-start p-4 h-auto text-destructive hover:text-destructive">
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Log Out</span>
            </Button>
          </Card>
        </div>
      </main>
    </ManagerLayout>
  );
}
