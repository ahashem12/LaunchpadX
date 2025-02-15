import { Building2, Brain, Rocket, BarChart3 } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <div className="container mx-auto px-4 pt-16">
      <div className="grid md:grid-cols-4 gap-8 mb-4">
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
  );
}
