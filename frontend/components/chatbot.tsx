"use client"
import { useState } from "react"
import { Send, Bot, User, Loader2, Upload } from "lucide-react"
import { chatService } from "@/services/chatService"
import FileUpload from "./file-upload"

export default function Chatbot() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ role: string; content: string; id: string }[]>([
    {
      role: "assistant",
      content: "Hello! I'm your ConsultAI, your AI Business Consultant. I can help you with business strategy, market analysis, financial planning, and more. What would you like to discuss today?",
      id: "welcome"
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [showUpload, setShowUpload] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    
    setIsLoading(true)
    
    try {
      const userMessage = {
        role: "user",
        content: message,
        id: Date.now().toString()
      }
      setMessages(prev => [...prev, userMessage])
      
      const aiResponse = await chatService.sendMessage([...messages, userMessage])
      
      const aiMessage = {
        role: "assistant",
        content: aiResponse,
        id: (Date.now() + 1).toString()
      }
      setMessages(prev => [...prev, aiMessage])

          // Optional: Add UI feedback when the agent is triggered
      if (aiResponse === "Thank you! I have all the information I need. Is there anything else I can help you with?") {
        console.log("Agent has been triggered");
        // You could add a toast notification or other UI feedback here
      }

      
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = {
        role: "system",
        content: "I apologize, but I encountered an error. Please try again.",
        id: (Date.now() + 1).toString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setMessage("")
    }
  }

  return (
      <div className="flex flex-col h-[600px] bg-gray-50">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                m.role === "user" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white border-2 border-gray-200"
              }`}>
                {m.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div className={`inline-block px-4 py-2 rounded-2xl ${
                m.role === "user" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white border border-gray-200"
              } shadow-sm max-w-[80%]`}>
                <p className="text-sm whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">AI is thinking...</span>
            </div>
          )}
        </div>
  
        {/* Input Form */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowUpload(true)}
              className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
              title="Upload Document"
            >
              <Upload className="w-5 h-5" />
            </button>
            <input
              className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`p-2.5 rounded-full transition-all duration-200 ${
                isLoading || !message.trim() 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
              disabled={isLoading || !message.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
  
        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setShowUpload(false)}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <FileUpload onSuccess={() => setShowUpload(false)} />
            </div>
          </div>
        )}
      </div>
    )
}