import { createClient } from "@/lib/supabase/server"
import { EcosystemItem } from "@/components/ecosystem/EcosystemContainer"

export interface DatabaseEcosystemItem {
  id: number
  title: string
  subtitle?: string
  badge: string
  description: string
  banner_url?: string
  url?: string
  category?: string
  location?: string
  button_text?: string
  button_variant?: "default" | "outline"
  badge_color?: string
  type: "grant" | "partner" | "venture" | "legal"
  created_at?: string
  updated_at?: string
}

// Transform database item to EcosystemItem format
function transformToEcosystemItem(dbItem: DatabaseEcosystemItem): EcosystemItem {
  return {
    id: dbItem.id,
    title: dbItem.title,
    description: dbItem.description,
    banner_url: dbItem.banner_url,
    badge: dbItem.badge,
    badgeColor: dbItem.badge_color,
    category: dbItem.category,
    location: dbItem.location,
    buttonText: dbItem.button_text,
    buttonVariant: dbItem.button_variant,
    url: dbItem.url,
  }
}

// Fallback data for grants
function getFallbackGrants(): EcosystemItem[] {
  return [
    {
      id: 1,
      title: "Innovation Catalyst Grant",
      description: "Supporting breakthrough technologies that address global challenges through innovative solutions and startup acceleration.",
      banner_url: "https://www.w3schools.com/css/img_5terre.jpg",
      badge: "Up to $250K",
      badgeColor: "bg-watermelon-green text-white",
      location: "Global",
      category: "Innovation",
      buttonText: "Apply Now",
      url: "https://innovationcatalyst.org/apply"
    },
    {
      id: 2,
      title: "Climate Tech Accelerator",
      description: "Funding and mentorship for startups developing climate change solutions and sustainable technologies.",
      banner_url: "/api/placeholder/400/200",
      badge: "$100K - $500K",
      badgeColor: "bg-emerald-600 text-white",
      location: "San Francisco, CA",
      category: "Climate Tech",
      buttonText: "Learn More",
      url: "https://climatetechaccelerator.com"
    },
    {
      id: 3,
      title: "Digital Health Innovation Fund",
      description: "Supporting digital health startups that improve patient outcomes through technology and data-driven solutions.",
      banner_url: "/api/placeholder/400/200",
      badge: "$50K - $200K",
      badgeColor: "bg-blue-600 text-white",
      location: "Boston, MA",
      category: "HealthTech",
      buttonText: "Apply",
      url: "https://digitalhealthfund.org"
    },
    {
      id: 4,
      title: "AI Research Grant Program",
      description: "Funding for artificial intelligence research projects with potential for real-world applications and societal impact.",
      banner_url: "/api/placeholder/400/200",
      badge: "$75K - $300K",
      badgeColor: "bg-purple-600 text-white",
      location: "Multiple Locations",
      category: "AI/ML",
      buttonText: "Apply Now",
      url: "https://airesearchgrants.tech"
    },
    {
      id: 5,
      title: "Social Impact Venture Fund",
      description: "Investment and support for ventures addressing social challenges and creating positive community impact.",
      banner_url: "/api/placeholder/400/200",
      badge: "$25K - $150K",
      badgeColor: "bg-orange-600 text-white",
      location: "New York, NY",
      category: "Social Impact",
      buttonText: "Get Started",
      url: "https://socialimpactventures.org"
    },
    {
      id: 6,
      title: "Fintech Innovation Challenge",
      description: "Supporting fintech startups developing innovative financial services and payment solutions.",
      banner_url: "/api/placeholder/400/200",
      badge: "$100K - $400K",
      badgeColor: "bg-watermelon-red text-white",
      location: "London, UK",
      category: "FinTech",
      buttonText: "Submit Proposal",
      url: "https://fintechinnovation.co.uk"
    }
  ]
}

// Fallback data for partners
function getFallbackPartners(): EcosystemItem[] {
  return [
    {
      id: 1,
      title: "TechCorp Solutions",
      description: "Leading technology consulting firm specializing in digital transformation and enterprise software solutions.",
      banner_url: "/api/placeholder/400/200",
      badge: "Technology Partner",
      badgeColor: "bg-blue-600 text-white",
      location: "Silicon Valley, CA",
      category: "Technology",
      buttonText: "Partner With Us",
      url: "https://techcorpsolutions.com"
    },
    {
      id: 2,
      title: "Global Ventures Capital",
      description: "Venture capital firm focused on early-stage startups in emerging technologies and sustainable innovation.",
      banner_url: "/api/placeholder/400/200",
      badge: "Investment Partner",
      badgeColor: "bg-watermelon-green text-white",
      location: "New York, NY",
      category: "Investment",
      buttonText: "Connect",
      url: "https://globalventurescap.com"
    },
    {
      id: 3,
      title: "Innovation Labs Network",
      description: "Research and development network providing access to cutting-edge facilities and expert mentorship.",
      banner_url: "/api/placeholder/400/200",
      badge: "Research Partner",
      badgeColor: "bg-purple-600 text-white",
      location: "Boston, MA",
      category: "Research",
      buttonText: "Join Network",
      url: "https://innovationlabs.net"
    },
    {
      id: 4,
      title: "Market Access Partners",
      description: "Strategic partnership firm helping startups navigate global markets and establish international presence.",
      banner_url: "/api/placeholder/400/200",
      badge: "Strategic Partner",
      badgeColor: "bg-orange-600 text-white",
      location: "London, UK",
      category: "Market Access",
      buttonText: "Get Started",
      url: "https://marketaccesspartners.co.uk"
    },
    {
      id: 5,
      title: "CloudScale Infrastructure",
      description: "Cloud infrastructure provider offering scalable solutions and technical support for growing businesses.",
      banner_url: "/api/placeholder/400/200",
      badge: "Infrastructure Partner",
      badgeColor: "bg-emerald-600 text-white",
      location: "Austin, TX",
      category: "Infrastructure",
      buttonText: "Learn More",
      url: "https://cloudscaleinfra.com"
    },
    {
      id: 6,
      title: "Legal & Compliance Advisors",
      description: "Specialized legal services for startups and growing companies, covering corporate law and compliance.",
      banner_url: "/api/placeholder/400/200",
      badge: "Legal Partner",
      badgeColor: "bg-gray-600 text-white",
      location: "San Francisco, CA",
      category: "Legal",
      buttonText: "Consult Now",
      url: "https://legalcomplianceadvisors.com"
    }
  ]
}

// Fallback data for ventures
function getFallbackVentures(): EcosystemItem[] {
  return [
    {
      id: 1,
      title: "EcoTech Solutions",
      description: "Developing sustainable technology solutions for environmental challenges and carbon footprint reduction.",
      banner_url: "/api/placeholder/400/200",
      badge: "Series A",
      badgeColor: "bg-watermelon-green text-white",
      location: "Portland, OR",
      category: "CleanTech",
      buttonText: "Learn More",
      url: "https://ecotechsolutions.com"
    },
    {
      id: 2,
      title: "HealthAI Diagnostics",
      description: "AI-powered diagnostic tools for early disease detection and personalized healthcare solutions.",
      banner_url: "/api/placeholder/400/200",
      badge: "Seed Stage",
      badgeColor: "bg-blue-600 text-white",
      location: "Boston, MA",
      category: "HealthTech",
      buttonText: "Explore",
      url: "https://healthaidiagnostics.com"
    },
    {
      id: 3,
      title: "FinFlow Analytics",
      description: "Advanced financial analytics platform providing real-time insights for investment and risk management.",
      banner_url: "/api/placeholder/400/200",
      badge: "Series B",
      badgeColor: "bg-purple-600 text-white",
      location: "New York, NY",
      category: "FinTech",
      buttonText: "Get Demo",
      url: "https://finflowanalytics.com"
    },
    {
      id: 4,
      title: "AgriSmart Technologies",
      description: "Smart farming solutions using IoT and machine learning to optimize crop yields and resource usage.",
      banner_url: "/api/placeholder/400/200",
      badge: "Series A",
      badgeColor: "bg-emerald-600 text-white",
      location: "Austin, TX",
      category: "AgriTech",
      buttonText: "Learn More",
      url: "https://agrismarttech.com"
    },
    {
      id: 5,
      title: "EduNext Platform",
      description: "Next-generation educational platform leveraging AI to personalize learning experiences for students.",
      banner_url: "/api/placeholder/400/200",
      badge: "Seed Stage",
      badgeColor: "bg-orange-600 text-white",
      location: "San Francisco, CA",
      category: "EdTech",
      buttonText: "Try Platform",
      url: "https://edunextplatform.com"
    },
    {
      id: 6,
      title: "Blockchain Builders",
      description: "Developing decentralized applications and blockchain infrastructure for Web3 ecosystem growth.",
      banner_url: "/api/placeholder/400/200",
      badge: "Web3 Focus",
      badgeColor: "bg-watermelon-red text-white",
      location: "Miami, FL",
      category: "Web3 & Crypto",
      buttonText: "Learn More",
      url: "https://blockchainbuilders.io"
    }
  ]
}

// Fallback data for legal services
function getFallbackLegalServices(): EcosystemItem[] {
  return [
    {
      id: 1,
      title: "Business Formation",
      description: "Complete business formation services including entity selection, incorporation, and initial compliance setup.",
      banner_url: "/api/placeholder/400/200",
      badge: "$1,500 - $3,000",
      badgeColor: "bg-watermelon-green text-white",
      location: "StartupLaw Partners",
      category: "Formation",
      buttonText: "Get Started",
      url: "https://startuplawpartners.com/formation"
    },
    {
      id: 2,
      title: "Contract Review & Drafting",
      description: "Professional contract review, drafting, and negotiation services for all your business agreements.",
      banner_url: "/api/placeholder/400/200",
      badge: "$300 - $500/hr",
      badgeColor: "bg-blue-600 text-white",
      location: "Legal Tech Solutions",
      category: "Contracts",
      buttonText: "Get Started",
      url: "https://legaltechsolutions.com/contracts"
    },
    {
      id: 3,
      title: "Intellectual Property Protection",
      description: "Comprehensive IP protection including trademarks, patents, and trade secret management.",
      banner_url: "/api/placeholder/400/200",
      badge: "$2,000 - $5,000",
      badgeColor: "bg-purple-600 text-white",
      location: "IP Law Specialists",
      category: "Intellectual Property",
      buttonText: "Get Started",
      url: "https://iplawspecialists.com/protection"
    },
    {
      id: 4,
      title: "Employment Law Compliance",
      description: "Employment law guidance, policy development, and compliance management for growing teams.",
      banner_url: "/api/placeholder/400/200",
      badge: "$200 - $400/hr",
      badgeColor: "bg-orange-600 text-white",
      location: "WorkForce Legal",
      category: "Employment",
      buttonText: "Get Started",
      url: "https://workforcelegal.com/employment"
    },
    {
      id: 5,
      title: "Fundraising Legal Support",
      description: "Legal support for fundraising activities including term sheets, due diligence, and investor agreements.",
      banner_url: "/api/placeholder/400/200",
      badge: "$5,000 - $15,000",
      badgeColor: "bg-watermelon-red text-white",
      location: "Venture Law Group",
      category: "Fundraising",
      buttonText: "Get Started",
      url: "https://venturelawgroup.com/fundraising"
    },
    {
      id: 6,
      title: "Data Privacy & Security",
      description: "GDPR, CCPA compliance, privacy policy development, and data security legal frameworks.",
      banner_url: "/api/placeholder/400/200",
      badge: "$1,000 - $3,000",
      badgeColor: "bg-emerald-600 text-white",
      location: "Privacy Law Experts",
      category: "Privacy",
      buttonText: "Get Started",
      url: "https://privacylawexperts.com/compliance"
    },
    {
      id: 7,
      title: "Regulatory Compliance",
      description: "Industry-specific regulatory compliance guidance and ongoing legal support for regulated businesses.",
      banner_url: "/api/placeholder/400/200",
      badge: "$250 - $450/hr",
      badgeColor: "bg-yellow-600 text-white",
      location: "Compliance Advisors",
      category: "Compliance",
      buttonText: "Get Started",
      url: "https://complianceadvisors.com/regulatory"
    },
    {
      id: 8,
      title: "M&A Transaction Support",
      description: "Complete legal support for mergers, acquisitions, and other corporate transactions.",
      banner_url: "/api/placeholder/400/200",
      badge: "$10,000 - $50,000",
      badgeColor: "bg-gray-600 text-white",
      location: "Corporate Law Partners",
      category: "M&A",
      buttonText: "Get Started",
      url: "https://corporatelawpartners.com/ma"
    }
  ]
}

/**
 * Ecosystem service for managing grants, partners, ventures, and legal services
 */
export const ecosystemService = {
  /**
   * Fetch grants from database
   */
  async getGrants(): Promise<EcosystemItem[]> {
    try {
      const supabase = await createClient()
      
      const { data, error } = await supabase
        .from('ecosystem_items')
        .select('*')
        .eq('type', 'grant')
        .order('id', { ascending: true })

      if (error) {
        console.error('Error fetching grants:', error)
        return getFallbackGrants()
      }

      if (!data || data.length === 0) {
        return getFallbackGrants()
      }

      return data.map(transformToEcosystemItem)
    } catch (error) {
      console.error('Error in getGrants:', error)
      return getFallbackGrants()
    }
  },

  /**
   * Fetch partners from database
   */
  async getPartners(): Promise<EcosystemItem[]> {
    try {
      const supabase = await createClient()
      
      const { data, error } = await supabase
        .from('ecosystem_items')
        .select('*')
        .eq('type', 'partner')
        .order('id', { ascending: true })

      if (error) {
        console.error('Error fetching partners:', error)
        return getFallbackPartners()
      }

      if (!data || data.length === 0) {
        return getFallbackPartners()
      }

      return data.map(transformToEcosystemItem)
    } catch (error) {
      console.error('Error in getPartners:', error)
      return getFallbackPartners()
    }
  },

  /**
   * Fetch ventures from database
   */
  async getVentures(): Promise<EcosystemItem[]> {
    try {
      const supabase = await createClient()
      
      const { data, error } = await supabase
        .from('ecosystem_items')
        .select('*')
        .eq('type', 'venture')
        .order('id', { ascending: true })

      if (error) {
        console.error('Error fetching ventures:', error)
        return getFallbackVentures()
      }

      if (!data || data.length === 0) {
        return getFallbackVentures()
      }

      return data.map(transformToEcosystemItem)
    } catch (error) {
      console.error('Error in getVentures:', error)
      return getFallbackVentures()
    }
  },

  /**
   * Fetch legal services from database
   */
  async getLegalServices(): Promise<EcosystemItem[]> {
    try {
      const supabase = await createClient()
      
      const { data, error } = await supabase
        .from('ecosystem_items')
        .select('*')
        .eq('type', 'legal')
        .order('id', { ascending: true })

      if (error) {
        console.error('Error fetching legal services:', error)
        return getFallbackLegalServices()
      }

      if (!data || data.length === 0) {
        return getFallbackLegalServices()
      }

      return data.map(transformToEcosystemItem)
    } catch (error) {
      console.error('Error in getLegalServices:', error)
      return getFallbackLegalServices()
    }
  }
}

// Export individual functions for backward compatibility and direct access
export const { getGrants, getPartners, getVentures, getLegalServices } = ecosystemService
