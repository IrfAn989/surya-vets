import { createAdminClient } from '@/lib/supabase/admin';
import { CategoryForm } from '@/components/admin/CategoryForm';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const admin = createAdminClient();
  const [{ data: animalTypes }, { data: categories }] = await Promise.all([
    admin.from('animal_types').select('id, name').order('display_order'),
    admin.from('categories').select('id, name').order('display_order'),
  ]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Categories</h1>
      <p className="text-sm text-gray-500">
        Add animal types, categories, and subcategories. These map to collection pages.
      </p>
      <CategoryForm animalTypes={animalTypes ?? []} categories={categories ?? []} />
    </div>
  );
}
