import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan, Droplets, StickyNote, CheckCircle2, AlertCircle, Package, MapPin, ListTodo } from "lucide-react";
import { WorkerNav } from "@/components/WorkerNav";
import { DevBar } from "@/components/DevBar";

export default function WorkerHome() {
  const notifications = [
    { id: 1, type: "urgent", message: "Mānuka watering overdue - Bay 01", time: "8:00 AM" },
    { id: 2, type: "info", message: "Harakeke ready for dispatch - Pad C", time: "Today" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] pb-20">
      <DevBar />
      {/* Intro Header */}
      <header className="bg-gradient-to-br from-[#3B7A57] to-[#81C784] text-white p-6 pb-8">
        <h1 className="text-2xl font-semibold mb-1">Kia ora, Alex 👋</h1>
        <p className="text-white/90 text-sm">Let's get growing today</p>
      </header>

      <main className="container mx-auto px-4 -mt-4">
        {/* Notifications/Alerts */}
        <div className="mb-6 mt-8">
          <h2 className="text-xl font-semibold text-[#37474F] mb-3">Notifications</h2>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`p-3 border-2 ${
                  notification.type === "urgent" 
                    ? "border-orange-600 bg-orange-50" 
                    : "border-[#3B7A57] bg-white"
                }`}
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className={`w-4 h-4 mt-0.5 ${
                    notification.type === "urgent" ? "text-orange-600" : "text-[#3B7A57]"
                  }`} />
                  <div className="flex-1">
                    <p className="text-base font-medium text-[#37474F]">{notification.message}</p>
                    <p className="text-base text-[#37474F]/60 mt-1">{notification.time}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#37474F] mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            <Link to="/workers/scan">
              <Button 
                variant="outline" 
                className="w-full h-auto flex flex-col items-center gap-2 p-4 bg-white border-[#3B7A57]/20 hover:bg-[#3B7A57]/5"
              >
                <Scan className="w-6 h-6 text-[#3B7A57]" />
                <span className="text-base font-medium text-[#37474F]">Scan</span>
              </Button>
            </Link>

            <Button 
              variant="outline" 
              className="w-full h-auto flex flex-col items-center gap-2 p-4 bg-white border-[#3B7A57]/20 hover:bg-[#3B7A57]/5"
            >
              <Droplets className="w-6 h-6 text-[#3B7A57]" />
              <span className="text-base font-medium text-[#37474F]">Water</span>
            </Button>

            <Button 
              variant="outline" 
              className="w-full h-auto flex flex-col items-center gap-2 p-4 bg-white border-[#3B7A57]/20 hover:bg-[#3B7A57]/5"
            >
              <StickyNote className="w-6 h-6 text-[#3B7A57]" />
              <span className="text-base font-medium text-[#37474F]">Note</span>
            </Button>
          </div>
        </div>

        {/* Square Styled Navigation Links */}
        <div>
          <h2 className="text-xl font-semibold text-[#37474F] mb-3">Navigate</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/workers/tasks">
              <Card className="bg-white border-2 border-[#37474F]/20 shadow-md hover:shadow-lg hover:border-[#37474F]/30 transition-all">
                <div className="aspect-square flex flex-col items-center justify-center p-6">
                  <ListTodo className="w-12 h-12 text-[#3B7A57] mb-4" />
                  <h3 className="text-lg font-semibold text-[#37474F]">Tasks</h3>
                </div>
              </Card>
            </Link>

            <Link to="/workers/locations">
              <Card className="bg-white border-2 border-[#37474F]/20 shadow-md hover:shadow-lg hover:border-[#37474F]/30 transition-all">
                <div className="aspect-square flex flex-col items-center justify-center p-6">
                  <MapPin className="w-12 h-12 text-[#3B7A57] mb-4" />
                  <h3 className="text-lg font-semibold text-[#37474F]">Locations</h3>
                </div>
              </Card>
            </Link>

            <Link to="/workers/inventory">
              <Card className="bg-white border-2 border-[#37474F]/20 shadow-md hover:shadow-lg hover:border-[#37474F]/30 transition-all col-span-2">
                <div className="flex items-center justify-center gap-4 p-6">
                  <Package className="w-12 h-12 text-[#3B7A57]" />
                  <h3 className="text-lg font-semibold text-[#37474F]">Inventory</h3>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </main>

      <WorkerNav />
    </div>
  );
}
