import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Sprout, Package, ClipboardList, ShoppingCart, Calendar, Settings, Menu, Scan, X, UserCircle, ChevronDown } from "lucide-react";
import { useIsMobile, useIsTablet, useIsDesktop } from "@/hooks/use-responsive";
import { ExpandingSearch } from "@/components/search/ExpandingSearch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function Navigation() {
  const location = useLocation();
  const [searchExpanded, setSearchExpanded] = useState(false);
  
  // Use CSS media query hooks for breakpoint detection
  const isMobileSize = useIsMobile();
  const isTabletSize = useIsTablet();
  const isDesktopSize = useIsDesktop();
  
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { path: "/managers/inventory", label: "Inventory", icon: Package },
    { path: "/managers/operations", label: "Operations", icon: ClipboardList },
    { path: "/managers/sales", label: "Sales", icon: ShoppingCart },
    { path: "/managers/planning", label: "Planning", icon: Calendar },
  ];

  return (
    <>
      <nav className="border-b bg-forest-green relative">
        <div className="container mx-auto px-12 max-w-[1920px]">
          <div className="flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4">
            <Link 
              to="/managers" 
              className="flex items-center gap-2 font-display text-heading-4 text-white transition-all hover:bg-lime-green/20 rounded-lg px-2 py-1"
            >
              <Sprout className="w-3 h-3 text-white" />
              <span>Flourish</span>
            </Link>

            {/* Desktop: Show nav items inline with progressive spacing */}
            {isDesktopSize && (
              <div className="flex items-center gap-2 lg:gap-1 xl:gap-0.5 flex-1 justify-center transition-all">
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
            )}
            
            {/* Tablet: Show search and hamburger menu */}
            {isTabletSize && (
              <div className="flex items-center flex-1 justify-center gap-2 transition-all">
                <ExpandingSearch 
                  isExpanded={searchExpanded}
                  onExpandChange={setSearchExpanded}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="primary-ghost"
                      size="sm"
                      className="text-white hover:bg-lime-green/20"
                    >
                      <Menu className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {navItems.map((item) => (
                      <DropdownMenuItem 
                        key={item.path} 
                        asChild
                        className={isActive(item.path) ? "bg-lime-green/20" : ""}
                      >
                        <Link
                          to={item.path}
                          className="cursor-pointer flex items-center gap-2 w-full"
                        >
                          <item.icon className="w-3 h-3" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            <div className="flex items-center gap-2 transition-all">
              {searchExpanded && (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-forest-green shadow-xl z-40 flex items-center px-12">
                  <div className="container mx-auto max-w-[1920px] flex justify-end">
                    <ExpandingSearch 
                      isExpanded={searchExpanded}
                      onExpandChange={setSearchExpanded}
                    />
                  </div>
                </div>
              )}
              {!searchExpanded && (
                <>
                  {/* Desktop: Show search on right */}
                  {isDesktopSize && (
                    <ExpandingSearch 
                      isExpanded={searchExpanded}
                      onExpandChange={setSearchExpanded}
                    />
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="primary-ghost" 
                        size="sm" 
                        className={`${isDesktopSize ? 'flex' : 'hidden'} transition-all text-white hover:bg-lime-green/20`}
                      >
                        Account
                        <ChevronDown className="w-3 h-3" />
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
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isMobileSize && (
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
