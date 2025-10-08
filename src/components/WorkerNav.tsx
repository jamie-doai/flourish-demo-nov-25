import { Link, useLocation } from "react-router-dom";
import { Home, CheckSquare, Scan, Package, User, Menu, MapPin } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function WorkerNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { path: "/workers", label: "Home", icon: Home, exact: true },
    { path: "/workers/tasks", label: "Tasks", icon: CheckSquare },
    { path: "/workers/scan", label: "Scan", icon: Scan, highlight: true },
    { path: "/workers/locations", label: "Locations", icon: MapPin },
  ];

  const menuItems = [
    { path: "/workers/inventory", label: "Inventory", icon: Package },
    { path: "/workers/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#3B7A57]/10 pb-safe shadow-lg">
      <div className="grid grid-cols-5 h-20">
        {navItems.map((item) => {
          const active = item.exact 
            ? location.pathname === item.path 
            : isActive(item.path);
          
          // Scan button gets special styling - larger, rounder, alternate color scheme
          if (item.highlight) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center gap-1"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[var(--shadow-medium)] transition-all ${
                  active 
                    ? "bg-primary-alt text-white scale-110" 
                    : "bg-primary text-white hover:scale-105"
                }`}>
                  <item.icon className="w-7 h-7" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-semibold text-primary">{item.label}</span>
              </Link>
            );
          }
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                active ? "text-[#3B7A57]" : "text-[#37474F]/50"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
        
        {/* Menu with Inventory and Profile */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center gap-1 text-[#37474F]/50">
              <Menu className="w-6 h-6" />
              <span className="text-xs font-medium">Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              {menuItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      active ? "bg-[#3B7A57]/10 text-[#3B7A57]" : "text-[#37474F]"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
