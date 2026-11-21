import { useEffect } from 'react';
import { X } from 'lucide-react';
import { LegalDocType } from '../types';

interface ComplianceModalProps {
  docType: LegalDocType | null;
  onClose: () => void;
}

const DOC_CONTENT: Record<
  LegalDocType,
  { title: string; subtitle: string; paragraphs: string[] }
> = {
  about: {
    title: 'About Haider Picks & Syed Taseer Haider',
    subtitle: 'Independent Pakistani Shopping & Buying Guide Platform',
    paragraphs: [
      'Haider Picks was founded by Syed Taseer Haider to help shoppers across Pakistan discover authentic electronics, smart accessories, apparel, and skincare from verified stores without wasting hours comparing unreliable sellers.',
      'We curate verified listings across Daraz Mall, PriceOye, Amazon Global, AliExpress Choice, Telemart, and leading Pakistani retail brands, highlighting Cash on Delivery availability, local warranty status, and fair PKR pricing.',
      'For brand collaborations, partnership inquiries, or product feedback, reach Syed Taseer Haider directly at htaseer12145@gmail.com.',
    ],
  },
  disclosure: {
    title: 'Affiliate Disclosure',
    subtitle: 'Transparency & Commission Policy',
    paragraphs: [
      'Haider Picks participates in affiliate marketing programs including the Daraz Affiliate Program, Amazon Services LLC Associates Program, AliExpress Portals, and regional networks such as Involve Asia.',
      'When you click a “Shop on Brand” link on this website and complete a purchase, Syed Taseer Haider may earn a small referral commission from the merchant at zero additional cost to you.',
      'Affiliate partnerships never influence our product testing or PKR deal selection. We only list products with strong buyer ratings, clear return terms, and reliable delivery in Pakistan.',
    ],
  },
  privacy: {
    title: 'Privacy Policy & Google AdSense Notice',
    subtitle: 'Cookie & Advertising Compliance',
    paragraphs: [
      'Haider Picks respects visitor privacy. We do not collect sensitive personal financial information, CNIC details, or payment card numbers on this website—all purchases take place securely on the official merchant checkout page (such as Daraz, Amazon, or PriceOye).',
      'Third-party vendors, including Google AdSense, use cookies to serve ads based on a visitor’s prior visits to this website or other websites on the Internet. Google’s use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites.',
      'Visitors may opt out of personalized advertising by visiting Google Ads Settings (adssettings.google.com). Outbound click counters stored in your browser are anonymous and used solely to improve deal curation.',
    ],
  },
  terms: {
    title: 'Terms of Use',
    subtitle: 'Pricing, Availability & Merchant Responsibility',
    paragraphs: [
      'Product prices in PKR, promotional discounts, and Cash on Delivery availability displayed on Haider Picks are updated regularly but may change on the destination merchant’s platform at any time.',
      'All warranties, shipping timelines, returns, and customer support for ordered items are fulfilled directly by the respective retailer (Daraz, Amazon, AliExpress, PriceOye, Khaadi, or Telemart).',
      'Always verify seller ratings and final checkout totals on the merchant website before placing an order.',
    ],
  },
};

export function ComplianceModal({ docType, onClose }: ComplianceModalProps) {
  useEffect(() => {
    if (!docType) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [docType, onClose]);

  if (!docType) return null;

  const content = DOC_CONTENT[docType];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compliance-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#E5E5E0] rounded-xl max-w-2xl w-full p-6 sm:p-8 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5E5E0]">
          <div>
            <p className="text-xs font-medium text-[#0D6E4E]">
              {content.subtitle}
            </p>
            <h2
              id="compliance-modal-title"
              className="text-2xl font-semibold text-[#141518] mt-1"
            >
              {content.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-lg text-[#575B63] hover:text-[#141518] hover:bg-[#F4F4F0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm text-[#32363D] leading-relaxed">
          {content.paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[#E5E5E0] flex items-center justify-between gap-4">
          <span className="text-xs text-[#6B7079]">
            Contact: htaseer12145@gmail.com
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-[#141518] hover:bg-[#2A2D33] rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
