import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Sprout, Package, ClipboardList, ShoppingCart, Calendar, Settings, Menu, Scan, X, Plus, UserCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ExpandingSearch } from "@/components/search/ExpandingSearch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function Navigation() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [searchExpanded, setSearchExpanded] = useState(false);
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { path: "/managers/inventory", label: "Inventory", icon: Package },
    { path: "/managers/operations", label: "Operations", icon: ClipboardList },
    { path: "/managers/sales", label: "Sales", icon: ShoppingCart },
    { path: "/managers/planning", label: "Planning", icon: Calendar },
  ];

  return (
    <>
      <nav className="border-b bg-forest-green">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4">
            <Link 
              to="/managers" 
              className={`flex items-center gap-2 font-display text-heading-4 text-white transition-all ${
                searchExpanded ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
              }`}
            >
              <Sprout className="w-3 h-3 text-white" />
              <span>Flourish</span>
            </Link>

            <div 
              className={`hidden md:flex items-center gap-0.5 flex-1 justify-center transition-all ${
                searchExpanded ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
              }`}
            >
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="primary-ghost"
                  asChild
                  size="sm"
                  className={`text-white ${isActive(item.path) ? "bg-lime-green/20" : "hover:bg-lime-green/20"}`}
                >
                  <Link to={item.path}>
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
            
            <div className={`flex items-center gap-2 transition-all ${searchExpanded ? 'flex-1' : ''}`}>
              <ExpandingSearch 
                isExpanded={searchExpanded}
                onExpandChange={setSearchExpanded}
              />
              
              <Button 
                variant="primary-ghost" 
                size="sm" 
                asChild 
                className={`hidden lg:flex transition-all shadow-none bg-lime-green text-forest-green hover:bg-lime-green/90 border-0 ${
                  searchExpanded ? 'opacity-0 w-0 overflow-hidden p-0' : 'opacity-100'
                }`}
              >
                <Link to="/managers/batches/add">
                  <Plus className="w-3 h-3" />
                  Add Batch
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`hidden md:flex transition-all text-white hover:bg-lime-green/20 ${
                      searchExpanded ? 'opacity-0 w-0 overflow-hidden p-0' : 'opacity-100'
                    }`}
                  >
                    <Avatar className="h-8 w-8 border-2 border-white">
                      <AvatarFallback className="bg-white text-forest-green text-xs font-bold">SJ</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/managers/profile" className="cursor-pointer">
                      <UserCircle className="w-3 h-3 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/managers/settings" className="cursor-pointer">
                      <Settings className="w-3 h-3 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-forest-green pb-safe">
          <div className="grid grid-cols-5 h-16">
            {/* Dashboard, Inventory, Operations - always visible */}
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive(item.path) ? "text-white bg-lime-green/20" : "text-white/80 hover:text-white hover:bg-lime-green/20"
                }`}
              >
                <item.icon className="w-3 h-3" />
                <span className="text-xs">{item.label}</span>
              </Link>
            ))}
            
            {/* Scan button - prominent */}
            <Link
              to="/managers/scan"
              className="flex flex-col items-center justify-center gap-1 text-white"
            >
              <Scan className="w-3 h-3" />
              <span className="text-xs">Scan</span>
            </Link>
            
            {/* Menu with Sales, Planning, Settings */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex flex-col items-center justify-center gap-1 text-white/80 hover:text-white">
                  <Menu className="w-3 h-3" />
                  <span className="text-xs">Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col">
                <div className="flex flex-col gap-4 mt-8 flex-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.path) ? "bg-lime-green/20 text-forest-green" : "text-foreground hover:bg-lime-green/20"
                      }`}
                    >
                      <item.icon className="w-3 h-3" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="pb-4">
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full">
                      <X className="w-3 h-3 mr-2" />
                      Close Menu
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      )}
    </>
  );
}
