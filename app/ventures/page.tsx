import { EcosystemContainer, type EcosystemItem } from "@/components/ecosystem/EcosystemContainer"
import { Rocket } from "lucide-react"
import { getVentures } from "@/app/services/ecosystem"

export default async function VentureStudiosPage() {
  // Fetch ventures data from database server-side
  const ventures: EcosystemItem[] = await getVentures()


  return (
    <EcosystemContainer
      title="Hey You!"
      subtitle="Explore our network of venture studios that build companies from the ground up, providing resources, expertise, and funding."
      items={ventures}
      defaultIcon={<Rocket className="h-8 w-8 text-white" />}
    />
  )
}
