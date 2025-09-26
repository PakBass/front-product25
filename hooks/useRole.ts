"use client";
import { useCurrentUser } from "./useCurrentUser";

export function useRole() {
  const { user } = useCurrentUser();

  const hasRole = (role: string) => {
    return user?.roles?.includes(role) || false;
  };

  const hasAnyRole = (roles: string[]) => {
    return roles.some((role) => hasRole(role));
  };

  const hasAllRoles = (roles: string[]) => {
    return roles.every((role) => hasRole(role));
  };

  const isAdmin = hasRole("admin");
  const isManager = hasRole("manager");
  const isUser = hasRole("user");

  return {
    user,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isAdmin,
    isManager,
    isUser,
    roles: user?.roles || [],
  };
}
