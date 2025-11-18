import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan, StickyNote, AlertCircle, Package, MapPin, ListTodo, Sprout, Cloud, ChevronRight } from "lucide-react";
import { WorkerBottomNav } from "@/components/WorkerBottomNav";
import { DevBar } from "@/components/DevBar";
import { useState } from "react";

export default function WorkerHome() {
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showAllContinue, setShowAllContinue] = useState(false);

  const notifications = [
    { id: 1, type: "urgent", message: "Mānuka watering overdue - Bay 01", time: "8:00 AM" },
    { id: 2, type: "info", message: "Harakeke ready for dispatch - Pad C", time: "Today" },
    { id: 3, type: "info", message: "New batch ready for potting - Propagation House 1", time: "Yesterday" },
    { id: 4, type: "urgent", message: "Temperature alert in Bay 03", time: "2 hours ago" },
  ];

  const continueItems = [
    { id: 1, title: "Complete watering task", subtitle: "Bay 01 - Mānuka batch", icon: Package },
    { id: 2, title: "Review Harakeke batch", subtitle: "Pad C - Ready for dispatch", icon: ListTodo },
    { id: 3, title: "Update notes for Tōtara", subtitle: "Shadehouse A", icon: StickyNote },
    { id: 4, title: "Check propagation progress", subtitle: "Propagation House 2", icon: Sprout },
  ];

  const displayedNotifications = showAllNotifications ? notifications : notifications.slice(0, 3);
  const displayedContinue = showAllContinue ? continueItems : continueItems.slice(0, 3);

  // Get current date info
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-NZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="max-w-[500px] mx-auto bg-[#F8FAF9] min-h-screen pb-20">
        <DevBar />
        
        {/* Intro Header with Date and Weather */}
        <header className="bg-white p-6 pb-6 border-b border-[#37474F]/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Sprout className="w-8 h-8 text-[#3B7A57]" />
              <div>
                <h1 className="text-2xl font-semibold text-[#37474F]">Kia ora, Alex 👋</h1>
                <p className="text-sm text-[#37474F]/60">{dateStr}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#37474F]">
              <Cloud className="w-5 h-5" />
              <span className="text-lg font-medium">18°C</span>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Notifications */}
          <div>
            <h2 className="text-xl font-semibold text-[#37474F] mb-3">Notifications</h2>
            <div className="space-y-2">
              {displayedNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`p-3 border-2 ${
                    notification.type === "urgent" 
                      ? "border-orange-600 bg-orange-50" 
                      : "border-[#3B7A57]/20 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className={`w-4 h-4 mt-0.5 ${
                      notification.type === "urgent" ? "text-orange-600" : "text-[#3B7A57]"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#37474F]">{notification.message}</p>
                      <p className="text-xs text-[#37474F]/60 mt-0.5">{notification.time}</p>
                    </div>
                  </div>
                </Card>
              ))}
              {notifications.length > 3 && (
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAllNotifications(!showAllNotifications)}
                  className="w-full text-[#3B7A57] hover:text-[#3B7A57] hover:bg-[#3B7A57]/5"
                >
                  {showAllNotifications ? 'Show less' : `Show ${notifications.length - 3} more`}
                  <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${showAllNotifications ? 'rotate-90' : ''}`} />
                </Button>
              )}
            </div>
          </div>

          {/* Continue */}
          <div>
            <h2 className="text-xl font-semibold text-[#37474F] mb-3">Continue</h2>
            <div className="space-y-2">
              {displayedContinue.map((item) => (
                <Link key={item.id} to={`/workers/tasks/${item.id}`}>
                  <Card className="p-3 bg-white border-2 border-[#37474F]/20 hover:border-[#3B7A57]/30 hover:bg-[#3B7A57]/5 transition-all">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-[#3B7A57] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#37474F]">{item.title}</p>
                        <p className="text-xs text-[#37474F]/60 mt-0.5">{item.subtitle}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#37474F]/40 flex-shrink-0" />
                    </div>
                  </Card>
                </Link>
              ))}
              {continueItems.length > 3 && (
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAllContinue(!showAllContinue)}
                  className="w-full text-[#3B7A57] hover:text-[#3B7A57] hover:bg-[#3B7A57]/5"
                >
                  {showAllContinue ? 'Show less' : `Show ${continueItems.length - 3} more`}
                  <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${showAllContinue ? 'rotate-90' : ''}`} />
                </Button>
              )}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h2 className="text-xl font-semibold text-[#37474F] mb-3">Navigate</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/workers/tasks">
                <Card className="p-3 bg-white border-2 border-[#37474F]/20 hover:border-[#3B7A57]/30 hover:bg-[#3B7A57]/5 transition-all flex flex-col items-center justify-center gap-2 max-h-24">
                  <ListTodo className="w-6 h-6 text-[#3B7A57]" />
                  <span className="text-base font-medium text-[#37474F]">Tasks</span>
                </Card>
              </Link>

              <Link to="/workers/locations">
                <Card className="p-3 bg-white border-2 border-[#37474F]/20 hover:border-[#3B7A57]/30 hover:bg-[#3B7A57]/5 transition-all flex flex-col items-center justify-center gap-2 max-h-24">
                  <MapPin className="w-6 h-6 text-[#3B7A57]" />
                  <span className="text-base font-medium text-[#37474F]">Locations</span>
                </Card>
              </Link>

              <Link to="/workers/inventory">
                <Card className="p-3 bg-white border-2 border-[#37474F]/20 hover:border-[#3B7A57]/30 hover:bg-[#3B7A57]/5 transition-all flex flex-col items-center justify-center gap-2 max-h-24">
                  <Package className="w-6 h-6 text-[#3B7A57]" />
                  <span className="text-base font-medium text-[#37474F]">Inventory</span>
                </Card>
              </Link>

              <Link to="/workers/scan">
                <Card className="p-3 bg-[#FFB84D] border-2 border-[#FFB84D] hover:bg-[#FFA726] transition-all flex flex-col items-center justify-center gap-2 max-h-24">
                  <Scan className="w-6 h-6 text-[#2C3E35]" />
                  <span className="text-base font-medium text-[#2C3E35]">Scan</span>
                </Card>
              </Link>
            </div>
          </div>
        </main>

        <WorkerBottomNav />
      </div>
    </div>
  );
}
