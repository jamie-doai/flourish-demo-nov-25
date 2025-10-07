import { Link, useLocation } from "react-router-dom";
import { Home, CheckSquare, Scan, Package, User } from "lucide-react";

export function WorkerNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { path: "/workers", label: "Home", icon: Home, exact: true },
    { path: "/workers/tasks", label: "Tasks", icon: CheckSquare },
    { path: "/workers/scan", label: "Scan", icon: Scan },
    { path: "/workers/inventory", label: "Inventory", icon: Package },
    { path: "/workers/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#3B7A57]/10 pb-safe shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const active = item.exact 
            ? location.pathname === item.path 
            : isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                active ? "text-[#3B7A57]" : "text-[#37474F]/50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
