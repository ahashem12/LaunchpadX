import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileView } from "@/components/profile/ProfileView";
import { getCurrentAuthenticatedUser, getProfileById } from "@/app/services/profile/profile-service.service";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }: { params: Promise<{ profileId: string }> }) {
  // Await params before accessing its properties
  const { profileId } = await params;
  
  const { user } = await getCurrentAuthenticatedUser();

  if (!user) {
    return redirect("/login?message=Please log in to view profiles");
  }

  // If the user is viewing their own profile, show the editable form.
  if (user.id === profileId) {
    return <ProfileForm />;
  }

  // Otherwise, fetch the specified user's profile and show a read-only view.
  const { profile, error } = await getProfileById(profileId);

  if (error || !profile) {
    notFound();
  }

  return <ProfileView profile={profile} />;
}
