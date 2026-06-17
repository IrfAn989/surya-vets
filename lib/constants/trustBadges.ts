export interface TrustBadge {
  icon: string;
  title: string;
  subtitle: string;
}

export const TRUST_BADGES: TrustBadge[] = [
  { icon: 'check', title: 'Genuine Products', subtitle: 'Authentic & vet-approved' },
  { icon: 'lock', title: 'Secure Payments', subtitle: '100% safe & encrypted' },
  { icon: 'truck', title: 'Fast Delivery', subtitle: 'Orders above ₹499 free' },
  { icon: 'shield-check', title: 'Trusted Pharmacy', subtitle: 'Licensed & verified' },
];
