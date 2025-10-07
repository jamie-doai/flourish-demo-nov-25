import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan, Droplets, StickyNote, CheckCircle2, AlertCircle, Package } from "lucide-react";
import { WorkerNav } from "@/components/WorkerNav";

export default function WorkerHome() {
  return (
    <div className="min-h-screen bg-[#F8FAF9] pb-20">
      <header className="bg-gradient-to-br from-[#3B7A57] to-[#81C784] text-white p-6 pb-8">
        <h1 className="text-2xl font-semibold mb-1">Kia ora, Alex 👋</h1>
        <p className="text-white/90 text-sm">Let's get growing today</p>
      </header>

      <main className="container mx-auto px-4 -mt-4">
        {/* Task Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 bg-white border-none shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <CheckCircle2 className="w-5 h-5 text-[#3B7A57]" />
              <span className="text-2xl font-semibold text-[#37474F]">5</span>
            </div>
            <p className="text-sm text-[#37474F]/70">Tasks due today</p>
          </Card>

          <Card className="p-4 bg-white border-none shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <span className="text-2xl font-semibold text-[#37474F]">2</span>
            </div>
            <p className="text-sm text-[#37474F]/70">Watering overdue</p>
          </Card>

          <Card className="p-4 bg-white border-none shadow-sm col-span-2">
            <div className="flex items-start justify-between mb-2">
              <Package className="w-5 h-5 text-[#81C784]" />
              <span className="text-2xl font-semibold text-[#37474F]">1</span>
            </div>
            <p className="text-sm text-[#37474F]/70">Batches ready for move</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#37474F] mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            <Link to="/workers/scan">
              <Button 
                variant="outline" 
                className="h-auto flex flex-col items-center gap-2 p-4 bg-white border-[#3B7A57]/20 hover:bg-[#3B7A57]/5"
              >
                <Scan className="w-6 h-6 text-[#3B7A57]" />
                <span className="text-xs font-medium text-[#37474F]">Scan Batch</span>
              </Button>
            </Link>

            <Link to="/workers/quick-action?action=water">
              <Button 
                variant="outline" 
                className="h-auto flex flex-col items-center gap-2 p-4 bg-white border-[#3B7A57]/20 hover:bg-[#3B7A57]/5"
              >
                <Droplets className="w-6 h-6 text-[#3B7A57]" />
                <span className="text-xs font-medium text-[#37474F]">Record Watering</span>
              </Button>
            </Link>

            <Link to="/workers/quick-action?action=note">
              <Button 
                variant="outline" 
                className="h-auto flex flex-col items-center gap-2 p-4 bg-white border-[#3B7A57]/20 hover:bg-[#3B7A57]/5"
              >
                <StickyNote className="w-6 h-6 text-[#3B7A57]" />
                <span className="text-xs font-medium text-[#37474F]">Add Note</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Today's Priority Tasks */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-[#37474F]">Priority Tasks</h2>
            <Link to="/workers/tasks" className="text-sm text-[#3B7A57] font-medium">
              View all →
            </Link>
          </div>

          <div className="space-y-3">
            <Card className="p-4 bg-white border-none shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#37474F]">🌿 Mānuka</span>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                      Overdue
                    </span>
                  </div>
                  <p className="text-sm text-[#37474F]/70 mb-2">Water Bay 01 batches</p>
                  <div className="flex items-center gap-3 text-xs text-[#37474F]/60">
                    <span>📍 Bay 01</span>
                    <span>🕒 Due 8:00 AM</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white border-none shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#37474F]">🌿 Harakeke</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                      Today
                    </span>
                  </div>
                  <p className="text-sm text-[#37474F]/70 mb-2">Move to Bay 05</p>
                  <div className="flex items-center gap-3 text-xs text-[#37474F]/60">
                    <span>📍 Potting Shed</span>
                    <span>🕒 Due 2:00 PM</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <WorkerNav />
    </div>
  );
}
