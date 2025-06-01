// "use client"
// import { Button } from "@/components/ui/button"
// import { Camera } from "lucide-react"
// import { WatermelonIcon } from "@/components/icons/WatermelonIcon"

// interface ProjectBannerProps {
//   bannerUrl?: string | null
// }

// export function ProjectBanner({ bannerUrl }: ProjectBannerProps) {
//   if (bannerUrl) {
//     return (
//       <div className="relative w-full h-48 rounded-lg overflow-hidden">
//         <img src={bannerUrl || "/placeholder.svg"} alt="Project banner" className="w-full h-full object-cover" />
//         <div className="absolute top-4 right-4">
//           <Button variant="ghost" size="sm" className="bg-black/20 text-white hover:bg-black/30">
//             <Camera className="h-4 w-4 mr-2" />
//             Edit Banner
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   // Fallback to original design
//   return (
//     <div className="relative w-full h-48 bg-gradient-to-r from-green-900 to-green-600 rounded-lg overflow-hidden opacity-90">
//       <div className="absolute top-4 right-4">
//         <Button variant="ghost" size="sm" className="bg-black/20 text-white hover:bg-black/30">
//           <Camera className="h-4 w-4 mr-2" />
//           Edit Banner
//         </Button>
//       </div>
//       <div className="absolute bottom-4 right-4">
//         <WatermelonIcon size={80} className="rotate-[145deg]" />
//       </div>
//       <div className="absolute bottom-4 left-4">
//         <WatermelonIcon size={80} className="-rotate-45" />
//       </div>


// <div className="absolute bottom-6 left-6 right-6">
//         <div className="flex items-start justify-between">
//           <div className="flex items-start gap-4">
//             {/* Project Logo */}
//             <div className="flex-shrink-0">
//               {project.logo_url ? (
//                 <img
//                   src={project.logo_url || "/placeholder.svg"}
//                   alt={`${project.name} logo`}
//                   className="w-20 h-20 rounded-lg object-cover"
//                 />
//               ) : (
//                 <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
//                   <span className="text-white font-bold text-xl">{project.name.substring(0, 2).toUpperCase()}</span>
//                 </div>
//               )}
//             </div>

//             {/* Project Information */}
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-3">
//                 <h1 className="text-3xl font-bold text-white">{project.name}</h1>
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   <span className="text-sm text-white">Updated 0</span>
//                 </div>
//               </div>
//               <div className="mt-1">
//                 <span className="text-sm text-white">
//                   Founded by <span className="text-green-300 font-medium">You</span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Edit Section button */}
//           <Button variant="ghost" size="sm" className="text-white hover:text-white/80 self-end">
//             <Edit className="h-4 w-4 mr-2" />
//             Edit Section
//           </Button>
//         </div>

//         {/* Category badge positioned below the main content */}
//         {project.category && (
//           <div className="mt-4">
//             <span className="text-sm text-gray-300 uppercase tracking-wide">{project.category}</span>
//           </div>
//         )}
//       </div>





//     </div>
//   )
// }
