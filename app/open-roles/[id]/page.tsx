import { notFound } from "next/navigation";
import { RoleHeader } from "@/components/open-roles/details/RoleHeader";
import { RoleDescription } from "@/components/open-roles/details/RoleDescription";
import { projectService } from "@/app/services/projects/project-service";

interface DetailsPageProps {
  params: {
    id: string;
  };
}

export default async function DetailsPage(props: DetailsPageProps) {
  const params = await props.params;
  const role = await projectService.getRole(params.id);
  if (!role) {
    notFound();
  }
  const roleType = await projectService.getRoleType(role.type_id);
  const roleCategory = await projectService.getRoleCategory(role.category_id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-6">
        <RoleHeader role={role} roleType={roleType} roleCategory={roleCategory} />
      </div>
      <RoleDescription role={role} />
    </div>
  );
}
