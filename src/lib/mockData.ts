// Mock LaunchDarkly and Contentful data for the demo

export interface LDFlag {
  key: string;
  name: string;
  variations: Array<{ name: string; value: any }>;
  defaultVariation: number;
}

export interface ContentfulEntry {
  sys: {
    id: string;
    type: string;
  };
  fields: {
    title?: string;
    description?: string;
    image?: {
      fields: {
        file: {
          url: string;
        };
        title: string;
      };
    };
    ctaText?: string;
    ctaUrl?: string;
    content?: any;
  };
}

export interface FlagMapping {
  flagKey: string;
  contentMapping: Record<string, string>; // variation index/name -> entry ID
}

export const mockFlags: LDFlag[] = [
  {
    key: "hero-banner-variant",
    name: "Hero Banner Variant",
    variations: [
      { name: "control", value: false },
      { name: "treatment", value: true }
    ],
    defaultVariation: 0
  },
  {
    key: "promo-campaign",
    name: "Promotional Campaign",
    variations: [
      { name: "default", value: "default" },
      { name: "summer-sale", value: "summer" },
      { name: "holiday-special", value: "holiday" }
    ],
    defaultVariation: 0
  },
  {
    key: "product-recommendation",
    name: "Product Recommendation Engine",
    variations: [
      { name: "basic", value: "basic" },
      { name: "ai-powered", value: "ai" }
    ],
    defaultVariation: 0
  },
  {
    key: "onboarding-flow",
    name: "User Onboarding Flow",
    variations: [
      { name: "standard", value: "standard" },
      { name: "simplified", value: "simplified" },
      { name: "gamified", value: "gamified" }
    ],
    defaultVariation: 0
  }
];

export const mockEntries: ContentfulEntry[] = [
  // Hero Banner Entries
  {
    sys: { id: "hero-control", type: "Entry" },
    fields: {
      title: "Scale feature management with confidence",
      description: "LaunchDarkly's feature management platform empowers all teams to deliver and control software.",
      ctaText: "Start free trial",
      ctaUrl: "/signup",
      image: {
        fields: {
          file: { url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop" },
          title: "Team collaboration"
        }
      }
    }
  },
  {
    sys: { id: "hero-treatment", type: "Entry" },
    fields: {
      title: "Ship faster with progressive delivery",
      description: "Deploy code safely, release features strategically, and measure impact with LaunchDarkly's platform.",
      ctaText: "See how it works",
      ctaUrl: "/demo",
      image: {
        fields: {
          file: { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop" },
          title: "Progressive delivery"
        }
      }
    }
  },

  // Promo Campaign Entries
  {
    sys: { id: "promo-default", type: "Entry" },
    fields: {
      title: "Try LaunchDarkly for free",
      description: "Get started with our 14-day trial",
      ctaText: "Start trial",
      ctaUrl: "/trial"
    }
  },
  {
    sys: { id: "promo-summer", type: "Entry" },
    fields: {
      title: "Summer Special: 25% off Enterprise",
      description: "Limited time offer - Save on annual Enterprise plans",
      ctaText: "Claim offer",
      ctaUrl: "/summer-sale"
    }
  },
  {
    sys: { id: "promo-holiday", type: "Entry" },
    fields: {
      title: "Holiday Bundle: Platform + Professional Services",
      description: "Complete setup and optimization package",
      ctaText: "Learn more",
      ctaUrl: "/holiday-bundle"
    }
  },

  // Banking Demo Entries
  {
    sys: { id: "bank-hero-standard", type: "Entry" },
    fields: {
      title: "Welcome to ToggleBank",
      description: "Your trusted partner in digital banking solutions",
      ctaText: "Open Account",
      ctaUrl: "/open-account"
    }
  },
  {
    sys: { id: "bank-hero-premium", type: "Entry" },
    fields: {
      title: "Exclusive Premium Banking Experience",
      description: "Personalized wealth management and premium perks",
      ctaText: "Explore Premium",
      ctaUrl: "/premium"
    }
  },

  // Marketplace Demo Entries
  {
    sys: { id: "marketplace-hero-basic", type: "Entry" },
    fields: {
      title: "Galaxy Marketplace",
      description: "Discover amazing products from sellers worldwide",
      ctaText: "Start Shopping",
      ctaUrl: "/browse"
    }
  },
  {
    sys: { id: "marketplace-hero-ai", type: "Entry" },
    fields: {
      title: "AI-Powered Shopping Experience",
      description: "Get personalized recommendations tailored just for you",
      ctaText: "Discover Now",
      ctaUrl: "/ai-browse"
    }
  },

  // DevOps Demo Entries
  {
    sys: { id: "devops-hero-standard", type: "Entry" },
    fields: {
      title: "Release Portal",
      description: "Streamline your deployment workflow",
      ctaText: "View Releases",
      ctaUrl: "/releases"
    }
  },
  {
    sys: { id: "devops-hero-advanced", type: "Entry" },
    fields: {
      title: "Advanced Release Intelligence",
      description: "AI-powered insights and automated rollback protection",
      ctaText: "Enable Intelligence",
      ctaUrl: "/ai-releases"
    }
  }
];

export const mockFlagMappings: FlagMapping[] = [
  {
    flagKey: "hero-banner-variant",
    contentMapping: {
      "0": "hero-control",
      "1": "hero-treatment",
      "control": "hero-control",
      "treatment": "hero-treatment"
    }
  },
  {
    flagKey: "promo-campaign",
    contentMapping: {
      "0": "promo-default",
      "1": "promo-summer",
      "2": "promo-holiday",
      "default": "promo-default",
      "summer-sale": "promo-summer",
      "holiday-special": "promo-holiday"
    }
  },
  {
    flagKey: "product-recommendation",
    contentMapping: {
      "0": "marketplace-hero-basic",
      "1": "marketplace-hero-ai",
      "basic": "marketplace-hero-basic",
      "ai-powered": "marketplace-hero-ai"
    }
  },
  {
    flagKey: "onboarding-flow",
    contentMapping: {
      "0": "bank-hero-standard",
      "1": "bank-hero-premium",
      "2": "devops-hero-advanced",
      "standard": "bank-hero-standard",
      "simplified": "bank-hero-premium",
      "gamified": "devops-hero-advanced"
    }
  }
];

export const mockLDContext = {
  key: "user-123",
  name: "Demo User",
  email: "demo@example.com",
  country: "US",
  custom: {
    plan: "enterprise",
    beta_user: true
  }
};