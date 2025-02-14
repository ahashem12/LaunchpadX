import { Building2, Brain, Rocket, BarChart3 } from "lucide-react"
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">

    <main className="min-h-auto bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-6">
            Your AI-Powered Business Advisor
          </h1>
          <p className="text-xl text-center mb-8 text-blue-100 max-w-3xl mx-auto">
            Get instant, data-driven insights and expert consultation for your business at a fraction of traditional consulting costs.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/chat" 
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              Start Consulting Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <FeatureCard 
            icon={<Brain className="w-8 h-8 text-blue-600" />}
            title="AI-Powered Insights"
            description="Advanced analytics and recommendations tailored to your business"
          />
          <FeatureCard 
            icon={<Building2 className="w-8 h-8 text-blue-600" />}
            title="Business Strategy"
            description="Strategic planning and growth recommendations"
          />
          <FeatureCard 
            icon={<BarChart3 className="w-8 h-8 text-blue-600" />}
            title="Market Analysis"
            description="Real-time market trends and competitive analysis"
          />
          <FeatureCard 
            icon={<Rocket className="w-8 h-8 text-blue-600" />}
            title="Growth Planning"
            description="Actionable steps to scale your business"
          />
        </div>
      </div>
    </main>
    </div>

  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}