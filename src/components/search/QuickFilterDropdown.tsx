import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EntityType } from '@/data/search';
import { Filter } from 'lucide-react';

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
        className="h-8 w-[140px] text-xs"
        aria-label="Filter search results by type"
      >
        <Filter className="w-3 h-3 mr-1" />
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
