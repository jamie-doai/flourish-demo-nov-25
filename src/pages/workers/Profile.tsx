import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { WorkerNav } from "@/components/WorkerNav";
import { DevBar } from "@/components/DevBar";
import { User, Bell, Settings, HelpCircle, LogOut, CheckCircle2, WifiOff } from "lucide-react";

export default function WorkerProfile() {
  return (
    <div className="min-h-screen bg-[#F8FAF9] pb-20">
      <DevBar />
      <header className="bg-gradient-to-br from-[#3B7A57] to-[#81C784] text-white p-6 pb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Alex Thompson</h1>
            <p className="text-white/90 text-sm">Propagation Team</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 -mt-6">
        {/* Stats Card */}
        <Card className="p-5 bg-white border-2 border-[#37474F]/20 shadow-sm mb-6">
          <h3 className="text-sm font-semibold text-[#37474F] mb-3">This Week</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-semibold text-[#3B7A57]">24</p>
              <p className="text-xs text-[#37474F]/60 mt-1">Tasks Done</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-[#3B7A57]">15</p>
              <p className="text-xs text-[#37474F]/60 mt-1">Batches Moved</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-[#3B7A57]">89</p>
              <p className="text-xs text-[#37474F]/60 mt-1">Updates Logged</p>
            </div>
          </div>
        </Card>

        {/* Sync Status */}
        <Card className="p-4 bg-white border-2 border-[#37474F]/20 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-[#37474F]">All synced</p>
                <p className="text-xs text-[#37474F]/60">Last sync: 2 minutes ago</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-semibold text-[#37474F] px-1">Settings</h3>
          
          <Card className="bg-white border-2 border-[#37474F]/20 shadow-sm divide-y divide-[#3B7A57]/5">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#37474F]/60" />
                <span className="text-sm text-[#37474F]">Push Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <WifiOff className="w-5 h-5 text-[#37474F]/60" />
                <span className="text-sm text-[#37474F]">Offline Mode</span>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          <Card className="bg-white border-2 border-[#37474F]/20 shadow-sm divide-y divide-[#3B7A57]/5">
            <Link to="/workers/settings" className="p-4 flex items-center gap-3 hover:bg-[#3B7A57]/5 transition-colors">
              <Settings className="w-5 h-5 text-[#37474F]/60" />
              <span className="text-sm text-[#37474F]">Account Settings</span>
            </Link>

            <Link to="/workers/help" className="p-4 flex items-center gap-3 hover:bg-[#3B7A57]/5 transition-colors">
              <HelpCircle className="w-5 h-5 text-[#37474F]/60" />
              <span className="text-sm text-[#37474F]">Help & Support</span>
            </Link>
          </Card>
        </div>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>

        <p className="text-center text-xs text-[#37474F]/40 mt-6">
          Flourish Worker App v1.0.0
        </p>
      </main>

      <WorkerNav />
    </div>
  );
}
