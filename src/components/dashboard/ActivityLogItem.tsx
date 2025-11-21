import { Badge } from "@/components/ui/badge";

interface ActivityLogUser {
  initials: string;
}

interface ActivityLogItemProps {
  id: string;
  action: string;
  timestamp: string;
  user: ActivityLogUser;
  tags: string[];
}

export function ActivityLogItem({ action, timestamp, user, tags }: ActivityLogItemProps) {
  return (
    <div className="flex items-start gap-1.5 pb-3 border-b border-sage-gray last:border-b-0 last:pb-0">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-semibold text-primary">{user.initials}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-body ${action.length > 50 ? 'truncate' : ''}`}>{action}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-body-small text-muted-foreground">{timestamp}</span>
          <div className="flex gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

