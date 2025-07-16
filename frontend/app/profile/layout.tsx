import { AppLayout } from "@/components/layout/AppLayout"

export default function OpenRolesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayout>{children}</AppLayout>
}
