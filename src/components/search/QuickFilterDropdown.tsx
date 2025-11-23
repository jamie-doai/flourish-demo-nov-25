import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EntityType } from '@/data/search';

interface QuickFilterDropdownProps {
  value: EntityType | 'all';
  onValueChange: (value: EntityType | 'all') => void;
}

const filterOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'task', label: 'Tasks' },
  { value: 'batch', label: 'Batches' },
  { value: 'species', label: 'Species' },
  { value: 'location', label: 'Locations' },
  { value: 'order', label: 'Orders' },
  { value: 'quote', label: 'Quotes' },
  { value: 'invoice', label: 'Invoices' },
  { value: 'client', label: 'Clients' },
  { value: 'person', label: 'People' },
] as const;

export function QuickFilterDropdown({ value, onValueChange }: QuickFilterDropdownProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger 
        className="h-9 w-[160px] text-xs px-2 py-0"
        aria-label="Filter search results by type"
      >
        <SelectValue placeholder="All Types" />
      </SelectTrigger>
      <SelectContent className="z-[60]">
        {filterOptions.map((option) => (
          <SelectItem key={option.value} value={option.value} className="text-xs">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
