"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ListingData } from "@/lib/types";

const COMMON_AMENITIES = [
  "WiFi",
  "Kitchen",
  "Washer",
  "Dryer",
  "Air conditioning",
  "Heating",
  "TV",
  "Hot tub",
  "Pool",
  "Free parking",
  "EV charger",
  "Gym",
  "Self check-in",
  "Workspace",
  "Coffee maker",
  "Fireplace",
  "BBQ grill",
  "Patio/balcony",
  "Pet friendly",
  "Smoke alarm",
  "Fire extinguisher",
  "First aid kit",
  "Iron",
  "Hair dryer",
  "Dishwasher",
  "Microwave",
  "Oven",
  "Refrigerator",
  "Outdoor dining area",
  "Mountain view",
  "Lake view",
  "Ocean view",
  "Garden",
  "Beach access",
  "Ski-in/ski-out",
];

const PROPERTY_TYPES = [
  "Entire home",
  "Entire apartment",
  "Private room",
  "Shared room",
  "Cabin",
  "Cottage",
  "Townhouse",
  "Condo",
  "Villa",
  "Loft",
  "Tiny home",
  "Treehouse",
  "Yurt",
  "Barn",
  "Farm stay",
  "Other",
];

function ManualInputContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlParam = searchParams.get("url") || "";

  const [form, setForm] = useState({
    url: urlParam,
    title: "",
    description: "",
    propertyType: "Entire home",
    location: "",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [] as string[],
    customAmenity: "",
    nightlyPrice: "",
    reviewCount: "",
    averageRating: "",
    superhostStatus: false,
    responseRate: "",
    houseRules: "",
    cancellationPolicy: "",
    checkInTime: "",
    checkOutTime: "",
    minimumStay: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const addCustomAmenity = () => {
    if (form.customAmenity.trim() && !form.amenities.includes(form.customAmenity.trim())) {
      setForm((prev) => ({
        ...prev,
        amenities: [...prev.amenities, prev.customAmenity.trim()],
        customAmenity: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Please enter your listing title.");
      return;
    }
    if (!form.description.trim()) {
      setError("Please enter your listing description.");
      return;
    }
    if (!form.location.trim()) {
      setError("Please enter your property location.");
      return;
    }

    setIsSubmitting(true);

    const listingData: ListingData = {
      url: form.url || undefined,
      title: form.title,
      description: form.description,
      propertyType: form.propertyType,
      location: form.location,
      bedrooms: form.bedrooms,
      bathrooms: form.bathrooms,
      maxGuests: form.maxGuests,
      amenities: form.amenities,
      nightlyPrice: form.nightlyPrice || undefined,
      reviewCount: form.reviewCount ? parseInt(form.reviewCount) : undefined,
      averageRating: form.averageRating
        ? parseFloat(form.averageRating)
        : undefined,
      superhostStatus: form.superhostStatus || undefined,
      responseRate: form.responseRate || undefined,
      houseRules: form.houseRules || undefined,
      cancellationPolicy: form.cancellationPolicy || undefined,
      checkInTime: form.checkInTime || undefined,
      checkOutTime: form.checkOutTime || undefined,
      minimumStay: form.minimumStay ? parseInt(form.minimumStay) : undefined,
    };

    // Store listing data and redirect to audit page
    sessionStorage.setItem("hostlift_listing", JSON.stringify(listingData));
    router.push("/audit");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Enter Your Listing Details
            </h1>
            <p className="text-muted">
              Fill in as much as you can — the more detail you provide, the
              better your analysis will be.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-score-poor/10 border border-score-poor/20 px-4 py-3 text-sm text-score-poor">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* URL (optional) */}
            {urlParam && (
              <div className="rounded-xl border border-border bg-card p-6">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Listing URL
                </label>
                <p className="text-xs text-muted mb-2">
                  Automatic scraping coming soon. For now, please paste your
                  listing details below.
                </p>
                <input
                  type="text"
                  value={form.url}
                  readOnly
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-muted"
                />
              </div>
            )}

            {/* Required Fields */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-5">
              <h2 className="font-semibold text-lg text-foreground">
                Basic Information
                <span className="text-score-poor ml-1">*</span>
              </h2>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Listing Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g., Beautiful Cabin in the Mountains"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Full Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Paste your full listing description here..."
                  rows={8}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, location: e.target.value }))
                  }
                  placeholder="e.g., Breckenridge, Colorado"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-5">
              <h2 className="font-semibold text-lg text-foreground">
                Property Details
              </h2>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Property Type
                </label>
                <select
                  value={form.propertyType}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      propertyType: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.bedrooms}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        bedrooms: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={form.bathrooms}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        bathrooms: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Max Guests
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.maxGuests}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        maxGuests: parseInt(e.target.value) || 1,
                      }))
                    }
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <h2 className="font-semibold text-lg text-foreground">
                Amenities
              </h2>
              <p className="text-sm text-muted">
                Select all amenities your property offers.
              </p>
              <div className="flex flex-wrap gap-2">
                {COMMON_AMENITIES.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`rounded-full px-3 py-1.5 text-sm border transition-colors ${
                      form.amenities.includes(amenity)
                        ? "bg-primary text-white border-primary"
                        : "bg-background text-muted border-border hover:border-primary/50"
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.customAmenity}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      customAmenity: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomAmenity();
                    }
                  }}
                  placeholder="Add custom amenity..."
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={addCustomAmenity}
                  className="rounded-lg border border-primary text-primary px-4 py-2 text-sm font-medium hover:bg-primary/5 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Optional Details */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-5">
              <h2 className="font-semibold text-lg text-foreground">
                Additional Details
                <span className="text-muted text-sm font-normal ml-2">
                  (optional but improves analysis)
                </span>
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Nightly Price
                  </label>
                  <input
                    type="text"
                    value={form.nightlyPrice}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        nightlyPrice: e.target.value,
                      }))
                    }
                    placeholder="e.g., $150"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Cancellation Policy
                  </label>
                  <select
                    value={form.cancellationPolicy}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        cancellationPolicy: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  >
                    <option value="">Select...</option>
                    <option value="Flexible">Flexible</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Strict">Strict</option>
                    <option value="Super Strict">Super Strict</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Number of Reviews
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.reviewCount}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        reviewCount: e.target.value,
                      }))
                    }
                    placeholder="e.g., 47"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Average Rating
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    value={form.averageRating}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        averageRating: e.target.value,
                      }))
                    }
                    placeholder="e.g., 4.8"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Check-in Time
                  </label>
                  <input
                    type="text"
                    value={form.checkInTime}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        checkInTime: e.target.value,
                      }))
                    }
                    placeholder="e.g., 3:00 PM"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Check-out Time
                  </label>
                  <input
                    type="text"
                    value={form.checkOutTime}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        checkOutTime: e.target.value,
                      }))
                    }
                    placeholder="e.g., 11:00 AM"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Response Rate
                  </label>
                  <input
                    type="text"
                    value={form.responseRate}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        responseRate: e.target.value,
                      }))
                    }
                    placeholder="e.g., 98%"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Minimum Stay (nights)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.minimumStay}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        minimumStay: e.target.value,
                      }))
                    }
                    placeholder="e.g., 2"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="superhost"
                  checked={form.superhostStatus}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      superhostStatus: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <label
                  htmlFor="superhost"
                  className="text-sm font-medium text-foreground"
                >
                  I am a Superhost
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  House Rules
                </label>
                <textarea
                  value={form.houseRules}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      houseRules: e.target.value,
                    }))
                  }
                  placeholder="Paste your house rules here..."
                  rows={4}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto rounded-xl bg-secondary px-12 py-4 font-semibold text-white hover:bg-secondary-light transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Preparing Analysis..." : "Analyze My Listing"}
              </button>
              <p className="text-xs text-muted">
                Your data is analyzed securely and never shared.
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ManualInputPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ManualInputContent />
    </Suspense>
  );
}
