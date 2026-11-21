import { useEffect, useState } from 'react';
import { Check, ExternalLink, ShoppingBag, X } from 'lucide-react';
import { BrandAffiliateConfig, ProductDeal } from '../types';
import {
  buildTrackedAffiliateUrl,
  calcDiscountPercent,
  formatPkr,
} from '../utils/affiliate';

interface ProductDetailModalProps {
  product: ProductDeal | null;
  brandConfigs: BrandAffiliateConfig[];
  onClose: () => void;
  onOutboundClick: (productId: string) => void;
}

export function ProductDetailModal({
  product,
  brandConfigs,
  onClose,
  onOutboundClick,
}: ProductDetailModalProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const discount = calcDiscountPercent(product.pricePkr, product.originalPricePkr);
  const trackedUrl = buildTrackedAffiliateUrl(
    product.affiliateUrl,
    product.brand,
    brandConfigs,
    product.id
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#E5E5E0] rounded-xl max-w-4xl w-full overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E0]">
          <div className="flex items-center gap-2 text-xs text-[#575B63]">
            <span className="font-semibold text-[#141518]">{product.brandLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.rating}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="p-2 rounded-lg text-[#575B63] hover:text-[#141518] hover:bg-[#F4F4F0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#F4F4F0] aspect-[4/3] md:aspect-auto md:min-h-[380px]">
            {!imgError ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                <ShoppingBag className="w-10 h-10 text-[#575B63] mb-3" />
                <p className="text-sm text-[#575B63]">{product.title}</p>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between gap-6">
            <div>
              <h2
                id="product-modal-title"
                className="text-2xl font-semibold text-[#141518] leading-tight text-balance"
              >
                {product.title}
              </h2>

              <div className="mt-4 flex items-baseline gap-3 flex-wrap">
                <span className="font-mono text-2xl font-semibold text-[#141518] tabular-nums">
                  {formatPkr(product.pricePkr)}
                </span>
                {product.originalPricePkr && product.originalPricePkr > product.pricePkr && (
                  <span className="font-mono text-sm text-[#7A7E87] line-through tabular-nums">
                    {formatPkr(product.originalPricePkr)}
                  </span>
                )}
                {discount !== null && (
                  <span className="font-mono text-xs font-semibold text-[#0D6E4E] tabular-nums">
                    Save {discount}%
                  </span>
                )}
              </div>

              <p className="text-xs text-[#575B63] mt-1.5">
                {product.shippingNote} · {product.codAvailable ? 'Cash on Delivery Available' : 'Online Card Payment'}
              </p>

              <p className="text-sm text-[#3F434A] leading-relaxed mt-4">
                {product.summary}
              </p>

              {product.pros.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {product.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[#141518]">
                      <Check className="w-4 h-4 text-[#0D6E4E] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              )}

              {product.specs.length > 0 && (
                <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 pt-4 border-t border-[#E5E5E0] text-xs">
                  {product.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt className="text-[#6B7079]">{spec.label}</dt>
                      <dd className="font-medium text-[#141518] mt-0.5">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className="pt-4 border-t border-[#E5E5E0] flex flex-col gap-2">
              <a
                href={trackedUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => onOutboundClick(product.id)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0D6E4E] hover:bg-[#09543B] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Check Live Price on {product.brandLabel}</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
              <p className="text-[11px] text-[#6B7079] text-center">
                Affiliate link: Haider Picks may earn a commission at no extra cost to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
