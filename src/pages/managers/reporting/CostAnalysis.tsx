import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { DevBar } from '@/components/DevBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Leaf, BarChart3 } from 'lucide-react';
import { batches } from '@/data/batches';
import { getBatchCostSummary } from '@/data/batchCosts';

export default function CostAnalysis() {
  // Calculate stats
  const batchesWithCosts = batches.filter(b => b.totalCost);
  const totalValue = batchesWithCosts.reduce((sum, b) => sum + (b.totalCost || 0), 0);
  const avgCostPerUnit = batchesWithCosts.length > 0 
    ? batchesWithCosts.reduce((sum, b) => sum + (b.perUnitCost || 0), 0) / batchesWithCosts.length 
    : 0;
  
  // Group by species
  const speciesCosts = batchesWithCosts.reduce((acc, batch) => {
    if (!acc[batch.species]) {
      acc[batch.species] = {
        batches: 0,
        totalCost: 0,
        totalQuantity: 0,
      };
    }
    acc[batch.species].batches++;
    acc[batch.species].totalCost += batch.totalCost || 0;
    acc[batch.species].totalQuantity += batch.quantity;
    return acc;
  }, {} as Record<string, { batches: number; totalCost: number; totalQuantity: number }>);
  
  const speciesAnalysis = Object.entries(speciesCosts).map(([species, data]) => ({
    species,
    ...data,
    avgCostPerUnit: data.totalCost / data.totalQuantity,
  })).sort((a, b) => b.totalCost - a.totalCost);
  
  return (
    <div className="min-h-screen bg-background">
      <DevBar />
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link to="/managers/reporting">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Reporting
            </Button>
          </Link>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <BarChart3 className="w-8 h-8" />
                Cost Analysis
              </h1>
              <p className="text-muted-foreground mt-1">
                Production cost insights and margin analysis
              </p>
            </div>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Production Value</CardDescription>
              <CardTitle className="text-3xl">${totalValue.toFixed(2)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Batches Tracked</CardDescription>
              <CardTitle className="text-3xl">{batchesWithCosts.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Avg Cost Per Unit</CardDescription>
              <CardTitle className="text-3xl">${avgCostPerUnit.toFixed(2)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Species Tracked</CardDescription>
              <CardTitle className="text-3xl">{Object.keys(speciesCosts).length}</CardTitle>
            </CardHeader>
          </Card>
        </div>
        
        {/* Cost by Species */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cost Analysis by Species</CardTitle>
            <CardDescription>
              Production costs grouped by plant species
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Species</TableHead>
                  <TableHead className="text-right">Batches</TableHead>
                  <TableHead className="text-right">Total Quantity</TableHead>
                  <TableHead className="text-right">Total Cost</TableHead>
                  <TableHead className="text-right">Avg Cost/Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {speciesAnalysis.map((item) => (
                  <TableRow key={item.species}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-600" />
                        <span className="font-medium">{item.species}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.batches}</TableCell>
                    <TableCell className="text-right">{item.totalQuantity}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${item.totalCost.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">
                        ${item.avgCostPerUnit.toFixed(2)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {speciesAnalysis.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No cost data available</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Batches with Costs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Batches</CardTitle>
            <CardDescription>
              Latest batches with cost tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch ID</TableHead>
                  <TableHead>Species</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Total Cost</TableHead>
                  <TableHead className="text-right">Per Unit</TableHead>
                  <TableHead>Stage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batchesWithCosts.slice(0, 10).map((batch) => (
                  <TableRow key={batch.id}>
                    <TableCell>
                      <Link 
                        to={`/managers/batch/${batch.id}`}
                        className="font-mono text-sm hover:underline"
                      >
                        {batch.id}
                      </Link>
                    </TableCell>
                    <TableCell>{batch.species}</TableCell>
                    <TableCell className="text-right">{batch.quantity}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${batch.totalCost?.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">
                        ${batch.perUnitCost?.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {batch.stage}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Info Banner */}
        <Card className="mt-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>Cost Tracking:</strong> Costs are automatically accumulated as batches progress
              through lifecycle stages. Visit individual batch pages to see detailed cost breakdowns
              and history.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
