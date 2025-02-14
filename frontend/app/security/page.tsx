import Link from 'next/link'
import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  FileKey, 
  Server, 
  RefreshCcw, 
  UserCheck, 
  AlertCircle,
  CheckCircle, 
  Mail
} from 'lucide-react'

export default function SecurityPage() {
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Data Security</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your security is our top priority. Learn how we protect your data and maintain privacy.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-6xl mx-auto">
          <SecurityCard
            icon={<Lock />}
            title="End-to-End Encryption"
            description="All communications between you and our servers are encrypted using industry-standard TLS 1.3 protocols."
          />
          <SecurityCard
            icon={<FileKey />}
            title="Data Encryption at Rest"
            description="Your data is encrypted using AES-256 encryption when stored on our secure servers."
          />
          <SecurityCard
            icon={<Server />}
            title="Secure Infrastructure"
            description="Our systems are hosted on enterprise-grade cloud infrastructure with multiple layers of security."
          />
          <SecurityCard
            icon={<RefreshCcw />}
            title="Regular Security Updates"
            description="We continuously monitor and update our security measures to protect against new threats."
          />
        </div>

        {/* Compliance Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <UserCheck className="w-7 h-7 text-blue-600" />
            Compliance & Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {complianceItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Handling Section */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-12 max-w-6xl mx-auto border border-blue-100">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">How We Handle Your Data</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• We never sell or share your data with third parties</li>
                {/* <li>• Data is automatically deleted after 30 days</li> */}
                {/* <li>• You can request data deletion at any time</li> */}
                <li>• Access logs are maintained for security auditing</li>
                <li>• Regular security assessments and penetration testing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Our security team is here to help you understand how we protect your data
          </p>
          <div className="flex items-center justify-center gap-4">
          {/* <Mail className="w-4 h-4 text-blue-400" /> */}
                <a href="mailto:contact@consultai.com"               className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full 
                hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
>
                  Contact Security Team
                </a>
            <Link 
              href="/faq" 
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full 
                hover:bg-blue-50 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl
                border border-blue-200"
            >
              View FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function SecurityCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-blue-600">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

const complianceItems = [
  {
    title: "GDPR Compliant",
    description: "We follow all European Union data protection and privacy regulations."
  },
  {
    title: "ISO 27001 Certified",
    description: "Our information security management system is certified to international standards."
  },
  {
    title: "SOC 2 Type II",
    description: "Annual third-party audits verify our security controls and processes."
  },
  {
    title: "HIPAA Compliant",
    description: "We maintain compliance with healthcare data protection standards."
  }
]
