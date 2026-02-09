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

// ── Schema helpers ──────────────────────────────────────────

function SchemaScript({ schema }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

function resolveImage(src) {
  if (!src) return DEFAULT_IMAGE;
  return src.startsWith('http') ? src : `${SITE_URL}${src}`;
}

// ── WebSite + Organization (homepage) ───────────────────────

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/favicon.svg`,
        },
        description: 'Memetic artifacts. One-of-one heavyweight garment-dyed tees. South African streetwear.',
      },
    ],
  };

  return <SchemaScript schema={schema} />;
}

// ── ItemList (homepage product listing) ─────────────────────

export function ItemListSchema({ products }) {
  if (!products || products.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'DUMBSHIRTS Drops',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/drop/${p.dropNumber}`,
      name: p.title,
      image: resolveImage(p.images?.hero),
    })),
  };

  return <SchemaScript schema={schema} />;
}

// ── Product (product detail page) ───────────────────────────

export function ProductSchema({ product }) {
  if (!product) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.memeOrigin,
    image: resolveImage(product.images?.hero),
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

  return <SchemaScript schema={schema} />;
}

// ── BreadcrumbList (product detail page) ────────────────────

export function BreadcrumbSchema({ product }) {
  if (!product) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Shop',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Drop #${product.dropNumber}`,
        item: `${SITE_URL}/drop/${product.dropNumber}`,
      },
    ],
  };

  return <SchemaScript schema={schema} />;
}

// ── VideoObject (product video) ─────────────────────────────

export function VideoSchema({ product }) {
  if (!product?.video) return null;

  const videoUrl = product.video.startsWith('http')
    ? product.video
    : `${SITE_URL}${product.video}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${product.title} — Product Video`,
    description: `Video showcase of ${product.title}, a one-of-one DUMBSHIRTS artifact. ${product.material ? product.material.split('.')[0] + '.' : ''}`,
    thumbnailUrl: resolveImage(product.images?.hero),
    contentUrl: videoUrl,
    uploadDate: new Date().toISOString().split('T')[0],
  };

  return <SchemaScript schema={schema} />;
}
