import { ArrowLeft, ExternalLink } from 'lucide-react';
import {
  AdSenseConfig,
  BrandAffiliateConfig,
  BuyingGuide,
  ProductDeal,
} from '../types';
import { buildTrackedAffiliateUrl, formatPkr } from '../utils/affiliate';
import { AdSenseSlot } from './AdSenseSlot';

interface BuyingGuideReaderProps {
  guides: BuyingGuide[];
  selectedGuideId: string | null;
  onSelectGuide: (id: string | null) => void;
  products: ProductDeal[];
  brandConfigs: BrandAffiliateConfig[];
  adsenseConfig: AdSenseConfig;
  onInspectProduct: (product: ProductDeal) => void;
  onOutboundClick: (productId: string) => void;
  onConfigureAdSense: () => void;
}

export function BuyingGuideReader({
  guides,
  selectedGuideId,
  onSelectGuide,
  products,
  brandConfigs,
  adsenseConfig,
  onInspectProduct,
  onOutboundClick,
  onConfigureAdSense,
}: BuyingGuideReaderProps) {
  const activeGuide = guides.find((g) => g.id === selectedGuideId) || null;

  if (activeGuide) {
    const related = products.filter((p) =>
      activeGuide.relatedProductIds.includes(p.id)
    );

    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <button
          type="button"
          onClick={() => onSelectGuide(null)}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#575B63] hover:text-[#141518] mb-6 cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to All Buying Guides</span>
        </button>

        <article className="bg-white border border-[#E5E5E0] rounded-xl overflow-hidden">
          <div className="aspect-[16/9] w-full bg-[#F1F1ED] overflow-hidden">
            <img
              src={activeGuide.coverImage}
              alt={activeGuide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-2 text-xs text-[#575B63] mb-3">
              <span className="font-medium text-[#0D6E4E]">{activeGuide.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{activeGuide.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span>{activeGuide.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>By Syed Taseer Haider</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-semibold text-[#141518] leading-tight text-balance">
              {activeGuide.title}
            </h1>

            <p className="text-base text-[#575B63] leading-relaxed mt-4 max-w-[68ch]">
              {activeGuide.excerpt}
            </p>

            <div className="my-8">
              <AdSenseSlot
                config={adsenseConfig}
                variant="article"
                onConfigureClick={onConfigureAdSense}
              />
            </div>

            <div className="space-y-8">
              {activeGuide.sections.map((section) => (
                <div key={section.heading} className="space-y-3">
                  <h2 className="text-xl font-semibold text-[#141518]">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((para, i) => (
                    <p
                      key={i}
                      className="text-[15px] text-[#32363D] leading-[1.7] max-w-[70ch]"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {related.length > 0 && (
              <div className="mt-10 pt-8 border-t border-[#E5E5E0]">
                <h3 className="text-lg font-semibold text-[#141518] mb-4">
                  Recommended Picks Mentioned in This Guide
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map((item) => {
                    const url = buildTrackedAffiliateUrl(
                      item.affiliateUrl,
                      item.brand,
                      brandConfigs,
                      item.id
                    );
                    return (
                      <div
                        key={item.id}
                        className="border border-[#E5E5E0] rounded-lg p-4 flex flex-col justify-between gap-3 bg-[#F8F8F6]"
                      >
                        <div>
                          <p className="text-xs text-[#575B63]">
                            {item.brandLabel} · {item.categoryLabel}
                          </p>
                          <h4 className="text-sm font-semibold text-[#141518] mt-1">
                            {item.title}
                          </h4>
                          <p className="font-mono text-sm font-semibold text-[#0D6E4E] tabular-nums mt-1.5">
                            {formatPkr(item.pricePkr)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onInspectProduct(item)}
                            className="px-3 py-1.5 text-xs font-medium text-[#141518] bg-white border border-[#D8D8D2] rounded-md hover:border-[#141518] cursor-pointer whitespace-nowrap"
                          >
                            Specs
                          </button>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            onClick={() => onOutboundClick(item.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#0D6E4E] hover:bg-[#09543B] rounded-md whitespace-nowrap"
                          >
                            <span>View Deal</span>
                            <ExternalLink className="w-3 h-3" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </article>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="max-w-2xl">
        <p className="text-xs font-medium text-[#0D6E4E] mb-2">
          Editorial Reviews &amp; SEO Traffic Engine
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#141518] leading-tight text-balance">
          Pakistani Shopper Buying Guides
        </h1>
        <p className="text-base text-[#575B63] leading-relaxed mt-3">
          In-depth product comparisons and customs guides written to bring high-intent Google search traffic and qualify your site for Google AdSense.
        </p>
      </div>

      <AdSenseSlot
        config={adsenseConfig}
        variant="leaderboard"
        onConfigureClick={onConfigureAdSense}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <article
            key={guide.id}
            className="bg-white border border-[#E5E5E0] rounded-xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <button
                type="button"
                onClick={() => onSelectGuide(guide.id)}
                className="aspect-[4/3] w-full bg-[#F1F1ED] overflow-hidden block cursor-pointer"
              >
                <img
                  src={guide.coverImage}
                  alt={guide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                />
              </button>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-[#575B63] mb-2">
                  <span>{guide.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{guide.readTime}</span>
                </div>
                <h2 className="text-lg font-semibold text-[#141518] leading-snug">
                  <button
                    type="button"
                    onClick={() => onSelectGuide(guide.id)}
                    className="text-left hover:text-[#0D6E4E] transition-colors cursor-pointer"
                  >
                    {guide.title}
                  </button>
                </h2>
                <p className="text-sm text-[#575B63] leading-relaxed mt-2 line-clamp-3">
                  {guide.excerpt}
                </p>
              </div>
            </div>
            <div className="px-5 pb-5">
              <button
                type="button"
                onClick={() => onSelectGuide(guide.id)}
                className="text-xs font-semibold text-[#0D6E4E] hover:underline cursor-pointer whitespace-nowrap"
              >
                Read Full Guide →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
