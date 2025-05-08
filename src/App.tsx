
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Carteira from "./pages/Carteira";
import Contas from "./pages/Contas";
import Contratos from "./pages/Contratos";
import Enderecos from "./pages/Enderecos";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Wrapper component for page transitions
const PageTransition = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="w-full h-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/carteira" element={<Carteira />} />
          <Route path="/contas" element={<Contas />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="/enderecos" element={<Enderecos />} />
          <Route path="/configuracoes" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

// App component with proper provider nesting order
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <PageTransition />
        </TooltipProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
