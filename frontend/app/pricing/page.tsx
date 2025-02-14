import Link from 'next/link'
import { ArrowLeft, Check, MessageCircle, Zap, Building2, Crown } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-4">
      <div className="container mx-auto px-6 sm:px-8 relative">
        {/* Back Button */}
        <Link 
          href="/" 
          className="absolute left-8 top-2 inline-flex items-center gap-1.5 text-gray-500 hover:text-blue-600 
            transition-colors duration-200 text-sm font-medium bg-white/50 backdrop-blur-sm 
            py-1.5 px-3 rounded-full shadow-sm hover:shadow-md border border-gray-200/50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>

        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that best fits your business needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {/* Starter Plan */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Starter</h2>
            </div>
            <p className="text-gray-600 mb-6">Perfect for small businesses just getting started</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$29</span>
              <span className="text-gray-600">/month</span>
            </div>
            <Link 
              href="/chat" 
              className="block text-center bg-blue-600 text-white px-6 py-3 rounded-full 
                hover:bg-blue-700 transition-colors duration-200 font-medium mb-8"
            >
              Get Started
            </Link>
            <ul className="space-y-4">
              {starterFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Professional Plan */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-600 p-8 hover:shadow-2xl transition-shadow duration-200
            relative md:scale-105 z-10">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Professional</h2>
            </div>
            <p className="text-gray-600 mb-6">Ideal for growing businesses</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$99</span>
              <span className="text-gray-600">/month</span>
            </div>
            <Link 
              href="/chat" 
              className="block text-center bg-blue-600 text-white px-6 py-3 rounded-full 
                hover:bg-blue-700 transition-colors duration-200 font-medium mb-8"
            >
              Get Started
            </Link>
            <ul className="space-y-4">
              {professionalFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Enterprise</h2>
            </div>
            <p className="text-gray-600 mb-6">For large organizations with specific needs</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">Custom</span>
            </div>
            <a 
              href="mailto:enterprise@consultai.com" 
              className="block text-center bg-gray-900 text-white px-6 py-3 rounded-full 
                hover:bg-gray-800 transition-colors duration-200 font-medium mb-8"
            >
              Contact Sales
            </a>
            <ul className="space-y-4">
              {enterpriseFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of businesses making better decisions with ConsultAI
          </p>
          <Link 
            href="/chat" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full 
              hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            Start Free Trial
            <Crown className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

const starterFeatures = [
  "Up to 100 AI consultations per month",
  "Basic business analytics",
  "Email support",
  "1 user account",
  "Chat history for 30 days",
  "Standard response time"
]

const professionalFeatures = [
  "Unlimited AI consultations",
  "Advanced business analytics",
  "Priority email & chat support",
  "5 user accounts",
  "Chat history for 90 days",
  "Faster response time",
  "Custom AI training",
  "API access"
]

const enterpriseFeatures = [
  "Everything in Professional",
  "Unlimited user accounts",
  "Dedicated account manager",
  "Custom integration support",
  "24/7 priority support",
  "Advanced security features",
  "Custom AI model training",
  "On-premise deployment options"
]

const faqs = [
  {
    question: "Can I change plans at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial on all our plans. No credit card required to start."
  },
  {
    question: "What happens if I exceed my monthly consultations?",
    answer: "We'll notify you when you're close to your limit. You can upgrade your plan or purchase additional consultations as needed."
  }
]