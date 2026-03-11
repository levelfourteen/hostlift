"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScoreRing from "@/components/ScoreRing";
import { sampleAuditResult } from "@/lib/sample-data";

function getScoreBarColor(score: number): string {
  if (score >= 8) return "bg-score-excellent";
  if (score >= 6) return "bg-score-good";
  if (score >= 4) return "bg-score-medium";
  return "bg-score-poor";
}

export default function Home() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      router.push(
        `/manual-input?url=${encodeURIComponent(url.trim())}`
      );
    } else {
      router.push("/manual-input");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container text-center">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            AI-Powered Listing Optimization
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl max-w-4xl mx-auto leading-tight">
            Your Airbnb Listing is{" "}
            <span className="text-primary">Leaving Money</span> on the Table
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
            Get an instant AI audit of your listing with a detailed scorecard,
            actionable recommendations, and AI-rewritten copy that drives more
            bookings.
          </p>

          {/* URL Input */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
          >
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your Airbnb listing URL..."
              className="flex-1 rounded-xl border border-border bg-card px-5 py-3.5 text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <button
              type="submit"
              className="rounded-xl bg-secondary px-8 py-3.5 font-semibold text-white hover:bg-secondary-light transition-colors whitespace-nowrap"
            >
              Audit My Listing
            </button>
          </form>
          <p className="mt-3 text-sm text-muted">
            No URL? No problem.{" "}
            <button
              onClick={() => router.push("/manual-input")}
              className="text-primary hover:underline font-medium"
            >
              Enter your listing details manually
            </button>
          </p>

          {/* Social Proof */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-score-excellent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>10,000+ listings optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-score-excellent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Avg. 23% booking increase</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-score-excellent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Results in under 60 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-center text-muted mb-12 max-w-xl mx-auto">
            Three simple steps to a higher-performing listing
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Paste Your URL",
                desc: "Drop in your Airbnb listing URL or enter your property details manually.",
              },
              {
                step: "2",
                title: "Get Your Score",
                desc: "Our AI analyzes every aspect of your listing across 8 key categories.",
              },
              {
                step: "3",
                title: "Optimize & Earn",
                desc: "Apply AI-written improvements and watch your bookings increase.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="text-center p-6 rounded-2xl border border-border bg-background"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Everything You Need to Optimize
          </h2>
          <p className="text-center text-muted mb-12 max-w-xl mx-auto">
            HostLift analyzes every aspect of your listing and gives you
            specific, actionable improvements.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                ),
                title: "8-Category Scorecard",
                desc: "Title, description, amenities, pricing, SEO, guest experience, competitive position, and overall health — all scored 1-10.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                ),
                title: "AI-Rewritten Copy",
                desc: "Get 3 optimized title options and a complete description rewrite you can copy and paste directly into Airbnb.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                ),
                title: "Priority Recommendations",
                desc: "Every suggestion ranked by impact — know exactly what to fix first for the biggest booking boost.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                ),
                title: "SEO Analysis",
                desc: "Find missing keywords, search visibility issues, and optimization gaps that keep your listing buried.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
                title: "Pricing Insights",
                desc: "Get data-backed pricing guidance based on your property type, location, and amenities.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                ),
                title: "Quick Wins",
                desc: "Top 3 changes you can make in under 10 minutes for immediate improvement.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Report Preview */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            See a Sample Report
          </h2>
          <p className="text-center text-muted mb-12 max-w-xl mx-auto">
            Here&apos;s what a real HostLift audit looks like. This is an actual
            analysis of a mountain cabin listing.
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-border bg-background p-8">
              <div className="flex flex-col items-center gap-6 mb-8">
                <ScoreRing
                  score={sampleAuditResult.overall_score}
                  maxScore={100}
                  grade={sampleAuditResult.overall_grade}
                  label="Overall Score"
                />
                <p className="text-sm text-muted text-center max-w-md">
                  {sampleAuditResult.summary}
                </p>
              </div>
              <div className="space-y-3">
                {sampleAuditResult.categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg bg-card border border-border"
                  >
                    <span className="text-lg font-bold text-foreground w-8 text-right">
                      {cat.score}
                    </span>
                    <div className="flex-1">
                      <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getScoreBarColor(cat.score)}`}
                          style={{ width: `${cat.score * 10}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-foreground w-44">
                      {cat.name}
                    </span>
                    <span className="text-sm font-semibold text-muted w-8">
                      {cat.grade}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push("/manual-input")}
                  className="rounded-xl bg-secondary px-8 py-3 font-semibold text-white hover:bg-secondary-light transition-colors"
                >
                  Get Your Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center">
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  className="w-5 h-5 text-secondary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-lg text-foreground mb-4">
              &ldquo;I used HostLift on my Colorado cabin and increased bookings
              23% in 30 days. The AI rewrote my title and description — I just
              copied and pasted. Easiest optimization I&apos;ve ever done.&rdquo;
            </blockquote>
            <p className="text-sm text-muted">
              — Colorado STR Host &amp; Property Manager
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-card border-y border-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-muted mb-12 max-w-xl mx-auto">
            Start with a single audit or go unlimited. No hidden fees.
          </p>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {/* Single Audit */}
            <div className="rounded-2xl border border-border bg-background p-8">
              <h3 className="font-semibold text-lg text-foreground">
                Single Audit
              </h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-extrabold text-foreground">
                  $19
                </span>
                <span className="text-muted ml-1">one-time</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Complete listing audit",
                  "8-category scorecard",
                  "AI recommendations",
                  "Full listing rewrite",
                  "Quick wins checklist",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <svg
                      className="w-4 h-4 text-score-excellent shrink-0"
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
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push("/manual-input")}
                className="w-full rounded-xl border border-primary text-primary px-6 py-3 font-semibold hover:bg-primary/5 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Pro Monthly */}
            <div className="rounded-2xl border-2 border-primary bg-background p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </div>
              <h3 className="font-semibold text-lg text-foreground">
                Pro Monthly
              </h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-extrabold text-foreground">
                  $29
                </span>
                <span className="text-muted ml-1">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited audits",
                  "Unlimited rewrites",
                  "Photo analysis",
                  "Create from scratch tool",
                  "Score history tracking",
                  "Priority AI processing",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <svg
                      className="w-4 h-4 text-score-excellent shrink-0"
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
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push("/manual-input")}
                className="w-full rounded-xl bg-primary text-white px-6 py-3 font-semibold hover:bg-primary-dark transition-colors"
              >
                Start Pro
              </button>
            </div>

            {/* Pro Annual */}
            <div className="rounded-2xl border border-border bg-background p-8">
              <h3 className="font-semibold text-lg text-foreground">
                Pro Annual
              </h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-extrabold text-foreground">
                  $249
                </span>
                <span className="text-muted ml-1">/year</span>
              </div>
              <p className="text-sm text-score-excellent font-medium mb-4">
                Save $99/year vs monthly
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Pro Monthly",
                  "2 months free",
                  "Annual billing",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <svg
                      className="w-4 h-4 text-score-excellent shrink-0"
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
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push("/manual-input")}
                className="w-full rounded-xl border border-primary text-primary px-6 py-3 font-semibold hover:bg-primary/5 transition-colors"
              >
                Go Annual
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How does HostLift analyze my listing?",
                a: "HostLift uses advanced AI to evaluate your Airbnb listing across 8 key categories: title, description, amenities, pricing, SEO, guest experience, competitive position, and overall health. Each category is scored 1-10, and you get specific, actionable recommendations to improve.",
              },
              {
                q: "Do I need to give HostLift access to my Airbnb account?",
                a: "No. HostLift never needs your Airbnb login. You simply paste your listing URL or enter your details manually. We analyze the publicly visible listing data.",
              },
              {
                q: "What if I don't have a listing yet?",
                a: "HostLift can generate a complete listing from scratch! Use our Create From Scratch tool to input your property details, and our AI will generate an optimized title, description, amenity suggestions, and more.",
              },
              {
                q: "How is this different from ChatGPT?",
                a: "HostLift is purpose-built for Airbnb optimization with a structured scoring system, visual scorecard, category-by-category analysis, and one-click copy for every suggestion. It also includes photo analysis and competitive benchmarking that generic AI tools don't offer.",
              },
              {
                q: "Can I get a refund?",
                a: "Yes. If you're not satisfied with your audit, contact us within 7 days for a full refund. Pro subscriptions can be canceled anytime from your dashboard.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-border bg-card"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-medium text-foreground">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-muted group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="px-6 pb-4 text-sm text-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Boost Your Bookings?
          </h2>
          <p className="text-primary-light/80 mb-8 max-w-lg mx-auto">
            Join thousands of hosts who&apos;ve increased their bookings with
            HostLift. Get your listing audit in under 60 seconds.
          </p>
          <button
            onClick={() => router.push("/manual-input")}
            className="rounded-xl bg-secondary px-10 py-4 font-semibold text-white hover:bg-secondary-light transition-colors text-lg"
          >
            Audit My Listing — $19
          </button>
          <p className="mt-4 text-sm text-primary-light/60">
            Or go Pro for $29/month — unlimited audits
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
