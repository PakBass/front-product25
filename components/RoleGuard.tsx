"use client";
import { ReactNode } from "react";
import { useRole } from "@/hooks/useRole";

interface RoleGuardProps {
  roles: string[];
  children: ReactNode;
  fallback?: ReactNode;
  requireAll?: boolean; // Default: false (any role)
}

export function RoleGuard({ roles, children, fallback = null, requireAll = false }: RoleGuardProps) {
  const { hasAnyRole, hasAllRoles } = useRole();

  const hasAccess = requireAll ? hasAllRoles(roles) : hasAnyRole(roles);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
