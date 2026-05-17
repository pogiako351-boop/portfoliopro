/**
 * Base entity types for the Vault app store.
 */

export interface Preferences {}

export type AssetCategory = "Art" | "Real Estate" | "Collectibles";

export interface Asset {
  id: string;
  title: string;
  category: AssetCategory;
  imageUrl: string;
  estimatedValue: string;
  description: string;
  provenance: string;
  year: number;
  isFeatured: boolean;
}

export interface Inquiry {
  id: string;
  contactIdentifier: string;
  submittedAt: number;
  status: "pending" | "logged";
}
