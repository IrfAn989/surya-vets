export interface NavSubcategory {
  label: string;
  slug: string;
}

export interface NavCategory {
  label: string;
  slug: string;
  subcategories: NavSubcategory[];
}

export interface NavItem {
  label: string;
  slug: string;
  categories: NavCategory[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Cat',
    slug: 'cat',
    categories: [
      {
        label: 'Medicine For Cats',
        slug: 'medicine-for-cats',
        subcategories: [
          { label: 'Allergy Relief For Cats', slug: 'allergy-relief-for-cats' },
          { label: 'Anti Biotic For Cats', slug: 'anti-biotic-for-cats' },
          { label: 'Anxiety Care For Cats', slug: 'anxiety-care-for-cats' },
          { label: 'Cancer Care For Cats', slug: 'cancer-care-for-cats' },
          { label: 'Cardiac Care For Cats', slug: 'cardiac-care-for-cats' },
          { label: 'Dewormers For Cats', slug: 'dewormers-for-cats' },
          { label: 'Diabetes For Cats', slug: 'diabetes-for-cats' },
          { label: 'Eye & Ear Care For Cats', slug: 'eye-ear-care-for-cats' },
          { label: 'Fleas & Ticks For Cats', slug: 'fleas-ticks-for-cats' },
          { label: 'Gastro Intestinal & Digestive Care For Cats', slug: 'gastro-intestinal-digestive-care-for-cats' },
          { label: 'Hip & Joint Care For Cats', slug: 'hip-joint-care-for-cats' },
          { label: 'Liver Care For Cats', slug: 'liver-care-for-cats' },
          { label: 'Neural Care For Cats', slug: 'neural-care-for-cats' },
          { label: 'Respiratory Care For Cats', slug: 'respiratory-care-for-cats' },
          { label: 'Skin & Coat Care For Cats', slug: 'skin-coat-care-for-cats' },
          { label: 'Urinary Tract & Renal Care For Cats', slug: 'urinary-tract-renal-care-for-cats' },
          { label: 'Vaccine For Cats', slug: 'vaccine-for-cats' },
          { label: 'Wound & Pain Relief For Cats', slug: 'wound-pain-relief-for-cats' },
        ],
      },
      {
        label: 'Cat Supplements',
        slug: 'supplements-for-cats',
        subcategories: [
          { label: 'Calcium Supplements For Cats', slug: 'calcium-supplements-for-cats' },
          { label: 'Liver Supplements For Cats', slug: 'liver-supplements-for-cats' },
          { label: 'Renal & Urinary Supplements For Cats', slug: 'renal-urinary-supplements-for-cats' },
          { label: 'Hip & Joint Supplements For Cats', slug: 'hip-joint-supplements-for-cats' },
          { label: 'Immunity Supplements For Cats', slug: 'immunity-supplements-for-cats' },
          { label: 'Skin & Coat Supplements For Cats', slug: 'skin-coat-supplements-for-cats' },
          { label: 'Multi Vitamin For Cats', slug: 'multi-vitamin-for-cats' },
          { label: 'Dental Care For Cats', slug: 'dental-care-mouth-hygine-for-cats' },
        ],
      },
      {
        label: 'Cat Food',
        slug: 'food-for-cats',
        subcategories: [
          { label: 'Dry Food For Cats', slug: 'dry-food-for-cats' },
          { label: 'Wet Food For Cats', slug: 'wet-food-for-cats' },
          { label: 'Premium Food For Cats', slug: 'premium-food-for-cats' },
          { label: 'Veterinary Diets For Cats', slug: 'veterinary-diets-for-cats' },
          { label: 'Infant Food For Cats', slug: 'infant-food-for-cats' },
        ],
      },
      {
        label: 'Treats For Cats',
        slug: 'treats-for-cats',
        subcategories: [
          { label: 'Biscuits & Crunchy Treats For Cats', slug: 'biscuits-crunchy-treats-for-cats' },
          { label: 'Soft Treat For Cats', slug: 'soft-treat-for-cats' },
        ],
      },
      {
        label: 'Cat Supplies',
        slug: 'supplies-for-cats',
        subcategories: [
          { label: 'Beds For Cats', slug: 'beds-for-cats' },
          { label: 'Grooming For Cats', slug: 'grooming-for-cats' },
          { label: 'Toys For Cats', slug: 'toys-for-cats' },
          { label: 'Leash/Collars & Harnesses For Cats', slug: 'leash-collars-harnesses-for-cats' },
          { label: 'Bowls & Feeders For Cats', slug: 'bowls-feeders-for-cats' },
          { label: 'Medicated Shampoo For Cats', slug: 'medicated-shampoo-for-cats' },
          { label: 'Cleaning Product For Cats', slug: 'cleaning-product-for-cats' },
        ],
      },
    ],
  },
  {
    label: 'Dog',
    slug: 'dog',
    categories: [
      {
        label: 'Medicine For Dogs',
        slug: 'medicine-for-dogs',
        subcategories: [
          { label: 'Allergy Relief For Dogs', slug: 'allergy-relief-for-dogs' },
          { label: 'Anti Biotic For Dogs', slug: 'anti-biotic-for-dogs' },
          { label: 'Anxiety Care For Dogs', slug: 'anxiety-care-for-dogs' },
          { label: 'Cardiac Care For Dogs', slug: 'cardiac-care-for-dogs' },
          { label: 'Dewormers For Dogs', slug: 'dewormers-for-dogs' },
          { label: 'Diabetes For Dogs', slug: 'diabetes-for-dogs' },
          { label: 'Eye & Ear Care For Dogs', slug: 'eye-ear-care-for-dogs' },
          { label: 'Fleas & Ticks For Dogs', slug: 'fleas-ticks-for-dogs' },
          { label: 'Gastro Intestinal & Digestive Care For Dogs', slug: 'gastro-intestinal-digestive-care-for-dogs' },
          { label: 'Hip & Joint Care For Dogs', slug: 'hip-joint-care-for-dogs' },
          { label: 'Liver Care For Dogs', slug: 'liver-care-for-dogs' },
          { label: 'Respiratory Care For Dogs', slug: 'respiratory-care-for-dogs' },
          { label: 'Skin & Coat Care For Dogs', slug: 'skin-coat-care-for-dogs' },
          { label: 'Urinary Tract & Renal Care For Dogs', slug: 'urinary-tract-renal-care-for-dogs' },
          { label: 'Vaccine For Dogs', slug: 'vaccine-for-dogs' },
          { label: 'Wound & Pain Relief For Dogs', slug: 'wound-pain-relief-for-dogs' },
        ],
      },
      {
        label: 'Dog Supplements',
        slug: 'supplements-for-dogs',
        subcategories: [
          { label: 'Anxiety Supplements For Dogs', slug: 'anxiety-supplements-for-dogs' },
          { label: 'Calcium Supplements For Dogs', slug: 'calcium-supplements-for-dogs' },
          { label: 'Immunity Supplements For Dogs', slug: 'immunity-supplements-for-dogs' },
          { label: 'Liver Supplements For Dogs', slug: 'liver-supplements-for-dogs' },
          { label: 'Multi Vitamin For Dogs', slug: 'multi-vitamin-for-dogs' },
          { label: 'Skin & Coat Supplements For Dogs', slug: 'skin-coat-supplements-for-dogs' },
          { label: 'Hip & Joint Supplements For Dogs', slug: 'hip-joint-supplements-for-dogs' },
          { label: 'Dental Care For Dogs', slug: 'dental-care-mouth-hygine-for-dogs' },
        ],
      },
      {
        label: 'Dog Food',
        slug: 'food-for-dogs',
        subcategories: [
          { label: 'Dry Food For Dogs', slug: 'dry-food-for-dogs' },
          { label: 'Wet Food For Dogs', slug: 'wet-food-for-dogs' },
          { label: 'Premium Food For Dogs', slug: 'premium-food-for-dogs' },
          { label: 'Veterinary Diets For Dogs', slug: 'veterinary-diets-for-dogs' },
          { label: 'Infant Food For Dogs', slug: 'infant-food-for-dogs' },
        ],
      },
      {
        label: 'Treats For Dogs',
        slug: 'treats-for-dogs',
        subcategories: [
          { label: 'Biscuits & Crunchy Treats For Dogs', slug: 'biscuits-crunchy-treats-for-dogs' },
          { label: 'Bones & Natural Chew For Dogs', slug: 'bones-natural-chew-for-dogs' },
          { label: 'Dental Treat For Dogs', slug: 'dental-treat-for-dogs' },
          { label: 'Soft Treat For Dogs', slug: 'soft-treat-for-dogs' },
        ],
      },
      {
        label: 'Dog Supplies',
        slug: 'supplies-for-dogs',
        subcategories: [
          { label: 'Beds For Dogs', slug: 'beds-for-dogs' },
          { label: 'Clothing For Dogs', slug: 'clothing-for-dogs' },
          { label: 'Grooming For Dogs', slug: 'grooming-for-dogs' },
          { label: 'Leash/Collars & Harnesses For Dogs', slug: 'leash-collars-harnesses-for-dogs' },
          { label: 'Toys For Dogs', slug: 'toys-for-dogs' },
          { label: 'Training & Behaviour For Dogs', slug: 'training-behaviour-for-dogs' },
          { label: 'Bowls & Feeders For Dogs', slug: 'bowls-feeders-for-dogs' },
          { label: 'Medicated Shampoo For Dogs', slug: 'medicated-shampoo-for-dogs' },
        ],
      },
    ],
  },
  {
    label: 'Small Pets',
    slug: 'small-pets',
    categories: [
      {
        label: 'Food For Small Animals',
        slug: 'food-for-small-animals',
        subcategories: [
          { label: 'Dry Food For Rabbit/Guinea Pig/Hamster', slug: 'dry-food-for-small-animals' },
        ],
      },
      {
        label: 'Medicine For Small Animals',
        slug: 'medicine-for-small-animals',
        subcategories: [
          { label: 'Allergy Relief', slug: 'allergy-relief-for-small-animals' },
          { label: 'Anti Biotic', slug: 'anti-biotic-for-small-animals' },
          { label: 'Dewormers', slug: 'dewormers-for-small-animals' },
          { label: 'Eye & Ear Care', slug: 'eye-ear-care-for-small-animals' },
          { label: 'Fleas & Ticks', slug: 'fleas-ticks-for-small-animals' },
        ],
      },
      {
        label: 'Supplements For Small Animals',
        slug: 'supplements-for-small-animals',
        subcategories: [
          { label: 'Calcium Supplements', slug: 'calcium-supplements-for-small-animals' },
          { label: 'Immunity Supplements', slug: 'immunity-supplements-for-small-animals' },
          { label: 'Multi Vitamin', slug: 'multi-vitamin-for-small-animals' },
        ],
      },
      {
        label: 'Supplies For Small Animals',
        slug: 'supplies-for-small-animals',
        subcategories: [
          { label: 'Beds', slug: 'beds-for-small-animals' },
          { label: 'Toys', slug: 'toys-for-small-animals' },
          { label: 'Grooming', slug: 'grooming-for-small-animals' },
        ],
      },
    ],
  },
  {
    label: 'Birds',
    slug: 'birds',
    categories: [
      {
        label: 'Medicine For Birds',
        slug: 'medicine-for-birds',
        subcategories: [
          { label: 'Antibiotic For Birds', slug: 'anti-biotic-for-birds' },
          { label: 'Dewormers For Birds', slug: 'dewormers-for-birds' },
          { label: 'Vaccine For Birds', slug: 'vaccine-for-birds' },
        ],
      },
      {
        label: 'Supplements For Birds',
        slug: 'supplements-for-birds',
        subcategories: [
          { label: 'Calcium Supplements For Birds', slug: 'calcium-supplements-for-birds' },
          { label: 'Multi Vitamin For Birds', slug: 'multi-vitamin-for-birds' },
        ],
      },
      {
        label: 'Bird Food',
        slug: 'food-for-birds',
        subcategories: [
          { label: 'Dry Food For Birds', slug: 'dry-food-for-birds' },
          { label: 'Infant Food For Birds', slug: 'infant-food-for-birds' },
        ],
      },
      {
        label: 'Supplies For Birds',
        slug: 'supplies-for-birds',
        subcategories: [
          { label: 'Feeders & Bowls For Birds', slug: 'feeders-bowls-for-birds' },
          { label: 'Grooming For Birds', slug: 'grooming-for-birds' },
        ],
      },
    ],
  },
  {
    label: 'Vaccination',
    slug: 'vaccination',
    categories: [
      { label: 'Vaccination For Dogs', slug: 'vaccination-dogs', subcategories: [] },
      { label: 'Vaccination For Cats', slug: 'vaccination-cats', subcategories: [] },
      { label: 'Vaccination For Farm Animals', slug: 'vaccination-farm-animals', subcategories: [] },
    ],
  },
  {
    label: 'Pet Grooming',
    slug: 'pet-grooming',
    categories: [],
  },
  {
    label: 'Contact Us',
    slug: 'contact',
    categories: [],
  },
];
