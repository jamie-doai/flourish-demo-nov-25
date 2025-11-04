import { type EntityType, type SearchFilters } from '@/data/search';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

interface SearchFiltersProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

const entityTypes: { value: EntityType; label: string }[] = [
  { value: 'task', label: 'Tasks' },
  { value: 'batch', label: 'Batches' },
  { value: 'species', label: 'Species' },
  { value: 'location', label: 'Locations' },
];

const taskStatuses = ['overdue', 'today', 'upcoming', 'completed'];
const batchStatuses = ['Active', 'Germinating', 'Ready'];

export function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  const toggleType = (type: EntityType) => {
    const current = filters.types || [];
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    onChange({ ...filters, types: updated.length > 0 ? updated : undefined });
  };
  
  const toggleStatus = (status: string) => {
    const current = filters.status || [];
    const updated = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status];
    onChange({ ...filters, status: updated.length > 0 ? updated : undefined });
  };
  
  const clearFilters = () => {
    onChange({});
  };
  
  const hasFilters = (filters.types?.length || 0) > 0 || (filters.status?.length || 0) > 0;
  
  return (
    <div className="w-64 border-r bg-card p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {/* Entity Type Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Type</Label>
        <div className="space-y-2">
          {entityTypes.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${value}`}
                checked={filters.types?.includes(value)}
                onCheckedChange={() => toggleType(value)}
              />
              <label
                htmlFor={`type-${value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Status Filter */}
      {filters.types?.includes('task') && (
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Task Status</Label>
          <div className="space-y-2">
            {taskStatuses.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={filters.status?.includes(status)}
                  onCheckedChange={() => toggleStatus(status)}
                />
                <label
                  htmlFor={`status-${status}`}
                  className="text-sm font-normal cursor-pointer capitalize"
                >
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {filters.types?.includes('batch') && (
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Batch Status</Label>
          <div className="space-y-2">
            {batchStatuses.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={filters.status?.includes(status)}
                  onCheckedChange={() => toggleStatus(status)}
                />
                <label
                  htmlFor={`status-${status}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
