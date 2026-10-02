export interface SolutionVertical {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  iconName?: string;
  heroBadge: string;
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  hardwareBundle: {
    name: string;
    tag: string;
    image: string;
    description: string;
    specs: string[];
    priceOutright: number;
    priceHaas: number;
  };
  metrics: {
    value: string;
    label: string;
  }[];
  caseStudy: {
    quote: string;
    author: string;
    role: string;
    business: string;
    avatar: string;
    results: string;
  };
}

export interface ProductFeature {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  badge: string;
  headline: string;
  subheadline: string;
  highlights: {
    title: string;
    description: string;
    stat?: string;
  }[];
  techSpecs: {
    label: string;
    value: string;
  }[];
  architecturePoints: string[];
}

export interface HardwareItem {
  id: string;
  name: string;
  category: 'terminal' | 'kiosk' | 'mpos' | 'peripheral';
  tagline: string;
  image: string;
  priceOutright: number;
  priceLeasePerMonth: number;
  popular?: boolean;
  specs: string[];
  features: string[];
  inStock: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  badge?: string;
  terminalsIncluded: number;
  processingRate: string;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
}

export interface CompetitorComparison {
  competitor: 'Toast' | 'Square' | 'Clover';
  slug: string;
  tagline: string;
  verdict: string;
  table: {
    feature: string;
    welinx: string;
    competitor: string;
    welinxAdvantage: boolean;
  }[];
  keyTakeaways: {
    title: string;
    description: string;
  }[];
}

export interface CartItem {
  item: HardwareItem;
  quantity: number;
  paymentType: 'outright' | 'lease';
}
