<!-- 910bc081-e7ec-499d-a638-80bb19ff5960 3753bb02-96d6-4d11-a00c-bc3392674977 -->
# Remove Section Switcher Dropdown from Sales Pages

## Overview

Remove the `sectionSwitcher` prop from PageHeader components in all sales list pages, eliminating the dropdown that allows switching between Quotes, Orders, Invoices, and Clients sections.

## Implementation Details

### Files to Modify

- `src/pages/managers/sales/Quotes.tsx`
- `src/pages/managers/sales/Orders.tsx`
- `src/pages/managers/sales/Invoices.tsx`
- `src/pages/managers/sales/Clients.tsx`

### Changes Required

For each file, remove the `sectionSwitcher` prop from the `PageHeader` component:

**Current structure:**

```tsx
<PageHeader
  title="..."
  description="..."
  backTo="..."
  backLabel="..."
  sectionSwitcher={{
    value: "...",
    onValueChange: (value) => navigate(`/managers/sales/${value}`),
    options: [
      { value: "quotes", label: "Quotes" },
      { value: "orders", label: "Orders" },
      { value: "invoices", label: "Invoices" },
      { value: "clients", label: "Clients" },
    ],
  }}
  actions={...}
/>
```

**New structure:**

```tsx
<PageHeader
  title="..."
  description="..."
  backTo="..."
  backLabel="..."
  actions={...}
/>
```

### Specific Changes

1. **Quotes.tsx** (line 40-49): Remove the `sectionSwitcher` prop and its entire object
2. **Orders.tsx** (line 41-50): Remove the `sectionSwitcher` prop and its entire object
3. **Invoices.tsx** (line 40-49): Remove the `sectionSwitcher` prop and its entire object
4. **Clients.tsx** (line 25-34): Remove the `sectionSwitcher` prop and its entire object

### Notes

- The `navigate` function may no longer be needed in some files if it was only used for sectionSwitcher. However, it's safe to leave it as it may be used elsewhere or for future functionality.
- The left-hand navigation sidebar already provides navigation between these sections, making the dropdown redundant.
- All other functionality (search, actions, etc.) remains unchanged.

### To-dos

- [ ] Move all action buttons to top header in QuoteDetail.tsx and remove bottom section
- [ ] Move Edit button to top header in OrderDetail.tsx alongside OrderStatusActions
- [ ] Move all action buttons to top header in InvoiceDetail.tsx and remove bottom section