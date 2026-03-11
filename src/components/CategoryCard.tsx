"use client";

import { useState } from "react";
import { ScoringCategory } from "@/lib/types";
import CopyButton from "./CopyButton";

function getStatusColor(status: string): string {
  switch (status) {
    case "excellent":
      return "bg-score-excellent/10 text-score-excellent border-score-excellent/20";
    case "good":
      return "bg-score-good/10 text-score-good border-score-good/20";
    case "needs_work":
      return "bg-score-medium/10 text-score-medium border-score-medium/20";
    case "critical":
      return "bg-score-poor/10 text-score-poor border-score-poor/20";
    default:
      return "bg-muted/10 text-muted border-muted/20";
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "excellent":
      return "Excellent";
    case "good":
      return "Good";
    case "needs_work":
      return "Needs Work";
    case "critical":
      return "Critical";
    default:
      return status;
  }
}

function getScoreBarColor(score: number): string {
  if (score >= 8) return "bg-score-excellent";
  if (score >= 6) return "bg-score-good";
  if (score >= 4) return "bg-score-medium";
  return "bg-score-poor";
}

function getPriorityBadge(priority: string): string {
  switch (priority) {
    case "high":
      return "bg-score-poor/10 text-score-poor";
    case "medium":
      return "bg-score-medium/10 text-score-medium";
    case "low":
      return "bg-score-good/10 text-score-good";
    default:
      return "bg-muted/10 text-muted";
  }
}

export default function CategoryCard({
  category,
}: {
  category: ScoringCategory;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-background/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-foreground">
              {category.score}
            </span>
            <span className="text-sm text-muted">/10</span>
          </div>
          <div className="w-20 h-2 rounded-full bg-border overflow-hidden">
            <div
              className={`h-full rounded-full ${getScoreBarColor(category.score)} transition-all duration-700`}
              style={{ width: `${category.score * 10}%` }}
            />
          </div>
          <span className="font-semibold text-foreground">{category.name}</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(category.status)}`}
          >
            {getStatusLabel(category.status)}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-muted transition-transform ${expanded ? "rotate-180" : ""}`}
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
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-border pt-4">
          <p className="text-sm text-muted mb-4">{category.findings}</p>

          {category.recommendations.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-foreground">
                Recommendations
              </h4>
              {category.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border p-4 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm text-foreground">
                      {rec.issue}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${getPriorityBadge(rec.priority)}`}
                    >
                      {rec.priority} impact
                    </span>
                  </div>
                  <p className="text-xs text-muted">{rec.why_it_matters}</p>
                  <p className="text-sm text-foreground">{rec.action}</p>
                  {rec.rewrite && (
                    <div className="mt-2 rounded-lg bg-primary/5 border border-primary/10 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-primary">
                          AI Suggestion
                        </span>
                        <CopyButton text={rec.rewrite} />
                      </div>
                      <p className="text-sm text-foreground">{rec.rewrite}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
