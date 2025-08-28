import { EcosystemContainer, type EcosystemItem } from "@/components/ecosystem/EcosystemContainer"
import { Building2 } from "lucide-react"
import { getPartners } from "@/app/services/ecosystem"

export default async function PartnersPage() {
  // Fetch partners data from database server-side
  const partners: EcosystemItem[] = await getPartners()


  return (
    <EcosystemContainer
      title="Hey You!"
      subtitle="Connect with our trusted partners who can help accelerate your startup journey through funding, mentorship, and resources."
      items={partners}
      defaultIcon={<Building2 className="h-8 w-8 text-white" />}
    />
  )
}
