import { Users, MapPin, Sprout, Settings as SettingsIcon, DollarSign, LayoutGrid } from "lucide-react";
import { PageSidebar } from "@/components/PageSidebar";

const settingsItems = [
  { title: "Overview", path: "/managers/settings", icon: LayoutGrid },
  { title: "Users", path: "/managers/settings/users", icon: Users },
  { title: "Locations", path: "/managers/settings/locations", icon: MapPin },
  { title: "Species", path: "/managers/settings/species", icon: Sprout },
  { title: "Cost Library", path: "/managers/settings/cost-library", icon: DollarSign },
  { title: "System", path: "/managers/settings/system", icon: SettingsIcon },
];

export function SettingsSidebar() {
  return (
    <PageSidebar
      title="Settings"
      items={settingsItems}
      collapsible="icon"
    />
  );
}
