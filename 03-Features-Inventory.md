# Inventory Management Features

## Overview

The inventory management system provides multiple views and tools for managing plant inventory across the nursery. It supports location-based, species-based, and stage-based inventory views with comprehensive search and filtering capabilities.

## Inventory Views

### Location-Based View

The primary inventory view organized by physical location hierarchy.

#### Location Hierarchy
The system uses a three-level hierarchy:
- **Buildings** - Top level (e.g., Propagation House 1, Shadehouse A)
- **Bays** - Second level within buildings (e.g., Bay 1, Bay 2)
- **Tables** - Third level within bays (e.g., Table 1A, Table 2B)

#### Location Tree View
- Expandable/collapsible tree structure
- Shows batch counts and plant quantities at each level
- Click to view batches at specific location
- Visual capacity indicators

#### Location Detail View
When viewing a specific location:
- List of all batches at that location
- Batch details (ID, species, quantity, stage, health)
- Tasks associated with location
- Capacity information
- Environmental data (temperature, humidity) for buildings

### Species-Based View

Organize inventory by plant species.

#### Species Cards
- Species name and scientific name
- Total plant count across all batches
- Number of batches
- Health status indicator
- Click to view species detail

#### Species Detail View
When viewing a specific species:
- All batches of that species
- Grouped by stage
- Location distribution
- Quantity totals by stage
- Batch list with details

### Stage-Based View

Organize inventory by growth stage.

#### Stage Cards
- Stage name and icon
- Total batches in stage
- Total plants
- Number of species
- Average age
- Click to view stage detail

#### Stage Detail View
When viewing a specific stage:
- All batches at that stage
- Grouped by species
- Location distribution
- Quantity totals by species
- Batch list with details

## Location Management

### Location Types
- **BUILDING** - Top-level structures (greenhouses, shadehouses)
- **BAY** - Sections within buildings
- **TABLE** - Physical tables or benches within bays
- **OTHER** - Special locations (unassigned, offsite, in-transit)

### Location Properties
- **ID** - Unique identifier
- **Name** - Display name
- **Code** - Short code for labels
- **Type** - Location type
- **Parent Location** - For hierarchy
- **Max Capacity** - Maximum plants/trays
- **Current Capacity** - Current usage (derived)
- **Environmental Data** - Temperature, humidity (for buildings)
- **Climate Control** - Climate control type
- **Dimensions** - Physical dimensions
- **Status** - Active/inactive
- **Notes** - Additional information

### Location Capacity Tracking
- Automatic calculation of current capacity
- Percentage usage display
- Capacity warnings when approaching limits
- Visual indicators for capacity levels

## Batch Operations in Inventory

### Bulk Selection
- Select multiple batches via checkboxes
- Bulk action toolbar appears when batches selected
- Shows total selected plants count

### Bulk Actions

#### Split Batch
- Split selected batch into multiple batches
- Specify quantities for each split
- Creates child batches with lineage

#### Merge Batches
- Merge multiple selected batches
- Must be compatible (same species, stage, pot size)
- Creates new merged batch
- Calculates weighted average cost

#### Direct Edit
- Quick edit of batch properties
- Edit quantity, location, stage, health
- Batch-by-batch editing

#### Loss Adjustment
- Record quantity losses
- Adjust multiple batches at once
- Record reason and notes for each adjustment
- Updates cost per unit automatically

### Individual Batch Actions
- View batch detail
- Edit batch
- Move batch
- Split batch
- Merge with other batches
- Duplicate batch
- Record loss

## Search and Filtering

### Search Functionality
- Global search across all inventory
- Search by:
  - Batch ID
  - Species name
  - Scientific name
  - Location name
- Real-time search results
- Quick access to batches, locations, tasks

### Filtering Options
- **By Species** - Filter to specific species
- **By Stage** - Filter to specific growth stage
- **By Location** - Filter to specific location
- **By Health Status** - Filter by health (Excellent, Good, Fair, Poor)
- **By Sale Status** - Filter by sale availability
- **By Container** - Filter by container type

### Combined Filters
- Multiple filters can be applied simultaneously
- Clear individual or all filters
- Filter state persists during navigation

## Inventory Statistics

### Overview Metrics
- Total plants across all batches
- Total number of batches
- Number of species
- Number of locations
- Average capacity usage

### Species Statistics
- Total plants per species
- Batch count per species
- Health distribution
- Stage distribution

### Stage Statistics
- Total batches per stage
- Total plants per stage
- Species count per stage
- Average age per stage

### Location Statistics
- Batches per location
- Plants per location
- Capacity percentage
- Species diversity per location

## Location Detail Pages

### Location Information
- Location name and code
- Location type and hierarchy
- Environmental conditions (if applicable)
- Capacity information
- Maintenance schedule

### Batches at Location
- Complete list of batches
- Batch details and status
- Quick actions for each batch
- Filter and search within location

### Tasks at Location
- Tasks assigned to location
- Task status and due dates
- Quick access to task details

### Location History
- Movement history
- Batch placement history
- Maintenance history

## Inventory Navigation

### Tab-Based Navigation
The inventory page uses tabs to switch between views:
- **By Location** - Location tree view
- **By Species** - Species cards view
- **By Stage** - Stage cards view

### Quick Actions
- Add new batch button
- Search functionality
- Filter controls
- Bulk action toolbar (when batches selected)

## Integration Points

### Batch Tracking
- All inventory views link to batch detail pages
- Batch operations available from inventory
- Real-time updates when batches change

### Tasks
- Tasks linked to locations
- Location detail shows related tasks
- Task completion can update inventory

### Sales
- Inventory selection for quotes/orders
- Stock availability checking
- Reservation status display

### Reporting
- Inventory statistics for reports
- Location utilization reports
- Species distribution reports

## Data Model

### Location Structure
```typescript
interface Location {
  id: string;
  name: string;
  code?: string;
  type: 'BUILDING' | 'BAY' | 'TABLE' | 'OTHER';
  parentLocationId?: string;
  maxCapacity?: number;
  currentCapacity?: number;
  temperature?: string;
  humidity?: string;
  climateControl?: string;
  isActive: boolean;
  notes?: string;
  dimensions?: string;
}
```

### Batch-Location Relationship
Batches can be at multiple locations (for split batches):
- Primary location (main location)
- Secondary locations (for partial quantities)
- Location history (past locations)
- Movement tracking

## Special Locations

### Unassigned Inventory
- Newly received batches not yet placed
- Batches without location assignment
- Temporary holding location

### Offsite Storage
- Inventory stored at external locations
- Remote storage tracking
- External facility management

### In Transit
- Batches currently being moved
- Temporary status during movement
- Movement tracking

## Performance Considerations

### Large Inventory Handling
- Pagination for large batch lists
- Lazy loading for location trees
- Efficient filtering and search
- Optimized aggregation calculations

### Real-Time Updates
- Inventory updates reflect immediately
- Batch changes update all views
- Location capacity recalculates automatically
