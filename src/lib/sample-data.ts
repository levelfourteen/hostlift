import { AuditResult } from "./types";

export const sampleAuditResult: AuditResult = {
  overall_score: 62,
  overall_grade: "C+",
  summary:
    "This mountain cabin has strong potential with its location and amenities, but the listing underperforms due to a generic title, unstructured description, and missed SEO opportunities. With targeted improvements to the title, description, and amenity presentation, this listing could see a 20-30% increase in booking inquiries.",
  categories: [
    {
      name: "Title",
      score: 4,
      grade: "D+",
      status: "critical",
      findings:
        "The title 'Beautiful Cabin in the Mountains' is generic and doesn't differentiate from thousands of similar listings. It lacks specific keywords, location identifiers, and unique selling points.",
      recommendations: [
        {
          issue: "Generic title with no differentiating keywords",
          why_it_matters:
            "Listings with specific, keyword-rich titles get 26% more clicks in Airbnb search results.",
          action:
            "Rewrite the title to include: location specifics, top amenity, and unique feature. Example: 'Ski-In Mountain Cabin | Hot Tub & Fireplace | Sleeps 8'",
          priority: "high",
          rewrite:
            "Ski-In Mountain Cabin | Hot Tub & Fireplace | Sleeps 8",
        },
      ],
    },
    {
      name: "Description",
      score: 5,
      grade: "C",
      status: "needs_work",
      findings:
        "The description lists features but doesn't paint a picture of the guest experience. It reads like a specification sheet rather than an invitation. Missing structured sections for different description fields.",
      recommendations: [
        {
          issue: "Feature-focused instead of experience-focused",
          why_it_matters:
            "Listings with experiential descriptions convert 18% better than feature lists.",
          action:
            "Rewrite the opening paragraph to describe the experience: what guests will feel, see, and enjoy. Then layer in features as supporting details.",
          priority: "high",
          rewrite: null,
        },
        {
          issue: "No structured sections",
          why_it_matters:
            "Airbnb shows separate fields for The Space, Guest Access, and Other Things to Note. Using all fields gives you more real estate in search.",
          action:
            "Break the description into Airbnb's sections: The Space (main description), Guest Access (what's available), Other Things to Note (local tips, house info).",
          priority: "medium",
          rewrite: null,
        },
      ],
    },
    {
      name: "Amenities",
      score: 7,
      grade: "B",
      status: "good",
      findings:
        "Good amenity coverage with hot tub and fireplace listed. Missing some high-value amenities that guests search for: WiFi speed, EV charger, dedicated workspace.",
      recommendations: [
        {
          issue: "Missing trending amenities",
          why_it_matters:
            "WiFi speed and workspace are in the top 5 most-filtered amenities on Airbnb.",
          action:
            "Add WiFi speed (run a speed test and list it), dedicated workspace details, and any EV charging capability.",
          priority: "medium",
          rewrite: null,
        },
      ],
    },
    {
      name: "Pricing Strategy",
      score: 7,
      grade: "B",
      status: "good",
      findings:
        "Pricing appears competitive for the area. However, no smart pricing or seasonal adjustments detected.",
      recommendations: [
        {
          issue: "No seasonal pricing strategy visible",
          why_it_matters:
            "Dynamic pricing can increase annual revenue by 10-40%.",
          action:
            "Consider using a dynamic pricing tool like PriceLabs or Wheelhouse. At minimum, manually adjust for ski season (Dec-Mar), summer peak (Jun-Aug), and shoulder seasons.",
          priority: "medium",
          rewrite: null,
        },
      ],
    },
    {
      name: "SEO & Search Visibility",
      score: 5,
      grade: "C",
      status: "needs_work",
      findings:
        "Title lacks searchable keywords. Description doesn't include location-specific terms that guests search for.",
      recommendations: [
        {
          issue: "Missing location keywords",
          why_it_matters:
            "Guests search by specific areas, not just cities. Including neighborhood/area names improves search visibility.",
          action:
            "Add specific location keywords: nearby ski resorts, mountain names, town names, distance to attractions.",
          priority: "high",
          rewrite: null,
        },
      ],
    },
    {
      name: "Guest Experience Signals",
      score: 8,
      grade: "B+",
      status: "good",
      findings:
        "Good review score and response rate. Superhost status provides trust signals. Check-in process could be better highlighted.",
      recommendations: [
        {
          issue: "Self check-in not prominently featured",
          why_it_matters:
            "67% of guests prefer self check-in. It's one of Airbnb's most-used search filters.",
          action:
            "If you offer self check-in (smart lock, lockbox), make sure it's listed as an amenity and mentioned in the description.",
          priority: "low",
          rewrite: null,
        },
      ],
    },
    {
      name: "Competitive Position",
      score: 6,
      grade: "C+",
      status: "needs_work",
      findings:
        "The listing has strong amenities but poor presentation compared to top-performing mountain cabins in the area.",
      recommendations: [
        {
          issue: "Under-leveraging unique features",
          why_it_matters:
            "Top-performing listings in mountain areas emphasize unique experiences (hot tub views, ski access, wildlife).",
          action:
            "Identify your top 3 unique selling points and feature them in the title, first line of description, and photo captions.",
          priority: "high",
          rewrite: null,
        },
      ],
    },
    {
      name: "Overall Listing Health",
      score: 6,
      grade: "C+",
      status: "needs_work",
      findings:
        "This listing has a strong foundation — great amenities, good reviews, Superhost status — but is held back by weak copy and missing optimization opportunities. The fixes are straightforward and high-impact.",
      recommendations: [],
    },
  ],
  rewritten_title_options: [
    "Ski-In Mountain Cabin | Hot Tub & Fireplace | Sleeps 8",
    "Cozy Breckenridge Cabin — Hot Tub, Mountain Views & Ski Access",
    "Mountain Retreat with Hot Tub | 5 Min to Slopes | Pet Friendly",
  ],
  rewritten_description:
    "Wake up to snow-dusted pines and mountain views from your private hot tub. This cozy ski cabin is your basecamp for adventure — just 5 minutes from the slopes and steps from hiking trails.\n\nInside, you'll find a warm, thoughtfully designed space perfect for families or friend groups. Gather around the stone fireplace after a day on the mountain, cook together in the fully-equipped kitchen, or unwind in the hot tub under the stars.\n\nTHE SPACE\nThis 3-bedroom, 2-bathroom cabin sleeps up to 8 guests comfortably. The open-concept living area features a stone fireplace, smart TV, and floor-to-ceiling windows framing mountain views. The kitchen is fully equipped with modern appliances, coffee maker, and everything you need to cook full meals.\n\nThe primary bedroom offers a king bed with luxury linens and mountain views. Bedroom 2 has a queen bed, and Bedroom 3 has twin bunks — perfect for kids. Both bathrooms are recently renovated with walk-in showers.\n\nGUEST ACCESS\nYou'll have the entire cabin to yourselves, including the private hot tub on the back deck, BBQ grill, fire pit area, and covered parking for 2 vehicles. High-speed WiFi (150 Mbps) keeps you connected, and a dedicated workspace in the loft is available for those who need to get some work done.\n\nSelf check-in via smart lock means you can arrive on your schedule.\n\nOTHER THINGS TO NOTE\nWe're located in the heart of Summit County, with easy access to Breckenridge, Keystone, and Copper Mountain. The free Summit Stage bus stops just 2 blocks away. In summer, world-class hiking and mountain biking trails start from our doorstep.",
  quick_wins: [
    "Rewrite your title to include location + top amenity + guest count (takes 2 minutes)",
    "Add WiFi speed to your amenities — run a speed test and list the result (takes 5 minutes)",
    "Add self check-in as an amenity if you have a smart lock or lockbox (takes 1 minute)",
  ],
};
