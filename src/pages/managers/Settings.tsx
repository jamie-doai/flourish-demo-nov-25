import { SettingsLayout } from "@/components/layouts/SettingsLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Sprout, Settings as SettingsIcon, DollarSign, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface SettingsCard {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  iconBg: string;
  iconColor: string;
}

const SETTINGS_CARDS: SettingsCard[] = [
    {
      title: "User Management",
      description: "Manage users, roles, and permissions",
      icon: Users,
      path: "/managers/settings/users",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Locations",
      description: "Configure bays, houses, and facility settings",
      icon: MapPin,
      path: "/managers/settings/locations",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "Species Catalog",
      description: "Manage plant species and growing requirements",
      icon: Sprout,
      path: "/managers/settings/species",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      title: "Cost Library",
      description: "Manage cost items and pricing for batches",
      icon: DollarSign,
      path: "/managers/settings/cost-library",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400"
    },
    {
      title: "System Settings",
      description: "Configure system preferences and integrations",
      icon: SettingsIcon,
      path: "/managers/settings/system",
      iconBg: "bg-slate-100 dark:bg-slate-900/30",
      iconColor: "text-slate-600 dark:text-slate-400"
    }
];

export default function ManagerSettings() {
  return (
    <SettingsLayout>
      <PageHeader
        title="Settings"
        description="Manage users, locations, species catalog, and system preferences"
      />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SETTINGS_CARDS.map((setting) => {
            const Icon = setting.icon;
            return (
              <Link key={setting.path} to={setting.path}>
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer group">
                  <CardHeader>
                    <Icon className={`w-3 h-3 ${setting.iconColor} mb-4`} />
                    <CardTitle className="text-xl">{setting.title}</CardTitle>
                    <CardDescription className="text-sm">{setting.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-primary font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Configure →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
    </SettingsLayout>
  );
}
