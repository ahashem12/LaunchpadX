"use client"

interface ProfileHeaderProps {
  error: string | null
}

export function ProfileHeader({ error }: ProfileHeaderProps) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account information and preferences</p>
      </div>

      {error && (
        <div className="mb-6 p-4 border border-destructive/20 bg-destructive/5 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}
    </>
  )
}
