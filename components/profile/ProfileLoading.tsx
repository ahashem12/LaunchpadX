"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function ProfileLoading() {
  return (
    <div className=" w-full bg-background">
      <div className="container mx-auto px-4 py-8 ">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Profile Picture Section */}
          <div className="xl:col-span-1">
            <div className="bg-card rounded-lg border p-6 space-y-6">
              <div>
                <Skeleton className="h-6 w-32 mb-1" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Skeleton className="h-32 w-32 rounded-full" />
                </div>
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          {/* Main Form Section */}
          <div className="xl:col-span-2 space-y-6">
            {/* Personal Info */}
            <div className="bg-card rounded-lg border p-6 space-y-6">
              <div>
                <Skeleton className="h-6 w-40 mb-1" />
                <Skeleton className="h-4 w-56" />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-card rounded-lg border p-6 space-y-6">
              <div>
                <Skeleton className="h-6 w-36 mb-1" />
                <Skeleton className="h-4 w-64" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-14" />
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Section */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-6 w-24 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Actions */}
            <div className="bg-card rounded-lg border p-6">
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-6 w-16 mb-1" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
