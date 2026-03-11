import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HostLift — Your AI Listing Co-Host | Better Listings. More Bookings.",
  description:
    "Optimize your Airbnb listing with AI-powered analysis. Get a detailed scorecard, actionable recommendations, and AI-rewritten listings that drive more bookings.",
  keywords: [
    "airbnb listing optimizer",
    "airbnb title generator",
    "airbnb description writer",
    "short-term rental optimization",
    "vacation rental listing",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
