import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Eye, Plus } from 'lucide-react';
import { getBatchCostSummary } from '@/data/batchCosts';

interface CostBreakdownCardProps {
  batchId: string;
  onViewHistory: () => void;
  onAddCost: () => void;
}

const categoryLabels: Record<string, string> = {
  seed: 'Seeds & Seedlings',
  soil: 'Growing Media',
  pot: 'Containers',
  tray: 'Trays',
  labour: 'Labour',
  spray: 'Spraying',
  maintenance: 'Maintenance',
  freight: 'Freight',
  overhead: 'Overhead',
};

const categoryColors: Record<string, string> = {
  seed: 'bg-purple-500',
  soil: 'bg-amber-500',
  pot: 'bg-green-500',
  tray: 'bg-blue-500',
  labour: 'bg-orange-500',
  spray: 'bg-pink-500',
  maintenance: 'bg-cyan-500',
  freight: 'bg-indigo-500',
  overhead: 'bg-slate-500',
};

export function CostBreakdownCard({ batchId, onViewHistory, onAddCost }: CostBreakdownCardProps) {
  const costSummary = getBatchCostSummary(batchId);
  
  if (!costSummary) {
    return null;
  }
  
  const sortedCategories = Object.entries(costSummary.costByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5); // Top 5 categories
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Cost of Production
            </CardTitle>
            <CardDescription>
              Cumulative costs through lifecycle stages
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onAddCost}>
              <Plus className="w-4 h-4 mr-2" />
              Add Cost
            </Button>
            <Button variant="outline" size="sm" onClick={onViewHistory}>
              <Eye className="w-4 h-4 mr-2" />
              View History
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Cost Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Cost</p>
            <p className="text-3xl font-bold">${costSummary.totalCost.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Per Unit</p>
            <p className="text-3xl font-bold">${costSummary.perUnitCost.toFixed(2)}</p>
          </div>
        </div>
        
        {/* Quantity Info */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4" />
          <span>
            {costSummary.currentQuantity} plants 
            {costSummary.originalQuantity !== costSummary.currentQuantity && (
              <span className="text-yellow-600 dark:text-yellow-400 ml-1">
                (originally {costSummary.originalQuantity})
              </span>
            )}
          </span>
        </div>
        
        {/* Cost by Category */}
        <div className="space-y-2">
          <p className="text-sm font-medium mb-3">Cost Breakdown</p>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left text-xs font-medium px-3 py-2">Category</th>
                  <th className="text-right text-xs font-medium px-3 py-2">Amount</th>
                  <th className="text-right text-xs font-medium px-3 py-2">% of Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sortedCategories.map(([category, amount]) => {
                  const percentage = (amount / costSummary.totalCost) * 100;
                  return (
                    <tr key={category} className="hover:bg-muted/30">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${categoryColors[category] || 'bg-gray-500'}`} />
                          <span className="text-sm">{categoryLabels[category] || category}</span>
                        </div>
                      </td>
                      <td className="text-right px-3 py-2 text-sm font-medium">${amount.toFixed(2)}</td>
                      <td className="text-right px-3 py-2 text-sm text-muted-foreground">{percentage.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Last Updated */}
        <p className="text-xs text-muted-foreground text-center pt-4 border-t">
          Last updated: {new Date(costSummary.lastUpdated).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
