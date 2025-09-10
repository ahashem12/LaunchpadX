"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRoleApplication } from "@/hooks/use-role-application";

interface ApplyButtonProps {
  roleId: string;
  className?: string;
}

export function ApplyButton({ roleId, className = "" }: ApplyButtonProps) {
  const {
    application,
    isLoading,
    handleApply,
    getButtonContent,
    getButtonVariant,
    isButtonDisabled,
  } = useRoleApplication(roleId);

  // Don't render anything while loading to prevent layout shift
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex justify-center">
          <Button disabled size="lg" className="w-full max-w-xs">
            Loading...
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">
            Interested in this role?
          </h3>
          <p className="text-muted-foreground text-sm">
            {application
              ? "Application submitted successfully!"
              : "Submit your application to be considered for this position."}
          </p>
        </div>

        <Button
          onClick={handleApply}
          disabled={isButtonDisabled()}
          size="lg"
          variant={getButtonVariant()}
          className="w-full max-w-xs"
        >
          {getButtonContent(false)} {/* false for full text */}
        </Button>

        {application && (
          <p className="text-xs text-muted-foreground text-center">
            Applied on {new Date(application.applied_at).toLocaleDateString()}
          </p>
        )}
      </div>
    </Card>
  );
}
