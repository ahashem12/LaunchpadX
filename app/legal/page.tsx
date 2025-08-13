import { EcosystemContainer, type EcosystemItem } from "@/components/ecosystem/EcosystemContainer"
import { Scale } from "lucide-react"
import { getLegalServices } from "@/lib/database/ecosystem"

export default async function LegalPage() {
  // Fetch legal services data from database server-side
  const legalServices: EcosystemItem[] = await getLegalServices()

  return (
    <EcosystemContainer
      title="Hey You!"
      subtitle="Access professional legal services tailored for startups and growing businesses. From formation to compliance."
      items={legalServices}
      defaultIcon={<Scale className="h-8 w-8 text-white" />}
    />
  )
}
