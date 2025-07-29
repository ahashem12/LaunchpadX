"use client"

import { Construction, PartyPopper, Coffee, Rocket } from "lucide-react"
import { useRouter } from "next/navigation"

export function ComingSoon() {
  const router = useRouter()
  
  return (
    <div className=" flex flex-col items-center justify-center p-6 ">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Fun Icons */}
        <div className="flex justify-center space-x-6">
          <Construction className="h-10 w-10 text-yellow-500" />
          <PartyPopper className="h-10 w-10 text-pink-500" />
          <Coffee className="h-10 w-10 text-amber-800" />
          <Rocket className="h-10 w-10 text-blue-600" />
        </div>
        
        {/* Simple Message */}
        <h1 className="text-5xl font-bold text-gray-100 mb-2">Coming Soon</h1>
        <p className="text-xl text-gray-400">Something awesome is on the way!</p>
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="mt-8 px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}