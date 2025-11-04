import { SearchIndexItem } from '@/data/search';
import { EntityBadge } from './EntityBadge';
import { useNavigate } from 'react-router-dom';

interface SearchResultItemProps {
  item: SearchIndexItem;
  query: string;
  onSelect?: () => void;
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-warning/30 text-foreground font-semibold">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function getNavigationPath(item: SearchIndexItem): string {
  switch (item.type) {
    case 'batch':
      return `/managers/batch/${item.id}`;
    case 'task':
      return `/managers/tasks/${item.id}`;
    case 'location':
      return `/managers/locations/${item.id}`;
    case 'species':
      return `/managers/inventory?species=${encodeURIComponent(item.title)}`;
    case 'person':
      return `/managers/people/${item.id}`;
    default:
      return '/managers';
  }
}

export function SearchResultItem({ item, query, onSelect }: SearchResultItemProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(getNavigationPath(item));
    onSelect?.();
  };
  
  return (
    <button
      onClick={handleClick}
      className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left group"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <EntityBadge type={item.type} />
          <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
            {highlightText(item.title, query)}
          </h4>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {item.description}
        </p>
        {(item.site || item.status) && (
          <div className="flex items-center gap-2 mt-1">
            {item.site && (
              <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                {item.site}
              </span>
            )}
            {item.status && (
              <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                {item.status}
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}
