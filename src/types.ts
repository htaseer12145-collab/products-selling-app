export type BrandId =
  | 'daraz'
  | 'amazon'
  | 'aliexpress'
  | 'priceoye'
  | 'khaadi'
  | 'telemart';

export type CategoryId =
  | 'all'
  | 'audio'
  | 'wearables'
  | 'computing'
  | 'fashion'
  | 'skincare';

export type AppView =
  | 'storefront'
  | 'guides'
  | 'playbook'
  | 'owner';

export type LegalDocType = 'disclosure' | 'privacy' | 'terms' | 'about';

export interface ProductDeal {
  id: string;
  title: string;
  brand: BrandId;
  brandLabel: string;
  category: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  pricePkr: number;
  originalPricePkr?: number;
  rating: string;
  shippingNote: string;
  codAvailable: boolean;
  affiliateUrl: string;
  imageUrl: string;
  summary: string;
  pros: string[];
  specs: Array<{ label: string; value: string }>;
  clicks: number;
  featured?: boolean;
}

export interface BrandAffiliateConfig {
  id: BrandId;
  name: string;
  availability: string;
  commissionRange: string;
  cookieWindow: string;
  payoutMethods: string;
  signupUrl: string;
  paramKey: string;
  trackingId: string;
  description: string;
  steps: string[];
}

export interface BuyingGuide {
  id: string;
  title: string;
  categoryLabel: string;
  readTime: string;
  publishedDate: string;
  excerpt: string;
  coverImage: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
  relatedProductIds: string[];
}

export interface AdSenseConfig {
  publisherId: string;
  enabled: boolean;
  showPreviewSlots: boolean;
  leaderboardSlotId: string;
  inFeedSlotId: string;
  articleSlotId: string;
}
