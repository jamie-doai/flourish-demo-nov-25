# Sales Management Features

## Overview

The sales management system provides a complete workflow from quotes through to invoices, with inventory integration, stock reservation, and client management.

## Sales Workflow

The typical sales workflow follows this progression:
1. **Quote** - Create quote with inventory selection
2. **Order** - Convert quote to order (or create directly)
3. **Invoice** - Generate invoice from completed order
4. **Payment** - Track payment status

## Quotes

### Creating Quotes

#### Quote Creation Form
- **Client Selection** - Select from existing clients or create new
- **Expiry Date** - Set quote validity period
- **Reserve Stock** - Option to reserve inventory for quote
- **Client Notes** - Notes visible to client
- **Internal Notes** - Internal-only notes

#### Line Items
Add items to quote:
- **Inventory Selection** - Browse and select from available inventory
- **Species Selection** - Select by species and stage
- **Quantity Entry** - Specify quantities needed
- **Pricing** - Set unit prices
- **Total Calculation** - Automatic line item totals

#### Inventory Selection Sheet
When adding items from inventory:
- Browse by species
- View available quantities by stage
- See batch details (ID, location, quantity available)
- Select batches and quantities
- Add multiple items at once

#### Quote Totals
- Subtotal (sum of line items)
- Tax (GST calculation)
- Total (subtotal + tax)
- Real-time calculation as items added

#### Quote Actions
- **Save Draft** - Save without sending
- **Send Quote** - Send to client
- **Convert to Order** - Convert accepted quote to order

### Quote Management

#### Quote List View
- List of all quotes
- Filter by status (draft, sent, accepted, declined, converted)
- Search by client name or quote number
- Status badges with color coding

#### Quote Detail View
- Quote number and client information
- Line items with details
- Totals breakdown
- Status and dates
- Actions:
  - Send quote
  - Convert to order
  - Download PDF
  - Edit quote
  - Delete quote

#### Quote Statuses
- **Draft** - Not yet sent
- **Sent** - Sent to client
- **Accepted** - Client accepted
- **Declined** - Client declined
- **Converted** - Converted to order

## Orders

### Creating Orders

#### Order Creation
- **From Quote** - Convert accepted quote to order
- **Direct Creation** - Create order without quote
- **Client Selection** - Select client
- **Delivery Information** - Delivery type, address, date
- **Special Instructions** - Delivery and handling notes

#### Order Line Items
- Inherited from quote (if converted)
- Or manually added from inventory
- Quantity and pricing
- Batch assignments

#### Order Lifecycle Stages
Orders progress through stages:
1. **Pending** - Awaiting approval
2. **Approved** - Approved and ready to start
3. **In Progress** - Being prepared
4. **Ready to Dispatch** - Ready for delivery
5. **Dispatched** - Out for delivery
6. **Completed** - Delivered and completed
7. **Cancelled** - Cancelled order

#### Order Status Management
- Progress through stages with status actions
- Record dates and responsible persons at each stage
- Add notes for each stage transition
- Visual progress indicator

### Order Management

#### Order List View
- List of all orders
- Filter by status
- Search by client, order number
- Summary statistics (total orders, pending, dispatched, total value)
- Status badges

#### Order Detail View
- Order number and client information
- Linked quote (if applicable)
- Line items with batch assignments
- Delivery information
- Lifecycle progress
- Status actions
- History and notes

#### Order Actions
- **Approve Order** - Move from pending to approved
- **Start Order** - Begin preparation
- **Mark Ready** - Mark ready for dispatch
- **Dispatch Order** - Record dispatch
- **Complete Order** - Mark as completed
- **Cancel Order** - Cancel with reason
- **Generate Invoice** - Create invoice from order

## Invoices

### Invoice Generation

#### From Order
- Generate invoice from completed order
- Inherits all order line items
- Includes delivery information
- Client details from order

#### Invoice Details
- Invoice number (auto-generated)
- Invoice date
- Due date
- Client information
- Line items with descriptions
- Subtotal, tax, total
- Payment terms
- Payment status

### Invoice Management

#### Invoice List View
- List of all invoices
- Filter by payment status
- Search functionality
- Summary statistics

#### Invoice Detail View
- Complete invoice information
- Payment status tracking
- Payment history
- Download PDF
- Send to client

#### Payment Tracking
- Mark as paid
- Record payment date
- Partial payment support
- Payment notes

## Client Management

### Client List
- List of all clients
- Client contact information
- Order history
- Quote history
- Invoice history

### Client Detail
- Contact information
- Address details
- Order history
- Quote history
- Invoice history
- Payment history
- Notes and preferences

### Client Actions
- Create new client
- Edit client information
- View client history
- Add notes

## Inventory Selection for Sales

### Available Inventory
- Browse by species
- View by growth stage
- See available quantities
- Check batch details
- Filter by location

### Stock Availability
- Real-time availability checking
- Shows reserved/on-order quantities
- Available quantity display
- Batch-level availability

### Inventory Selection Process
1. Open inventory selection sheet
2. Browse by species or stage
3. View available batches
4. Select batches and quantities
5. Add to quote/order
6. System validates availability

## Stock Reservation

### Reservation Process
- Reserve stock when creating quote (optional)
- Reserve stock when creating order
- Automatic reservation on order approval
- Release reservation on order cancellation

### Reservation Status
- **Available** - Not reserved
- **Reserved** - Reserved for quote/order
- **On Order** - Part of active order

### Reservation Management
- View reserved batches
- Release reservations
- Transfer reservations (quote to order)
- Automatic updates on status changes

## Sales Calculations

### Line Item Calculations
- Unit price × quantity = line total
- Automatic calculation
- Manual override available

### Totals Calculation
- **Subtotal** - Sum of all line items
- **Tax (GST)** - Subtotal × GST rate (15% in NZ)
- **Total** - Subtotal + Tax

### Margin Calculations
- Margin = (Price - Cost) / Price × 100
- Cost from batch cost tracking
- Margin display on line items

### Pricing
- Set prices per line item
- Price override capability
- Cost-plus pricing support
- Client-specific pricing (future)

## Sales Data Model

### Quote Structure
```typescript
interface Quote {
  id: string;
  quoteNumber: string;
  clientId: string;
  clientName: string;
  dateCreated: string;
  expiryDate?: string;
  status: 'draft' | 'sent' | 'accepted' | 'declined' | 'converted';
  reserveStock: boolean;
  items: QuoteLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  clientNotes?: string;
  internalNotes?: string;
  convertedToOrder?: string;
}
```

### Order Structure
```typescript
interface Order {
  id: string;
  orderNumber: string;
  linkedQuote?: string;
  clientId: string;
  clientName: string;
  dateCreated: string;
  status: 'pending' | 'approved' | 'in_progress' | 'ready_to_dispatch' | 'dispatched' | 'completed' | 'cancelled';
  deliveryType: 'pickup' | 'courier' | 'in-house';
  deliveryAddress?: string;
  deliveryDate?: string;
  items: OrderLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  // Lifecycle tracking fields
  approvedDate?: string;
  startedDate?: string;
  readyForDispatchDate?: string;
  dispatchedDate?: string;
  completedDate?: string;
}
```

### Invoice Structure
```typescript
interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  clientId: string;
  dateCreated: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  items: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  amountDue: number;
}
```

## Integration Points

### Inventory Integration
- Real-time inventory availability
- Batch selection for sales
- Stock reservation
- Inventory updates on order completion

### Batch Tracking
- Link batches to orders
- Update batch sale status
- Track batch assignments
- Cost tracking for margin calculation

### Reporting
- Sales by client
- Sales by species
- Order status reports
- Revenue tracking
- Margin analysis

## Sales Sidebar Navigation

The sales section includes:
- **Quotes** - Quote management
- **Orders** - Order management
- **Invoices** - Invoice management
- **Clients** - Client management

Quick switching between sections via sidebar or section switcher.
