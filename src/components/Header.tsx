"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
            H
          </div>
          <span className="text-xl font-bold text-foreground">
            Host<span className="text-primary">Lift</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#features"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/#faq"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/manual-input"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Audit My Listing
          </Link>
        </div>
      </div>
    </header>
  );
}
