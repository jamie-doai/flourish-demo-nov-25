import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, CheckSquare, Scan, Package, User, Menu, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorkerBottomNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { path: "/workers", label: "Home", icon: Home, exact: true },
    { path: "/workers/tasks", label: "Tasks", icon: CheckSquare },
    { path: "/workers/locations", label: "Locations", icon: MapPin },
    { path: "/workers/profile", label: "Profile", icon: User },
    { path: "/workers/scan", label: "Scan", icon: Scan, highlight: true },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Bottom Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#2C3E35] rounded-t-3xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-6 pb-8 space-y-3">
          {navItems.map((item) => {
            const active = item.exact 
              ? location.pathname === item.path 
              : isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  item.highlight
                    ? "bg-[#FFB84D] text-[#2C3E35] hover:bg-[#FFA726]"
                    : active
                    ? "bg-muted text-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                <item.icon className="w-7 h-7" strokeWidth={2} />
                <span className="text-xl font-semibold">{item.label}</span>
              </Link>
            );
          })}

          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 bg-[#1C2A21] text-white border-white/20 hover:bg-[#25352A] text-lg"
          >
            Close <X className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Menu Button - Full width at bottom */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#2C3E35] text-white py-6 rounded-t-3xl shadow-lg flex items-center justify-center gap-4 hover:bg-[#3B4F42] transition-colors"
        >
          <Menu className="w-8 h-8" />
          <span className="text-2xl font-semibold">Menu</span>
        </button>
      )}
    </>
  );
}
