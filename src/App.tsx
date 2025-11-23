import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { BottomNavProvider } from "@/contexts/BottomNavContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Batches = lazy(() => import("./pages/Batches"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Sales = lazy(() => import("./pages/Sales"));
const Planning = lazy(() => import("./pages/Planning"));
const WorkersView = lazy(() => import("./pages/WorkersView"));
const ManagersView = lazy(() => import("./pages/ManagersView"));
const ManagerDashboard = lazy(() => import("./pages/managers/Dashboard"));
const ManagerInventory = lazy(() => import("./pages/managers/Inventory"));
const ManagerSales = lazy(() => import("./pages/managers/Sales"));
const ManagerSalesQuotes = lazy(() => import("./pages/managers/sales/Quotes"));
const ManagerSalesOrders = lazy(() => import("./pages/managers/sales/Orders"));
const ManagerSalesInvoices = lazy(() => import("./pages/managers/sales/Invoices"));
const ManagerSalesClients = lazy(() => import("./pages/managers/sales/Clients"));
const CreateQuote = lazy(() => import("./pages/managers/sales/CreateQuote"));
const CreateOrder = lazy(() => import("./pages/managers/sales/CreateOrder"));
const EditQuote = lazy(() => import("./pages/managers/sales/EditQuote"));
const EditOrder = lazy(() => import("./pages/managers/sales/EditOrder"));
const QuoteDetail = lazy(() => import("./pages/managers/sales/QuoteDetail"));
const OrderDetail = lazy(() => import("./pages/managers/sales/OrderDetail"));
const InvoiceDetail = lazy(() => import("./pages/managers/sales/InvoiceDetail"));
const ManagerOperations = lazy(() => import("./pages/managers/Operations"));
const ManagerTaskDetail = lazy(() => import("./pages/managers/TaskDetail"));
const ManagerPlanning = lazy(() => import("./pages/managers/Planning"));
const ManagerReporting = lazy(() => import("./pages/managers/Reporting"));
const ManagerSettings = lazy(() => import("./pages/managers/Settings"));
const ManagerLocationDetail = lazy(() => import("./pages/managers/LocationDetail"));
const ManagerScan = lazy(() => import("./pages/managers/Scan"));
const ManagerAddBatch = lazy(() => import("./pages/managers/batches/AddBatch"));
const ManagerBatchDetail = lazy(() => import("./pages/managers/batches/BatchDetail"));
const ManagerSearchResults = lazy(() => import("./pages/managers/SearchResults"));
const ManagerProfile = lazy(() => import("./pages/managers/Profile"));
const CostLibrary = lazy(() => import("./pages/managers/settings/CostLibrary"));
const ManagerUsersSettings = lazy(() => import("./pages/managers/settings/Users"));
const ManagerLocationsSettings = lazy(() => import("./pages/managers/settings/Locations"));
const ManagerSpeciesSettings = lazy(() => import("./pages/managers/settings/Species"));
const ManagerSystemSettings = lazy(() => import("./pages/managers/settings/System"));
const CostAnalysis = lazy(() => import("./pages/managers/reporting/CostAnalysis"));
const WorkerHome = lazy(() => import("./pages/workers/Home"));
const WorkerTasks = lazy(() => import("./pages/workers/Tasks"));
const WorkerTaskDetail = lazy(() => import("./pages/workers/TaskDetail"));
const WorkerInventory = lazy(() => import("./pages/workers/Inventory"));
const WorkerBatchDetail = lazy(() => import("./pages/workers/BatchDetail"));
const WorkerAddBatch = lazy(() => import("./pages/workers/AddBatch"));
const WorkerScan = lazy(() => import("./pages/workers/Scan"));
const WorkerLocations = lazy(() => import("./pages/workers/Locations"));
const WorkerLocationDetail = lazy(() => import("./pages/workers/LocationDetail"));
const WorkerProfile = lazy(() => import("./pages/workers/Profile"));
const ComponentLibrary = lazy(() => import("./pages/ComponentLibrary"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Enhanced QueryClient with error handling, retry logic, and cache management
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Loading fallback component
const PageLoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-white p-4">
    <div className="w-full max-w-4xl space-y-4">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-64 w-full" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <BottomNavProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              {/* Skip to main content link for accessibility */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-forest-green focus:text-white focus:rounded-lg focus:font-heading focus:font-bold focus:uppercase focus:tracking-button"
              >
                Skip to main content
              </a>
              <Suspense fallback={<PageLoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/batches" element={<Batches />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/sales" element={<Sales />} />
                  <Route path="/planning" element={<Planning />} />
                  
                  {/* Manager Routes */}
                  <Route path="/managers" element={<ManagerDashboard />} />
                  <Route path="/managers/inventory" element={<ManagerInventory />} />
                  <Route path="/managers/batch/:batchId" element={<ManagerBatchDetail />} />
                  <Route path="/managers/batches/add" element={<ManagerAddBatch />} />
                  <Route path="/managers/sales" element={<ManagerSales />} />
                  <Route path="/managers/sales/quotes" element={<ManagerSalesQuotes />} />
                  <Route path="/managers/sales/quotes/new" element={<CreateQuote />} />
                  <Route path="/managers/sales/quotes/:quoteId/edit" element={<EditQuote />} />
                  <Route path="/managers/sales/quotes/:quoteId" element={<QuoteDetail />} />
                  <Route path="/managers/sales/orders" element={<ManagerSalesOrders />} />
                  <Route path="/managers/sales/orders/create" element={<CreateOrder />} />
                  <Route path="/managers/sales/orders/:orderId/edit" element={<EditOrder />} />
                  <Route path="/managers/sales/orders/:orderId" element={<OrderDetail />} />
                  <Route path="/managers/sales/invoices" element={<ManagerSalesInvoices />} />
                  <Route path="/managers/sales/invoices/:invoiceId" element={<InvoiceDetail />} />
                  <Route path="/managers/sales/clients" element={<ManagerSalesClients />} />
                  <Route path="/managers/operations" element={<ManagerOperations />} />
                  <Route path="/managers/tasks/:taskId" element={<ManagerTaskDetail />} />
                  <Route path="/managers/planning" element={<ManagerPlanning />} />
                  <Route path="/managers/reporting" element={<ManagerReporting />} />
                  <Route path="/managers/reporting/cost-analysis" element={<CostAnalysis />} />
                  <Route path="/managers/settings" element={<ManagerSettings />} />
                  <Route path="/managers/settings/cost-library" element={<CostLibrary />} />
                  <Route path="/managers/settings/users" element={<ManagerUsersSettings />} />
                  <Route path="/managers/settings/locations" element={<ManagerLocationsSettings />} />
                  <Route path="/managers/settings/species" element={<ManagerSpeciesSettings />} />
                  <Route path="/managers/settings/system" element={<ManagerSystemSettings />} />
                  <Route path="/managers/profile" element={<ManagerProfile />} />
                  <Route path="/managers/locations/:locationId" element={<ManagerLocationDetail />} />
                  <Route path="/managers/scan" element={<ManagerScan />} />
                  <Route path="/managers/search" element={<ManagerSearchResults />} />
                  
                  {/* Worker Routes */}
                  <Route path="/workers" element={<WorkerHome />} />
                  <Route path="/workers/tasks" element={<WorkerTasks />} />
                  <Route path="/workers/tasks/:taskId" element={<WorkerTaskDetail />} />
                  <Route path="/workers/inventory" element={<WorkerInventory />} />
                  <Route path="/workers/batch/:batchId" element={<WorkerBatchDetail />} />
                  <Route path="/workers/batches/add" element={<WorkerAddBatch />} />
                  <Route path="/workers/scan" element={<WorkerScan />} />
                  <Route path="/workers/locations" element={<WorkerLocations />} />
                  <Route path="/workers/locations/:locationId" element={<WorkerLocationDetail />} />
                      <Route path="/workers/profile" element={<WorkerProfile />} />

                      {/* Component Library */}
                      <Route path="/components" element={<ComponentLibrary />} />

                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </BottomNavProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
