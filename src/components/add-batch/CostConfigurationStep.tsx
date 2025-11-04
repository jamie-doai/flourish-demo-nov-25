import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Info } from 'lucide-react';
import { getActiveCostCatalog } from '@/data/costCatalog';
import { CostCategory, BatchStage } from '@/types/cost';
import { useState } from 'react';

interface CostConfigurationStepProps {
  selectedCosts: string[];
  onCostsChange: (costs: string[]) => void;
  costOverrides: Record<string, number>;
  onCostOverrideChange: (costId: string, value: number) => void;
}

const categoryIcons: Record<CostCategory, string> = {
  seed: '🌱',
  soil: '🌿',
  pot: '🪴',
  tray: '📦',
  labour: '👷',
  spray: '💧',
  maintenance: '🔧',
  freight: '🚚',
  overhead: '📊',
};

const stageGroups: Record<string, { label: string; stages: BatchStage[] }> = {
  seed: { label: 'Seed Stage', stages: ['seed'] },
  potting: { label: 'Potting Stage', stages: ['potting'] },
  growing: { label: 'Growing Stage', stages: ['propagation', 'hardening'] },
  ready: { label: 'Ready for Sale', stages: ['ready'] },
};

export function CostConfigurationStep({
  selectedCosts,
  onCostsChange,
  costOverrides,
  onCostOverrideChange,
}: CostConfigurationStepProps) {
  const costCatalog = getActiveCostCatalog();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['seed', 'potting']);
  
  const toggleCost = (costId: string) => {
    if (selectedCosts.includes(costId)) {
      onCostsChange(selectedCosts.filter(id => id !== costId));
    } else {
      onCostsChange([...selectedCosts, costId]);
    }
  };
  
  const toggleGroup = (group: string) => {
    if (expandedGroups.includes(group)) {
      setExpandedGroups(expandedGroups.filter(g => g !== group));
    } else {
      setExpandedGroups([...expandedGroups, group]);
    }
  };
  
  const getCostsForGroup = (stages: BatchStage[]) => {
    return costCatalog.filter(cost => {
      // For now, use simple heuristics to match costs to stages
      if (stages.includes('seed')) {
        return ['seed', 'tray', 'overhead'].includes(cost.category);
      }
      if (stages.includes('potting')) {
        return ['pot', 'soil', 'labour'].includes(cost.category);
      }
      if (stages.includes('propagation') || stages.includes('hardening')) {
        return ['spray', 'maintenance', 'labour'].includes(cost.category);
      }
      return false;
    });
  };
  
  const selectedTotal = selectedCosts.reduce((sum, costId) => {
    const cost = costCatalog.find(c => c.id === costId);
    if (!cost) return sum;
    const value = costOverrides[costId] ?? cost.defaultValue;
    return sum + value;
  }, 0);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Cost Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Select which cost items apply to this batch. Costs will be automatically applied
          at the appropriate lifecycle stages.
        </p>
      </div>
      
      {/* Estimated Total */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Estimated Total Cost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${selectedTotal.toFixed(2)}</span>
            <span className="text-muted-foreground">for initial setup</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Additional costs will apply as the batch progresses through stages
          </p>
        </CardContent>
      </Card>
      
      {/* Cost Groups */}
      <div className="space-y-4">
        {Object.entries(stageGroups).map(([groupKey, group]) => {
          const groupCosts = getCostsForGroup(group.stages);
          const isExpanded = expandedGroups.includes(groupKey);
          
          if (groupCosts.length === 0) return null;
          
          return (
            <Card key={groupKey}>
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleGroup(groupKey)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{group.label}</CardTitle>
                  <Badge variant="secondary">
                    {groupCosts.filter(c => selectedCosts.includes(c.id)).length}/{groupCosts.length} selected
                  </Badge>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="space-y-4">
                  {groupCosts.map(cost => {
                    const isSelected = selectedCosts.includes(cost.id);
                    const currentValue = costOverrides[cost.id] ?? cost.defaultValue;
                    
                    return (
                      <div key={cost.id} className="flex items-start gap-3 p-3 border rounded-lg">
                        <Checkbox
                          id={cost.id}
                          checked={isSelected}
                          onCheckedChange={() => toggleCost(cost.id)}
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <Label htmlFor={cost.id} className="flex items-center gap-2 cursor-pointer">
                              <span className="text-lg">{categoryIcons[cost.category]}</span>
                              <div>
                                <div className="font-medium">{cost.name}</div>
                                <div className="text-xs text-muted-foreground">{cost.unit}</div>
                              </div>
                            </Label>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">$</span>
                              <Input
                                type="number"
                                step="0.01"
                                value={currentValue}
                                onChange={(e) => onCostOverrideChange(cost.id, parseFloat(e.target.value) || 0)}
                                disabled={!isSelected}
                                className="w-24 h-8"
                              />
                            </div>
                          </div>
                          {cost.notes && (
                            <p className="text-xs text-muted-foreground flex items-start gap-1">
                              <Info className="w-3 h-3 mt-0.5 shrink-0" />
                              {cost.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
      
      {/* Add Custom Cost (placeholder) */}
      <Button variant="outline" className="w-full" disabled>
        <Plus className="w-4 h-4 mr-2" />
        Add Custom Cost Item
      </Button>
      
      {selectedCosts.length === 0 && (
        <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="pt-6">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ No costs selected. It's recommended to configure costs for accurate production tracking.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
