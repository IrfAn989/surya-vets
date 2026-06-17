import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CollectionView } from '@/components/collection/CollectionView';
import { resolveCollection } from '@/lib/data/products';
import { NAV_ITEMS } from '@/lib/constants/navigation';

export const revalidate = 300;

function findLabel(slug: string): string {
  for (const item of NAV_ITEMS) {
    if (item.slug === slug) return item.label;
    for (const cat of item.categories) {
      if (cat.slug === slug) return cat.label;
      for (const sub of cat.subcategories) {
        if (sub.slug === slug) return sub.label;
      }
    }
  }
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const label = findLabel(params.slug);
  return {
    title: label,
    description: `Shop ${label} — genuine veterinary products with free delivery above ₹499.`,
  };
}

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const resolved = await resolveCollection(params.slug);
  const title = resolved?.name ?? findLabel(params.slug);

  return (
    <div className="container space-y-6 py-6">
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: title }]}
      />
      <h1 className="text-2xl font-bold">{title}</h1>
      <CollectionView slug={params.slug} />
    </div>
  );
}
