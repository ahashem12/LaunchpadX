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

// Fetch grants from database
export async function getGrants(): Promise<EcosystemItem[]> {
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
}

// Fetch partners from database
export async function getPartners(): Promise<EcosystemItem[]> {
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
}

// Fetch ventures from database
export async function getVentures(): Promise<EcosystemItem[]> {
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
}

// Fetch legal services from database
export async function getLegalServices(): Promise<EcosystemItem[]> {
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
      location: "Tech Innovation Foundation",
      buttonText: "Apply Now",
      url: "https://techinnovation.org/grants/catalyst"
    },
    {
      id: 2,
      title: "Sustainable Future Grant",
      description: "Funding environmentally conscious projects that contribute to a sustainable future and clean technology development.",
      banner_url: "https://www.w3schools.com/css/img_5terre.jpg",
      badge: "$100K Available",
      badgeColor: "bg-watermelon-green text-white",
      location: "Green Tech Alliance",
      buttonText: "Apply Now",
      url: "https://greentechalliance.org/sustainable-grant"
    },
    {
      id: 3,
      title: "Digital Health Innovation",
      description: "Advancing healthcare through digital transformation and innovative medical technologies for better patient outcomes.",
      banner_url: "https://www.w3schools.com/css/img_5terre.jpg",
      badge: "$500K Max",
      badgeColor: "bg-watermelon-red text-white",
      location: "Healthcare Innovation Hub",
      buttonText: "Apply Now",
      url: "https://healthinnovationhub.org/digital-health"
    },
    {
      id: 4,
      title: "Social Impact Accelerator",
      description: "Supporting projects that create positive social impact in underserved communities and drive meaningful change.",
      banner_url: "https://www.w3schools.com/css/img_5terre.jpg",
      badge: "$75K Grant",
      badgeColor: "bg-watermelon-green text-white",
      location: "Community Development Fund",
      buttonText: "Apply Now",
      url: "https://communitydev.org/social-impact"
    },
    {
      id: 5,
      title: "AI Research Initiative",
      description: "Accelerating artificial intelligence research and development for next-generation applications and solutions.",
      banner_url: "https://www.w3schools.com/css/img_5terre.jpg",
      badge: "$300K Funding",
      badgeColor: "bg-watermelon-green text-white",
      location: "Future Tech Foundation",
      buttonText: "Apply Now",
      url: "https://futuretechfoundation.org/ai-research"
    },
    {
      id: 6,
      title: "Blockchain Development Fund",
      description: "Supporting blockchain technology development and decentralized application innovation across various industries.",
      banner_url: "https://www.w3schools.com/css/img_5terre.jpg",
      badge: "$150K Available",
      badgeColor: "bg-watermelon-green text-white",
      location: "Crypto Innovation Lab",
      buttonText: "Apply Now",
      url: "https://cryptoinnovationlab.org/blockchain-fund"
    },
    {
      id: 7,
      title: "EdTech Innovation Grant",
      description: "Transforming education through technology innovation and creating accessible learning solutions for all students.",
      banner_url: "https://www.w3schools.com/css/img_5terre.jpg",
      badge: "$80K Grant",
      badgeColor: "bg-watermelon-green text-white",
      location: "Education Forward",
      buttonText: "Apply Now",
      url: "https://educationforward.org/edtech-grant"
    },
    {
      id: 8,
      title: "Climate Tech Accelerator",
      description: "Developing climate technology solutions to address environmental challenges and promote sustainable practices.",
      banner_url: "https://www.w3schools.com/css/img_5terre.jpg",
      badge: "$200K Fund",
      badgeColor: "bg-watermelon-green text-white",
      location: "Environmental Solutions Inc",
      buttonText: "Apply Now",
      url: "https://environmentalsolutions.org/climate-tech"
    }
  ]
}

// Fallback data for partners
function getFallbackPartners(): EcosystemItem[] {
  return [
    {
      id: 1,
      title: "Sequoia Capital",
      description: "Leading venture capital firm investing in technology companies from seed to growth stage across multiple sectors.",
      banner_url: "/api/placeholder/400/200",
      badge: "$1M - $50M",
      badgeColor: "bg-watermelon-green text-white",
      location: "Menlo Park, CA",
      category: "Venture Capital",
      buttonText: "Contact Us",
      url: "https://sequoiacap.com"
    },
    {
      id: 2,
      title: "Y Combinator",
      description: "World-renowned startup accelerator providing funding, mentorship, and resources to early-stage companies.",
      banner_url: "/api/placeholder/400/200",
      badge: "$500K Program",
      badgeColor: "bg-watermelon-red text-white",
      location: "Mountain View, CA",
      category: "Accelerator",
      buttonText: "Contact Us",
      url: "https://ycombinator.com"
    },
    {
      id: 3,
      title: "Techstars",
      description: "Global startup accelerator network helping entrepreneurs succeed through mentorship and funding programs.",
      banner_url: "/api/placeholder/400/200",
      badge: "$120K Investment",
      badgeColor: "bg-watermelon-red text-white",
      location: "Boulder, CO",
      category: "Accelerator",
      buttonText: "Contact Us",
      url: "https://techstars.com"
    },
    {
      id: 4,
      title: "Andreessen Horowitz",
      description: "Prominent venture capital firm focused on technology investments and supporting portfolio companies.",
      banner_url: "/api/placeholder/400/200",
      badge: "$10M - $100M",
      badgeColor: "bg-watermelon-green text-white",
      location: "Menlo Park, CA",
      category: "Venture Capital",
      buttonText: "Contact Us",
      url: "https://a16z.com"
    },
    {
      id: 5,
      title: "500 Startups",
      description: "Global venture capital firm and startup accelerator investing in early-stage technology companies.",
      banner_url: "/api/placeholder/400/200",
      badge: "$250K Fund",
      badgeColor: "bg-watermelon-red text-white",
      location: "San Francisco, CA",
      category: "Accelerator",
      buttonText: "Contact Us",
      url: "https://500.co"
    },
    {
      id: 6,
      title: "Microsoft for Startups",
      description: "Microsoft's program supporting startups with technology, go-to-market resources, and funding opportunities.",
      banner_url: "/api/placeholder/400/200",
      badge: "$120K Credits",
      badgeColor: "bg-blue-600 text-white",
      location: "Redmond, WA",
      category: "Corporate Partner",
      buttonText: "Contact Us",
      url: "https://microsoft.com/startups"
    },
    {
      id: 7,
      title: "AWS Activate",
      description: "Amazon Web Services program providing startups with cloud credits, technical support, and training.",
      banner_url: "/api/placeholder/400/200",
      badge: "$100K Credits",
      badgeColor: "bg-blue-600 text-white",
      location: "Seattle, WA",
      category: "Corporate Partner",
      buttonText: "Contact Us",
      url: "https://aws.amazon.com/activate"
    },
    {
      id: 8,
      title: "Google for Startups",
      description: "Google's initiative supporting startups with cloud credits, mentorship, and access to Google's network.",
      banner_url: "/api/placeholder/400/200",
      badge: "$200K Credits",
      badgeColor: "bg-blue-600 text-white",
      location: "Mountain View, CA",
      category: "Corporate Partner",
      buttonText: "Contact Us",
      url: "https://startup.google.com"
    }
  ]
}

// Fallback data for ventures
function getFallbackVentures(): EcosystemItem[] {
  return [
    {
      id: 1,
      title: "Rocket Studio",
      description: "Building next-generation AI companies from the ground up with experienced entrepreneurs and cutting-edge technology.",
      banner_url: "/api/placeholder/400/200",
      badge: "85% Success Rate",
      badgeColor: "bg-watermelon-green text-white",
      location: "San Francisco, CA",
      category: "AI & Machine Learning",
      buttonText: "Learn More",
      url: "https://rocketstudio.ai"
    },
    {
      id: 2,
      title: "Innovation Forge",
      description: "Creating revolutionary financial technology companies that transform how people interact with money and investments.",
      banner_url: "/api/placeholder/400/200",
      badge: "8 Companies Built",
      badgeColor: "bg-blue-600 text-white",
      location: "New York, NY",
      category: "FinTech Solutions",
      buttonText: "Learn More",
      url: "https://innovationforge.com"
    },
    {
      id: 3,
      title: "Future Labs",
      description: "Developing healthcare technology companies that improve patient outcomes and revolutionize medical care delivery.",
      banner_url: "/api/placeholder/400/200",
      badge: "$500M Portfolio Value",
      badgeColor: "bg-green-600 text-white",
      location: "Boston, MA",
      category: "Healthcare Innovation",
      buttonText: "Learn More",
      url: "https://futurelabs.health"
    },
    {
      id: 4,
      title: "Digital Builders",
      description: "Creating innovative e-commerce and retail technology companies that reshape consumer shopping experiences.",
      banner_url: "/api/placeholder/400/200",
      badge: "6 Exits",
      badgeColor: "bg-purple-600 text-white",
      location: "Austin, TX",
      category: "E-commerce & Retail",
      buttonText: "Learn More",
      url: "https://digitalbuilders.com"
    },
    {
      id: 5,
      title: "Green Tech Studio",
      description: "Building sustainable technology companies focused on environmental solutions and clean energy innovations.",
      banner_url: "/api/placeholder/400/200",
      badge: "Climate Focus",
      badgeColor: "bg-emerald-600 text-white",
      location: "Seattle, WA",
      category: "Sustainability",
      buttonText: "Learn More",
      url: "https://greentechstudio.com"
    },
    {
      id: 6,
      title: "Mobility Ventures",
      description: "Developing next-generation transportation and mobility companies that transform how people and goods move.",
      banner_url: "/api/placeholder/400/200",
      badge: "Mobility Focus",
      badgeColor: "bg-orange-600 text-white",
      location: "Detroit, MI",
      category: "Transportation",
      buttonText: "Learn More",
      url: "https://mobilityventures.com"
    },
    {
      id: 7,
      title: "Data Science Studio",
      description: "Creating data-driven companies that leverage analytics and machine learning to solve complex business problems.",
      banner_url: "/api/placeholder/400/200",
      badge: "Data Expertise",
      badgeColor: "bg-cyan-600 text-white",
      location: "Chicago, IL",
      category: "Big Data & Analytics",
      buttonText: "Learn More",
      url: "https://datasciencestudio.com"
    },
    {
      id: 8,
      title: "Blockchain Builders",
      description: "Building the next generation of blockchain and cryptocurrency companies that power the decentralized web.",
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
