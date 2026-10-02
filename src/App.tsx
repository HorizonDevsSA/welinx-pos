import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { TopBanner } from '@/components/layout/TopBanner';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { SolutionsPage } from '@/pages/SolutionsPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { HardwarePage } from '@/pages/HardwarePage';
import { PricingPage } from '@/pages/PricingPage';
import { ComparePage } from '@/pages/ComparePage';
import { InteractiveDemoPage } from '@/pages/InteractiveDemoPage';
import { BookDemoPage } from '@/pages/BookDemoPage';
import { RoiCalculatorPage } from '@/pages/RoiCalculatorPage';
import { BlogPage } from '@/pages/BlogPage';
import { DocsAndApiPage } from '@/pages/DocsAndApiPage';
import { ContactPage } from '@/pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#090D16] text-[#F9FAFB]">
      <ScrollToTop />
      <TopBanner />
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Solutions */}
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/:slug" element={<SolutionsPage />} />

          {/* Products */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductsPage />} />

          {/* Hardware */}
          <Route path="/hardware" element={<HardwarePage />} />

          {/* Pricing */}
          <Route path="/pricing" element={<PricingPage />} />

          {/* Competitor Comparisons */}
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/compare/:slug" element={<ComparePage />} />

          {/* Live Interactive Sandbox & Booking */}
          <Route path="/demo" element={<InteractiveDemoPage />} />
          <Route path="/book-demo" element={<BookDemoPage />} />

          {/* Resources */}
          <Route path="/resources/roi-calculator" element={<RoiCalculatorPage />} />
          <Route path="/resources/blog" element={<BlogPage />} />
          <Route path="/resources/docs-and-api" element={<DocsAndApiPage />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
