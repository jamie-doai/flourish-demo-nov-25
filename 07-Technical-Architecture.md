# Technical Architecture

## Technology Stack

### Core Technologies

- **Vite** (v5.4.19) - Build tool and development server
- **React** (v18.3.1) - UI framework
- **TypeScript** (v5.8.3) - Type safety
- **React Router** (v6.30.1) - Client-side routing

### UI & Styling

- **shadcn-ui** - Component library (Radix UI primitives)
- **Tailwind CSS** (v3.4.17) - Utility-first CSS framework
- **Lucide React** (v0.462.0) - Icon library
- **next-themes** (v0.3.0) - Theme management

### State Management

- **React Query (TanStack Query)** (v5.83.0) - Server state management
- **React Context** - Client state (BottomNavContext)
- No Zustand (mentioned in README but not used)

### Form Handling & Validation

- **React Hook Form** (v7.61.1) - Form state management
- **Zod** (v3.25.76) - Schema validation
- **@hookform/resolvers** (v3.10.0) - Form validation integration

### Additional Libraries

- **date-fns** (v3.6.0) - Date utilities
- **recharts** (v2.15.4) - Charting library
- **sonner** (v1.7.4) - Toast notifications
- **vaul** (v0.9.9) - Drawer component
- **cmdk** (v1.1.1) - Command palette

### Development Tools

- **ESLint** (v9.32.0) - Linting
- **TypeScript ESLint** (v8.38.0) - TypeScript linting
- **PostCSS** (v8.5.6) - CSS processing
- **Autoprefixer** (v10.4.21) - CSS vendor prefixes

## Project Structure

```
src/
├── components/          # React components
│   ├── add-batch/      # Batch creation wizard steps
│   ├── batch/          # Batch-related components
│   ├── dashboard/      # Dashboard components
│   ├── inventory/      # Inventory management components
│   ├── layouts/        # Layout components
│   ├── operations/     # Operations/task components
│   ├── sales/          # Sales-related components
│   ├── search/         # Search functionality
│   └── ui/             # shadcn-ui components
├── contexts/           # React contexts
│   └── BottomNavContext.tsx
├── data/               # Mock data and data utilities
│   ├── batches.ts
│   ├── locations.ts
│   ├── tasks.ts
│   ├── orders.ts
│   ├── quotes.ts
│   ├── invoices.ts
│   └── ...
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   ├── useLineItems.ts
│   ├── useLocationPagination.ts
│   ├── useSearch.tsx
│   └── useTaskFiltering.ts
├── lib/                # Utility functions
│   ├── batchIdUtils.ts
│   ├── batchLocationUtils.ts
│   ├── costCalculations.ts
│   ├── locationUtils.ts
│   ├── salesCalculations.ts
│   └── ...
├── pages/              # Page components
│   ├── managers/       # Manager views
│   │   ├── batches/
│   │   ├── sales/
│   │   ├── settings/
│   │   └── reporting/
│   └── workers/        # Worker views
├── types/              # TypeScript type definitions
│   ├── batch.ts
│   ├── cost.ts
│   ├── sales.ts
│   └── ...
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Application Architecture

### Entry Point

**main.tsx** - Application entry point that renders the App component into the DOM.

### App Component

**App.tsx** - Root component that sets up:
- Error boundary for error handling
- Theme provider for theme management
- React Query client for server state
- React Router for routing
- Global providers (TooltipProvider, Toaster, etc.)
- Route definitions

### Code Splitting

All page components are lazy-loaded using `React.lazy()`:
- Reduces initial bundle size
- Improves load time
- Suspense boundaries for loading states

### Routing Structure

#### Public Routes
- `/` - Home/landing page
- `/dashboard` - General dashboard
- `/batches` - Batch listing
- `/tasks` - Task listing
- `/sales` - Sales overview
- `/planning` - Planning view

#### Manager Routes
- `/managers` - Manager dashboard
- `/managers/inventory` - Inventory management
- `/managers/batch/:batchId` - Batch detail
- `/managers/batches/add` - Add batch
- `/managers/sales/*` - Sales management
- `/managers/operations` - Operations/tasks
- `/managers/planning` - Planning
- `/managers/reporting` - Reporting
- `/managers/settings/*` - Settings
- `/managers/scan` - Scan functionality
- `/managers/search` - Search results

#### Worker Routes
- `/workers` - Worker home
- `/workers/tasks` - Worker tasks
- `/workers/inventory` - Worker inventory view
- `/workers/batch/:batchId` - Batch detail (worker view)
- `/workers/batches/add` - Add batch
- `/workers/scan` - Scan functionality
- `/workers/locations` - Location listing
- `/workers/profile` - Worker profile

## Component Architecture

### Layout Components

- **ManagerLayout** - Layout wrapper for manager views
- **SidebarPageLayout** - Layout with sidebar navigation
- **SettingsLayout** - Layout for settings pages

### Feature Components

Components organized by feature area:
- **add-batch/** - Multi-step batch creation wizard
- **batch/** - Batch detail and cost components
- **inventory/** - Inventory management components
- **sales/** - Sales workflow components
- **operations/** - Task management components

### UI Components

shadcn-ui components in `components/ui/`:
- Form components (Button, Input, Select, etc.)
- Layout components (Card, Dialog, Sheet, etc.)
- Feedback components (Toast, Alert, etc.)
- Navigation components (Tabs, Sidebar, etc.)

## State Management

### Server State (React Query)

React Query handles:
- Data fetching and caching
- Background refetching
- Error handling and retries
- Loading states

**QueryClient Configuration:**
- Retry: 2 attempts
- Stale time: 5 minutes
- Cache time: 10 minutes
- No refetch on window focus
- Refetch on reconnect

### Client State

- **React Context** - Global client state (BottomNavContext)
- **Local State** - Component-level state with useState
- **URL State** - Route parameters and query strings

### Form State

- **React Hook Form** - Form state management
- **Zod** - Schema validation
- Form validation integrated with React Hook Form

## Data Models

### Core Types

#### Batch
```typescript
interface Batch {
  id: string;
  species: string;
  scientificName: string;
  location: string;
  stage: string;
  quantity: number;
  health: string;
  totalCost?: number;
  perUnitCost?: number;
  // ... additional fields
}
```

#### Location
```typescript
interface Location {
  id: string;
  name: string;
  type: 'BUILDING' | 'BAY' | 'TABLE' | 'OTHER';
  parentLocationId?: string;
  maxCapacity?: number;
  currentCapacity?: number;
  // ... additional fields
}
```

#### Task
```typescript
interface Task {
  id: string;
  title?: string;
  status: 'Pending' | 'In Progress' | 'Scheduled' | 'Completed';
  assignee?: string;
  priority?: 'High' | 'Medium' | 'Low';
  type?: 'Watering' | 'Potting' | 'Sowing' | 'Movement' | 'Quality Check' | 'Treatment';
  // ... additional fields
}
```

#### Order
```typescript
interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'approved' | 'in_progress' | 'ready_to_dispatch' | 'dispatched' | 'completed';
  items: OrderLineItem[];
  total: number;
  // ... additional fields
}
```

## Utility Functions

### Location Utilities (`lib/locationUtils.ts`)
- Location hierarchy navigation
- Batch location queries
- Location capacity calculations

### Batch Utilities (`lib/batchLocationUtils.ts`)
- Batch location tracking
- Location history
- Movement operations

### Sales Utilities (`lib/salesUtils.ts`)
- Inventory selection
- Stock availability
- Sales calculations

### Cost Utilities (`lib/costCalculations.ts`)
- Cost calculations
- Margin calculations
- Cost aggregation

## Build & Deployment

### Development

```bash
npm run dev
```
- Starts Vite dev server on port 8080
- Hot module replacement
- Fast refresh

### Production Build

```bash
npm run build
```
- Creates optimized production build in `dist/`
- Code splitting
- Minification
- Tree shaking

### Build Configuration

**vite.config.ts:**
- React plugin with SWC
- Path aliases (`@/*` → `./src/*`)
- Server configuration (port 8080)

**TypeScript Configuration:**
- Path aliases for imports
- Relaxed strict mode for development
- Skip lib check for faster compilation

## Development Workflow

### Code Organization

- Feature-based component organization
- Shared utilities in `lib/`
- Type definitions in `types/`
- Mock data in `data/`

### Component Patterns

- Functional components with hooks
- TypeScript for type safety
- Props interfaces for component props
- Custom hooks for reusable logic

### Styling Approach

- Tailwind CSS utility classes
- Component-level styling
- Responsive design with Tailwind breakpoints
- Theme support via next-themes

## Performance Optimizations

### Code Splitting
- Lazy loading of page components
- Route-based code splitting
- Dynamic imports

### React Query
- Query caching
- Background refetching
- Optimistic updates
- Request deduplication

### Component Optimization
- Memoization where needed
- Efficient re-renders
- Virtual scrolling for large lists (future)

## Accessibility

### Features
- Skip to main content link
- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Screen reader support

### WCAG Compliance
- Color contrast
- Focus indicators
- Accessible form labels
- Error messaging

## Error Handling

### Error Boundary
- Global error boundary component
- Catches React errors
- Displays error UI
- Prevents app crashes

### Error States
- Component-level error handling
- User-friendly error messages
- Error recovery options

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## Deployment

### Static Hosting
- Build output in `dist/` directory
- Can be deployed to:
  - Vercel
  - Netlify
  - AWS S3 + CloudFront
  - Any static hosting service

### Environment Variables
- Configure via `.env` files
- Environment-specific configurations
- API endpoints (when backend added)

## Future Architecture Considerations

### Backend Integration
- API client setup
- Authentication/authorization
- Real-time updates (WebSockets)
- File upload handling

### Database
- Data persistence
- Real-time sync
- Offline support

### Testing
- Unit tests (Vitest)
- Integration tests
- E2E tests (Playwright)
- Component tests

### Monitoring
- Error tracking
- Performance monitoring
- Analytics integration
- User feedback
