// // app/projects/[id]/fundraising/page.tsx
// import { ProjectNav } from "@/components/projects/nav/ProjectNav"
// import { FundraisingHeader, FundraisingCard } from "@/components/projects/nav/fundraising"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"

// interface FundraisingPageProps {
//   params: {
//     id: string
//   }
// }

// export default async function FundraisingPage( props: FundraisingPageProps) {
//   const params = await props.params;
//   return (
//     <div className="space-y-6">
//       <ProjectNav projectId={params.id} />
      
//       <div className="mt-8 space-y-8">
//         <FundraisingHeader />
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <FundraisingCard
//             title="Funding Round"
//             description="Set up funding rounds to raise capital for your project"
//             icon="dollar-sign"
//           >
//             <Button variant="outline" className="w-full" disabled>
//               Set Up Round
//             </Button>
//           </FundraisingCard>
          
//           <FundraisingCard
//             title="Crowdfunding"
//             description="Use ICT collections to raise funds from the community"
//             icon="users"
//           >
//             <Button variant="outline" className="w-full" disabled>
//               Start Campaign
//             </Button>
//           </FundraisingCard>
          
//           <FundraisingCard
//             title="Webpage"
//             description="Generate your project webpage to showcase to investors"
//             icon="globe"
//           >
//             <Button variant="outline" className="w-full" disabled>
//               Generate Page
//             </Button>
//           </FundraisingCard>
//         </div>
//       </div>
//     </div>
//   )
// }

import { ProjectNav } from "@/components/projects/nav/ProjectNav"
import { ComingSoon } from "@/components/common/ComingSoon"
import { projectService } from "@/app/services/projects/project-service"
import notFound from "@/app/not-found"
import { ProjectHeader } from "@/components/projects/nav/details/ProjectHeader"

interface FundraisingPageProps {
  params: {
    id: string
  }
}

export default async function FundraisingPage(props: FundraisingPageProps) {
  const params = await props.params
  const project = await projectService.getProject(params.id)

  if (!project) {
    notFound()
  }
  return (
    <div className="space-y-6">
            <div className="flex flex-col space-y-6">
              {/* <ProjectBanner bannerUrl={project.banner_url} /> */}
              {project && <ProjectHeader project={project} />}
            </div>
      <ProjectNav projectId={params.id} />
      <ComingSoon/>
    </div>
  )
}
