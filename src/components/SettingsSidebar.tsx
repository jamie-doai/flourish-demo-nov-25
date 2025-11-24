import { Users, MapPin, Sprout, Settings as SettingsIcon, DollarSign, LayoutGrid } from "lucide-react";
import { NavLink } from "react-router-dom";
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
  { title: "Overview", url: "/managers/settings", icon: LayoutGrid },
  { title: "Users", url: "/managers/settings/users", icon: Users },
  { title: "Locations", url: "/managers/settings/locations", icon: MapPin },
  { title: "Species", url: "/managers/settings/species", icon: Sprout },
  { title: "Cost Library", url: "/managers/settings/cost-library", icon: DollarSign },
  { title: "System", url: "/managers/settings/system", icon: SettingsIcon },
];

export function SettingsSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary" 
      : "hover:bg-muted/50";

  return (
    <Sidebar className={`${collapsed ? "w-12 sm:w-14" : "w-full"}`} collapsible="none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-6 w-6" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
