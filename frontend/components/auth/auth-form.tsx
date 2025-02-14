"use client"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

interface AuthFormProps {
  mode: "signin" | "signup"
  onSubmit: (data: any) => void
  onToggleMode: () => void
}

export default function AuthForm({ mode, onSubmit, onToggleMode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "", // Only for signup
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {mode === "signin" ? "Welcome Back" : "Create Account"}
      </h2>
      <p className="text-gray-600 text-center mb-8">
        {mode === "signin" 
          ? "Enter your credentials to access your account" 
          : "Get started with your free business consultant account"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === "signup" && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@company.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
        >
          {mode === "signin" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={onToggleMode}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  )
}