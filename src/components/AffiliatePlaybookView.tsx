import { CheckCircle2, ExternalLink } from 'lucide-react';
import { BrandAffiliateConfig } from '../types';

interface AffiliatePlaybookViewProps {
  brandConfigs: BrandAffiliateConfig[];
  onOpenOwnerStudio: () => void;
}

const ADSENSE_CHECKLIST = [
  {
    title: '01. Custom Domain & Clean Hosting',
    detail:
      'Connect a clean top-level domain (for example, haiderpicks.pk or haiderpicks.com) with HTTPS SSL active. Google AdSense approves custom domains far faster than free subdomains.',
  },
  {
    title: '02. Publish 15–20 Original Buying Guides',
    detail:
      'AdSense rejects thin affiliate link pages. Write 800–1,200 word comparisons in English or Urdu/Roman Urdu (e.g., Best Earbuds on Daraz Under 10,000 PKR, PTA Tax Guide, Laptop Comparisons) inside the Buying Guides section.',
  },
  {
    title: '03. Mandatory Trust Pages (Already Included)',
    detail:
      'Ensure your About Syed Taseer Haider, Affiliate Disclosure, Privacy Policy (mentioning Google AdSense cookies), and Contact Email (htaseer12145@gmail.com) stay linked in the footer.',
  },
  {
    title: '04. Bring Initial Organic & Social Traffic',
    detail:
      'Share 30-second product deal Reels on TikTok, Instagram, YouTube Shorts, and a WhatsApp Deals Channel linking back to your Buying Guides. Target 300–500 daily visits before submitting your AdSense application.',
  },
];

export function AffiliatePlaybookView({
  brandConfigs,
  onOpenOwnerStudio,
}: AffiliatePlaybookViewProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E5E0]">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-[#0D6E4E] mb-2">
            Owner Playbook · Prepared for Syed Taseer Haider
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#141518] leading-tight text-balance">
            How to Join Affiliate Programs in Pakistan &amp; Monetize With Google AdSense
          </h1>
          <p className="text-base text-[#575B63] leading-relaxed mt-3">
            Follow these exact registration steps for Daraz, Amazon, AliExpress, and Pakistani brand networks, then paste your approved tracking IDs inside Owner Studio.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenOwnerStudio}
          className="px-5 py-2.5 text-sm font-medium text-white bg-[#0D6E4E] hover:bg-[#09543B] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Open Owner Studio
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#141518]">
            Part 1. Joining Shopping Brand Affiliate Programs
          </h2>
          <p className="text-sm text-[#575B63] mt-1">
            All platforms below support Pakistani creators and pay via local bank IBAN, Easypaisa/JazzCash, or Payoneer USD.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brandConfigs.map((brand) => (
            <article
              key={brand.id}
              className="bg-white border border-[#E5E5E0] rounded-xl p-6 flex flex-col justify-between gap-5"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#141518]">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-[#575B63] mt-0.5">
                      {brand.availability}
                    </p>
                  </div>
                  <a
                    href={brand.signupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0D6E4E] border border-[#0D6E4E]/30 rounded-md hover:bg-[#0D6E4E] hover:text-white transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Apply</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>

                <p className="text-sm text-[#3F434A] leading-relaxed mt-3">
                  {brand.description}
                </p>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 p-3.5 bg-[#F8F8F6] rounded-lg text-xs">
                  <div>
                    <dt className="text-[#6B7079]">Commission</dt>
                    <dd className="font-semibold text-[#141518] mt-0.5 tabular-nums">
                      {brand.commissionRange}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6B7079]">Cookie Window</dt>
                    <dd className="font-semibold text-[#141518] mt-0.5">
                      {brand.cookieWindow}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-[#6B7079]">Pakistan Payout Methods</dt>
                    <dd className="font-medium text-[#141518] mt-0.5">
                      {brand.payoutMethods}
                    </dd>
                  </div>
                </dl>

                <ol className="mt-4 space-y-2.5 text-sm text-[#32363D]">
                  {brand.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs font-semibold text-[#0D6E4E] mt-0.5 shrink-0 tabular-nums">
                        0{index + 1}.
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-[#E5E5E0]">
        <div>
          <h2 className="text-2xl font-semibold text-[#141518]">
            Part 2. Google AdSense Approval &amp; Dual-Income Strategy
          </h2>
          <p className="text-sm text-[#575B63] mt-1">
            Combine affiliate commissions (high payout per sale) with Google AdSense display ads (income per 1,000 visitor views).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ADSENSE_CHECKLIST.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-[#E5E5E0] rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 text-[#0D6E4E] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-base font-semibold text-[#141518]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#575B63] leading-relaxed mt-1.5">
                    {item.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E5E5E0] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[#141518]">
              How to Bring Free Customer Traffic Daily
            </h3>
            <p className="text-sm text-[#575B63] mt-1 max-w-2xl leading-relaxed">
              Post short 20-second unboxing or price-drop videos on TikTok, YouTube Shorts, and Facebook Reels with your link in bio pointing to Haider Picks. Pair that with Google Search SEO Buying Guides for passive daily clicks.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenOwnerStudio}
            className="px-4 py-2 text-xs font-medium text-[#141518] bg-[#F4F4F0] hover:bg-[#EAEAE4] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Add Your First Deal →
          </button>
        </div>
      </div>
    </section>
  );
}
