import Link from 'next/link'
import { ArrowLeft, MessageCircle, Target, Users, Shield, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-4">
      {/* Main Container */}
      <div className="container mx-auto px-4  relative">
        {/* Back Button */}
        <Link 
          href="/" 
          className="absolute left-6 top-2 inline-flex items-center gap-1.5 text-gray-500 hover:text-blue-600 
            transition-colors duration-200 text-sm font-medium bg-white/50 backdrop-blur-sm 
            py-1.5 px-3 rounded-full shadow-sm hover:shadow-md border border-gray-200/50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>

        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">ConsultAI</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Revolutionizing business consulting through artificial intelligence
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At ConsultAI, we're dedicated to democratizing access to high-quality business consulting. 
            By leveraging cutting-edge AI technology, we provide instant, data-driven insights and 
            expert advice to businesses of all sizes, helping them make better decisions and achieve 
            their goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <FeatureCard 
            icon={<Target className="w-6 h-6 text-blue-600" />}
            title="Strategic Insights"
            description="Get instant, AI-powered analysis and recommendations tailored to your business needs"
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-blue-600" />}
            title="Data Security"
            description="Your business information is protected with enterprise-grade security measures"
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-blue-600" />}
            title="24/7 Availability"
            description="Access expert business consulting whenever you need it, day or night"
          />
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Our Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TeamMember 
              name="Dr. Sarah Chen"
              role="AI Research Lead"
              description="PhD in Machine Learning with 10+ years of experience in AI development"
            />
            <TeamMember 
              name="Michael Rodriguez"
              role="Business Strategy Expert"
              description="Former McKinsey consultant with expertise in digital transformation"
            />
            <TeamMember 
              name="Emma Thompson"
              role="Product Director"
              description="15+ years experience in building AI-powered enterprise solutions"
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center py-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started Today</h2>
          <p className="text-gray-600 mb-6">
            Experience the future of business consulting with ConsultAI
          </p>
          <Link 
            href="/chat" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full 
              hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            Start Consulting
            <MessageCircle className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

function TeamMember({ name, role, description }: { 
  name: string;
  role: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full mx-auto mb-4 
        flex items-center justify-center">
        <Users className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
      <p className="text-blue-600 text-sm mb-2">{role}</p>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}