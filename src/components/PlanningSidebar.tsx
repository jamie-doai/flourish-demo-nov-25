import { Calendar, TrendingUp, MapPin, Users } from "lucide-react";
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

const planningItems = [
  { title: "Production Plans", url: "/managers/planning/production", icon: Calendar },
  { title: "Forecasting", url: "/managers/planning/forecasting", icon: TrendingUp },
  { title: "Capacity", url: "/managers/planning/capacity", icon: MapPin },
  { title: "Resources", url: "/managers/planning/resources", icon: Users },
];

export function PlanningSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-lime-green text-forest-green font-medium border-l-2 border-primary" 
      : "hover:bg-muted/50";

  return (
    <Sidebar className={`${collapsed ? "w-12 sm:w-14" : "w-full"}`} collapsible="none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Planning
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {planningItems.map((item) => (
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
