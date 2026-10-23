import type { Role } from "./users";

export type Action =
  | "product:read"
  | "product:create"
  | "product:delete"
  | "user:manage";

const permissions: Record<Role, Action[]> = {
  user: ["product:read"],
  admin: ["product:read", "product:create", "product:delete", "user:manage"],
};

export function can(role: Role | undefined, action: Action): boolean {
  if (!role) return false;
  return permissions[role].includes(action);
}
