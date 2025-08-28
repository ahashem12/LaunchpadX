import { EcosystemContainer, type EcosystemItem } from "@/components/ecosystem/EcosystemContainer"
import { DollarSign } from "lucide-react"
import { getGrants } from "@/app/services/ecosystem"

export default async function GrantsPage() {
  // Fetch grants data from database server-side
  const grants: EcosystemItem[] = await getGrants()

  return (
    <EcosystemContainer
      title="Hey You!"
      subtitle="Discover amazing grant opportunities to fund your next big idea. From innovation catalysts to social impact initiatives."
      items={grants}
      defaultIcon={<DollarSign className="h-8 w-8 text-white" />}
    />
  )
}
