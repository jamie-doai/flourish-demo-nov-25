import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sprout, LayoutDashboard, Package, ClipboardList, ShoppingCart, Calendar, Settings, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navigation() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { path: "/managers", label: "Dashboard", icon: LayoutDashboard },
    { path: "/managers/inventory", label: "Inventory", icon: Package },
    { path: "/managers/operations", label: "Operations", icon: ClipboardList },
    { path: "/managers/sales", label: "Sales", icon: ShoppingCart },
    { path: "/managers/planning", label: "Planning", icon: Calendar },
    { path: "/managers/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/managers" className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sprout className="w-5 h-5 text-primary-foreground" />
              </div>
              <span>Flourish</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  asChild
                  size="sm"
                >
                  <Link to={item.path}>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-sm pb-safe">
          <div className="grid grid-cols-5 h-16">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            ))}
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
                  <Menu className="w-5 h-5" />
                  <span className="text-xs">Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                        isActive(item.path) ? "bg-secondary text-secondary-foreground" : "text-foreground"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      )}
    </>
  );
}
