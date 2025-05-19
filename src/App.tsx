import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Locations from "./pages/master-data/Locations";
import Suppliers from "./pages/master-data/Suppliers";
import Contracts from "./pages/master-data/Contracts";
import Tariffs from "./pages/master-data/Tariffs";
import SupplierUploads from "./pages/data-processing/SupplierUploads";
import FlySafairUploads from "./pages/data-processing/FlySafairUploads";
import CombinedRecords from "./pages/reconciliation/CombinedRecords";
import Queries from "./pages/reconciliation/Queries";
import UploadDocuments from "./pages/documents/UploadDocuments";
import ManageDocuments from "./pages/documents/ManageDocuments";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Master Data Routes */}
          <Route path="/master-data/locations" element={<Locations />} />
          <Route path="/master-data/suppliers" element={<Suppliers />} />
          <Route path="/master-data/contracts" element={<Contracts />} />
          <Route path="/master-data/tariffs" element={<Tariffs />} />
          
          {/* Data Processing Routes */}
          <Route path="/data-processing/supplier-uploads" element={<SupplierUploads />} />
          <Route path="/data-processing/flysafair-uploads" element={<FlySafairUploads />} />
          
          {/* Reconciliation Routes */}
          <Route path="/reconciliation/combined-records" element={<CombinedRecords />} />
          <Route path="/reconciliation/queries" element={<Queries />} />
          
          {/* Documents Routes */}
          <Route path="/documents/upload" element={<UploadDocuments />} />
          <Route path="/documents/manage" element={<ManageDocuments />} />
          
          {/* Reports Route */}
          <Route path="/reports" element={<Reports />} />
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
