import { Users, MapPin, Sprout, Settings as SettingsIcon, DollarSign, LayoutGrid } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const settingsItems = [
  { title: "Overview", path: "/managers/settings", icon: LayoutGrid },
  { title: "Users", path: "/managers/settings/users", icon: Users },
  { title: "Locations", path: "/managers/settings/locations", icon: MapPin },
  { title: "Species", path: "/managers/settings/species", icon: Sprout },
  { title: "Cost Library", path: "/managers/settings/cost-library", icon: DollarSign },
  { title: "System", path: "/managers/settings/system", icon: SettingsIcon },
];

export function SettingsSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-60"}`} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.path} className="hover:bg-muted/50">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
