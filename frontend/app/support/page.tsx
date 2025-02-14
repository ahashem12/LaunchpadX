import Link from 'next/link'
import { 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  Phone, 
  FileText, 
  BookOpen, 
  Clock, 
  Search,
  MessagesSquare,
  Lightbulb,
  HelpCircle
} from 'lucide-react'

export default function SupportPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How Can We Help?</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the support you need, when you need it
          </p>
        </div>

        {/* Quick Help Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Search className="w-6 h-6 text-blue-600" />
              Quick Help
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <QuickHelpCard
                icon={<MessageCircle className="w-6 h-6" />}
                title="Live Chat"
                description="Chat with our support team"
                href="/chat"
              />
              <QuickHelpCard
                icon={<Mail className="w-6 h-6" />}
                title="Email Support"
                description="Get help via email"
                href="mailto:support@consultai.com"
              />
              <QuickHelpCard
                icon={<FileText className="w-6 h-6" />}
                title="Documentation"
                description="Browse our guides"
                href="/docs"
              />
            </div>
          </div>
        </div>

        {/* Support Categories */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Getting Started */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Getting Started</h3>
            </div>
            <ul className="space-y-3">
              {gettingStartedGuides.map((guide, index) => (
                <li key={index}>
                  <Link 
                    href={guide.href}
                    className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Questions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessagesSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Common Questions</h3>
            </div>
            <ul className="space-y-3">
              {commonQuestions.map((question, index) => (
                <li key={index}>
                  <Link 
                    href={question.href}
                    className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    {question.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Support Hours */}
        <div className="bg-blue-50 rounded-2xl p-8 max-w-6xl mx-auto mb-12 border border-blue-100">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Support Hours</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Live Chat Support</h3>
                  <p className="text-gray-600">Monday - Friday: 9AM - 6PM EST</p>
                  <p className="text-gray-600">Weekend: 10AM - 4PM EST</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-gray-600">24/7 - Response within 24 hours</p>
                  <p className="text-gray-600">Priority support for premium users</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="text-center py-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to assist you
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="mailto:support@consultai.com"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full 
                hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5" />
              Contact Support
            </a>
            <Link 
              href="/chat" 
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full 
                hover:bg-blue-50 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl
                border border-blue-200"
            >
              <MessageCircle className="w-5 h-5" />
              Start Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickHelpCard({ icon, title, description, href }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  const isEmail = href.startsWith('mailto:');
  const Component = isEmail ? 'a' : Link;

  return (
    <Component
      href={href}
      className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 
        transition-colors duration-200 group"
    >
      <div className="text-gray-400 group-hover:text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm text-center">{description}</p>
    </Component>
  )
}

const gettingStartedGuides = [
  {
    title: "How to start your first consultation",
    href: "/docs/getting-started"
  },
  {
    title: "Understanding AI recommendations",
    href: "/docs/ai-recommendations"
  },
  {
    title: "Uploading business documents",
    href: "/docs/document-upload"
  },
  {
    title: "Managing your account",
    href: "/docs/account-management"
  }
]

const commonQuestions = [
  {
    title: "How to upgrade your plan",
    href: "/faq#upgrade"
  },
  {
    title: "Data security and privacy",
    href: "/faq#security"
  },
  {
    title: "Billing and payments",
    href: "/faq#billing"
  },
  {
    title: "API integration guide",
    href: "/faq#api"
  }
]