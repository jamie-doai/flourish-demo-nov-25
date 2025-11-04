import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { DevBar } from '@/components/DevBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { CostCategory } from '@/types/cost';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const filteredCosts = costCatalog.filter(cost => {
    const matchesSearch = cost.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cost.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || cost.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  const totalItems = costCatalog.length;
  const averageValue = costCatalog.reduce((sum, c) => sum + c.defaultValue, 0) / totalItems;
  
  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link to="/managers/settings">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Settings
            </Button>
          </Link>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <DollarSign className="w-8 h-8" />
                Cost Library
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
              <Button disabled>
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
          <CardContent className="pt-6">
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
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(cost.effectiveFrom).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" disabled>
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
          <CardContent className="pt-6">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>Cost Versioning:</strong> When you update a cost item, you can create a new version
              with an effective date. This ensures historical batches retain their original costs while
              new batches use updated values.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
