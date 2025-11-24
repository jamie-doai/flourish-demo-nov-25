<!-- 910bc081-e7ec-499d-a638-80bb19ff5960 3753bb02-96d6-4d11-a00c-bc3392674977 -->
# Standardize Sales Detail Pages Structure

## Overview

Ensure all sales detail pages (QuoteDetail, OrderDetail, InvoiceDetail) follow the same consistent structure with all action buttons moved to the top header section.

## Implementation Details

### Files to Modify

- `src/pages/managers/sales/QuoteDetail.tsx`
- `src/pages/managers/sales/OrderDetail.tsx`
- `src/pages/managers/sales/InvoiceDetail.tsx`

### Standard Structure Pattern

All pages should follow this consistent header structure:

- Left side: Icon + Title + Client Name + Optional linked document
- Right side: Status badge(s) + Action buttons group (Edit + other action buttons)

### Changes Required

#### 1. QuoteDetail.tsx

**Current:** Buttons at bottom (lines 230-261)

**Change:**

- Move all buttons (Edit, Download PDF, Send, Convert to Order, View Order) to header section
- Place them in a button group on the right side of the header, alongside the status badge
- Remove bottom button section

**Header structure should be:**

```tsx
<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
  <div className="flex items-center gap-4 min-w-0 flex-1">
    <FileText className="w-3 h-3 text-primary flex-shrink-0" />
    <div className="min-w-0 flex-1">
      <h1>...</h1>
      <p>...</p>
    </div>
  </div>
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
    <Badge>...</Badge>
    <div className="flex flex-wrap gap-2">
      {/* All action buttons here */}
    </div>
  </div>
</div>
```

#### 2. OrderDetail.tsx

**Current:** Only Edit button at bottom (lines 206-213), OrderStatusActions in header

**Change:**

- Move Edit button to header section, grouped with OrderStatusActions
- Remove bottom button section
- Ensure buttons are properly grouped and responsive

**Header structure:**

```tsx
<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
  <div className="flex items-center gap-4 min-w-0 flex-1">
    {/* Order title and info */}
  </div>
  <div className="flex items-center gap-2 flex-wrap">
    <Link to={`/managers/sales/orders/${orderId}/edit`}>
      <Button variant="secondary">
        <Edit className="w-4 h-4 mr-2" />
        Edit
      </Button>
    </Link>
    <OrderStatusActions ... />
  </div>
</div>
```

#### 3. InvoiceDetail.tsx

**Current:** Buttons at bottom (lines 189-221), badges in header

**Change:**

- Move all buttons (Edit, Download PDF, Send, Record Payment, Sync to Xero) to header section
- Group them with the status badges on the right side
- Remove bottom button section

**Header structure:**

```tsx
<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
  <div className="flex items-center gap-4 min-w-0 flex-1">
    {/* Invoice title and info */}
  </div>
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
    <div className="flex gap-2 items-center">
      <Badge>...</Badge>
      {/* Xero badge if applicable */}
    </div>
    <div className="flex flex-wrap gap-2">
      {/* All action buttons here */}
    </div>
  </div>
</div>
```

### Common Patterns to Apply

1. **Button Grouping**: All action buttons should be in a flex container with `gap-2` and `flex-wrap` for responsive wrapping
2. **Header Layout**: Use consistent flex layout with `flex-col sm:flex-row` for mobile/desktop responsiveness
3. **Spacing**: Maintain consistent gap spacing (`gap-3` or `gap-4`) between header elements
4. **Button Order**: Edit button should be first, followed by other action buttons
5. **Responsive**: Buttons should wrap on smaller screens, stack vertically on mobile

### Specific Button Locations

**QuoteDetail buttons to move:**

- Edit (line 231-236)
- Download PDF (line 237-240)
- Send to Client (conditional, line 242-247)
- Convert to Order (conditional, line 249-254)
- View Order (conditional, line 256-260)

**OrderDetail buttons to move:**

- Edit (line 207-212)

**InvoiceDetail buttons to move:**

- Edit (line 190-195)
- Download PDF (line 196-199)
- Send to Client (conditional, line 201-206)
- Record Payment (conditional, line 208-213)
- Sync to Xero (conditional, line 215-220)

## Notes

- Maintain all conditional button rendering logic
- Ensure buttons are properly grouped and visually consistent
- Keep responsive behavior - buttons should wrap/stack appropriately on mobile
- Preserve all existing button functionality and handlers
- Status badges should remain visible and properly positioned

### To-dos

- [ ] Move all action buttons to top header in QuoteDetail.tsx and remove bottom section
- [ ] Move Edit button to top header in OrderDetail.tsx alongside OrderStatusActions
- [ ] Move all action buttons to top header in InvoiceDetail.tsx and remove bottom section