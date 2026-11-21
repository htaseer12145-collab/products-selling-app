import { BrandAffiliateConfig, BrandId } from '../types';

export function formatPkr(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function calcDiscountPercent(price: number, original?: number): number | null {
  if (!original || original <= price) return null;
  return Math.round(((original - price) / original) * 100);
}

export function buildTrackedAffiliateUrl(
  rawUrl: string,
  brandId: BrandId,
  brandConfigs: BrandAffiliateConfig[],
  productId: string
): string {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return '#';
    }
    const config = brandConfigs.find((b) => b.id === brandId);
    if (config && config.trackingId.trim() !== '') {
      parsed.searchParams.set(config.paramKey, config.trackingId.trim());
    }
    parsed.searchParams.set('utm_source', 'haiderpicks');
    parsed.searchParams.set('utm_medium', 'affiliate');
    parsed.searchParams.set('utm_campaign', productId);
    return parsed.toString();
  } catch {
    return '#';
  }
}

export function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
