"use client"
import Chatbot from "@/components/chatbot"
import { ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-4">
          {/* Back Button */}
        <Link 
          href="/" 
          className="absolute left-6 top-2 inline-flex items-center gap-1.5 text-gray-500 hover:text-blue
          -600 
            transition-colors duration-200 text-sm font-medium bg-white/50 backdrop-blur-sm 
            py-1.5 px-3 rounded-full shadow-sm hover:shadow-md border border-gray-200/50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      <div className="container mx-auto px-4 max-w-4xl relative">

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">ConsultAI</h1>
            </div>
            <p className="text-blue-100 text-sm">Get expert business advice instantly</p>
          </div>
          
          {/* Chat Interface */}
          <Chatbot />
        </div>
      </div>
    </div>
  )
}