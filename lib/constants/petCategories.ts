export interface PetCategory {
  label: string;
  slug: string;
  image: string;
}

export const PET_CATEGORIES: PetCategory[] = [
  { label: 'Cat', slug: 'cat', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&q=80' },
  { label: 'Dog', slug: 'dog', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&q=80' },
  { label: 'Small Pets', slug: 'small-pets', image: 'https://images.unsplash.com/photo-1591382386627-349b692688ff?w=300&q=80' },
  { label: 'Birds', slug: 'birds', image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=300&q=80' },
  { label: 'Farm Animals', slug: 'farm-animals', image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&q=80' },
  { label: 'Fish & Reptiles', slug: 'fish-reptiles', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=300&q=80' },
  { label: 'Vaccination', slug: 'vaccination', image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=300&q=80' },
  { label: 'Pet Grooming', slug: 'pet-grooming', image: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=300&q=80' },
];

export const PRODUCT_TYPES = [
  'TABLET',
  'SYRUP',
  'KIBBLE',
  'POWDER',
  'CAN',
  'INJECTION',
  'SPRAY',
  'DROPS',
  'CREAM',
  'CHEW',
] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number];

export const MEDICAL_DISCLAIMER =
  'Products sold here are veterinary products intended for use in animals. Pet owners should consult a qualified veterinarian before administering medicines or treatments.';
