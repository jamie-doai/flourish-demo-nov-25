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
        className={`fixed bottom-0 left-0 right-0 z-50 bg-lime-green rounded-t-3xl transition-transform duration-150 max-w-mobile mx-auto ${
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
                className={`flex items-center gap-4 py-2 px-4 rounded-xl transition-all border-2 border-forest-green bg-transparent text-forest-green shadow-md hover:shadow-lg hover:bg-forest-green hover:text-lime-green ${
                  active
                    ? "bg-forest-green text-lime-green"
                    : ""
                }`}
              >
                <item.icon className={`w-3 h-3 ${active ? "text-lime-green" : "text-forest-green"}`} strokeWidth={2} />
                <span className="text-base font-semibold">{item.label}</span>
              </Link>
            );
          })}

          {/* 2x2 Grid items */}
          <div className="grid grid-cols-2 gap-2">
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

          <div className="!mt-[40px]">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full py-2 bg-lime-green text-forest-green border-2 border-forest-green hover:bg-lime-green/90 shadow-md hover:shadow-lg text-base font-semibold"
            >
              Close <X className="w-3 h-3 text-forest-green ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Button - Full width at bottom */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#2C3E35] text-white py-2 rounded-t-3xl shadow-lg flex items-center justify-center gap-4 hover:bg-[#3B4F42] transition-colors w-full"
        >
          <Menu className="w-[48px] h-[48px]" />
          <span className="text-2xl font-semibold">Menu</span>
        </button>
      )}
    </>
  );
}
