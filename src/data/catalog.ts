import {
  AdSenseConfig,
  BrandAffiliateConfig,
  BuyingGuide,
  ProductDeal,
} from '../types';

export const HERO_IMAGE =
  '/src/assets/images/hero_curated_tech_1795251293187.jpg';

export const INITIAL_BRAND_CONFIGS: BrandAffiliateConfig[] = [
  {
    id: 'daraz',
    name: 'Daraz.pk',
    availability: 'Nationwide COD in Pakistan',
    commissionRange: '4% – 12% per verified order',
    cookieWindow: '7 days (App & Web)',
    payoutMethods: 'Pakistani Bank IBAN, JazzCash, Easypaisa',
    signupUrl: 'https://www.daraz.pk/wow/gcp/daraz/channel/pk/affiliate/affiliate-program',
    paramKey: 'aff_id',
    trackingId: 'haiderpicks_pk',
    description:
      'Pakistan’s largest online marketplace. Ideal for electronics, home essentials, fashion, and Daraz Mall brand stores with Cash on Delivery.',
    steps: [
      'Visit Daraz Affiliate Program (or Involve Asia) and apply with your website URL and email (htaseer12145@gmail.com).',
      'Submit your CNIC and Pakistani bank account / Easypaisa / JazzCash details for monthly PKR payouts.',
      'Once approved (typically 2–5 business days), open the Daraz Link Builder to convert any product URL into your tracked link.',
      'Paste your Daraz Affiliate ID inside Owner Studio here so all Daraz product links automatically carry your tag.',
    ],
  },
  {
    id: 'amazon',
    name: 'Amazon Associates',
    availability: 'Global Shipping to Pakistan',
    commissionRange: '3% – 10% depending on category',
    cookieWindow: '24 hours (90 days if added to cart)',
    payoutMethods: 'Payoneer USD Receiving Account or Wise',
    signupUrl: 'https://affiliate-program.amazon.com/',
    paramKey: 'tag',
    trackingId: 'haiderpicks-20',
    description:
      'Best for imported laptops, headphones, studio microphones, books, and tech gear shipped to Pakistan or bought by overseas Pakistani traffic.',
    steps: [
      'Publish at least 10 original buying guides on Haider Picks before applying so Amazon reviewers approve your site.',
      'Sign up at affiliate-program.amazon.com using your Pakistani phone number and Payoneer USD bank account for payouts.',
      'Generate 3 qualified sales within your first 180 days to keep your Associates account permanently active.',
      'Use Amazon SiteStripe on any product page or enter your Store ID (e.g. yourname-20) in Owner Studio.',
    ],
  },
  {
    id: 'aliexpress',
    name: 'AliExpress Portals',
    availability: 'Choice 10–14 Day Delivery to Pakistan',
    commissionRange: '3% – 9% per order',
    cookieWindow: '3 days',
    payoutMethods: 'Payoneer, Wire Transfer, or Involve Asia',
    signupUrl: 'https://portals.aliexpress.com/',
    paramKey: 'aff_fcid',
    trackingId: 'haiderpicks_ae',
    description:
      'Popular across Pakistan for mechanical keyboards, smartwatch straps, USB-C hubs, and Choice items with tracked Speedaf/Daraz-style courier delivery.',
    steps: [
      'Register free at portals.aliexpress.com or link through Involve Asia / Admitad.',
      'Focus on "AliExpress Choice" listings under USD 25–40 which clear Pakistani customs smoothly with low or zero extra duty.',
      'Add your Payoneer account inside Portals once your balance reaches the $16 minimum payout threshold.',
      'Paste your AliExpress tracking ID or deep links inside Owner Studio.',
    ],
  },
  {
    id: 'priceoye',
    name: 'PriceOye.pk',
    availability: 'PTA-Approved Electronics · Pakistan',
    commissionRange: '1.5% – 4% via partner campaigns',
    cookieWindow: '7 days',
    payoutMethods: 'Local Bank Transfer (IBAN)',
    signupUrl: 'https://priceoye.pk/',
    paramKey: 'ref',
    trackingId: 'haiderpicks',
    description:
      'Trusted Pakistani store for PTA-approved smartphones, smartwatches, and earbuds with open-parcel video proof on delivery.',
    steps: [
      'Apply through Pakistani affiliate networks (Involve Asia / local brand partnership email) once your blog reaches 1,000+ monthly visits.',
      'Alternatively partner directly with PriceOye Marketing for creator promo codes and UTM-tracked deal pages.',
      'Highlight PTA-approved status and open-parcel delivery to drive high conversion rates.',
    ],
  },
  {
    id: 'khaadi',
    name: 'Khaadi & Local Apparel',
    availability: 'Pakistan & International Shipping',
    commissionRange: '5% – 10% via Involve Asia / Daraz Mall',
    cookieWindow: '7 – 14 days',
    payoutMethods: 'Bank Transfer via Involve Asia / Daraz',
    signupUrl: 'https://involve.asia/',
    paramKey: 'aff_sub',
    trackingId: 'haiderpicks_fashion',
    description:
      'Pakistani heritage apparel, unstitched lawn, and menswear kurtas promoted via official Daraz Mall flagship stores or Involve Asia.',
    steps: [
      'Create a free publisher account on Involve Asia (supports Pakistani publishers and local bank payouts).',
      'Apply to Khaadi, Sapphire, Limelight, and Daraz Mall fashion campaigns inside the Involve Asia marketplace.',
      'Publish seasonal Eid, Winter Khaddar, and Wedding Wear guides to attract high-intent local search traffic.',
    ],
  },
  {
    id: 'telemart',
    name: 'Telemart.pk',
    availability: 'Electronics & Computing · Pakistan',
    commissionRange: '2% – 5% partner referral',
    cookieWindow: '7 days',
    payoutMethods: 'Pakistani Bank Transfer',
    signupUrl: 'https://www.telemart.pk/',
    paramKey: 'ref',
    trackingId: 'haiderpicks',
    description:
      'Long-running Pakistani tech and appliance store offering warranty-backed laptops, monitors, and accessories across major cities.',
    steps: [
      'Reach out to Telemart affiliate/creator partnerships or link through Daraz Mall / regional affiliate aggregators.',
      'Compare Telemart and PriceOye prices inside your Buying Guides to build reader trust and boost clicks.',
    ],
  },
];

export const INITIAL_PRODUCTS: ProductDeal[] = [
  {
    id: 'soundcore-q20i-anc',
    title: 'Anker Soundcore Q20i Hybrid ANC Headphones',
    brand: 'daraz',
    brandLabel: 'Daraz.pk',
    category: 'audio',
    categoryLabel: 'Audio',
    pricePkr: 13499,
    originalPricePkr: 16999,
    rating: '4.9 (420+ PK reviews)',
    shippingNote: 'Free delivery · Lahore & Karachi 2 days',
    codAvailable: true,
    affiliateUrl: 'https://www.daraz.pk/catalog/?q=anker+soundcore+q20i',
    imageUrl: HERO_IMAGE,
    summary:
      'Verified Daraz Mall flagship audio pick with 40-hour ANC battery life, multipoint Bluetooth 5.0, and memory foam earcups ideal for study and remote work.',
    pros: [
      'Hybrid active noise cancellation cuts fan & traffic hum by up to 90%',
      '40 hours battery with ANC on (60 hours standard)',
      'Official Anker Daraz Mall warranty in Pakistan',
    ],
    specs: [
      { label: 'Driver Size', value: '40mm Dynamic' },
      { label: 'Battery', value: '40h ANC / 60h Standard' },
      { label: 'Charging', value: 'USB-C Fast Charge (5 min = 4h)' },
      { label: 'Payment', value: 'Cash on Delivery & Card' },
    ],
    clicks: 142,
    featured: true,
  },
  {
    id: 'soundpeats-capsule3-pro',
    title: 'SoundPEATS Capsule3 Pro Wireless Earbuds',
    brand: 'priceoye',
    brandLabel: 'PriceOye.pk',
    category: 'audio',
    categoryLabel: 'Audio',
    pricePkr: 10999,
    originalPricePkr: 13500,
    rating: '4.8 (310+ PK reviews)',
    shippingNote: 'Open-parcel verification · Free shipping',
    codAvailable: true,
    affiliateUrl: 'https://priceoye.pk/wireless-earbuds',
    imageUrl: '/src/assets/images/product_earbuds_pro_1795251293406.jpg',
    summary:
      'Hi-Res LDAC earbuds with 43dB active noise cancellation and 6-mic call clarity—consistently one of the highest-converting audio picks in Pakistan.',
    pros: [
      '43dB hybrid ANC with clear transparency mode',
      'Up to 52 hours total playback with charging case',
      'PriceOye seal-check and open-parcel COD delivery',
    ],
    specs: [
      { label: 'Audio Codec', value: 'LDAC / AAC / SBC' },
      { label: 'Noise Control', value: '43dB Hybrid ANC' },
      { label: 'Water Rating', value: 'IPX4 Sweat Resistant' },
      { label: 'Delivery', value: '2–4 Days Nationwide' },
    ],
    clicks: 118,
    featured: true,
  },
  {
    id: 'amazfit-gts-4-titanium',
    title: 'Amazfit Active & Titanium AMOLED Smartwatch',
    brand: 'daraz',
    brandLabel: 'Daraz.pk',
    category: 'wearables',
    categoryLabel: 'Wearables',
    pricePkr: 28900,
    originalPricePkr: 34500,
    rating: '4.9 (185+ PK reviews)',
    shippingNote: 'Daraz Mall Verified · 7-Day Return',
    codAvailable: true,
    affiliateUrl: 'https://www.daraz.pk/catalog/?q=amazfit+smartwatch',
    imageUrl: '/src/assets/images/product_smartwatch_amoled_1795251293094.jpg',
    summary:
      'Crisp 1.75-inch AMOLED display with Bluetooth calling, dual-band GPS tracking, and 14-day battery life tailored for everyday fitness and office wear.',
    pros: [
      '14-day real battery life without daily charging',
      'Built-in microphone & speaker for wrist calls',
      'Works seamlessly with both Android and iPhone',
    ],
    specs: [
      { label: 'Display', value: '1.75" HD AMOLED' },
      { label: 'Battery Life', value: 'Up to 14 Days' },
      { label: 'Water Resistance', value: '5 ATM' },
      { label: 'Warranty', value: '1-Year Official Local' },
    ],
    clicks: 94,
    featured: true,
  },
  {
    id: 'nuphy-air75-wireless-keyboard',
    title: 'Keychron / NuPhy 75% Low-Profile Mechanical Keyboard',
    brand: 'amazon',
    brandLabel: 'Amazon',
    category: 'computing',
    categoryLabel: 'Computing',
    pricePkr: 32500,
    originalPricePkr: 37800,
    rating: '4.9 (1,800+ global reviews)',
    shippingNote: 'Ships internationally · Amazon Global',
    codAvailable: false,
    affiliateUrl: 'https://www.amazon.com/s?k=75+percent+wireless+mechanical+keyboard',
    imageUrl: '/src/assets/images/product_mechanical_keyboard_1795251293474.jpg',
    summary:
      'Hot-swappable wireless 75% mechanical keyboard prized by Pakistani software engineers, remote developers, and writers for silent tactile typing.',
    pros: [
      'Tri-mode connectivity: 2.4GHz dongle, Bluetooth 5.1, USB-C',
      'Aluminum frame with PBT double-shot keycaps',
      'Mac & Windows dual layout switch out of the box',
    ],
    specs: [
      { label: 'Layout', value: '75% Compact (84 Keys)' },
      { label: 'Switches', value: 'Hot-Swappable Tactile' },
      { label: 'Battery', value: '4,000 mAh Rechargeable' },
      { label: 'Availability', value: 'Amazon Global / AliExpress' },
    ],
    clicks: 76,
  },
  {
    id: 'egyptian-cotton-menswear',
    title: 'Tailored Egyptian Cotton Formal & Smart-Casual Shirt',
    brand: 'khaadi',
    brandLabel: 'Khaadi / Daraz Mall',
    category: 'fashion',
    categoryLabel: 'Fashion',
    pricePkr: 4850,
    originalPricePkr: 6200,
    rating: '4.8 (260+ PK reviews)',
    shippingNote: 'Cash on Delivery across Pakistan',
    codAvailable: true,
    affiliateUrl: 'https://www.daraz.pk/catalog/?q=mens+cotton+formal+shirt+pakistan',
    imageUrl: '/src/assets/images/product_mens_kurta_1795251292647.jpg',
    summary:
      'Breathable long-staple cotton weave designed for Pakistan’s warm climate—versatile for office hours, Jummah gatherings, and smart-casual dinners.',
    pros: [
      '100% breathable combed cotton suitable for summer humidity',
      'Reinforced collar and clean contrast placket stitching',
      'Easy size exchange through official store policy',
    ],
    specs: [
      { label: 'Fabric', value: '100% Combed Egyptian Cotton' },
      { label: 'Fit', value: 'Tailored Regular' },
      { label: 'Sizes', value: 'S, M, L, XL' },
      { label: 'Payment', value: 'COD / JazzCash / Card' },
    ],
    clicks: 89,
  },
  {
    id: 'vitamin-c-brightening-serum',
    title: '15% Vitamin C + Ferulic Daily Antioxidant Serum (30ml)',
    brand: 'aliexpress',
    brandLabel: 'AliExpress / Daraz',
    category: 'skincare',
    categoryLabel: 'Skincare',
    pricePkr: 2950,
    originalPricePkr: 3900,
    rating: '4.7 (510+ reviews)',
    shippingNote: 'Choice Express Delivery · Tracked',
    codAvailable: true,
    affiliateUrl: 'https://www.aliexpress.com/wholesale?SearchText=vitamin+c+serum+30ml',
    imageUrl: '/src/assets/images/product_skincare_serum_1795251293424.jpg',
    summary:
      'Dermatologist-style amber glass Vitamin C serum that resists oxidation, brightens uneven tone, and pairs cleanly under daily SPF sunscreen.',
    pros: [
      'UV-protective amber dropper bottle preserves potency',
      'Lightweight water-based absorption without sticky residue',
      'Affordable daily routine staple under PKR 3,000',
    ],
    specs: [
      { label: 'Volume', value: '30ml / 1.0 fl oz' },
      { label: 'Key Active', value: '15% L-Ascorbic + Vitamin E' },
      { label: 'Skin Type', value: 'Normal, Combination & Oily' },
      { label: 'Packaging', value: 'Sealed Amber Glass' },
    ],
    clicks: 103,
  },
];

export const INITIAL_GUIDES: BuyingGuide[] = [
  {
    id: 'best-earbuds-daraz-priceoye-2026',
    title: 'Best Wireless Earbuds Under PKR 12,000 in Pakistan (2026 Comparison)',
    categoryLabel: 'Audio Buying Guide',
    readTime: '6 min read',
    publishedDate: 'November 2026',
    excerpt:
      'We compare SoundPEATS, Anker Soundcore, and Redmi Buds on mic clarity, active noise cancellation, and Cash on Delivery warranty support across Daraz Mall and PriceOye.',
    coverImage: '/src/assets/images/product_earbuds_pro_1795251293406.jpg',
    sections: [
      {
        heading: 'Why Buying From Verified Stores Matters in Pakistan',
        paragraphs: [
          'Pakistan’s audio market has plenty of counterfeit earbuds sold at tempting prices. Always prioritize Daraz Mall official flagship stores or PriceOye listings that include open-parcel video proof and sealed serial numbers.',
          'Before clicking "Place Order", check the seller rating (minimum 92% positive) and read recent Pakistani buyer photo reviews to confirm local charger compatibility and authentic packaging.',
        ],
      },
      {
        heading: 'Top Recommendations by Budget',
        paragraphs: [
          'If your budget is around PKR 10,000–12,000, the SoundPEATS Capsule3 Pro offers genuine 43dB noise cancellation and LDAC support. For over-ear comfort during long study sessions or remote work, the Anker Soundcore Q20i remains unmatched under PKR 14,000.',
          'Pro Tip: Combine Daraz bank card Monday/Wednesday discounts or wallet vouchers at checkout to shave an extra PKR 800–1,500 off the listed price.',
        ],
      },
    ],
    relatedProductIds: ['soundpeats-capsule3-pro', 'soundcore-q20i-anc'],
  },
  {
    id: 'amazon-aliexpress-pakistan-customs-guide',
    title: 'How to Order From Amazon & AliExpress in Pakistan Without Surprise Customs',
    categoryLabel: 'Cross-Border Shopping',
    readTime: '7 min read',
    publishedDate: 'November 2026',
    excerpt:
      'A practical guide for Pakistani shoppers on choosing AliExpress Choice shipping, calculating customs thresholds, and paying safely with SadaPay, NayaPay, or Meezan Visa cards.',
    coverImage: '/src/assets/images/product_mechanical_keyboard_1795251293474.jpg',
    sections: [
      {
        heading: 'AliExpress Choice vs. Standard Shipping',
        paragraphs: [
          'Always filter for "Choice" items on AliExpress. Choice parcels consolidate multiple accessories into one tracked courier shipment handled locally in Pakistan, arriving in 10 to 14 days instead of getting lost in untracked postal mail.',
          'Keep individual orders focused on tech accessories, keyboards, straps, and home tools under USD 30–40 to minimize customs hold delays.',
        ],
      },
      {
        heading: 'Best Payment Cards & Amazon Global Tips',
        paragraphs: [
          'SadaPay, NayaPay, and standard bank Visa/Mastercard debit cards (with international e-commerce enabled) work smoothly on both Amazon and AliExpress. Look for Amazon listings that clearly state "Import Fees Deposit Included" so you never pay unexpected courier fees at your doorstep.',
        ],
      },
    ],
    relatedProductIds: ['nuphy-air75-wireless-keyboard', 'vitamin-c-brightening-serum'],
  },
  {
    id: 'smartwatch-cotton-essentials-guide',
    title: 'Smartwatch & Everyday Wardrobe Checklist for Remote Professionals',
    categoryLabel: 'Lifestyle & Gear',
    readTime: '5 min read',
    publishedDate: 'November 2026',
    excerpt:
      'From 14-day AMOLED smartwatches that survive load-shedding weeks to breathable Egyptian cotton shirts built for Pakistani summers.',
    coverImage: '/src/assets/images/product_smartwatch_amoled_1795251293094.jpg',
    sections: [
      {
        heading: 'Skip Daily Charging With AMOLED Efficiency',
        paragraphs: [
          'Many entry-level watches require daily charging. Switching to an efficient RTOS AMOLED watch like Amazfit gives you crisp sunlight visibility, clear call notifications, and nearly two full weeks between charges.',
        ],
      },
      {
        heading: 'Fabrics Tested for Humidity and Long Hours',
        paragraphs: [
          'Synthetic blends trap heat quickly between March and October. Combed 100% cotton shirts and kurtas retain crisp collar structure while keeping airflow high throughout the workday.',
        ],
      },
    ],
    relatedProductIds: ['amazfit-gts-4-titanium', 'egyptian-cotton-menswear'],
  },
];

export const INITIAL_ADSENSE_CONFIG: AdSenseConfig = {
  publisherId: '',
  enabled: false,
  showPreviewSlots: true,
  leaderboardSlotId: '1234567890',
  inFeedSlotId: '2345678901',
  articleSlotId: '3456789012',
};
