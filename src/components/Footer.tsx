import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
                H
              </div>
              <span className="text-xl font-bold text-foreground">
                Host<span className="text-primary">Lift</span>
              </span>
            </div>
            <p className="text-sm text-muted">
              Your AI listing co-host. Better listings. More bookings.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Product</h4>
            <div className="flex flex-col gap-2">
              <Link href="/#features" className="text-sm text-muted hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="/#pricing" className="text-sm text-muted hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/manual-input" className="text-sm text-muted hover:text-foreground transition-colors">
                Audit a Listing
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Resources</h4>
            <div className="flex flex-col gap-2">
              <Link href="/#faq" className="text-sm text-muted hover:text-foreground transition-colors">
                FAQ
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Legal</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted">
                Privacy Policy
              </span>
              <span className="text-sm text-muted">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} HostLift. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
