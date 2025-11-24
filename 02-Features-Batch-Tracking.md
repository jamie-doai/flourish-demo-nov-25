# Batch Tracking Features

## Overview

Batch tracking is the core feature of Flourish, providing complete traceability of every plant batch from creation through to sale. Each batch represents a group of plants tracked together through their lifecycle.

## Batch Lifecycle

Batches progress through various stages:
- **Seed** - Initial seed stage
- **Germinating** - Seeds in germination process
- **Potted** - Plants in pots
- **Propagation** - Active propagation stage
- **Hardening** - Hardening off process
- **Ready** - Ready for sale or next stage

## Creating Batches

### Multi-Step Batch Creation Wizard

The batch creation process uses a 9-step wizard:

#### Step 1: Batch Type
Select the type of batch:
- **Seed Collection** - Seeds collected from wild or cultivated sources
- **Cuttings** - Propagated from parent plants
- **Bought-In** - Purchased from suppliers

#### Step 2: Species Information
- Select species from catalog
- Common name and scientific name
- Variety (optional)
- Intended purpose (optional)

#### Step 3: Source/Origin
Information varies by batch type:

**Seed Collection:**
- Source location
- GPS coordinates (optional)
- Date collected
- Collected by
- Quantity and unit (grams, kg)
- Storage condition (dry, chilled, frozen)

**Cuttings:**
- Parent plant reference
- Date taken
- Quantity (cuttings)

**Bought-In:**
- Supplier name
- Invoice reference
- Date received
- Certification files (optional)

#### Step 4: Location
- Initial location assignment
- Expected move date (optional)
- Responsible person (optional)
- Track movements toggle

#### Step 5: Batch Details
- Batch ID (auto-generated or custom)
- Current status/stage
- Expected germination date (optional)
- Notes

#### Step 6: Batch Quantities
- Initial quantity
- Support for multiple batch creation
- Quantity units (trays, pots, individual plants)

#### Step 7: Cost Configuration
- Select from cost library
- Override costs if needed
- Configure per-unit costs

#### Step 8: Attachments
- Photos
- Documents
- Certifications

#### Step 9: Review
- Review all entered information
- Submit batch creation
- Option to add another batch

### Multi-Batch Creation

The system supports creating multiple batches at once with different configurations:
- Specify number of batches to create
- Configure each batch individually (quantity, location, status)
- All batches share common species and source information

## Batch Detail View

The batch detail page (`/managers/batch/:batchId`) provides comprehensive information:

### Overview Tab
- Batch ID and species information
- Current location and stage
- Quantity and health status
- Environmental data (temperature, humidity)
- Related tasks

### Cost Tab
- Cost breakdown by category
- Per-unit cost
- Total cost
- Cost history timeline
- Add custom costs

### Location Tab
- Current location
- Location history
- Move batch functionality

### Activity Log Tab
- Complete history of batch actions
- User actions and timestamps
- Notes and observations

## Batch Operations

### Split Batch
Split a batch into multiple child batches:
- Specify quantities for each split
- System validates quantities sum to parent total
- Creates new batch IDs with suffix notation (e.g., MAN-2024-156.1, MAN-2024-156.2)
- Maintains lineage relationship to parent
- Preserves cost information

**Use Cases:**
- Moving portions to different locations
- Separating by quality or size
- Creating separate batches for different purposes

### Merge Batches
Combine multiple batches into one:
- Batches must have same species, pot size, and stage
- System validates compatibility
- Calculates weighted average cost per unit
- Creates new merged batch with new ID
- Preserves lineage from all source batches

**Use Cases:**
- Consolidating small batches
- Combining batches from same source
- Simplifying inventory management

### Duplicate Batch
Create a copy of an existing batch:
- Copies all batch information
- Creates new batch ID
- Links to original batch
- Useful for creating similar batches

### Loss Adjustment
Record quantity losses:
- Adjust quantity down due to losses
- Record reason for loss
- Update cost per unit automatically
- Maintains audit trail

### Direct Edit
Quick edit of batch properties:
- Quantity
- Location
- Stage/Status
- Health status
- Container type

## Cost Tracking

### Cost Categories
Costs are tracked by category:
- Labor
- Materials
- Overhead
- Utilities
- Other

### Cost History
- Complete timeline of all cost entries
- Cost versioning for historical tracking
- Cost per unit calculations
- Total cost aggregation

### Cost Library Integration
- Select standard costs from cost library
- Override costs for specific batches
- Custom cost entries

### Cost Calculations
- Per-unit cost = Total cost / Quantity
- Weighted average for merged batches
- Cost breakdown by category
- Cost by stage tracking

## Location Tracking

### Current Location
- Display current primary location
- Location hierarchy (Building → Bay → Table)
- Location capacity information

### Location History
- Complete movement history
- Dates and responsible persons
- Movement notes

### Move Batch
- Select new location
- Specify quantity to move (for partial moves)
- Add movement notes
- Update location history

## Batch Lineage

### Parent-Child Relationships
- Track batch splits (parent → children)
- Track batch merges (multiple parents → child)
- Visual lineage display

### Batch Groups
- Group related batches together
- Useful for tracking batches from same source
- Shared metadata and relationships

## Batch Status and Health

### Health Status
- Excellent
- Good
- Fair
- Poor

### Sale Status
- Ready for sale
- Reserved
- On order
- Not for sale

### Urgent Flag
- Mark batches requiring attention
- Appears in alerts and dashboards

## Batch Search and Filtering

### Search Capabilities
- Search by batch ID
- Search by species
- Search by location
- Search by status

### Filtering Options
- By species
- By stage
- By location
- By health status
- By sale status

## Batch Data Model

### Core Fields
- `id` - Unique batch identifier
- `species` - Plant species
- `scientificName` - Scientific name
- `location` - Current location
- `stage` - Current lifecycle stage
- `quantity` - Number of plants
- `health` - Health status
- `container` - Container type (pot size, tray, etc.)

### Cost Fields
- `totalCost` - Total cost for batch
- `perUnitCost` - Cost per individual plant
- `costLastUpdated` - Last cost update timestamp

### Status Fields
- `saleStatus` - Sale availability status
- `orderNumber` - Linked order (if reserved/on order)
- `customerName` - Customer name (if reserved/on order)
- `urgent` - Urgent flag

### Relationship Fields
- `batchGroupId` - Group identifier
- `isDuplicate` - Duplicate flag
- `originalBatchId` - Original batch (for duplicates)

## Integration Points

### Tasks
- Tasks can be linked to batches
- Batch detail shows related tasks
- Task completion can update batch status

### Sales
- Batches can be selected for quotes/orders
- Stock reservation for orders
- Sale status updates when reserved/ordered

### Inventory
- Batches appear in inventory views
- Location-based inventory aggregation
- Species-based inventory aggregation

### Reporting
- Cost analysis includes batch costs
- Production value calculations
- Yield tracking (future)
