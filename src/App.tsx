import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Batches from "./pages/Batches";
import Tasks from "./pages/Tasks";
import Sales from "./pages/Sales";
import Planning from "./pages/Planning";
import WorkersView from "./pages/WorkersView";
import ManagersView from "./pages/ManagersView";
import ManagerDashboard from "./pages/managers/Dashboard";
import ManagerInventory from "./pages/managers/Inventory";
import ManagerSales from "./pages/managers/Sales";
import ManagerSalesQuotes from "./pages/managers/sales/Quotes";
import ManagerSalesOrders from "./pages/managers/sales/Orders";
import ManagerSalesClients from "./pages/managers/sales/Clients";
import ManagerOperations from "./pages/managers/Operations";
import ManagerPlanning from "./pages/managers/Planning";
import ManagerReporting from "./pages/managers/Reporting";
import ManagerSettings from "./pages/managers/Settings";
import WorkerHome from "./pages/workers/Home";
import WorkerTasks from "./pages/workers/Tasks";
import WorkerTaskDetail from "./pages/workers/TaskDetail";
import WorkerInventory from "./pages/workers/Inventory";
import WorkerBatchDetail from "./pages/workers/BatchDetail";
import WorkerScan from "./pages/workers/Scan";
import WorkerLocations from "./pages/workers/Locations";
import WorkerLocationDetail from "./pages/workers/LocationDetail";
import WorkerProfile from "./pages/workers/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
          <Route path="/managers/sales" element={<ManagerSales />} />
          <Route path="/managers/sales/quotes" element={<ManagerSalesQuotes />} />
          <Route path="/managers/sales/orders" element={<ManagerSalesOrders />} />
          <Route path="/managers/sales/clients" element={<ManagerSalesClients />} />
          <Route path="/managers/operations" element={<ManagerOperations />} />
          <Route path="/managers/planning" element={<ManagerPlanning />} />
          <Route path="/managers/reporting" element={<ManagerReporting />} />
          <Route path="/managers/settings" element={<ManagerSettings />} />
          
          {/* Worker Routes */}
          <Route path="/workers" element={<WorkerHome />} />
          <Route path="/workers/tasks" element={<WorkerTasks />} />
          <Route path="/workers/tasks/:taskId" element={<WorkerTaskDetail />} />
          <Route path="/workers/inventory" element={<WorkerInventory />} />
          <Route path="/workers/batch/:batchId" element={<WorkerBatchDetail />} />
          <Route path="/workers/scan" element={<WorkerScan />} />
          <Route path="/workers/locations" element={<WorkerLocations />} />
          <Route path="/workers/locations/:locationId" element={<WorkerLocationDetail />} />
          <Route path="/workers/profile" element={<WorkerProfile />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
