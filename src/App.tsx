import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ArtigosPage from "./pages/ArtigosPage.tsx";
import ArtigoPage from "./pages/ArtigoPage.tsx";
import EnsaiosPage from "./pages/EnsaiosPage.tsx";
import PodcastPage from "./pages/PodcastPage.tsx";
import PodcastsPage from "./pages/PodcastsPage.tsx";
import ApoiarPage from "./pages/ApoiarPage.tsx";
import SobreNosPage from "./pages/SobreNosPage.tsx";
import BookReviewsPage from "./pages/BookReviewsPage.tsx";
import BookResenhaPage from "./pages/BookResenhaPage.tsx";
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
          <Route path="/artigos/:slug" element={<ArtigoPage />} />
          <Route path="/ensaios" element={<EnsaiosPage />} />
          <Route path="/podcasts" element={<PodcastsPage />} />
          <Route path="/podcasts/:slug" element={<PodcastPage />} />
          <Route path="/apoiar" element={<ApoiarPage />} />
          <Route path="/sobre" element={<SobreNosPage />} />
          <Route path="/resenhas" element={<BookReviewsPage />} />
          <Route path="/resenhas/:slug" element={<BookResenhaPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
