import Link from 'next/link'
import { Mail, MessageCircle, HelpCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold text-white">ConsultAI</span>
            </div>
            <p className="text-sm text-gray-400">
              Your AI-powered business consultant available 24/7 to help you make better business decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Chat Now
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:contact@consultai.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                  contact@consultai.com
                </a>
              </li>
              <li>
                <p className="text-gray-400">
                  Available 24/7
                </p>
              </li>
            </ul>
          </div>

          {/* FAQs */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">FAQs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/security" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Data Security</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Pricing</span>
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Support</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-4 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} ConsultAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}