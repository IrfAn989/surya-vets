import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ProductDetail } from '@/components/product/ProductDetail';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getProductBySlug, getRelatedProducts } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils/formatPrice';

export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };

  const image =
    product.product_images?.find((i) => i.is_primary)?.image_url ??
    product.product_images?.[0]?.image_url;

  return {
    title: product.meta_title || product.name,
    description: product.meta_description || product.short_description || product.name,
    openGraph: { images: image ? [image] : [] },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.subcategory_id, product.id, 6);
  const image =
    product.product_images?.find((i) => i.is_primary)?.image_url ??
    product.product_images?.[0]?.image_url;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description || product.description || product.name,
    image: image ? [image] : [],
    sku: product.sku || undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.sale_price,
      availability: product.is_in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <div className="container space-y-8 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: product.name }]}
      />
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold">Related Products</h2>
          <ProductGrid products={related} />
        </section>
      )}

      <p className="sr-only">{formatPrice(product.sale_price)}</p>
    </div>
  );
}
