"use client";
import { Button } from "@/components/ui/button";
import { useRoleApplication } from "@/hooks/use-role-application";

interface HeaderApplyButtonProps {
  roleId: string;
  className?: string;
}

export function HeaderApplyButton({
  roleId,
  className = "",
}: HeaderApplyButtonProps) {
  const { handleApply, getButtonContent, getButtonVariant, isButtonDisabled } =
    useRoleApplication(roleId);

  return (
    <Button
      onClick={handleApply}
      disabled={isButtonDisabled()}
      size="lg"
      variant={getButtonVariant()}
      className={`bg-white text-green-900 hover:bg-white/90 font-semibold px-8 ${className}`}
    >
      {getButtonContent(true)} {/* true for compact mode */}
    </Button>
  );
}
