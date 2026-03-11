"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScoreRing from "@/components/ScoreRing";
import CategoryCard from "@/components/CategoryCard";
import CopyButton from "@/components/CopyButton";
import { ListingData, AuditResult } from "@/lib/types";

const ANALYSIS_STEPS = [
  "Reading your listing details...",
  "Analyzing your title for SEO and click-through...",
  "Reviewing your description structure...",
  "Evaluating your amenity coverage...",
  "Assessing pricing competitiveness...",
  "Checking search visibility signals...",
  "Analyzing guest experience factors...",
  "Benchmarking competitive position...",
  "Generating personalized recommendations...",
  "Building your scorecard...",
];

export default function AuditPage() {
  const router = useRouter();
  const [status, setStatus] = useState<
    "loading" | "analyzing" | "complete" | "error"
  >("loading");
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");
  const [listingData, setListingData] = useState<ListingData | null>(null);

  const runAnalysis = useCallback(async (listing: ListingData) => {
    setStatus("analyzing");

    // Progress through steps while waiting
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) =>
        prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev
      );
    }, 2500);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing }),
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Analysis failed");
      }

      const data = await response.json();
      setResult(data.result);
      setStatus("complete");
    } catch (err) {
      clearInterval(stepInterval);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("hostlift_listing");
    if (!stored) {
      router.push("/manual-input");
      return;
    }

    try {
      const listing: ListingData = JSON.parse(stored);
      setListingData(listing);
      runAnalysis(listing);
    } catch {
      router.push("/manual-input");
    }
  }, [router, runAnalysis]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  if (status === "analyzing") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-8" />
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Analyzing Your Listing
            </h2>
            <p className="text-muted mb-8">
              Our AI is reviewing every aspect of your listing. This usually
              takes 15-30 seconds.
            </p>
            <div className="space-y-3">
              {ANALYSIS_STEPS.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                    i < currentStep
                      ? "text-score-excellent"
                      : i === currentStep
                        ? "text-foreground font-medium"
                        : "text-muted/40"
                  }`}
                >
                  {i < currentStep ? (
                    <svg
                      className="w-4 h-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : i === currentStep ? (
                    <div className="w-4 h-4 shrink-0 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-4 h-4 shrink-0 rounded-full border border-border" />
                  )}
                  {step}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 rounded-full bg-score-poor/10 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-score-poor"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Analysis Failed
            </h2>
            <p className="text-muted mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  if (listingData) {
                    setError("");
                    setCurrentStep(0);
                    runAnalysis(listingData);
                  }
                }}
                className="rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push("/manual-input")}
                className="rounded-xl border border-border px-6 py-3 font-semibold text-foreground hover:bg-card transition-colors"
              >
                Edit Details
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Your Listing Audit Report
            </h1>
            {listingData?.title && (
              <p className="text-muted">&ldquo;{listingData.title}&rdquo;</p>
            )}
          </div>

          {/* Overall Score */}
          <div className="rounded-2xl border border-border bg-card p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <ScoreRing
                score={result.overall_score}
                maxScore={100}
                size={180}
                strokeWidth={14}
                grade={result.overall_grade}
                label="Overall Score"
              />
              <div className="flex-1 text-center md:text-left">
                <p className="text-muted mb-4">{result.summary}</p>
                {result.quick_wins.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm text-foreground mb-2">
                      Quick Wins (under 10 minutes):
                    </h3>
                    <ul className="space-y-1.5">
                      {result.quick_wins.map((win, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted"
                        >
                          <svg
                            className="w-4 h-4 text-score-excellent shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          {win}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Category Scores */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Category Breakdown
            </h2>
            <div className="space-y-3">
              {result.categories.map((category) => (
                <CategoryCard key={category.name} category={category} />
              ))}
            </div>
          </div>

          {/* Rewritten Titles */}
          {result.rewritten_title_options.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-8 mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                AI-Optimized Title Options
              </h2>
              <div className="space-y-3">
                {result.rewritten_title_options.map((title, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 rounded-xl border border-primary/10 bg-primary/5 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {title}
                      </span>
                    </div>
                    <CopyButton text={title} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rewritten Description */}
          {result.rewritten_description && (
            <div className="rounded-2xl border border-border bg-card p-8 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  AI-Rewritten Description
                </h2>
                <CopyButton text={result.rewritten_description} />
              </div>
              <div className="rounded-xl border border-primary/10 bg-primary/5 p-6">
                <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                  {result.rewritten_description}
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-2xl bg-primary p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Want to Optimize Another Listing?
            </h2>
            <p className="text-primary-light/80 mb-6">
              Run unlimited audits with HostLift Pro — $29/month
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  sessionStorage.removeItem("hostlift_listing");
                  router.push("/manual-input");
                }}
                className="rounded-xl bg-secondary px-8 py-3 font-semibold text-white hover:bg-secondary-light transition-colors"
              >
                Audit Another Listing
              </button>
              <button
                onClick={() => router.push("/#pricing")}
                className="rounded-xl bg-white/10 border border-white/20 px-8 py-3 font-semibold text-white hover:bg-white/20 transition-colors"
              >
                View Pro Plans
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
