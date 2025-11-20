import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, CheckSquare, Scan, Package, User, Menu, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorkerBottomNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const gridNavItems = [
    { path: "/workers/tasks", label: "Tasks", icon: CheckSquare },
    { path: "/workers/locations", label: "Locations", icon: MapPin },
    { path: "/workers", label: "Home", icon: Home, exact: true },
    { path: "/workers/scan", label: "Scan", icon: Scan, highlight: true },
  ];

  const fullWidthNavItems = [
    { path: "/workers/profile", label: "Profile", icon: User },
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
        className={`fixed bottom-0 left-0 right-0 z-50 bg-lime-green rounded-t-3xl transition-transform duration-150 max-w-[500px] mx-auto ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4 space-y-2">
          {/* Full width items */}
          {fullWidthNavItems.map((item) => {
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 py-2 px-4 rounded-xl transition-all border-2 border-forest-green bg-forest-green text-lime-green shadow-md hover:shadow-lg ${
                  active
                    ? "bg-forest-green"
                    : "bg-forest-green hover:bg-forest-green/90"
                }`}
              >
                <item.icon className="w-3 h-3 text-lime-green" strokeWidth={2} />
                <span className="text-base font-semibold">{item.label}</span>
              </Link>
            );
          })}

          {/* 2x2 Grid items */}
          <div className="grid grid-cols-2 gap-3">
            {gridNavItems.map((item) => {
              const active = 'exact' in item && item.exact
                ? location.pathname === item.path 
                : isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex flex-col items-center justify-center gap-2 py-2 px-3 rounded-xl transition-all max-h-24 border-2 border-forest-green bg-forest-green text-lime-green shadow-md hover:shadow-lg ${
                    'highlight' in item && item.highlight
                      ? "bg-forest-green hover:bg-forest-green/90"
                      : active
                      ? "bg-forest-green"
                      : "bg-forest-green hover:bg-forest-green/90"
                  }`}
                >
                  <item.icon className="w-3 h-3 text-lime-green" strokeWidth={2} />
                  <span className="text-base font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 py-2 bg-forest-green text-lime-green border-2 border-forest-green hover:bg-forest-green/90 shadow-md hover:shadow-lg text-base font-semibold"
          >
            Close <X className="w-3 h-3 text-lime-green ml-2" />
          </Button>
        </div>
      </div>

      {/* Menu Button - Full width at bottom */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#2C3E35] text-white py-2 rounded-t-3xl shadow-lg flex items-center justify-center gap-4 hover:bg-[#3B4F42] transition-colors max-w-[500px] mx-auto"
        >
          <Menu className="w-10 h-10" />
          <span className="text-2xl font-semibold">Menu</span>
        </button>
      )}
    </>
  );
}
