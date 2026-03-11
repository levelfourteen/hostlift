export interface ListingData {
  url?: string;
  title: string;
  description: string;
  propertyType: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  nightlyPrice?: string;
  reviewCount?: number;
  averageRating?: number;
  superhostStatus?: boolean;
  responseRate?: string;
  houseRules?: string;
  cancellationPolicy?: string;
  checkInTime?: string;
  checkOutTime?: string;
  minimumStay?: number;
  maximumStay?: number;
  photoUrls?: string[];
}

export interface Recommendation {
  issue: string;
  why_it_matters: string;
  action: string;
  priority: "high" | "medium" | "low";
  rewrite: string | null;
}

export interface ScoringCategory {
  name: string;
  score: number;
  grade: string;
  status: "excellent" | "good" | "needs_work" | "critical";
  findings: string;
  recommendations: Recommendation[];
}

export interface AuditResult {
  overall_score: number;
  overall_grade: string;
  summary: string;
  categories: ScoringCategory[];
  rewritten_title_options: string[];
  rewritten_description: string;
  quick_wins: string[];
}

export interface AuditState {
  status: "idle" | "analyzing" | "complete" | "error";
  listingData: ListingData | null;
  result: AuditResult | null;
  error: string | null;
  currentStep: string;
}
