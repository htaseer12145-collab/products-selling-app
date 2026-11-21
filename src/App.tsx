import { useEffect, useMemo, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import {
  HERO_IMAGE,
  INITIAL_ADSENSE_CONFIG,
  INITIAL_BRAND_CONFIGS,
  INITIAL_GUIDES,
  INITIAL_PRODUCTS,
} from './data/catalog';
import {
  AdSenseConfig,
  AppView,
  BrandAffiliateConfig,
  BrandId,
  CategoryId,
  LegalDocType,
  ProductDeal,
} from './types';
import { AdSenseSlot } from './components/AdSenseSlot';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BuyingGuideReader } from './components/BuyingGuideReader';
import { AffiliatePlaybookView } from './components/AffiliatePlaybookView';
import { OwnerStudioView } from './components/OwnerStudioView';
import { ComplianceModal } from './components/ComplianceModal';

const STORAGE_KEYS = {
  products: 'haider_picks_products_v1',
  brands: 'haider_picks_brands_v1',
  adsense: 'haider_picks_adsense_v1',
};

function loadStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [view, setView] = useState<AppView>('storefront');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [products, setProducts] = useState<ProductDeal[]>(() =>
    loadStored(STORAGE_KEYS.products, INITIAL_PRODUCTS)
  );
  const [brandConfigs, setBrandConfigs] = useState<BrandAffiliateConfig[]>(() =>
    loadStored(STORAGE_KEYS.brands, INITIAL_BRAND_CONFIGS)
  );
  const [adsenseConfig, setAdsenseConfig] = useState<AdSenseConfig>(() =>
    loadStored(STORAGE_KEYS.adsense, INITIAL_ADSENSE_CONFIG)
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<BrandId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>(
    'popular'
  );

  const [inspectedProduct, setInspectedProduct] = useState<ProductDeal | null>(
    null
  );
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [legalDoc, setLegalDoc] = useState<LegalDocType | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
    } catch {
      // Ignore storage quota errors
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.brands, JSON.stringify(brandConfigs));
    } catch {
      // Ignore storage quota errors
    }
  }, [brandConfigs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.adsense, JSON.stringify(adsenseConfig));
    } catch {
      // Ignore storage quota errors
    }
  }, [adsenseConfig]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((item) => {
      if (selectedBrand !== 'all' && item.brand !== selectedBrand) return false;
      if (selectedCategory !== 'all' && item.category !== selectedCategory)
        return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.brandLabel.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q)
      );
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePkr - b.pricePkr;
      if (sortBy === 'price-desc') return b.pricePkr - a.pricePkr;
      return b.clicks - a.clicks;
    });
  }, [products, searchQuery, selectedBrand, selectedCategory, sortBy]);

  function handleOutboundClick(productId: string) {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, clicks: item.clicks + 1 } : item
      )
    );
  }

  function handleUpdateBrandTracking(brandId: BrandId, trackingId: string) {
    setBrandConfigs((prev) =>
      prev.map((b) => (b.id === brandId ? { ...b, trackingId } : b))
    );
  }

  function handleAddProduct(product: ProductDeal) {
    setProducts((prev) => [product, ...prev]);
  }

  function handleDeleteProduct(productId: string) {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }

  function handleResetDefaults() {
    setProducts(INITIAL_PRODUCTS);
    setBrandConfigs(INITIAL_BRAND_CONFIGS);
    setAdsenseConfig(INITIAL_ADSENSE_CONFIG);
  }

  function navigateToStorefrontSection(sectionId: string) {
    setView('storefront');
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#141518]">
      {/* Strict 3-zone Top Bar Contract */}
      <header className="bg-white border-b border-[#E5E5E0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <button
            type="button"
            onClick={() => {
              setView('storefront');
              setSelectedGuideId(null);
              setMobileMenuOpen(false);
            }}
            className="font-editorial text-xl font-semibold tracking-tight text-[#141518] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0D6E4E]"
          >
            Haider Picks
          </button>

          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#575B63]"
          >
            <button
              type="button"
              onClick={() => navigateToStorefrontSection('deals-catalog')}
              className={`hover:text-[#141518] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                view === 'storefront' ? 'text-[#141518]' : ''
              }`}
            >
              Deals
            </button>
            <button
              type="button"
              onClick={() => navigateToStorefrontSection('partner-brands')}
              className="hover:text-[#141518] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Brands
            </button>
            <button
              type="button"
              onClick={() => {
                setView('guides');
                setSelectedGuideId(null);
              }}
              className={`hover:text-[#141518] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                view === 'guides' ? 'text-[#0D6E4E] font-semibold' : ''
              }`}
            >
              Buying Guides
            </button>
            <button
              type="button"
              onClick={() => setView('playbook')}
              className={`hover:text-[#141518] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                view === 'playbook' ? 'text-[#0D6E4E] font-semibold' : ''
              }`}
            >
              Join &amp; Earn
            </button>
            <button
              type="button"
              onClick={() => setLegalDoc('about')}
              className="hover:text-[#141518] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              About
            </button>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setView(view === 'owner' ? 'storefront' : 'owner');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0D6E4E] ${
                view === 'owner'
                  ? 'bg-[#141518] text-white hover:bg-[#2A2D33]'
                  : 'bg-[#0D6E4E] text-white hover:bg-[#09543B]'
              }`}
            >
              {view === 'owner' ? 'View Storefront' : 'Owner Studio'}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden p-2 rounded-lg text-[#141518] hover:bg-[#F4F4F0] cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E5E5E0] bg-white px-4 py-3 flex flex-col gap-2 text-sm font-medium text-[#141518]">
            <button
              type="button"
              onClick={() => navigateToStorefrontSection('deals-catalog')}
              className="text-left py-2 px-2 rounded-md hover:bg-[#F4F4F0]"
            >
              Deals
            </button>
            <button
              type="button"
              onClick={() => navigateToStorefrontSection('partner-brands')}
              className="text-left py-2 px-2 rounded-md hover:bg-[#F4F4F0]"
            >
              Brands
            </button>
            <button
              type="button"
              onClick={() => {
                setView('guides');
                setSelectedGuideId(null);
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-2 rounded-md hover:bg-[#F4F4F0]"
            >
              Buying Guides
            </button>
            <button
              type="button"
              onClick={() => {
                setView('playbook');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-2 rounded-md hover:bg-[#F4F4F0]"
            >
              Join &amp; Earn
            </button>
            <button
              type="button"
              onClick={() => {
                setLegalDoc('about');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-2 rounded-md hover:bg-[#F4F4F0]"
            >
              About
            </button>
          </div>
        )}
      </header>

      <main className="flex-1">
        {view === 'storefront' && (
          <>
            {/* Section 1: Storefront Split Hero */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-[#E5E5E0] rounded-xl overflow-hidden">
                <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between gap-6">
                  <div>
                    <p className="text-xs font-medium text-[#0D6E4E] mb-3">
                      Curated in Pakistan by Syed Taseer Haider · Verified Store Links
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-semibold text-[#141518] leading-[1.12] text-balance">
                      Trusted Daily Deals From Daraz, Amazon &amp; Local Brands
                    </h1>
                    <p className="text-base text-[#575B63] leading-relaxed mt-4 max-w-[54ch]">
                      Compare genuine PKR prices, Cash on Delivery availability, and buyer-tested tech, fashion, and lifestyle picks in one clean destination.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => navigateToStorefrontSection('deals-catalog')}
                      className="px-5 py-3 text-sm font-semibold text-white bg-[#0D6E4E] hover:bg-[#09543B] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Explore Verified Deals
                    </button>
                    <button
                      type="button"
                      onClick={() => setView('playbook')}
                      className="px-4 py-3 text-sm font-medium text-[#141518] bg-[#F4F4F0] hover:bg-[#EAEAE4] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Affiliate &amp; AdSense Guide
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 min-h-[260px] lg:min-h-full bg-[#F1F1ED]">
                  <img
                    src={HERO_IMAGE}
                    alt="Curated wireless headphones, titanium smartwatch, and desk essentials"
                    referrerPolicy="no-referrer"
                    className="w-full h-full lg:h-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Section 2: AdSense Leaderboard + Filterable Affiliate Deals Grid */}
            <section
              id="deals-catalog"
              className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8"
            >
              <AdSenseSlot
                config={adsenseConfig}
                variant="leaderboard"
                onConfigureClick={() => setView('owner')}
              />

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#141518]">
                    Featured Brand Deals
                  </h2>
                  <p className="text-sm text-[#575B63] mt-1">
                    Click any product for specs or shop directly on the verified merchant store.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 sm:w-64">
                    <Search
                      className="w-4 h-4 text-[#6B7079] absolute left-3 top-1/2 -translate-y-1/2"
                      aria-hidden="true"
                    />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search earbuds, Daraz, cotton..."
                      aria-label="Search deals"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#E5E5E0] rounded-lg focus:outline-none focus:border-[#0D6E4E]"
                    />
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as 'popular' | 'price-asc' | 'price-desc'
                      )
                    }
                    aria-label="Sort deals"
                    className="px-3 py-2 text-sm bg-white border border-[#E5E5E0] rounded-lg focus:outline-none focus:border-[#0D6E4E] cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Brand & Category Filter Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E5E5E0]">
                <div
                  role="tablist"
                  aria-label="Filter by shopping brand"
                  className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedBrand('all')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedBrand === 'all'
                        ? 'bg-[#141518] text-white'
                        : 'text-[#575B63] hover:text-[#141518] hover:bg-[#EAEAE4]'
                    }`}
                  >
                    All Stores
                  </button>
                  {brandConfigs.map((brand) => (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => setSelectedBrand(brand.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedBrand === brand.id
                          ? 'bg-[#141518] text-white'
                          : 'text-[#575B63] hover:text-[#141518] hover:bg-[#EAEAE4]'
                      }`}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>

                <div
                  role="tablist"
                  aria-label="Filter by category"
                  className="flex items-center gap-1 overflow-x-auto"
                >
                  {(
                    [
                      ['all', 'All'],
                      ['audio', 'Audio'],
                      ['wearables', 'Wearables'],
                      ['computing', 'Computing'],
                      ['fashion', 'Fashion'],
                      ['skincare', 'Skincare'],
                    ] as Array<[CategoryId, string]>
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedCategory(id)}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedCategory === id
                          ? 'bg-[#0D6E4E] text-white'
                          : 'text-[#575B63] hover:text-[#141518]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      brandConfigs={brandConfigs}
                      onInspect={setInspectedProduct}
                      onOutboundClick={handleOutboundClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-[#E5E5E0] rounded-xl p-10 text-center">
                  <p className="text-base font-medium text-[#141518]">
                    No deals match your current filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedBrand('all');
                      setSelectedCategory('all');
                    }}
                    className="mt-3 px-4 py-2 text-xs font-medium text-white bg-[#0D6E4E] rounded-lg cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              <AdSenseSlot
                config={adsenseConfig}
                variant="infeed"
                onConfigureClick={() => setView('owner')}
              />
            </section>

            {/* Section 3: Buying Guides for SEO & AdSense Approval */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-medium text-[#0D6E4E] mb-1">
                    Buyer Research &amp; Price Comparisons
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#141518]">
                    Pakistan Shopping &amp; Customs Guides
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setView('guides');
                    setSelectedGuideId(null);
                  }}
                  className="text-sm font-semibold text-[#0D6E4E] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Browse All Guides →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INITIAL_GUIDES.map((guide) => (
                  <article
                    key={guide.id}
                    className="bg-white border border-[#E5E5E0] rounded-xl p-6 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#575B63] mb-2">
                        <span>{guide.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{guide.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#141518] leading-snug">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedGuideId(guide.id);
                            setView('guides');
                          }}
                          className="text-left hover:text-[#0D6E4E] transition-colors cursor-pointer"
                        >
                          {guide.title}
                        </button>
                      </h3>
                      <p className="text-sm text-[#575B63] leading-relaxed mt-2 line-clamp-3">
                        {guide.excerpt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedGuideId(guide.id);
                        setView('guides');
                      }}
                      className="text-xs font-semibold text-[#0D6E4E] hover:underline text-left cursor-pointer"
                    >
                      Read Guide →
                    </button>
                  </article>
                ))}
              </div>
            </section>

            {/* Section 4: Partner Shopping Platforms Directory */}
            <section
              id="partner-brands"
              className="max-w-6xl mx-auto px-4 sm:px-6 pb-14"
            >
              <div className="bg-white border border-[#E5E5E0] rounded-xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E5E5E0]">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#141518]">
                      Supported Shopping Brands in Pakistan
                    </h2>
                    <p className="text-sm text-[#575B63] mt-1">
                      Filter deals by store or read the step-by-step affiliate registration process.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setView('playbook')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#141518] hover:bg-[#2A2D33] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    How to Join Programs →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
                  {brandConfigs.map((brand) => (
                    <div
                      key={brand.id}
                      className="p-4 rounded-lg bg-[#F8F8F6] border border-[#E5E5E0] flex flex-col justify-between gap-3"
                    >
                      <div>
                        <h3 className="text-base font-semibold text-[#141518]">
                          {brand.name}
                        </h3>
                        <p className="text-xs text-[#0D6E4E] font-medium mt-0.5">
                          {brand.commissionRange}
                        </p>
                        <p className="text-xs text-[#575B63] mt-2 leading-relaxed">
                          {brand.availability} · {brand.payoutMethods}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBrand(brand.id);
                          navigateToStorefrontSection('deals-catalog');
                        }}
                        className="text-xs font-semibold text-[#141518] hover:text-[#0D6E4E] text-left cursor-pointer"
                      >
                        Filter {brand.name} Deals →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'guides' && (
          <BuyingGuideReader
            guides={INITIAL_GUIDES}
            selectedGuideId={selectedGuideId}
            onSelectGuide={setSelectedGuideId}
            products={products}
            brandConfigs={brandConfigs}
            adsenseConfig={adsenseConfig}
            onInspectProduct={setInspectedProduct}
            onOutboundClick={handleOutboundClick}
            onConfigureAdSense={() => setView('owner')}
          />
        )}

        {view === 'playbook' && (
          <AffiliatePlaybookView
            brandConfigs={brandConfigs}
            onOpenOwnerStudio={() => setView('owner')}
          />
        )}

        {view === 'owner' && (
          <OwnerStudioView
            products={products}
            brandConfigs={brandConfigs}
            adsenseConfig={adsenseConfig}
            onUpdateBrandTracking={handleUpdateBrandTracking}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateAdsense={setAdsenseConfig}
            onResetDefaults={handleResetDefaults}
          />
        )}
      </main>

      <footer className="bg-white border-t border-[#E5E5E0] mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-editorial text-lg font-semibold text-[#141518]">
              Haider Picks
            </p>
            <p className="text-xs text-[#575B63] mt-1">
              Curated by Syed Taseer Haider · Pakistan Affiliate Deals &amp; Buying Guides · htaseer12145@gmail.com
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-[#575B63]">
            <button
              type="button"
              onClick={() => setLegalDoc('about')}
              className="hover:text-[#141518] cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => setLegalDoc('disclosure')}
              className="hover:text-[#141518] cursor-pointer"
            >
              Affiliate Disclosure
            </button>
            <button
              type="button"
              onClick={() => setLegalDoc('privacy')}
              className="hover:text-[#141518] cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalDoc('terms')}
              className="hover:text-[#141518] cursor-pointer"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </footer>

      <ProductDetailModal
        product={inspectedProduct}
        brandConfigs={brandConfigs}
        onClose={() => setInspectedProduct(null)}
        onOutboundClick={handleOutboundClick}
      />

      <ComplianceModal
        docType={legalDoc}
        onClose={() => setLegalDoc(null)}
      />
    </div>
  );
}
