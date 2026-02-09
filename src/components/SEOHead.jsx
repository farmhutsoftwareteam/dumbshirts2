import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'DUMBSHIRTS';
const DEFAULT_DESCRIPTION = 'One-of-one memetic artifacts. Heavyweight garment-dyed tees. Each piece exists once and is archived upon acquisition.';
const SITE_URL = 'https://dumbshirts.co';
const DEFAULT_IMAGE = `${SITE_URL}/videos/dumbshirts-001-hero.png`;

export default function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  children,
}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Memetic Artifacts. One of One.`;
  const canonicalUrl = url ? `${SITE_URL}${url}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl || SITE_URL} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {children}
    </Helmet>
  );
}

/**
 * JSON-LD Product schema for product pages.
 * Renders a <script type="application/ld+json"> tag.
 */
export function ProductSchema({ product }) {
  if (!product) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.memeOrigin,
    image: product.images?.hero
      ? (product.images.hero.startsWith('http')
          ? product.images.hero
          : `${SITE_URL}${product.images.hero}`)
      : DEFAULT_IMAGE,
    sku: `DS-${product.dropNumber}`,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    material: product.material,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/drop/${product.dropNumber}`,
      priceCurrency: 'ZAR',
      price: product.price,
      availability: product.status === 'available'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
      itemCondition: 'https://schema.org/NewCondition',
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Edition',
        value: '1 of 1',
      },
      {
        '@type': 'PropertyValue',
        name: 'Dimensions',
        value: product.dimensions,
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
