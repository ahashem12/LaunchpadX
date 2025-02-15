import { Building2, Brain, Rocket, BarChart3 } from "lucide-react";
import Link from "next/link";
import Roadmap from "@/components/home/Roadmap";
import Team from "@/components/home/Team";
import Features from "@/components/home/features/Features";
export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <main className="min-h-auto bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-950 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-center mb-6">
              Your AI-Powered Business Advisor
            </h1>
            <p className="text-xl text-center mb-8 text-blue-100 max-w-3xl mx-auto">
              Get instant, data-driven insights and expert consultation for your
              business at a fraction of traditional consulting costs.
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
        <Features />
        <Roadmap />
        <Team />
      </main>
    </div>
  );
}
