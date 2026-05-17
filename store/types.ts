/**
 * Base entity types for the Vault multi-asset portfolio platform.
 */

export type AssetCategory = "Timepiece" | "Hypercar" | "Real Estate";

export interface Asset {
  id: string;
  title: string;
  category: AssetCategory;
  imageUrl: string;
  msrp: number;
  marketValue: number;
  description: string;
  isFeatured: boolean;
}

export interface Inquiry {
  id: string;
  contactIdentifier: string;
  submittedAt: number;
  status: "pending" | "logged";
}

export interface Preferences {}
