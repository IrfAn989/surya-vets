export interface AnimalType {
  id: string;
  name: string;
  slug: string;
  icon_url: string | null;
  display_order: number;
  is_active: boolean;
}

export interface Category {
  id: string;
  animal_type_id: string;
  name: string;
  slug: string;
  display_order: number;
  is_active: boolean;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  display_order: number;
  is_active: boolean;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  is_active: boolean;
}

export type CollectionLevel = 'animal_type' | 'category' | 'subcategory';

export interface ResolvedCollection {
  level: CollectionLevel;
  id: string;
  name: string;
  slug: string;
}
