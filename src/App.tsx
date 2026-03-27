import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ArtigosPage from "./pages/ArtigosPage.tsx";
import EnsaiosPage from "./pages/EnsaiosPage.tsx";
import PodcastPage from "./pages/PodcastPage.tsx";
import PodcastsPage from "./pages/PodcastsPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/artigos" element={<ArtigosPage />} />
          <Route path="/ensaios" element={<EnsaiosPage />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/podcasts" element={<PodcastsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
