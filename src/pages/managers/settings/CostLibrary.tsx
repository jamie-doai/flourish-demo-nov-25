import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDateNZ } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Plus, Edit, History, Download, DollarSign } from 'lucide-react';
import { costCatalog, getCostCatalogByCategory } from '@/data/costCatalog';
import { CostCategory, CostCatalogItem, BatchStage } from '@/types/cost';
import { useToast } from '@/hooks/use-toast';

const stageLabels: Record<BatchStage, string> = {
  seed: 'Seed',
  propagation: 'Propagation',
  potting: 'Potting',
  hardening: 'Hardening',
  ready: 'Ready',
  sold: 'Sold',
};

const categoryLabels: Record<CostCategory, string> = {
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

const categoryColors: Record<CostCategory, string> = {
  seed: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  soil: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  pot: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800',
  tray: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  labour: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  spray: 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300 border-pink-200 dark:border-pink-800',
  maintenance: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
  freight: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
  overhead: 'bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border-slate-200 dark:border-slate-800',
};

export default function CostLibrary() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingCost, setEditingCost] = useState<CostCatalogItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'seed' as CostCategory,
    unit: '',
    defaultValue: '',
    defaultStages: [] as BatchStage[],
    notes: '',
    supplierReference: '',
  });
  
  const filteredCosts = costCatalog.filter(cost => {
    const matchesSearch = cost.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cost.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || cost.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  const totalItems = costCatalog.length;
  const averageValue = costCatalog.reduce((sum, c) => sum + c.defaultValue, 0) / totalItems;

  const handleAddCost = () => {
    setFormData({
      name: '',
      category: 'seed',
      unit: '',
      defaultValue: '',
      defaultStages: [],
      notes: '',
      supplierReference: '',
    });
    setShowAddDialog(true);
  };

  const handleEditCost = (cost: CostCatalogItem) => {
    setEditingCost(cost);
    setFormData({
      name: cost.name,
      category: cost.category,
      unit: cost.unit,
      defaultValue: cost.defaultValue.toString(),
      defaultStages: cost.defaultStages || [],
      notes: cost.notes || '',
      supplierReference: cost.supplierReference || '',
    });
    setShowEditDialog(true);
  };

  const toggleStage = (stage: BatchStage) => {
    setFormData(prev => ({
      ...prev,
      defaultStages: prev.defaultStages.includes(stage)
        ? prev.defaultStages.filter(s => s !== stage)
        : [...prev.defaultStages, stage]
    }));
  };

  const handleSaveCost = () => {
    if (!formData.name || !formData.unit || !formData.defaultValue) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: showEditDialog ? "Cost Updated" : "Cost Added",
      description: `${formData.name} has been ${showEditDialog ? 'updated' : 'added'} to the cost library`,
    });

    setShowAddDialog(false);
    setShowEditDialog(false);
    setEditingCost(null);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-12 py-8 max-w-[1920px]">
        {/* Header */}
        <div className="mb-6">
          <Link to="/managers/settings">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Settings
            </Button>
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-heading-3 sm:text-heading-2 md:text-heading-1 font-heading font-bold flex items-center gap-2">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                <span>Cost Library</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage cost items used across all batches
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button onClick={handleAddCost}>
                <Plus className="w-4 h-4 mr-2" />
                Add Cost Item
              </Button>
            </div>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Cost Items</CardDescription>
              <CardTitle className="text-3xl">{totalItems}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Categories</CardDescription>
              <CardTitle className="text-3xl">{Object.keys(categoryLabels).length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Average Value</CardDescription>
              <CardTitle className="text-3xl">${averageValue.toFixed(2)}</CardTitle>
            </CardHeader>
          </Card>
        </div>
        
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-3">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search cost items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Cost Table */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Items</CardTitle>
            <CardDescription>
              {filteredCosts.length} of {totalItems} items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Default Value</TableHead>
                  <TableHead>Applied At Stages</TableHead>
                  <TableHead>Effective From</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCosts.map((cost) => (
                  <TableRow key={cost.id}>
                    <TableCell className="font-mono text-xs">{cost.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{cost.name}</div>
                        {cost.notes && (
                          <div className="text-xs text-muted-foreground">{cost.notes}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={categoryColors[cost.category]}>
                        {categoryLabels[cost.category]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{cost.unit}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${cost.defaultValue.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {cost.defaultStages && cost.defaultStages.length > 0 ? (
                          cost.defaultStages.map(stage => (
                            <Badge key={stage} variant="secondary" className="text-xs">
                              {stageLabels[stage]}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">No stages</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDateNZ(cost.effectiveFrom)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditCost(cost)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" disabled>
                          <History className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredCosts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No cost items found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Info Banner */}
        <Card className="mt-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-3">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>Cost Versioning:</strong> When you update a cost item, you can create a new version
              with an effective date. This ensures historical batches retain their original costs while
              new batches use updated values.
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Add/Edit Cost Dialog */}
      <Dialog open={showAddDialog || showEditDialog} onOpenChange={(open) => {
        if (!open) {
          setShowAddDialog(false);
          setShowEditDialog(false);
          setEditingCost(null);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{showEditDialog ? 'Edit Cost Item' : 'Add New Cost Item'}</DialogTitle>
            <DialogDescription>
              {showEditDialog 
                ? 'Update the cost item details. Changes will create a new version.'
                : 'Add a new cost item to the library for use in batch costing.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Cost Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., PB3 Pot"
                  maxLength={100}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value as CostCategory })}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unit">Unit *</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="e.g., per pot, per hour"
                  maxLength={50}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultValue">Default Value ($) *</Label>
                <Input
                  id="defaultValue"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.defaultValue}
                  onChange={(e) => setFormData({ ...formData, defaultValue: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Applied At Stages</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Select which lifecycle stages this cost automatically applies to
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 border rounded-lg bg-muted/20">
                {Object.entries(stageLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`stage-${key}`}
                      checked={formData.defaultStages.includes(key as BatchStage)}
                      onCheckedChange={() => toggleStage(key as BatchStage)}
                    />
                    <label
                      htmlFor={`stage-${key}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplierReference">Supplier Reference</Label>
              <Input
                id="supplierReference"
                value={formData.supplierReference}
                onChange={(e) => setFormData({ ...formData, supplierReference: e.target.value })}
                placeholder="Supplier name or product code"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional information about this cost item"
                className="resize-none"
                rows={3}
                maxLength={500}
              />
            </div>

            {showEditDialog && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-900 dark:text-yellow-100">
                  <strong>Note:</strong> Editing this cost will create a new version effective from today.
                  Existing batches will continue using the previous cost values.
                </p>
              </div>
            )}

            <div className="flex gap-2 justify-end pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddDialog(false);
                  setShowEditDialog(false);
                  setEditingCost(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveCost}>
                {showEditDialog ? 'Update Cost' : 'Add Cost'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
