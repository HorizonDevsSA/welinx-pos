import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ComparisonTableSection } from '@/components/home/ComparisonTableSection';
import { ProductSuiteTabs } from '@/components/home/ProductSuiteTabs';
import { RoiCalculatorSection } from '@/components/home/RoiCalculatorSection';
import { HardwareShowcaseSection } from '@/components/home/HardwareShowcaseSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FaqSection } from '@/components/home/FaqSection';
import { CtaBannerSection } from '@/components/home/CtaBannerSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <ComparisonTableSection />
      <ProductSuiteTabs />
      <RoiCalculatorSection />
      <HardwareShowcaseSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaBannerSection />
    </div>
  );
};
