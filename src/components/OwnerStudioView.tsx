import { useState, type FormEvent } from 'react';
import { Download, Plus, RotateCcw, Trash2 } from 'lucide-react';
import {
  AdSenseConfig,
  BrandAffiliateConfig,
  BrandId,
  CategoryId,
  ProductDeal,
} from '../types';
import { formatPkr, isValidHttpUrl } from '../utils/affiliate';

interface OwnerStudioViewProps {
  products: ProductDeal[];
  brandConfigs: BrandAffiliateConfig[];
  adsenseConfig: AdSenseConfig;
  onUpdateBrandTracking: (brandId: BrandId, trackingId: string) => void;
  onAddProduct: (product: ProductDeal) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateAdsense: (next: AdSenseConfig) => void;
  onResetDefaults: () => void;
}

const STUDIO_IMAGES = [
  {
    label: 'Headphones & Desk Setup',
    url: '/src/assets/images/hero_curated_tech_1795251293187.jpg',
  },
  {
    label: 'Wireless Earbuds Pro',
    url: '/src/assets/images/product_earbuds_pro_1795251293406.jpg',
  },
  {
    label: 'Titanium AMOLED Smartwatch',
    url: '/src/assets/images/product_smartwatch_amoled_1795251293094.jpg',
  },
  {
    label: 'Mechanical Keyboard',
    url: '/src/assets/images/product_mechanical_keyboard_1795251293474.jpg',
  },
  {
    label: 'Egyptian Cotton Menswear',
    url: '/src/assets/images/product_mens_kurta_1795251292647.jpg',
  },
  {
    label: 'Vitamin C Skincare Serum',
    url: '/src/assets/images/product_skincare_serum_1795251293424.jpg',
  },
];

const CATEGORY_LABELS: Record<Exclude<CategoryId, 'all'>, string> = {
  audio: 'Audio',
  wearables: 'Wearables',
  computing: 'Computing',
  fashion: 'Fashion',
  skincare: 'Skincare',
};

export function OwnerStudioView({
  products,
  brandConfigs,
  adsenseConfig,
  onUpdateBrandTracking,
  onAddProduct,
  onDeleteProduct,
  onUpdateAdsense,
  onResetDefaults,
}: OwnerStudioViewProps) {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState<BrandId>('daraz');
  const [category, setCategory] = useState<Exclude<CategoryId, 'all'>>('audio');
  const [pricePkr, setPricePkr] = useState('5999');
  const [originalPricePkr, setOriginalPricePkr] = useState('7500');
  const [affiliateUrl, setAffiliateUrl] = useState('https://www.daraz.pk/');
  const [imageUrl, setImageUrl] = useState(STUDIO_IMAGES[1].url);
  const [codAvailable, setCodAvailable] = useState(true);
  const [summary, setSummary] = useState('');
  const [formFeedback, setFormFeedback] = useState<string | null>(null);
  const [adsenseSavedMsg, setAdsenseSavedMsg] = useState<string | null>(null);

  const totalClicks = products.reduce((sum, item) => sum + item.clicks, 0);
  const activeBrandsCount = brandConfigs.filter(
    (b) => b.trackingId.trim().length > 0
  ).length;

  function handleCreateDeal(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      setFormFeedback('Please enter a product title and short description.');
      return;
    }
    if (!isValidHttpUrl(affiliateUrl.trim())) {
      setFormFeedback('Please enter a valid https:// affiliate URL.');
      return;
    }
    const parsedPrice = Number(pricePkr);
    const parsedOriginal = Number(originalPricePkr);
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setFormFeedback('Enter a valid PKR price.');
      return;
    }

    const brandObj = brandConfigs.find((b) => b.id === brand);
    const newProduct: ProductDeal = {
      id: `${brand}-${Date.now()}`,
      title: title.trim(),
      brand,
      brandLabel: brandObj ? brandObj.name : 'Daraz.pk',
      category,
      categoryLabel: CATEGORY_LABELS[category],
      pricePkr: Math.round(parsedPrice),
      originalPricePkr:
        Number.isFinite(parsedOriginal) && parsedOriginal > parsedPrice
          ? Math.round(parsedOriginal)
          : undefined,
      rating: '4.8 (Verified Pick)',
      shippingNote: codAvailable
        ? 'Cash on Delivery across Pakistan'
        : 'International / Card Payment',
      codAvailable,
      affiliateUrl: affiliateUrl.trim(),
      imageUrl: imageUrl.trim() || STUDIO_IMAGES[0].url,
      summary: summary.trim(),
      pros: [
        `Curated & verified by Syed Taseer Haider on ${brandObj?.name || brand}`,
        codAvailable
          ? 'Cash on Delivery supported for Pakistani buyers'
          : 'Tracked international shipping',
      ],
      specs: [
        { label: 'Storefront', value: brandObj?.name || brand },
        { label: 'Category', value: CATEGORY_LABELS[category] },
      ],
      clicks: 0,
    };

    onAddProduct(newProduct);
    setTitle('');
    setSummary('');
    setFormFeedback('Deal added to live storefront.');
    setTimeout(() => setFormFeedback(null), 3500);
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E5E5E0]">
        <div>
          <p className="text-xs font-medium text-[#0D6E4E] mb-1.5">
            Syed Taseer Haider · Monetization Control Center
          </p>
          <h1 className="text-3xl font-semibold text-[#141518]">
            Owner Affiliate &amp; AdSense Studio
          </h1>
          <p className="text-sm text-[#575B63] mt-1">
            Manage your Daraz, Amazon, and AliExpress tracking IDs, publish new deals, and connect Google AdSense.
          </p>
        </div>
        <button
          type="button"
          onClick={onResetDefaults}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#575B63] bg-white border border-[#E5E5E0] rounded-lg hover:text-[#141518] hover:border-[#141518] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* 4-column KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E5E5E0] rounded-xl p-5">
          <p className="text-xs text-[#6B7079]">Active Product Deals</p>
          <p className="font-mono text-2xl font-semibold text-[#141518] mt-1 tabular-nums">
            {products.length}
          </p>
        </div>
        <div className="bg-white border border-[#E5E5E0] rounded-xl p-5">
          <p className="text-xs text-[#6B7079]">Total Outbound Clicks</p>
          <p className="font-mono text-2xl font-semibold text-[#0D6E4E] mt-1 tabular-nums">
            {totalClicks}
          </p>
        </div>
        <div className="bg-white border border-[#E5E5E0] rounded-xl p-5">
          <p className="text-xs text-[#6B7079]">Connected Affiliate Brands</p>
          <p className="font-mono text-2xl font-semibold text-[#141518] mt-1 tabular-nums">
            {activeBrandsCount} / {brandConfigs.length}
          </p>
        </div>
        <div className="bg-white border border-[#E5E5E0] rounded-xl p-5">
          <p className="text-xs text-[#6B7079]">Google AdSense Mode</p>
          <p className="font-mono text-lg font-semibold text-[#141518] mt-1.5">
            {adsenseConfig.enabled && adsenseConfig.publisherId.startsWith('ca-pub-')
              ? 'Live Ads Active'
              : 'Preview Ready'}
          </p>
        </div>
      </div>

      {/* Affiliate Tracking IDs per Brand */}
      <div className="bg-white border border-[#E5E5E0] rounded-xl p-6 space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-[#141518]">
            1. Brand Affiliate Tracking IDs
          </h2>
          <p className="text-sm text-[#575B63] mt-1">
            Whenever a customer clicks “Shop on Brand”, your tracking parameter is automatically appended to the store URL.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brandConfigs.map((brandItem) => (
            <div
              key={brandItem.id}
              className="border border-[#E5E5E0] rounded-lg p-4 bg-[#F8F8F6] space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor={`brand-id-${brandItem.id}`}
                  className="text-sm font-semibold text-[#141518]"
                >
                  {brandItem.name}
                </label>
                <span className="font-mono text-[11px] text-[#575B63]">
                  ?{brandItem.paramKey}=
                </span>
              </div>
              <input
                id={`brand-id-${brandItem.id}`}
                type="text"
                value={brandItem.trackingId}
                onChange={(e) =>
                  onUpdateBrandTracking(brandItem.id, e.target.value)
                }
                placeholder={`Enter ${brandItem.name} ID`}
                className="w-full px-3 py-2 text-sm font-mono bg-white border border-[#D8D8D2] rounded-md focus:outline-none focus:border-[#0D6E4E]"
              />
              <p className="text-[11px] text-[#6B7079]">
                Commission: {brandItem.commissionRange}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Google AdSense Configuration */}
      <div className="bg-white border border-[#E5E5E0] rounded-xl p-6 space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-[#141518]">
            2. Google AdSense Setup
          </h2>
          <p className="text-sm text-[#575B63] mt-1">
            Paste your AdSense Publisher ID once approved by Google to render real display ads alongside your affiliate links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="adsense-pub-id"
              className="block text-xs font-medium text-[#141518] mb-1.5"
            >
              AdSense Publisher ID (starts with ca-pub-)
            </label>
            <input
              id="adsense-pub-id"
              type="text"
              value={adsenseConfig.publisherId}
              onChange={(e) => {
                onUpdateAdsense({
                  ...adsenseConfig,
                  publisherId: e.target.value,
                });
                setAdsenseSavedMsg('Saved locally');
                setTimeout(() => setAdsenseSavedMsg(null), 2000);
              }}
              placeholder="ca-pub-1234567890123456"
              className="w-full px-3 py-2 text-sm font-mono bg-[#F8F8F6] border border-[#D8D8D2] rounded-md focus:outline-none focus:border-[#0D6E4E]"
            />
          </div>

          <div>
            <label
              htmlFor="adsense-leaderboard-id"
              className="block text-xs font-medium text-[#141518] mb-1.5"
            >
              Leaderboard Ad Slot ID
            </label>
            <input
              id="adsense-leaderboard-id"
              type="text"
              value={adsenseConfig.leaderboardSlotId}
              onChange={(e) =>
                onUpdateAdsense({
                  ...adsenseConfig,
                  leaderboardSlotId: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm font-mono bg-[#F8F8F6] border border-[#D8D8D2] rounded-md focus:outline-none focus:border-[#0D6E4E]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-2">
          <label className="inline-flex items-center gap-2 text-sm text-[#141518] cursor-pointer">
            <input
              type="checkbox"
              checked={adsenseConfig.showPreviewSlots}
              onChange={(e) =>
                onUpdateAdsense({
                  ...adsenseConfig,
                  showPreviewSlots: e.target.checked,
                })
              }
              className="w-4 h-4 accent-[#0D6E4E]"
            />
            <span>Show AdSense placement previews on storefront</span>
          </label>

          <label className="inline-flex items-center gap-2 text-sm text-[#141518] cursor-pointer">
            <input
              type="checkbox"
              checked={adsenseConfig.enabled}
              onChange={(e) =>
                onUpdateAdsense({
                  ...adsenseConfig,
                  enabled: e.target.checked,
                })
              }
              className="w-4 h-4 accent-[#0D6E4E]"
            />
            <span>Activate live Google AdSense script</span>
          </label>

          {adsenseSavedMsg && (
            <span className="text-xs font-medium text-[#0D6E4E]">
              {adsenseSavedMsg}
            </span>
          )}
        </div>
      </div>

      {/* Add New Affiliate Product Form & Analytics Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form
          onSubmit={handleCreateDeal}
          className="lg:col-span-5 bg-white border border-[#E5E5E0] rounded-xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold text-[#141518]">
            3. Publish New Affiliate Deal
          </h2>

          <div>
            <label
              htmlFor="deal-title"
              className="block text-xs font-medium text-[#141518] mb-1"
            >
              Product Name
            </label>
            <input
              id="deal-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Baseus 65W GaN Fast Charger"
              className="w-full px-3 py-2 text-sm bg-[#F8F8F6] border border-[#D8D8D2] rounded-md focus:outline-none focus:border-[#0D6E4E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="deal-brand"
                className="block text-xs font-medium text-[#141518] mb-1"
              >
                Brand / Store
              </label>
              <select
                id="deal-brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value as BrandId)}
                className="w-full px-3 py-2 text-sm bg-[#F8F8F6] border border-[#D8D8D2] rounded-md focus:outline-none focus:border-[#0D6E4E]"
              >
                {brandConfigs.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="deal-category"
                className="block text-xs font-medium text-[#141518] mb-1"
              >
                Category
              </label>
              <select
                id="deal-category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as Exclude<CategoryId, 'all'>)
                }
                className="w-full px-3 py-2 text-sm bg-[#F8F8F6] border border-[#D8D8D2] rounded-md focus:outline-none focus:border-[#0D6E4E]"
              >
                <option value="audio">Audio</option>
                <option value="wearables">Wearables</option>
                <option value="computing">Computing</option>
                <option value="fashion">Fashion</option>
                <option value="skincare">Skincare</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="deal-price"
                className="block text-xs font-medium text-[#141518] mb-1"
              >
                Sale Price (PKR)
              </label>
              <input
                id="deal-price"
                type="number"
                value={pricePkr}
                onChange={(e) => setPricePkr(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono bg-[#F8F8F6] border border-[#D8D8D2] rounded-md focus:outline-none focus:border-[#0D6E4E]"
              />
            </div>

            <div>
              <label
                htmlFor="deal-original"
                className="block text-xs font-medium text-[#141518] mb-1"
              >
                Original Price (PKR)
              </label>
              <input
                id="deal-original"
                type="number"
                value={originalPricePkr}
                onChange={(e) => setOriginalPricePkr(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono bg-[#F8F8F6] border border-[#D8D8D2] rounded-md focus:outline-none focus:border-[#0D6E4E]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="deal-url"
              className="block text-xs font-medium text-[#141518] mb-1"
            >
              Product / Affiliate URL
            </label>
            <input
              id="deal-url"
              type="url"
              value={affiliateUrl}
              onChange={(e) => setAffiliateUrl(e.target.value)}
              placeholder="https://www.daraz.pk/products/..."
              className="w-full px-3 py-2 text-sm font-mono bg-[#F8F8F6] border border-[#D8D8D2] rounded-md focus:outline-none focus:border-[#0D6E4E]"
            />
          </div>

          <div>
            <label
              htmlFor="deal-image"
              className="block text-xs font-medium text-[#141518] mb-1"
            >
              Product Photo Preset
            </label>
            <select
              id="deal-image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#F8F8F6] border border-[#D8D8D2] rounded-md focus:outline-none focus:border-[#0D6E4E]"
            >
              {STUDIO_IMAGES.map((img) => (
                <option key={img.url} value={img.url}>
                  {img.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="deal-summary"
              className="block text-xs font-medium text-[#141518] mb-1"
            >
              Why Pakistani Buyers Love It
            </label>
            <textarea
              id="deal-summary"
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Short review highlighting warranty, delivery speed, or value..."
              className="w-full px-3 py-2 text-sm bg-[#F8F8F6] border border-[#D8D8D2] rounded-md focus:outline-none focus:border-[#0D6E4E]"
            />
          </div>

          <label className="inline-flex items-center gap-2 text-xs text-[#141518] cursor-pointer">
            <input
              type="checkbox"
              checked={codAvailable}
              onChange={(e) => setCodAvailable(e.target.checked)}
              className="w-4 h-4 accent-[#0D6E4E]"
            />
            <span>Cash on Delivery (COD) Available</span>
          </label>

          {formFeedback && (
            <p className="text-xs font-medium text-[#0D6E4E]">{formFeedback}</p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#0D6E4E] hover:bg-[#09543B] rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add Deal to Storefront</span>
          </button>
        </form>

        <div className="lg:col-span-7 bg-white border border-[#E5E5E0] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[#141518] mb-4">
            4. Live Catalog &amp; Click Performance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#E5E5E0] text-xs text-[#6B7079]">
                  <th className="py-2.5 pr-4 font-medium">Product</th>
                  <th className="py-2.5 px-3 font-medium">Store</th>
                  <th className="py-2.5 px-3 font-medium text-right">Price</th>
                  <th className="py-2.5 px-3 font-medium text-right">Clicks</th>
                  <th className="py-2.5 pl-3 font-medium text-right">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F0EC]">
                {products.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 pr-4 font-medium text-[#141518] max-w-[230px] truncate">
                      {item.title}
                    </td>
                    <td className="py-3 px-3 text-xs text-[#575B63] whitespace-nowrap">
                      {item.brandLabel}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-xs text-[#141518] tabular-nums whitespace-nowrap">
                      {formatPkr(item.pricePkr)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-xs font-semibold text-[#0D6E4E] tabular-nums">
                      {item.clicks}
                    </td>
                    <td className="py-3 pl-3 text-right">
                      <button
                        type="button"
                        onClick={() => onDeleteProduct(item.id)}
                        aria-label={`Delete ${item.title}`}
                        className="p-1.5 text-[#7A7E87] hover:text-red-700 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Hostinger Deployment Download */}
      <div className="bg-white border border-[#E5E5E0] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <h2 className="text-xl font-semibold text-[#141518]">
            5. Hostinger Shared Hosting Build (.zip)
          </h2>
          <p className="text-sm text-[#575B63] leading-relaxed">
            Download the production-optimized React build packaged with{' '}
            <span className="font-mono text-xs text-[#141518]">.htaccess</span>{' '}
            (SPA routing, Gzip, browser caching) and{' '}
            <span className="font-mono text-xs text-[#141518]">robots.txt</span>.
            Upload into Hostinger <span className="font-mono text-xs text-[#141518]">public_html</span>{' '}
            and extract.
          </p>
        </div>

        <a
          href="/downloads/haider-picks-hostinger.zip"
          download="haider-picks-hostinger.zip"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#141518] hover:bg-[#2A2D33] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0D6E4E]"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          <span>Download Hostinger Build (.zip)</span>
        </a>
      </div>
    </section>
  );
}
