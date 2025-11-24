# Reporting & Analytics Features

## Overview

The reporting and analytics system provides business intelligence, cost analysis, and production insights to help managers make data-driven decisions about nursery operations.

## Reporting Dashboard

### Reporting Overview

The reporting section provides access to various reports and analytics:

- **Cost Analysis** - Production cost tracking and analysis
- **Yield Reports** - Production yield tracking (planned)
- **Forecasting** - Production forecasting (planned)
- **Biosecurity Compliance** - Treatment logs and compliance (planned)

### Navigation

Access reporting via:
- Manager navigation → Reporting
- Direct links from dashboard
- Cost analysis from batch detail pages

## Cost Analysis

### Cost Analysis Dashboard

Comprehensive cost tracking and analysis for production batches.

#### Summary Statistics

Key metrics displayed:
- **Total Production Value** - Sum of all batch costs
- **Batches Tracked** - Number of batches with cost data
- **Average Cost Per Unit** - Average cost across all batches
- **Species Tracked** - Number of species with cost data

#### Cost by Species Analysis

Detailed breakdown by plant species:

**Metrics per Species:**
- Number of batches
- Total quantity (plants)
- Total cost
- Average cost per unit

**Display Format:**
- Table view with sortable columns
- Sorted by total cost (highest first)
- Species name with icon
- Cost badges for easy identification

#### Recent Batches

List of recent batches with cost tracking:
- Batch ID (linked to batch detail)
- Species
- Quantity
- Total cost
- Per-unit cost
- Stage

#### Cost Insights

- Cost distribution across species
- Identification of high-cost species
- Cost efficiency analysis
- Production value tracking

## Cost Tracking System

### Cost Categories

Costs are organized into categories:

- **Seeds & Seedlings** - Seed and seedling costs
- **Growing Media** - Soil and growing medium costs
- **Containers** - Pot and container costs
- **Trays** - Tray costs
- **Labour** - Labor costs
- **Spraying** - Spraying and treatment costs
- **Maintenance** - Maintenance costs
- **Freight** - Shipping and freight costs
- **Overhead** - Overhead costs

### Cost Library

Centralized cost catalog for standard costs.

#### Cost Catalog Items

Each cost item includes:
- **ID** - Unique identifier
- **Name** - Cost item name
- **Category** - Cost category
- **Unit** - Unit of measurement
- **Default Value** - Standard cost value
- **Default Stages** - Stages where cost applies
- **Supplier Reference** - Supplier information
- **Notes** - Additional information

#### Cost Library Management

- **Add Cost Item** - Create new cost catalog entry
- **Edit Cost Item** - Modify existing cost
- **Delete Cost Item** - Remove cost (with validation)
- **Search Costs** - Search by name or ID
- **Filter by Category** - Filter costs by category
- **Export Costs** - Export cost library (planned)

#### Cost Item Form

When adding/editing costs:
- Name and description
- Category selection
- Unit of measurement
- Default value
- Applicable stages (multi-select)
- Supplier reference
- Notes

### Batch Cost Tracking

#### Cost History

Each batch maintains a complete cost history:
- All cost entries with timestamps
- Cost category breakdown
- Cost by stage tracking
- Cost versioning for historical accuracy

#### Cost Breakdown

Per-batch cost analysis:
- **Total Cost** - Sum of all costs
- **Per-Unit Cost** - Total cost / quantity
- **Cost by Category** - Breakdown by cost type
- **Cost by Stage** - Costs incurred at each stage

#### Adding Costs to Batches

- Select from cost library
- Override default values if needed
- Add custom costs
- Record cost at specific stage
- Add cost notes

#### Cost Calculations

- Automatic cost aggregation
- Per-unit cost calculation
- Weighted average for merged batches
- Cost distribution across categories

## Production Insights

### Production Value

- Total value of all tracked batches
- Value by species
- Value by stage
- Value by location

### Cost Efficiency

- Average cost per unit by species
- Cost trends over time
- Cost comparison across batches
- Identification of cost optimization opportunities

### Batch Cost Analysis

- Individual batch cost breakdowns
- Cost history timeline
- Cost category distribution
- Stage-based cost tracking

## Reporting Features (Planned)

### Yield Reports

- Production yield tracking
- Success rates by species
- Success rates by stage
- Yield forecasting

### Forecasting

- Production forecasting
- Capacity planning
- Demand forecasting
- Resource planning

### Biosecurity Compliance

- Treatment logs
- Compliance reports
- Audit trails
- Regulatory reporting

## Cost Analysis Data Model

### Cost Catalog Item

```typescript
interface CostCatalogItem {
  id: string;
  name: string;
  category: CostCategory;
  unit: string;
  defaultValue: number;
  defaultStages: BatchStage[];
  supplierReference?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Cost History Entry

```typescript
interface CostHistory {
  id: string;
  batchId: string;
  category: CostCategory;
  amount: number;
  quantity: number;
  stage: BatchStage;
  timestamp: string;
  notes?: string;
  costItemId?: string;
}
```

### Batch Cost Summary

```typescript
interface BatchCostSummary {
  totalCost: number;
  perUnitCost: number;
  costByCategory: Record<CostCategory, number>;
  costByStage: Record<BatchStage, number>;
  history: CostHistory[];
}
```

## Integration Points

### Batch Tracking

- Costs linked to batches
- Batch detail shows cost breakdown
- Cost history in batch timeline
- Cost updates affect batch totals

### Inventory

- Cost data in inventory views
- Cost filtering in inventory
- Cost-based inventory valuation

### Sales

- Cost data for margin calculation
- Cost-plus pricing support
- Profitability analysis

### Reporting

- Cost data feeds all reports
- Cost analysis in dashboards
- Cost trends in analytics

## Cost Analysis Workflow

### Setting Up Costs

1. Configure cost library with standard costs
2. Assign costs to batches during creation
3. Add costs as batches progress
4. Track cost history automatically

### Analyzing Costs

1. View cost analysis dashboard
2. Review cost by species
3. Analyze individual batch costs
4. Identify cost optimization opportunities

### Cost Management

1. Update cost library as needed
2. Adjust batch costs when necessary
3. Review cost history for accuracy
4. Export cost data for external analysis

## Data Export

### Export Capabilities (Planned)

- Export cost analysis to CSV
- Export batch costs to Excel
- Generate cost reports as PDF
- API access for cost data

## Cost Reporting Best Practices

### Cost Tracking

- Record costs as they occur
- Use cost library for consistency
- Add notes for cost context
- Review cost history regularly

### Cost Analysis

- Compare costs across species
- Identify high-cost batches
- Track cost trends over time
- Use cost data for pricing decisions

### Cost Optimization

- Identify cost reduction opportunities
- Compare costs across batches
- Analyze cost efficiency
- Optimize production processes
