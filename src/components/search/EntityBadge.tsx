import { EntityType } from '@/data/search';
import { Badge } from '@/components/ui/badge';
import { FileText, Package, ClipboardCheck, MapPin, User } from 'lucide-react';

interface EntityBadgeProps {
  type: EntityType;
  className?: string;
}

export function EntityBadge({ type, className }: EntityBadgeProps) {
  const config = {
    species: {
      label: 'Species',
      icon: FileText,
      className: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    },
    batch: {
      label: 'Batch',
      icon: Package,
      className: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800',
    },
    task: {
      label: 'Task',
      icon: ClipboardCheck,
      className: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    },
    location: {
      label: 'Location',
      icon: MapPin,
      className: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    },
    person: {
      label: 'Person',
      icon: User,
      className: 'bg-muted text-muted-foreground border-border',
    },
  };
  
  const { label, icon: Icon, className: badgeClass } = config[type];
  
  return (
    <Badge variant="outline" className={`${badgeClass} ${className || ''}`}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
}
