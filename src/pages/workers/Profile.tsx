import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { WorkerBottomNav } from "@/components/WorkerBottomNav";
import { DevBar } from "@/components/DevBar";
import { User, Bell, Settings, HelpCircle, LogOut, CheckCircle2, WifiOff, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function WorkerProfile() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen bg-slate-800">
      <div className={`max-w-[500px] mx-auto min-h-screen pb-20 ${isDark ? 'bg-slate-900' : 'bg-[#F8FAF9]'}`}>
        <DevBar />
      <header className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 pb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Alex Thompson</h1>
            <p className="text-primary-foreground/90 text-sm">Propagation Team</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 -mt-6">
        {/* Stats Card */}
        <Card className="p-5 mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">This Week</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-semibold text-primary">24</p>
              <p className="text-xs text-muted-foreground mt-1">Tasks Done</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-primary">15</p>
              <p className="text-xs text-muted-foreground mt-1">Batches Moved</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-primary">89</p>
              <p className="text-xs text-muted-foreground mt-1">Updates Logged</p>
            </div>
          </div>
        </Card>

        {/* Sync Status */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm font-medium text-foreground">All synced</p>
                <p className="text-xs text-muted-foreground">Last sync: 2 minutes ago</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-semibold text-foreground px-1">Settings</h3>
          
          <Card className="divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDark ? <Moon className="w-6 h-6 text-muted-foreground" /> : <Sun className="w-6 h-6 text-muted-foreground" />}
                <span className="text-sm text-foreground">Dark Mode</span>
              </div>
              <Switch 
                checked={isDark} 
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm text-foreground">Push Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <WifiOff className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm text-foreground">Offline Mode</span>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          <Card className="divide-y divide-border">
            <Link to="/workers/settings" className="p-4 flex items-center gap-3 hover:bg-accent transition-colors">
              <Settings className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm text-foreground">Account Settings</span>
            </Link>

            <Link to="/workers/help" className="p-4 flex items-center gap-3 hover:bg-accent transition-colors">
              <HelpCircle className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm text-foreground">Help & Support</span>
            </Link>
          </Card>
        </div>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-6 h-6 mr-2" />
          Sign Out
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Flourish Worker App v1.0.0
        </p>
      </main>

      <WorkerBottomNav />
      </div>
    </div>
  );
}
