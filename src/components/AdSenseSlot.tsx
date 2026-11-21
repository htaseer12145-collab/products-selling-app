import { useEffect } from 'react';
import { AdSenseConfig } from '../types';

interface AdSenseSlotProps {
  config: AdSenseConfig;
  variant: 'leaderboard' | 'infeed' | 'article';
  onConfigureClick?: () => void;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function AdSenseSlot({ config, variant, onConfigureClick }: AdSenseSlotProps) {
  const slotId =
    variant === 'leaderboard'
      ? config.leaderboardSlotId
      : variant === 'infeed'
      ? config.inFeedSlotId
      : config.articleSlotId;

  const isLive = config.enabled && config.publisherId.trim().startsWith('ca-pub-');

  useEffect(() => {
    if (!isLive) return;

    const scriptId = 'google-adsense-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
        config.publisherId.trim()
      )}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script initializes asynchronously after load
    }
  }, [isLive, config.publisherId, slotId]);

  if (!isLive && !config.showPreviewSlots) {
    return null;
  }

  const label =
    variant === 'leaderboard'
      ? '728 × 90 Responsive Leaderboard'
      : variant === 'infeed'
      ? 'Responsive In-Feed Native Unit'
      : 'In-Article AdSense Unit';

  const minHeightClass =
    variant === 'leaderboard' ? 'min-h-[96px]' : 'min-h-[120px]';

  if (isLive) {
    return (
      <aside
        aria-label="Advertisement"
        className={`w-full border border-[#E5E5E0] bg-white rounded-lg p-3 ${minHeightClass}`}
      >
        <p className="text-[11px] font-medium text-[#6B7079] tracking-wide mb-2 text-center">
          Advertisement
        </p>
        <ins
          className="adsbygoogle block"
          data-ad-client={config.publisherId.trim()}
          data-ad-slot={slotId}
          data-ad-format={variant === 'article' ? 'fluid' : 'auto'}
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  return (
    <aside
      aria-label="AdSense Placement Preview"
      className={`w-full border border-dashed border-[#D3D3CC] bg-[#F2F2EE] rounded-lg px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${minHeightClass}`}
    >
      <div>
        <p className="text-xs font-medium text-[#575B63]">
          Advertisement · Google AdSense Slot ({label})
        </p>
        <p className="text-xs text-[#6B7079] mt-1">
          Ready for your <span className="font-mono">ca-pub-</span> Publisher ID once Google AdSense approves your domain.
        </p>
      </div>
      {onConfigureClick && (
        <button
          type="button"
          onClick={onConfigureClick}
          className="px-3 py-1.5 text-xs font-medium text-[#141518] bg-white border border-[#D8D8D2] rounded-md hover:border-[#0D6E4E] hover:text-[#0D6E4E] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0D6E4E]"
        >
          Configure AdSense
        </button>
      )}
    </aside>
  );
}
