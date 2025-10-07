import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, LayoutDashboard, PackageSearch, CheckSquare, ShoppingCart, BarChart3 } from "lucide-react";

export function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span>Flourish</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Button
              variant={isActive("/dashboard") ? "secondary" : "ghost"}
              asChild
              size="sm"
            >
              <Link to="/dashboard">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            </Button>
            <Button
              variant={isActive("/batches") ? "secondary" : "ghost"}
              asChild
              size="sm"
            >
              <Link to="/batches">
                <PackageSearch className="w-4 h-4" />
                Batches
              </Link>
            </Button>
            <Button
              variant={isActive("/tasks") ? "secondary" : "ghost"}
              asChild
              size="sm"
            >
              <Link to="/tasks">
                <CheckSquare className="w-4 h-4" />
                Tasks
              </Link>
            </Button>
            <Button
              variant={isActive("/sales") ? "secondary" : "ghost"}
              asChild
              size="sm"
            >
              <Link to="/sales">
                <ShoppingCart className="w-4 h-4" />
                Sales
              </Link>
            </Button>
            <Button
              variant={isActive("/planning") ? "secondary" : "ghost"}
              asChild
              size="sm"
            >
              <Link to="/planning">
                <BarChart3 className="w-4 h-4" />
                Planning
              </Link>
            </Button>
          </div>

          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
}
