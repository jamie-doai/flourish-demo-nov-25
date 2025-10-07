import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ManagerOperations from "./pages/managers/Operations";
import ManagerPlanning from "./pages/managers/Planning";
import ManagerReporting from "./pages/managers/Reporting";
import ManagerSettings from "./pages/managers/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="/workers" element={<WorkersView />} />
          <Route path="/managers" element={<ManagerDashboard />} />
          <Route path="/managers/inventory" element={<ManagerInventory />} />
          <Route path="/managers/sales" element={<ManagerSales />} />
          <Route path="/managers/operations" element={<ManagerOperations />} />
          <Route path="/managers/planning" element={<ManagerPlanning />} />
          <Route path="/managers/reporting" element={<ManagerReporting />} />
          <Route path="/managers/settings" element={<ManagerSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
