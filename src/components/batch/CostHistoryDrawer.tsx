import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getCostHistoryByBatch } from '@/data/batchCosts';
import { CostHistory, ActionType } from '@/types/cost';
import { formatDateNZ } from '@/lib/utils';
import { 
  ArrowRightLeft, 
  CheckCircle, 
  Edit, 
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface CostHistoryDrawerProps {
  batchId: string;
  isOpen: boolean;
  onClose: () => void;
}

const actionTypeConfig: Record<ActionType, { label: string; icon: any; color: string }> = {
  stage_change: {
    label: 'Stage Change',
    icon: ArrowRightLeft,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  },
  task_completion: {
    label: 'Task Completed',
    icon: CheckCircle,
    color: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800',
  },
  manual: {
    label: 'Manual Adjustment',
    icon: Edit,
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  },
  mortality_adjustment: {
    label: 'Mortality Adjustment',
    icon: AlertTriangle,
    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
  },
};

const stageLabels: Record<string, string> = {
  seed: 'Seed',
  propagation: 'Propagation',
  potting: 'Potting',
  hardening: 'Hardening',
  ready: 'Ready',
  sold: 'Sold',
};

export function CostHistoryDrawer({ batchId, isOpen, onClose }: CostHistoryDrawerProps) {
  const history = getCostHistoryByBatch(batchId);
  
  const totalCost = history.reduce((sum, h) => sum + h.amount, 0);
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Cost History</SheetTitle>
          <SheetDescription>
            Complete timeline of cost applications for this batch
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Entries</p>
              <p className="text-2xl font-bold">{history.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Cost</p>
              <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
            </div>
          </div>
          
          <Separator />
          
          {/* Timeline */}
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-4 pr-4">
              {history.map((entry, index) => (
                <CostHistoryEntry key={entry.id} entry={entry} isLatest={index === 0} />
              ))}
              
              {history.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No cost history available</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function CostHistoryEntry({ entry, isLatest }: { entry: CostHistory; isLatest: boolean }) {
  const config = actionTypeConfig[entry.actionType];
  const Icon = config.icon;
  
  return (
    <div className={`relative pl-6 pb-4 ${!isLatest ? 'border-l-2 border-muted' : ''}`}>
      {/* Timeline dot */}
      <div className={`absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full ${
        isLatest ? 'bg-primary ring-4 ring-primary/20' : 'bg-muted-foreground'
      }`} />
      
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={config.color}>
                <Icon className="w-3 h-3 mr-1" />
                {config.label}
              </Badge>
              <Badge variant="secondary">{stageLabels[entry.stage] || entry.stage}</Badge>
            </div>
            <h4 className="font-medium">{entry.costName}</h4>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">${entry.amount.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">
              ${entry.perUnitCost.toFixed(3)}/unit
            </p>
          </div>
        </div>
        
        {/* Details */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <TrendingUp className="w-3 h-3" />
            <span>{entry.quantity} plants</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{formatDateNZ(entry.appliedAt)}</span>
          </div>
        </div>
        
        {/* Reason/Notes */}
        {entry.reason && (
          <p className="text-sm text-muted-foreground italic bg-muted p-2 rounded">
            {entry.reason}
          </p>
        )}
        
        {/* Applied by */}
        <p className="text-xs text-muted-foreground">
          Applied by: {entry.appliedBy === 'SYSTEM' ? 'System (Automatic)' : entry.appliedBy}
        </p>
      </div>
    </div>
  );
}
