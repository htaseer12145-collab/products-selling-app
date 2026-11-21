import { useState } from 'react';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { BrandAffiliateConfig, ProductDeal } from '../types';
import {
  buildTrackedAffiliateUrl,
  calcDiscountPercent,
  formatPkr,
} from '../utils/affiliate';

interface ProductCardProps {
  product: ProductDeal;
  brandConfigs: BrandAffiliateConfig[];
  onInspect: (product: ProductDeal) => void;
  onOutboundClick: (productId: string) => void;
}

export function ProductCard({
  product,
  brandConfigs,
  onInspect,
  onOutboundClick,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const discount = calcDiscountPercent(product.pricePkr, product.originalPricePkr);
  const trackedUrl = buildTrackedAffiliateUrl(
    product.affiliateUrl,
    product.brand,
    brandConfigs,
    product.id
  );

  return (
    <article className="group bg-white border border-[#E5E5E0] rounded-xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#CBCBC4]">
      <button
        type="button"
        onClick={() => onInspect(product)}
        className="relative aspect-[4/3] w-full bg-[#F1F1ED] overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0D6E4E]"
        aria-label={`Inspect ${product.title}`}
      >
        {!imgError ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EFEFEA] to-[#E4E4DD]">
            <ShoppingBag className="w-8 h-8 text-[#575B63] mb-2" aria-hidden="true" />
            <span className="text-xs font-medium text-[#575B63] max-w-[200px] truncate">
              {product.title}
            </span>
          </div>
        )}
      </button>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-[#575B63] mb-2">
            <span className="font-medium text-[#141518]">{product.brandLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryLabel}</span>
            {product.codAvailable && (
              <>
                <span aria-hidden="true">·</span>
                <span>COD</span>
              </>
            )}
          </div>

          <h3 className="text-base font-semibold text-[#141518] leading-snug line-clamp-2">
            <button
              type="button"
              onClick={() => onInspect(product)}
              className="text-left hover:text-[#0D6E4E] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0D6E4E]"
            >
              {product.title}
            </button>
          </h3>

          <p className="text-sm text-[#575B63] leading-relaxed mt-2 line-clamp-2">
            {product.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-[#F0F0EC] flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-mono text-[15px] font-semibold text-[#141518] tabular-nums">
                {formatPkr(product.pricePkr)}
              </span>
              {product.originalPricePkr && product.originalPricePkr > product.pricePkr && (
                <span className="font-mono text-xs text-[#7A7E87] line-through tabular-nums">
                  {formatPkr(product.originalPricePkr)}
                </span>
              )}
            </div>
            {discount !== null && (
              <span className="font-mono text-xs font-medium text-[#0D6E4E] tabular-nums shrink-0">
                Save {discount}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onInspect(product)}
              className="px-3.5 py-2 text-xs font-medium text-[#141518] bg-[#F4F4F0] hover:bg-[#EAEAE4] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0D6E4E]"
            >
              Details
            </button>
            <a
              href={trackedUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => onOutboundClick(product.id)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#0D6E4E] hover:bg-[#09543B] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0D6E4E]"
            >
              <span>Shop on {product.brandLabel}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
