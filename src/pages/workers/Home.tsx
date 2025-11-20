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
    <div className="min-h-screen bg-lime-green">
      <div className="max-w-[500px] mx-auto bg-lime-green min-h-screen pb-20">
        <DevBar />
        
        {/* Flourish Logo and Text */}
        <div className="bg-lime-green p-3 pb-3">
          <div className="flex items-center gap-2 font-display text-heading-4 text-forest-green">
            <Sprout className="w-3 h-3 text-forest-green" />
            <span>Flourish</span>
          </div>
        </div>
        
        {/* Intro Header with Date and Weather */}
        <header className="bg-lime-green p-3 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-heading-2 font-heading font-bold text-forest-green">Kia ora, Alex 👋</h1>
              <p className="text-body-small text-forest-green/70">{dateStr}</p>
            </div>
            <div className="flex items-center gap-2 text-forest-green">
              <Cloud className="w-3 h-3" />
              <span className="text-body-large font-heading font-bold">18°C</span>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-3 py-3 space-y-6 bg-lime-green">
          {/* Notifications */}
          <div>
            <h2 className="text-heading-3 font-heading font-bold text-forest-green mb-3">Notifications</h2>
            <div className="space-y-2">
              {displayedNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`border shadow-none p-3 ${
                    notification.type === "urgent" 
                      ? "border-caution bg-caution/10" 
                      : "border-forest-green bg-white"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className={`w-3 h-3 mt-0.5 ${
                      notification.type === "urgent" ? "text-caution" : "text-forest-green"
                    }`} />
                    <div className="flex-1">
                      <p className="text-body font-heading font-bold text-forest-green">{notification.message}</p>
                      <p className="text-body-small text-muted-foreground mt-0.5">{notification.time}</p>
                    </div>
                  </div>
                </Card>
              ))}
              {notifications.length > 3 && (
                <Button 
                  variant="primary-ghost" 
                  onClick={() => setShowAllNotifications(!showAllNotifications)}
                  className="w-full"
                >
                  {showAllNotifications ? 'Show less' : `Show ${notifications.length - 3} more`}
                  <ChevronRight className={`w-3 h-3 ml-1 transition-transform ${showAllNotifications ? 'rotate-90' : ''}`} />
                </Button>
              )}
            </div>
          </div>

          {/* Continue */}
          <div>
            <h2 className="text-heading-3 font-heading font-bold text-forest-green mb-3">Continue</h2>
            <div className="space-y-2">
              {displayedContinue.map((item) => (
                <Link key={item.id} to={`/workers/tasks/${item.id}`}>
                  <Card className="border border-forest-green hover:border-lime-green hover:bg-lime-green/20 transition-all shadow-none p-3">
                    <div className="flex items-center gap-1.5">
                      <item.icon className="w-3 h-3 text-forest-green flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-body font-heading font-bold text-forest-green">{item.title}</p>
                        <p className="text-body-small text-muted-foreground mt-0.5">{item.subtitle}</p>
                      </div>
                      <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    </div>
                  </Card>
                </Link>
              ))}
              {continueItems.length > 3 && (
                <Button 
                  variant="primary-ghost" 
                  onClick={() => setShowAllContinue(!showAllContinue)}
                  className="w-full"
                >
                  {showAllContinue ? 'Show less' : `Show ${continueItems.length - 3} more`}
                  <ChevronRight className={`w-3 h-3 ml-1 transition-transform ${showAllContinue ? 'rotate-90' : ''}`} />
                </Button>
              )}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h2 className="text-heading-3 font-heading font-bold text-forest-green mb-3">Navigate</h2>
            <div className="grid grid-cols-2 gap-1.5">
              <Link to="/workers/tasks">
                <Card className="border border-forest-green hover:border-lime-green hover:bg-lime-green/20 transition-all flex flex-col items-center justify-center gap-2 max-h-24 shadow-none p-3">
                  <ListTodo className="w-3 h-3 text-forest-green" />
                  <span className="text-body font-heading font-bold text-forest-green">Tasks</span>
                </Card>
              </Link>

              <Link to="/workers/locations">
                <Card className="border border-forest-green hover:border-lime-green hover:bg-lime-green/20 transition-all flex flex-col items-center justify-center gap-2 max-h-24 shadow-none p-3">
                  <MapPin className="w-3 h-3 text-forest-green" />
                  <span className="text-body font-heading font-bold text-forest-green">Locations</span>
                </Card>
              </Link>

              <Link to="/workers/inventory">
                <Card className="border border-forest-green hover:border-lime-green hover:bg-lime-green/20 transition-all flex flex-col items-center justify-center gap-2 max-h-24 shadow-none p-3">
                  <Package className="w-3 h-3 text-forest-green" />
                  <span className="text-body font-heading font-bold text-forest-green">Inventory</span>
                </Card>
              </Link>

              <Link to="/workers/scan">
                <Card className="bg-neon-yellow border border-forest-green hover:bg-[#f9fe9a] transition-all flex flex-col items-center justify-center gap-2 max-h-24 shadow-none p-3">
                  <Scan className="w-3 h-3 text-forest-green" />
                  <span className="text-body font-heading font-bold text-forest-green">Scan</span>
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
