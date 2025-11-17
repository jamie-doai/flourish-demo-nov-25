import { SearchIndexItem, EntityType } from '@/data/search';
import { SearchResultItem } from './SearchResultItem';

interface SearchResultGroupProps {
  type: EntityType;
  items: SearchIndexItem[];
  query: string;
  onSelect?: () => void;
}

const typeLabels: Record<EntityType, string> = {
  species: 'Species',
  batch: 'Batches',
  task: 'Tasks',
  location: 'Locations',
  person: 'People',
  order: 'Orders',
  quote: 'Quotes',
  invoice: 'Invoices',
  client: 'Clients',
};

export function SearchResultGroup({ type, items, query, onSelect }: SearchResultGroupProps) {
  if (items.length === 0) return null;
  
  return (
    <div className="space-y-1">
      <div className="px-3 py-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {typeLabels[type]}
        </h3>
      </div>
      {items.map((item) => (
        <SearchResultItem
          key={item.id}
          item={item}
          query={query}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
