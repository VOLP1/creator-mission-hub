import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "./pages/Home";
import Alarme from "./pages/Alarme";
import QuemSomos from "./pages/QuemSomos";
import Projetos from "./pages/Projetos";
import NotFound from "./pages/NotFound";
import Fundadores from "./pages/Fundadores";
import { Dialog } from "@/components/ui/dialog";
import ManifestoSignModal from "@/components/modals/ManifestoSignModal";

const queryClient = new QueryClient();

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openManifesto = () => setIsModalOpen(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <ScrollToTop />
          <Navbar onOpenManifesto={openManifesto} />
          <Routes>
            <Route path="/" element={<Home onOpenManifesto={openManifesto} />} />
            <Route path="/alarme" element={<Alarme />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/fundadores" element={<Fundadores />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Controlled Modal Root */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <ManifestoSignModal onClose={() => setIsModalOpen(false)} />
          </Dialog>

          <Footer />
        </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
